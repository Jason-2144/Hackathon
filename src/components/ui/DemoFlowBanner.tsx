import React, { useState } from 'react';
import { ActiveTab } from '../Header';
import {
  Compass,
  Play,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
  ArrowRight,
  Layers
} from 'lucide-react';

interface DemoFlowBannerProps {
  currentTab: ActiveTab;
  onNavigate: (tab: ActiveTab, params?: any) => void;
  onClose: () => void;
}

export interface DemoStep {
  stepNumber: number;
  title: string;
  description: string;
  tab: ActiveTab;
  params?: any;
}

export const OFFICIAL_DEMO_STEPS: DemoStep[] = [
  {
    stepNumber: 1,
    title: '1. POLARIS Knowledge Platform',
    description: 'Central portal of Ministry of Earth Sciences (MoES) for polar archiving & public dissemination.',
    tab: 'home',
  },
  {
    stepNumber: 2,
    title: '2. Go to Expeditions Hub',
    description: 'Archive of national and international campaigns connecting all scientific resources.',
    tab: 'expeditions',
    params: { expeditionId: 'exp-indian-antarctic-44' },
  },
  {
    stepNumber: 3,
    title: '3. Open Expedition 44 (ISEA 44)',
    description: 'Select the 44th Indian Scientific Expedition to Antarctica to inspect connected assets.',
    tab: 'expeditions',
    params: { expeditionId: 'exp-indian-antarctic-44' },
  },
  {
    stepNumber: 4,
    title: '4. Relational Scientific Assets',
    description: 'Notice connected tabs: Reports, Publications, Datasets, Photographs, Videos, Activities.',
    tab: 'expeditions',
    params: { expeditionId: 'exp-indian-antarctic-44' },
  },
  {
    stepNumber: 5,
    title: '5. Open Scientific Expedition Report',
    description: 'Inspect MoES-ISEA-44-CR-01 documenting ice coring, renewable microgrid and CTD transects.',
    tab: 'expeditions',
    params: { expeditionId: 'exp-indian-antarctic-44' },
  },
  {
    stepNumber: 6,
    title: '6. Trigger "Create Outreach Content"',
    description: 'Click the AI action button to send primary expedition report directly to Content Studio.',
    tab: 'studio',
    params: { sourceId: 'rep-isea-44-cruise', sourceType: 'Expedition Report' },
  },
  {
    stepNumber: 7,
    title: '7. POLARIS Content Studio',
    description: 'Notice 3-column architecture: Source Material (Left) · AI Studio (Center) · Dissemination (Right).',
    tab: 'studio',
    params: { sourceId: 'rep-isea-44-cruise', sourceType: 'Expedition Report' },
  },
  {
    stepNumber: 8,
    title: '8. Select Multi-Format Outputs',
    description: 'Checkboxes: Website Article, Instagram Post, LinkedIn Post, and Short Video Script.',
    tab: 'studio',
    params: { sourceId: 'rep-isea-44-cruise', sourceType: 'Expedition Report' },
  },
  {
    stepNumber: 9,
    title: '9. AI Multi-Format Generation',
    description: 'AI processes the report into 4 synchronized outreach formats with student & public tone.',
    tab: 'studio',
    params: { sourceId: 'rep-isea-44-cruise', sourceType: 'Expedition Report' },
  },
  {
    stepNumber: 10,
    title: '10. Inspect Source Traceability',
    description: 'Observe strict traceability banner citing MoES report number and "View Primary Source" link.',
    tab: 'studio',
    params: { sourceId: 'rep-isea-44-cruise', sourceType: 'Expedition Report' },
  },
  {
    stepNumber: 11,
    title: '11. Attach Photographs & Datasets',
    description: 'Link field photographs of Bharati station and daily atmospheric temperature telemetry.',
    tab: 'studio',
    params: { sourceId: 'rep-isea-44-cruise', sourceType: 'Expedition Report' },
  },
  {
    stepNumber: 12,
    title: '12. Edit & Refine Generated Text',
    description: 'Click "Edit Content" in center panel to demonstrate human-in-the-loop editing.',
    tab: 'studio',
    params: { sourceId: 'rep-isea-44-cruise', sourceType: 'Expedition Report' },
  },
  {
    stepNumber: 13,
    title: '13. Human Review Workflow',
    description: 'Transition status: Draft → AI Generated → Under Review → Approved → Published.',
    tab: 'studio',
    params: { sourceId: 'rep-isea-44-cruise', sourceType: 'Expedition Report' },
  },
  {
    stepNumber: 14,
    title: '14. Open Public Stories Portal',
    description: 'Switch to public-facing Stories to see newly disseminated outreach articles and social posts.',
    tab: 'stories',
  },
  {
    stepNumber: 15,
    title: '15. Full Archiving & Dissemination Complete',
    description: 'Demonstrates end-to-end Problem Statement 26063: Archiving + Knowledge + Outreach + Dissemination!',
    tab: 'dashboard',
  },
];

export const DemoFlowBanner: React.FC<DemoFlowBannerProps> = ({
  currentTab,
  onNavigate,
  onClose,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const step = OFFICIAL_DEMO_STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < OFFICIAL_DEMO_STEPS.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      const nextStep = OFFICIAL_DEMO_STEPS[nextIndex];
      onNavigate(nextStep.tab, nextStep.params);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      const prevStep = OFFICIAL_DEMO_STEPS[prevIndex];
      onNavigate(prevStep.tab, prevStep.params);
    }
  };

  const jumpToStep = (index: number) => {
    setCurrentStepIndex(index);
    const target = OFFICIAL_DEMO_STEPS[index];
    onNavigate(target.tab, target.params);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl bg-[#0c1220]/95 backdrop-blur-md border border-slate-700/80 rounded-lg p-4 shadow-2xl text-white">
      <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded border border-slate-700 bg-slate-900 text-sky-400 flex items-center justify-center">
            <Play className="w-2.5 h-2.5 fill-current" />
          </div>
          <span className="text-xs font-semibold font-mono text-slate-200 uppercase tracking-wider">
            Official PS 26063 Golden Demo Flow
          </span>
          <span className="text-xs text-slate-400 font-mono">
            (Step {step.stepNumber} of {OFFICIAL_DEMO_STEPS.length})
          </span>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 cursor-pointer transition-colors"
          title="Exit Tour"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Step description */}
      <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <span>{step.title}</span>
          </div>
          <div className="text-xs text-slate-300 mt-0.5 leading-relaxed">{step.description}</div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 disabled:opacity-30 text-slate-300 cursor-pointer transition-colors"
            title="Previous step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIndex === OFFICIAL_DEMO_STEPS.length - 1}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-sky-400 hover:bg-sky-300 disabled:opacity-30 text-slate-950 text-xs font-semibold cursor-pointer shadow transition-all"
          >
            <span>Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step Dots indicator */}
      <div className="flex items-center justify-between gap-1 pt-1 overflow-x-auto">
        {OFFICIAL_DEMO_STEPS.map((s, idx) => (
          <button
            key={s.stepNumber}
            onClick={() => jumpToStep(idx)}
            className={`h-1 flex-1 rounded-sm transition-all cursor-pointer ${
              idx === currentStepIndex
                ? 'bg-sky-400'
                : idx < currentStepIndex
                ? 'bg-sky-600/50'
                : 'bg-slate-800'
            }`}
            title={`Step ${s.stepNumber}: ${s.title}`}
          />
        ))}
      </div>
    </div>
  );
};
