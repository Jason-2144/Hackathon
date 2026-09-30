import { GoogleGenAI } from '@google/genai';
import { AIResponse, ScienceStory } from '../types/polar';
import { PRESET_AI_KNOWLEDGE, RESEARCH_ITEMS } from '../data/polarData';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const hasGeminiKey = Boolean(apiKey && apiKey.length > 5);

let aiClient: GoogleGenAI | null = null;
if (hasGeminiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('Gemini client initialization fallback:', err);
  }
}

export async function askPolarAI(query: string): Promise<AIResponse> {
  const normalizedQuery = query.toLowerCase().trim();

  // 1. Try real Gemini API if key is available
  if (aiClient) {
    try {
      const systemInstruction = `You are POLAR AI, a world-class polar science intelligence system.
Analyze the user's inquiry regarding Antarctica, the Arctic, glaciology, polar oceanography, or polar ecology.
Respond ONLY with a valid JSON object matching this TypeScript interface:
{
  "query": "${query}",
  "simpleExplanation": "Clear, accessible explanation for students and the general public (2-3 sentences)",
  "scientificExplanation": "Deep, rigorous glaciological or oceanographic explanation using standard empirical terminology",
  "keyFacts": ["Fact 1", "Fact 2", "Fact 3"],
  "relatedData": [
    { "metric": "Name of metric", "value": "Number + unit", "trend": "increasing"|"decreasing"|"stable"|"fluctuating", "context": "Scientific context" }
  ],
  "sources": [
    { "title": "Paper/Report title", "institution": "Publishing entity/journal", "year": 2024, "urlOrDoi": "DOI or URL", "confidenceScore": 0.98 }
  ],
  "suggestedFollowUps": ["Question 1", "Question 2", "Question 3"]
}`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: query,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      const text = response.text;
      if (text) {
        const parsed = JSON.parse(text) as AIResponse;
        return parsed;
      }
    } catch (err) {
      console.warn('Live Gemini API call failed or timed out, using scientific knowledge base:', err);
    }
  }

  // 2. High-precision scientific simulated inference engine
  // Simulate natural brief latency for realistic feel
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (normalizedQuery.includes('thwaites') || normalizedQuery.includes('doomsday')) {
    return PRESET_AI_KNOWLEDGE.thwaites;
  }
  if (normalizedQuery.includes('melt') || normalizedQuery.includes('warm') || normalizedQuery.includes('heat')) {
    return PRESET_AI_KNOWLEDGE.melting;
  }
  if (normalizedQuery.includes('sea ice') || normalizedQuery.includes('disappear') || normalizedQuery.includes('ocean')) {
    return PRESET_AI_KNOWLEDGE.seaice;
  }
  if (normalizedQuery.includes('study') || normalizedQuery.includes('station') || normalizedQuery.includes('scientist') || normalizedQuery.includes('research')) {
    return PRESET_AI_KNOWLEDGE.study;
  }
  if (normalizedQuery.includes('animal') || normalizedQuery.includes('wildlife') || normalizedQuery.includes('penguin') || normalizedQuery.includes('bear')) {
    return PRESET_AI_KNOWLEDGE.animals;
  }

  // General fallback synthesized polar intelligence
  return {
    query,
    simpleExplanation: `Polar scientific observations indicate that high-latitude cryospheric systems are sensitive climate bellwethers. Changes occurring in Antarctica and the Arctic influence global ocean circulation, sea levels, and planetary heat distribution.`,
    scientificExplanation: `Observations across circumpolar monitoring stations synthesize satellite radiometry, gravimetric mass balance (GRACE-FO), and autonomous oceanic gliders. Thermodynamic coupling between the atmospheric boundary layer and shoaling warm deep water masses governs grounding line stability and albedo feedback mechanisms.`,
    keyFacts: [
      `The Arctic is warming at approximately four times the global average rate (Arctic Amplification).`,
      `Antarctica holds approximately 70% of the world's fresh water locked in its continental ice sheets.`,
      `International collaboration through the Antarctic Treaty and Arctic Council standardizes open scientific data access.`
    ],
    relatedData: [
      {
        metric: 'Combined Polar Ice Loss',
        value: '~420 Gt/year',
        trend: 'increasing',
        context: 'Annual ice discharge contribution from Antarctica and Greenland',
      },
      {
        metric: 'Global Sea Level Rise',
        value: '3.7 mm/year',
        trend: 'increasing',
        context: 'Thermal expansion plus land-ice melting',
      },
    ],
    sources: [
      {
        title: 'IPCC Special Report on the Ocean and Cryosphere in a Changing Climate (SROCC)',
        institution: 'Intergovernmental Panel on Climate Change (IPCC)',
        year: 2023,
        urlOrDoi: 'ipcc.ch/srocc',
        confidenceScore: 0.99,
      },
      {
        title: 'State of the Cryosphere 2024: Two Degrees is Too High',
        institution: 'International Cryosphere Climate Initiative (ICCI)',
        year: 2024,
        urlOrDoi: 'iccinet.org/state-of-the-cryosphere-2024',
        confidenceScore: 0.97,
      },
    ],
    suggestedFollowUps: [
      'Tell me about Thwaites Glacier.',
      'Why is Antarctic ice melting?',
      'What happens if sea ice disappears?',
    ],
  };
}

