import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

// Server-Side Gemini Initialization per gemini-api skill
const apiKey = process.env.GEMINI_API_KEY || '';

function getGenAIClient(clientReferer?: string) {
  const headers: Record<string, string> = {
    'User-Agent': 'aistudio-build',
  };
  if (clientReferer && clientReferer !== '<empty>') {
    headers['Referer'] = clientReferer;
  }

  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers,
    },
  });
}

// 1. Health / Capabilities Status
app.get('/api/ai/status', (req, res) => {
  res.json({
    status: 'ok',
    model: 'gemini-3.8-flash',
    hasKey: Boolean(apiKey && apiKey.length > 5),
  });
});

// 2. Ask POLARIS Q&A Endpoint
app.post('/api/ai/ask', async (req, res) => {
  const { query } = req.body;
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  if (!apiKey || apiKey.length < 5) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY is not configured on the server.',
      fallbackAvailable: true,
    });
  }

  try {
    const systemInstruction = `You are POLARIS AI, an official polar science intelligence research assistant for the Ministry of Earth Sciences (MoES) and international polar scientists.
Analyze the user inquiry regarding Antarctica, Arctic, glaciology, sea ice, stations (Bharati, Maitri, Himadri), Southern Ocean, or polar biology.
Synthesize verified empirical facts, cite realistic institutional datasets and reports, and respond ONLY with a valid JSON object matching this schema:
{
  "query": "${query.replace(/"/g, '\\"')}",
  "simpleExplanation": "Clear, accessible explanation for students and the general public (2-3 sentences)",
  "scientificExplanation": "Deep, rigorous glaciological, atmospheric, or oceanographic explanation using empirical terminology",
  "keyFacts": ["Fact 1 with numbers/units", "Fact 2", "Fact 3"],
  "relatedData": [
    { "metric": "Name of metric", "value": "Number + unit", "trend": "increasing"|"decreasing"|"stable"|"fluctuating", "context": "Scientific context" }
  ],
  "sources": [
    { "title": "Paper/Report/Dataset title", "institution": "NCPOR / MoES or international institute", "year": 2024, "urlOrDoi": "DOI or accession URL", "confidenceScore": 0.98 }
  ],
  "suggestedFollowUps": ["Follow-up question 1", "Follow-up question 2", "Follow-up question 3"]
}`;

    const client = getGenAIClient(req.headers.referer as string || req.headers.origin as string);
    const response = await client.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: query,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response received from Gemini API');
    }

    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (err: any) {
    console.error('Gemini server-side error (/api/ai/ask):', err?.message || err);
    return res.status(500).json({
      error: 'Failed to process inquiry via Gemini API',
      details: err?.message,
      fallbackAvailable: true,
    });
  }
});

// 3. Content Studio Multi-Format Outreach Generation Endpoint
app.post('/api/ai/generate-outreach', async (req, res) => {
  const {
    sourceTitle,
    sourceInstitution,
    sourceType,
    rawContext,
    format,
    attachedMediaTitles,
    datasetTitle,
  } = req.body;

  if (!sourceTitle) {
    return res.status(400).json({ error: 'sourceTitle is required' });
  }

  if (!apiKey || apiKey.length < 5) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY is not configured on the server.',
      fallbackAvailable: true,
    });
  }

  try {
    const prompt = `Translate the following scientific research document into a professional outreach asset in the requested format.

Source Document:
Title: ${sourceTitle}
Type: ${sourceType}
Institution: ${sourceInstitution}
Scientific Content & Findings:
${rawContext}
${attachedMediaTitles ? `Attached Media: ${attachedMediaTitles}` : ''}
${datasetTitle ? `Referenced Dataset: ${datasetTitle}` : ''}

Target Format: ${format}

Formatting guidelines based on format:
- "website_article": Professional editorial web feature article with headline, executive summary, body sections, societal impact, and institutional citations.
- "public_article": Engaging narrative journalism translating complex polar mechanics into an accessible story for the general public.
- "student_explanation": Educational breakdown for high-school students with analogies, clear definitions, and 'Why this matters'.
- "social_post": High-impact multi-post thread (X / LinkedIn / Instagram) with hooks, bulleted scientific stats, and relevant hashtags.
- "video_script": Script for a 60-90 second educational video with visual cues [Visual: ...] and spoken narration [Voiceover: ...].
- "infographic_content": Structured outline with 4 key numerical statistics, bulleted findings, and call-out boxes.

Respond ONLY with a valid JSON object matching this schema:
{
  "title": "Engaging, professional title for the outreach piece",
  "content": "Complete, polished, ready-to-publish content text matching the requested format",
  "keyTakeaway": "Single-sentence core summary of the finding"
}`;

    const client = getGenAIClient(req.headers.referer as string || req.headers.origin as string);
    const response = await client.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an expert science communicator and editor for the Ministry of Earth Sciences (MoES) POLARIS portal.',
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response received from Gemini API');
    }

    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (err: any) {
    console.error('Gemini server-side error (/api/ai/generate-outreach):', err?.message || err);
    return res.status(500).json({
      error: 'Failed to generate outreach piece via Gemini API',
      details: err?.message,
      fallbackAvailable: true,
    });
  }
});

// Vite middleware integration for SPA
async function startServer() {
  if (process.env.NODE_ENV === 'production' && fs.existsSync(path.resolve(__dirname, 'dist'))) {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      if (url.startsWith('/api')) {
        return next();
      }
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[POLARIS Server] Running on http://0.0.0.0:${port} with Gemini server-side AI integration`);
  });
}

startServer();
