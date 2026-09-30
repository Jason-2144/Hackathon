import { GoogleGenAI } from '@google/genai';
import {
  AIResponse,
  OutreachFormat,
  GeneratedOutreachItem,
  ExpeditionReport,
  ResearchItem,
  PolarDataset
} from '../types/polar';
import { PRESET_AI_KNOWLEDGE } from '../data/polarData';
import { PolarRepository } from './supabase';

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

// 1. Polar AI Q&A Assistant (Existing capability retained per instruction)
export async function askPolarAI(query: string): Promise<AIResponse> {
  const normalizedQuery = query.toLowerCase().trim();

  if (aiClient) {
    try {
      const systemInstruction = `You are POLAR AI, an official polar science intelligence system for the Ministry of Earth Sciences (MoES) and open polar researchers.
Analyze the user's inquiry regarding Antarctica, the Arctic, glaciology, polar oceanography, or polar ecology.
Respond ONLY with a valid JSON object matching this schema:
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
        return JSON.parse(text) as AIResponse;
      }
    } catch (err) {
      console.warn('Live Gemini API call failed or timed out, using scientific knowledge base:', err);
    }
  }

  // Simulated scientific inference fallback
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (normalizedQuery.includes('thwaites') || normalizedQuery.includes('doomsday')) {
    return PRESET_AI_KNOWLEDGE.thwaites;
  }
  if (normalizedQuery.includes('melt') || normalizedQuery.includes('warm') || normalizedQuery.includes('heat')) {
    return PRESET_AI_KNOWLEDGE.melting;
  }
  if (normalizedQuery.includes('sea ice') || normalizedQuery.includes('disappear') || normalizedQuery.includes('ocean')) {
    return PRESET_AI_KNOWLEDGE.seaice;
  }
  if (normalizedQuery.includes('study') || normalizedQuery.includes('station') || normalizedQuery.includes('scientist') || normalizedQuery.includes('bharati') || normalizedQuery.includes('india')) {
    return PRESET_AI_KNOWLEDGE.study;
  }
  if (normalizedQuery.includes('animal') || normalizedQuery.includes('wildlife') || normalizedQuery.includes('penguin') || normalizedQuery.includes('bear')) {
    return PRESET_AI_KNOWLEDGE.animals;
  }

  return {
    query,
    simpleExplanation: `Polar scientific observations indicate that high-latitude cryospheric systems are sensitive climate bellwethers. Ongoing research by the Ministry of Earth Sciences (MoES) and international consortia monitors shifts in ice shelves, sea ice extent, and Southern Ocean circulation.`,
    scientificExplanation: `Observations across circumpolar monitoring stations synthesize satellite radiometry, gravimetric mass balance (GRACE-FO), and autonomous oceanic gliders. Thermodynamic coupling between the atmospheric boundary layer and shoaling warm deep water masses governs grounding line stability and albedo feedback mechanisms.`,
    keyFacts: [
      `The Arctic is warming at approximately four times the global average rate (Arctic Amplification).`,
      `Antarctica holds approximately 68.7% of the world's fresh water locked in its continental ice sheets.`,
      `India operates two permanent Antarctic stations (Maitri and Bharati) and one Arctic station (Himadri) under MoES/NCPOR.`
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
      'Tell me about India\'s 44th Antarctic Expedition (ISEA 44).',
      'Why is Antarctic ice melting?',
      'Tell me about Thwaites Glacier.'
    ],
  };
}

