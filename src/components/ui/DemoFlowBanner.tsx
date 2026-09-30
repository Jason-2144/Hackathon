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
  ArrowRight
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

export const DEMO_STEPS: DemoStep[] = [
  {
    stepNumber: 1,
    title: 'Home & Global Polar Overview',
    description: 'Start at cinematic landing page with polar statistics & interactive projection preview.',
    tab: 'home',
  },
  {
    stepNumber: 2,
    title: 'Explore Antarctica Cartography',
    description: 'Switch to Polar Stereographic map to explore research stations, ice streams & wildlife.',
    tab: 'explore',
    params: { locationId: 'loc-thwaites' },
  },
  {
    stepNumber: 3,
    title: 'Thwaites Glacier Inspection',
    description: 'Inspect grounding line retreat (+14.4 km), ice velocity (3,200 m/yr) & key empirical findings.',
    tab: 'explore',
    params: { locationId: 'loc-thwaites' },
  },
  {
    stepNumber: 4,
    title: 'View InSAR Velocity & Mass Balance Data',
    description: 'Visualize multi-decadal sea ice anomalies, glacier retreat curves & Arctic amplification.',
    tab: 'visualizations',
    params: { locationId: 'loc-thwaites' },
  },
  {
    stepNumber: 5,
    title: 'Ask Polar AI with Source Citations',
    description: 'Ask deep questions with structured explanations, empirical facts, and verified citations.',
    tab: 'ai',
    params: { query: 'Tell me about Thwaites Glacier.' },
  },
  {
    stepNumber: 6,
    title: 'Turn Science Into a Story',
    description: 'De-jargonize Thwaites research into student analogies, public narratives & social kits.',
    tab: 'story-studio',
    params: { researchId: 'res-thwaites-grounding' },
  },
  {
    stepNumber: 7,
    title: 'Media & Documentary Discovery',
    description: 'Watch Icefin submersible footage, station life documentaries & high-res field photography.',
    tab: 'media',
  },
  {
    stepNumber: 8,
    title: 'Contributor Studio & Open Data',
    description: 'Test adding new research papers, datasets & locations to the Supabase architecture.',
    tab: 'contributor',
  },
];

export const DemoFlowBanner: React.FC<DemoFlowBannerProps> = ({
  currentTab,
  onNavigate,
  onClose,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const step = DEMO_STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < DEMO_STEPS.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      const nextStep = DEMO_STEPS[nextIndex];
      onNavigate(nextStep.tab, nextStep.params);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      const prevStep = DEMO_STEPS[prevIndex];
      onNavigate(prevStep.tab, prevStep.params);
    }
  };

  const jumpToStep = (index: number) => {
    setCurrentStepIndex(index);
    const target = DEMO_STEPS[index];
    onNavigate(target.tab, target.params);
  };

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl bg-[#090f1e]/95 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-4 shadow-[0_10px_35px_rgba(0,0,0,0.8)] text-white">
      <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Play className="w-3 h-3 fill-current" />
          </div>
          <span className="text-xs font-bold font-mono text-cyan-300 uppercase tracking-wider">
            Hackathon Golden Demo Tour
          </span>
          <span className="text-xs text-slate-400 font-mono">
            (Step {step.stepNumber} of {DEMO_STEPS.length})
          </span>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 cursor-pointer"
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
          <div className="text-xs text-slate-300 mt-0.5">{step.description}</div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 cursor-pointer"
            title="Previous step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIndex === DEMO_STEPS.length - 1}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 text-white text-xs font-semibold cursor-pointer shadow-md"
          >
            <span>Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step Dots indicator */}
      <div className="flex items-center justify-between gap-1 pt-1 overflow-x-auto">
        {DEMO_STEPS.map((s, idx) => (
          <button
            key={s.stepNumber}
            onClick={() => jumpToStep(idx)}
            className={`h-1.5 flex-1 rounded-full transition-all cursor-pointer ${
              idx === currentStepIndex
                ? 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                : idx < currentStepIndex
                ? 'bg-cyan-700/60'
                : 'bg-slate-800'
            }`}
            title={`Step ${s.stepNumber}: ${s.title}`}
          />
        ))}
      </div>
    </div>
  );
};