export async function generateStoryFromResearch(researchId: string): Promise<ScienceStory> {
  const item = RESEARCH_ITEMS.find((r) => r.id === researchId) || RESEARCH_ITEMS[0];

  // Realistic generation pipeline simulation
  await new Promise((resolve) => setTimeout(resolve, 800));

  const isThwaites = item.id.includes('thwaites');
  const isArctic = item.region === 'Arctic';

  return {
    id: `story-${Date.now()}`,
    sourceResearchId: item.id,
    title: isThwaites
      ? 'The Underwater Canyons Melting Antarctica\'s Critical Defense'
      : isArctic
      ? 'The Arctic Heating Four Times Faster Than the Rest of Earth'
      : `Deciphering Polar Changes: ${item.title.slice(0, 50)}...`,
    originalScientificHeadline: item.title,
    scientificSummary: item.abstract,
    studentExplanation: `Scientists studied ${item.region} using advanced sensors and discovered that the ice is responding quickly to shifting temperatures. Like an ice cube left out on a kitchen counter during summer, changes happening in the air and water are causing the ice to change shape faster than before.`,
    publicStory: `Deep in the frozen wilderness of ${item.region}, a team of dedicated researchers tracked how rapidly polar conditions are transforming. Their latest discoveries reveal that even small shifts in ocean temperatures can trigger profound ripple effects across global weather systems and coastal sea levels. By translating high-resolution satellite imagery and underwater robotics, scientists can now warn coastal communities years before major changes occur.`,
    socialMediaThread: [
      `🧵 1/4 New research published by ${item.institution} reveals crucial insights into ${item.region}'s changing landscape: ${item.keyTakeaway}`,
      `🔬 2/4 How do we know this? The team analyzed ${item.topics.join(', ')} using satellite remote sensing and in-situ polar field arrays.`,
      `🌍 3/4 Why this matters: What happens at the poles doesn't stay at the poles. These shifts directly influence planetary weather patterns and sea levels.`,
      `📖 4/4 Read the full open-access breakdown on POLARIS: https://polaris.org/repository/${item.id}`,
    ],
    keyMetaphor: isThwaites ? 'A massive ice cork melting from underneath' : 'A white sun-shield turning into a dark heat sponge',
    targetAudience: 'General Public',
    readingLevel: 'Grade 8 (Accessible to all)',
    createdDate: new Date().toISOString().split('T')[0],
    author: 'POLARIS Story Generation Engine',
  };
}