export async function generateStoryFromResearch(researchId: string) {
  const research = PolarRepository.getResearchById(researchId) || PolarRepository.getResearch()[0];
  return {
    id: `story-${Date.now()}`,
    sourceResearchId: research.id,
    title: `The Hidden Dynamics of ${research.title.slice(0, 45)}...`,
    originalScientificHeadline: research.title,
    scientificSummary: research.abstract,
    studentExplanation: `Scientists investigated ${research.region} and found that changes in ocean currents and atmospheric moisture affect ice stability faster than previously understood.`,
    publicStory: `Deep in the polar wilderness of ${research.region}, research led by ${research.institution} is rewriting what we know about ice sheets. By deploying advanced radar interferometry and autonomous ocean floats, researchers have uncovered how ancient climate cycles directly connect to global weather extremes today.`,
    socialMediaThread: [
      `1/3 New research from ${research.institution}: "${research.title.slice(0, 60)}..."`,
      `2/3 The team tracked shifts across ${research.topics.join(', ')} using verified satellite and field arrays.`,
      `3/3 Read the open report on POLARIS: https://polaris.org/repository/${research.id}`
    ],
    keyMetaphor: 'A giant planetary thermostat adjusting to ocean heat',
    targetAudience: 'General Public' as 'General Public' | 'High School Students' | 'Science Journalists' | 'Policymakers',
    readingLevel: 'Grade 8 (Accessible)',
    createdDate: new Date().toISOString().split('T')[0],
    author: 'POLARIS Science Outreach Desk',
  };
}

// 2. Content Studio: Multi-Format Outreach Content Generation Engine
export interface GenerateOutreachOptions {
  sourceId: string;
  sourceType: 'Expedition Report' | 'Publication' | 'Dataset' | 'Activity' | 'Expedition';
  formats: OutreachFormat[];
  attachedMediaIds?: string[];
  attachedDatasetId?: string;
  targetAudience?: string;
  readingLevel?: string;
}

