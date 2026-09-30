import React, { useState } from 'react';
import { PolarRepository } from '../../lib/supabase';
import { ScienceStory, GeneratedOutreachItem } from '../../types/polar';
import {
  BookOpen,
  Share2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Building,
  Compass,
  Film,
  Database,
  Layers,
  ChevronRight
} from 'lucide-react';

interface PublicStoriesViewProps {
  onNavigate: (tab: any, params?: any) => void;
}

export const PublicStoriesView: React.FC<PublicStoriesViewProps> = ({ onNavigate }) => {
  const stories = PolarRepository.getStories();
  const outreachItems = PolarRepository.getOutreachItems().filter(
    (item) => item.reviewStatus === 'published' || item.reviewStatus === 'approved'
  );
  const expeditions = PolarRepository.getExpeditions();
  const media = PolarRepository.getMedia();

  const [activeStory, setActiveStory] = useState<ScienceStory>(stories[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2 border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono tracking-widest uppercase mb-1">
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            <span>Smart Education & Public Science Dissemination</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Public Stories & Outreach Portal
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            Discover how complex polar discoveries become engaging public narratives, classroom-ready science explanations, and educational video stories.
          </p>
        </div>

        <button
          onClick={() => onNavigate('studio')}
          className="ds-btn-primary text-xs py-1.5 px-3 self-start md:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-slate-950" />
          <span>Open Content Studio</span>
        </button>
      </div>

      {/* Quick Access CTAs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button
          onClick={() => onNavigate('repository')}
          className="p-3.5 rounded-lg bg-[#0b101d] hover:bg-[#0e1526] border border-slate-800 hover:border-slate-700 transition-all cursor-pointer text-left space-y-1 group"
        >
          <div className="text-xs font-semibold text-white group-hover:text-sky-200">Explore Research</div>
          <div className="text-[11px] text-slate-400 font-mono">Papers & Reports</div>
        </button>

        <button
          onClick={() => onNavigate('expeditions')}
          className="p-3.5 rounded-lg bg-[#0b101d] hover:bg-[#0e1526] border border-slate-800 hover:border-slate-700 transition-all cursor-pointer text-left space-y-1 group"
        >
          <div className="text-xs font-semibold text-white group-hover:text-sky-200">Explore Expeditions</div>
          <div className="text-[11px] text-slate-400 font-mono">Field Campaigns</div>
        </button>

        <button
          onClick={() => onNavigate('media')}
          className="p-3.5 rounded-lg bg-[#0b101d] hover:bg-[#0e1526] border border-slate-800 hover:border-slate-700 transition-all cursor-pointer text-left space-y-1 group"
        >
          <div className="text-xs font-semibold text-white group-hover:text-sky-200">Watch Videos</div>
          <div className="text-[11px] text-slate-400 font-mono">Footage & Media</div>
        </button>

        <button
          onClick={() => onNavigate('explore')}
          className="p-3.5 rounded-lg bg-[#0b101d] hover:bg-[#0e1526] border border-slate-800 hover:border-slate-700 transition-all cursor-pointer text-left space-y-1 group"
        >
          <div className="text-xs font-semibold text-white group-hover:text-sky-200">Explore Polar Map</div>
          <div className="text-[11px] text-slate-400 font-mono">Stations & Ice Rates</div>
        </button>

        <button
          onClick={() => onNavigate('ai')}
          className="p-3.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-700/80 hover:border-slate-600 transition-all cursor-pointer text-left space-y-1 group col-span-2 sm:col-span-1"
        >
          <div className="text-xs font-semibold text-sky-300 group-hover:text-sky-200">Ask Polar AI</div>
          <div className="text-[11px] text-slate-400 font-mono">Instant Science Answers</div>
        </button>
      </div>

      {/* Featured Public Story Banner */}
      {activeStory && (
        <div className="bg-[#0b101d] border border-slate-800 rounded-lg p-5 sm:p-7 space-y-5 shadow">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
              <span className="ds-badge ds-badge-neutral">
                Featured Outreach Story
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Audience: {activeStory.targetAudience}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Level: {activeStory.readingLevel}</span>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Published: {activeStory.createdDate} · By {activeStory.author}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              {activeStory.title}
            </h2>
            <div className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
              <span className="text-slate-300 font-medium">Metaphor:</span>
              <span className="italic text-slate-300">"{activeStory.keyMetaphor}"</span>
            </div>
          </div>

          {/* Public Story Body */}
          <div className="bg-slate-900/90 p-5 rounded border border-slate-800 space-y-3.5 text-slate-200 text-xs sm:text-sm leading-relaxed">
            {activeStory.publicStory.split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Student Explanation Callout */}
          <div className="p-4 rounded bg-slate-900 border-l-2 border-emerald-400 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold font-mono text-emerald-400 uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>Smart Education / Classroom Explanation:</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeStory.studentExplanation}
            </p>
          </div>

          {/* Source Traceability Footer */}
          <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="font-mono text-slate-400 text-[11px]">
              Scientific Basis: <span className="text-slate-200">{activeStory.originalScientificHeadline}</span>
            </div>
            <button
              onClick={() => onNavigate('repository')}
              className="text-sky-400 hover:underline flex items-center gap-1 cursor-pointer font-mono text-[11px]"
            >
              <span>Verify in Repository</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Published Content from Content Studio */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              Dissemination Stream
            </div>
            <h3 className="text-lg font-bold text-white">
              Recently Disseminated Outreach Articles & Social Kits
            </h3>
          </div>
          <button
            onClick={() => onNavigate('studio')}
            className="text-xs text-sky-400 hover:underline cursor-pointer font-mono"
          >
            Open Content Studio →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {outreachItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#0b101d] hover:bg-[#0e1526] border border-slate-800 hover:border-slate-700 rounded-lg p-5 transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2 text-xs font-mono">
                  <span className="ds-badge ds-badge-neutral text-[10px]">
                    {item.formatLabel}
                  </span>
                  <span className="text-slate-500 text-[11px]">{item.publishedAt || item.createdAt}</span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-white hover:text-sky-200 transition-colors leading-snug">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {item.content}
                </p>

                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono">
                  Source: <span className="text-slate-200">{item.sourceTitle.slice(0, 35)}...</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 text-[11px]">
                  Channels: {item.publishedChannels.length || 1}
                </span>
                <button
                  onClick={() => onNavigate('studio', { prefillSourceId: item.sourceId })}
                  className="text-sky-400 hover:underline font-medium cursor-pointer text-[11px]"
                >
                  View in Studio →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
