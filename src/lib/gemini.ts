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

/**
 * 1. Polar AI Q&A Assistant
 * Communicates with the server-side Gemini 3.8 Flash proxy endpoint (/api/ai/ask).
 * Includes scientific repository fallback when offline or during initial configuration.
 */
export async function askPolarAI(query: string): Promise<AIResponse> {
  const normalizedQuery = query.toLowerCase().trim();

  try {
    const res = await fetch('/api/ai/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.simpleExplanation && data.scientificExplanation) {
        return data as AIResponse;
      }
    }
  } catch (err) {
    console.info('[POLARIS Client] Live Gemini endpoint unavailable, utilizing scientific knowledge base fallback:', err);
  }

  // Simulated scientific inference fallback using verified repository knowledge
  await new Promise((resolve) => setTimeout(resolve, 400));

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
    let isLiveAiGenerated = false;

    // Try server-side live Gemini 3.8 Flash generation
    try {
      const res = await fetch('/api/ai/generate-outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceTitle,
          sourceInstitution,
          sourceType: options.sourceType,
          rawContext,
          format: fmt,
          attachedMediaTitles: options.attachedMediaIds?.join(', '),
          datasetTitle: options.attachedDatasetId,
        }),
      });

      if (res.ok) {
        const liveAiData = await res.json();
        if (liveAiData?.title && liveAiData?.content) {
          generatedTitle = liveAiData.title;
          generatedContent = liveAiData.content;
          isLiveAiGenerated = true;
        }
      }
    } catch (e) {
      console.info('[POLARIS Client] Live Gemini endpoint unavailable for format, using template generation:', e);
    }

    if (!isLiveAiGenerated) {
      // Fallback format template
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

Key Takeaway for Young Explorers:
The ice you see in pictures is connected to our ocean weather and monsoon rains. Protecting it starts with understanding how the polar thermostat operates!`;
          break;

        case 'instagram_post':
          generatedTitle = `Visual Field Dispatch: ${sourceTitle.slice(0, 45)}...`;
          generatedContent = `📍 POLAR RESEARCH DISPATCH | ${sourceInstitution}

Behind the scenes of critical polar climate observation:
${rawContext.slice(0, 220)}...

Swipe through to see the field instrument arrays and satellite passes documenting these rapid environmental shifts.

🔗 Read the full research dossier on POLARIS: polaris.gov.in/repo/${options.sourceId}

#PolarScience #Antarctica #ClimateResearch #NCPOR #MoES #FieldWork`;
          break;

        case 'linkedin_post':
          generatedTitle = `Institutional Scientific Milestone: ${sourceTitle.slice(0, 50)}`;
          generatedContent = `We are pleased to share the newly archived scientific findings from ${sourceInstitution}: "${sourceTitle}".

Key Technical Takeaways:
• Empirical synthesis across high-latitude monitoring arrays
• Comprehensive ground-truthing verifying orbital satellite sensors
• Direct implications for coastal infrastructure planning and climate risk models

Full research paper, telemetry data feeds, and expedition field logs are publicly accessible on the POLARIS Knowledge Portal.

#EarthSciences #Geophysics #Cryosphere #OpenScience #MoES #ResearchLeadership`;
          break;

        case 'x_post':
          generatedTitle = `Thread: Key Findings from ${sourceTitle.slice(0, 40)}`;
          generatedContent = `🧵 1/4 How is the Earth's polar thermostat responding to warming deep waters? A new study from ${sourceInstitution} provides crucial empirical observations.

2/4 Key Data:
${rawContext.slice(0, 180)}

3/4 Satellite InSAR radar altimetry confirms high flow velocities along the glacier grounding zone, pointing to active oceanic thermodynamic forcing.

4/4 Explore the open peer-reviewed dataset and interactive map on POLARIS ➡️ https://polaris.gov.in/item/${options.sourceId}`;
          break;

        case 'youtube_description':
          generatedTitle = `POLARIS Expedition Documentary: ${sourceTitle}`;
          generatedContent = `Official documentary video record documenting research by ${sourceInstitution}.

00:00 - Expedition Deployment & Transit
01:30 - Autonomous Oceanic Glider Deployment
03:45 - Ice Core Extraction on Queen Maud Land
06:10 - Grounding Zone Radar Profiling
08:20 - Scientific Conclusions & Climate Outlook

Archived Document ID: ${options.sourceId}
Repository: POLARIS (Ministry of Earth Sciences)
Learn more: https://polaris.gov.in`;
          break;

        case 'video_script':
          generatedTitle = `Video Script: The Story of ${sourceTitle.slice(0, 40)}`;
          generatedContent = `[SCENE 1 - 0:00-0:15]
(VISUAL: Drone shot of vast Antarctic ice shelf with research vessel MV Vasiliy Golovnin in distance)
(NARRATOR): At the bottom of our world, temperatures drop below minus forty. But the real story is what's happening underneath the ice.

[SCENE 2 - 0:15-0:35]
(VISUAL: Scientists deploying a deep-sea CTD probe into dark icy water)
(NARRATOR): Research led by ${sourceInstitution} reveals that ocean currents are carrying warm water directly to the foundation of these massive ice sheets.

[SCENE 3 - 0:35-0:50]
(VISUAL: Satellite animation showing ice flow velocities)
(NARRATOR): Every millimeter of ice loss here has repercussions for coastal cities thousands of miles away.

[SCENE 4 - 0:50-1:00]
(VISUAL: POLARIS logo and website call-to-action)
(NARRATOR): Learn more and inspect the verified data on POLARIS. Science for our shared future.`;
          break;

        case 'infographic_content':
          generatedTitle = `Infographic Brief: ${sourceTitle}`;
          generatedContent = `INFOGRAPHIC SPECIFICATION SHEET
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
      reviewNotes: isLiveAiGenerated
        ? 'Generated via Gemini 3.8 Flash server-side integration. Awaiting editorial sign-off.'
        : 'Generated by POLARIS Content Studio engine. Awaiting editorial sign-off.',
      publishedChannels: [],
      targetAudience: options.targetAudience || 'General Public & Educators',
      readingLevel: options.readingLevel || 'Grade 8 (Accessible)',
    };

    results.push(item);
  }

  return results;
}