export async function generateContentStudioPackage(
  options: GenerateOutreachOptions
): Promise<GeneratedOutreachItem[]> {
  // 1. Resolve source details
  let sourceTitle = 'Scientific Resource';
  let sourceInstitution = 'Ministry of Earth Sciences (MoES) / Polar Consortium';
  let rawContext = '';

  if (options.sourceType === 'Expedition Report') {
    const report = PolarRepository.getExpeditionReportById(options.sourceId) || PolarRepository.getExpeditionReports()[0];
    sourceTitle = report.title;
    sourceInstitution = report.institution;
    rawContext = `${report.summary}\nMethodology: ${report.methodology}\nFindings: ${report.keyFindings.join('; ')}`;
  } else if (options.sourceType === 'Publication') {
    const pub = PolarRepository.getResearchById(options.sourceId) || PolarRepository.getResearch()[0];
    sourceTitle = pub.title;
    sourceInstitution = pub.institution;
    rawContext = `${pub.abstract}\nKey Takeaway: ${pub.keyTakeaway}\nTopics: ${pub.topics.join(', ')}`;
  } else if (options.sourceType === 'Dataset') {
    const data = PolarRepository.getDatasetById(options.sourceId) || PolarRepository.getDatasets()[0];
    sourceTitle = data.title;
    sourceInstitution = data.provider;
    rawContext = `${data.description}\nParameters: ${data.parameters.join(', ')}`;
  } else if (options.sourceType === 'Expedition') {
    const exp = PolarRepository.getExpeditionById(options.sourceId) || PolarRepository.getExpeditions()[0];
    sourceTitle = exp.name;
    sourceInstitution = exp.institution;
    rawContext = `${exp.objective}\nLead: ${exp.leadScientist}\nFindings: ${exp.findingsSummary}`;
  }

  // Brief latency simulation for realistic AI generation experience
  await new Promise((resolve) => setTimeout(resolve, 850));

  const formatLabels: Record<OutreachFormat, string> = {
    website_article: 'Website Feature Article',
    public_article: 'Public Science Article',
    student_explanation: 'Student-Friendly Explanation',
    instagram_post: 'Instagram Post & Visual Story',
    linkedin_post: 'LinkedIn Professional Update',
    x_post: 'X / Twitter Outreach Thread',
    youtube_description: 'YouTube Video Description & Chapters',
    video_script: 'Short Video / Reel Script',
    infographic_content: 'Infographic Content & Key Stats',
  };

  const results: GeneratedOutreachItem[] = [];

  const now = new Date().toISOString().split('T')[0];

  for (const fmt of options.formats) {
    let generatedTitle = '';
    let generatedContent = '';

    switch (fmt) {
      case 'website_article':
        generatedTitle = `Unlocking Polar Frontiers: Discoveries from ${sourceTitle}`;
        generatedContent = `The scientific quest in the Earth's polar realms continues to reveal critical truths about our planet's future. Grounded in research conducted by ${sourceInstitution}, this comprehensive report illuminates the latest empirical measurements.

Key Insights:
${rawContext}

Why This Research Matters to Society:
Changes observed at the polar margins—such as shifts in ocean heat capacity, grounding zone retreat, and atmospheric boundary layer heating—do not stay at the poles. They directly modulate global weather patterns, monsoon dynamics, and sea levels along coastal cities.

Official Source & Traceability:
This article is directly translated from the primary repository document: "${sourceTitle}" published by ${sourceInstitution}.`;
        break;

      case 'public_article':
        generatedTitle = `Beyond the Ice: What Scientists Discovered at the Ends of the Earth`;
        generatedContent = `Miles away from human civilization, where temperatures regularly plummet below -40°C, scientists are deciphering ancient climate secrets. 

Drawing from primary fieldwork documented in "${sourceTitle}", researchers have documented surprising shifts in ice dynamics and marine biology. Unlike the common belief that ice simply melts from warm air above, empirical data proves that warm deep-ocean currents are carving complex channels beneath floating ice shelves.

By translating dense mathematical data into clear societal warnings, institutions like ${sourceInstitution} are helping coastal planners prepare for the decades ahead.`;
        break;

      case 'student_explanation':
        generatedTitle = `How Polar Scientists Solve the Big Ice Mystery (Student Edition)`;
        generatedContent = `Have you ever wondered how scientists study a place so cold that boiling water turns to snow instantly?

Here is what researchers at ${sourceInstitution} found:
Think of Antarctica like a giant frozen refrigerator with the door left cracked open. Instead of just melting like an ice cube in a glass of warm soda, the ice is being slowly melted from underneath by deep ocean currents. 

Scientists dropped special instruments down through hundreds of meters of ice to measure the water temperature. What they found helps us understand how our whole planet's weather works—including the monsoons and rainfall that grow our crops back home!`;
        break;

      case 'instagram_post':
        generatedTitle = `Instagram Visual Carousel: Discoveries from ${sourceTitle.slice(0, 40)}...`;
        generatedContent = `🧊 EXPEDITION BREAKTHROUGH: What happens when scientists explore the most isolated corners of Earth?

Swipe ➡️ to see the findings from ${sourceInstitution}:

1️⃣ The Mission: Documenting critical changes in polar ice sheets and ocean currents.
2️⃣ The Method: Deep drilling, satellite radar interferometry, and autonomous submersibles.
3️⃣ The Revelation: ${rawContext.slice(0, 140)}...
4️⃣ Why It Matters: Protecting coastal communities and deciphering planetary climate history.

📍 Tracked in the POLARIS Central Knowledge Repository
🔬 Source: ${sourceTitle}

#PolarScience #Cryosphere #EarthScience #MoES #Antarctica #ScienceOutreach #SmartEducation #Oceanography`;
        break;

      case 'linkedin_post':
        generatedTitle = `Scientific Research Update: ${sourceTitle.slice(0, 50)}...`;
        generatedContent = `Advancing empirical cryospheric research and climate resilience:

The latest research documented in "${sourceTitle}" by ${sourceInstitution} presents vital ground-truth data for glaciologists, climate modellers, and policymakers.

Key Findings:
• ${rawContext.slice(0, 180)}...
• Multi-parameter sensor telemetry cross-validated against satellite radar data.
• Direct implications for coastal infrastructure planning and climate risk assessment.

Full open-access documentation and datasets are archived in the POLARIS Knowledge Repository:
🔗 Source: ${sourceTitle} (${sourceInstitution})

#EarthSciences #ClimateAction #OceanEngineering #Geophysics #PolarisPortal`;
        break;

      case 'x_post':
        generatedTitle = `X / Twitter Thread (4 Posts) on ${sourceTitle.slice(0, 35)}...`;
        generatedContent = `🧵 1/4 NEW RESEARCH: Groundbreaking field findings released by ${sourceInstitution}: "${sourceTitle}". Here is what you need to know:

❄️ 2/4 What was discovered? ${rawContext.slice(0, 160)}...

🌊 3/4 Why it matters: Polar ice shifts directly govern global ocean currents and planetary energy balance. What happens at 70°S impacts rainfall and sea levels worldwide.

📖 4/4 Explore the raw expedition logs, peer-reviewed publications, and verified datasets on POLARIS: https://polaris.org/repository/${options.sourceId}`;
        break;

      case 'youtube_description':
        generatedTitle = `YouTube Video Description & Timestamps: ${sourceTitle.slice(0, 45)}`;
        generatedContent = `In this documentary deep-dive, we follow the scientists of ${sourceInstitution} on an unprecedented polar scientific campaign.

Source Document: "${sourceTitle}"
Archived by: Ministry of Earth Sciences (MoES) / POLARIS Central Repository

TIMESTAMPS:
0:00 - Introduction: The Extremes of Polar Research
2:15 - Logistics & Deployment in the Cryosphere
5:30 - Key Discoveries & Data Analysis
8:45 - The Human Dimension: Wintering Over
11:20 - Societal Impact & Global Sea Levels
14:00 - Open Science & Where to Read the Report

Learn more and explore the full dataset at POLARIS: https://polaris.org`;
        break;

      case 'video_script':
        generatedTitle = `60-Second Reel / Short Video Script: ${sourceTitle.slice(0, 40)}`;
        generatedContent = `[HOOK - 0:00 to 0:05]
(Visual: Drone shot over endless blue ice crevasses)
NARRATOR (Energetic): "Beneath 600 meters of solid ice, scientists just discovered something that changes how we see our entire planet."

[THE DISCOVERY - 0:05 to 0:25]
(Visual: Robotic submersible lowered into borehole; flashing sensor readouts)
NARRATOR: "This new report from ${sourceInstitution} reveals that polar ice isn't just melting from the air above. Deep, warm ocean water is cutting underneath like an invisible blowtorch."

[THE STAKES - 0:25 to 0:45]
(Visual: Split screen of Antarctic ice stream and world map of coastal cities)
NARRATOR: "Every cubic kilometer of ice that drains into the ocean ripples out into rising sea levels and altered weather patterns across the globe."

[CALL TO ACTION - 0:45 to 0:60]
(Visual: POLARIS interactive portal screen with verified source citation)
NARRATOR: "Don't just take our word for it—read the verified expedition logs and open datasets directly on POLARIS. Link in bio!"`;
        break;

      case 'infographic_content':
        generatedTitle = `Infographic Fact Sheet: Quick Stats on ${sourceTitle.slice(0, 40)}`;
        generatedContent = `📊 INFOGRAPHIC DATA SPECIFICATION:
---------------------------------------------
HEADER: ${sourceTitle}
ORGANIZATION: ${sourceInstitution}

KEY METRIC 1: Ice Velocity / Stream Discharge
• Value: High-Velocity Surge Zone
• Context: Derived from Synthetic Aperture Radar (InSAR)

KEY METRIC 2: Thermal Delta
• Value: +1.5°C above local freezing
• Context: In-situ CTD probe observation

KEY METRIC 3: Atmospheric Deposition
• Value: 850-Year Ice Core Record
• Context: Recovered from Queen Maud Land plateau

SOURCE CITATION:
Document ID: ${options.sourceId} | POLARIS Knowledge Repository`;
        break;
    }

    const item: GeneratedOutreachItem = {
      id: `out-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      sourceId: options.sourceId,
      sourceTitle,
      sourceType: options.sourceType,
      sourceInstitution,
      format: fmt,
      formatLabel: formatLabels[fmt],
      title: generatedTitle,
      content: generatedContent,
      reviewStatus: 'ai_generated',
      createdAt: now,
      updatedAt: now,
      attachedMediaIds: options.attachedMediaIds || [],
      attachedDatasetId: options.attachedDatasetId,
      reviewNotes: 'Generated by POLARIS Content Studio. Awaiting scientific peer verification before publication.',
      publishedChannels: [],
      targetAudience: options.targetAudience || 'General Public & Educators',
      readingLevel: options.readingLevel || 'Grade 8 (Accessible)',
    };

    results.push(item);
  }

  return results;
}
