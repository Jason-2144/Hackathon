import React, { useState } from 'react';
import { PolarRepository } from '../../lib/supabase';
import { ScienceStory, GeneratedOutreachItem } from '../../types/polar';
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Compass,
  FileText,
  Database
} from 'lucide-react';

interface PublicStoriesViewProps {
  onNavigate: (tab: any, params?: any) => void;
}

export const PublicStoriesView: React.FC<PublicStoriesViewProps> = ({ onNavigate }) => {
  const stories = PolarRepository.getStories();
  const outreachItems = PolarRepository.getOutreachItems().filter(
    (item) => item.reviewStatus === 'published' || item.reviewStatus === 'approved'
  );

  const [activeStory, setActiveStory] = useState<ScienceStory>(stories[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header */}
      <div className="border-b border-slate-300 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#003366]">
            Smart Education & Public Outreach · Ministry of Earth Sciences (MoES)
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#002244] tracking-tight mt-1">
            Public Stories & Outreach Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Public narratives, classroom-ready science breakdowns, and educational media translating complex polar research for students, teachers, and science communicators.
          </p>
        </div>

        <button
          onClick={() => onNavigate('studio')}
          className="ds-btn-primary self-start md:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Open Content Studio</span>
        </button>
      </div>

      {/* 2. Featured Public Story (Nature / Editorial Magazine Style) */}
      {activeStory && (
        <div className="border border-slate-300 bg-white p-6 sm:p-8 space-y-5">
          <div className="border-b border-slate-200 pb-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-600">
            <div>
              <span className="ds-badge ds-badge-neutral font-semibold">FEATURED OUTREACH STORY</span>
              <span className="mx-2">·</span>
              <span>Target: {activeStory.targetAudience}</span>
              <span className="mx-2">·</span>
              <span>Level: {activeStory.readingLevel}</span>
            </div>
            <div>
              Published: {activeStory.createdDate} · By {activeStory.author}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#002244] leading-tight">
              {activeStory.title}
            </h2>
            <div className="text-xs text-slate-600 font-mono italic">
              Key Metaphor: "{activeStory.keyMetaphor}"
            </div>
          </div>

          {/* Editorial Article Body */}
          <div className="space-y-4 text-slate-800 text-sm sm:text-base leading-relaxed font-serif border-t border-b border-slate-200 py-4">
            {activeStory.publicStory.split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Smart Education Classroom Callout */}
          <div className="p-4 bg-slate-50 border-l-4 border-[#003366] border-t border-r border-b border-slate-200 space-y-1.5 text-xs">
            <div className="flex items-center gap-2 font-bold font-mono text-[#003366] uppercase tracking-wider text-[11px]">
              <GraduationCap className="w-4 h-4" />
              <span>Smart Education / Classroom Science Explanation:</span>
            </div>
            <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
              {activeStory.studentExplanation}
            </p>
          </div>

          {/* Traceability & Source Reference */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-600">
            <div>
              Primary Research Citation: <span className="font-semibold text-slate-800">{activeStory.originalScientificHeadline}</span>
            </div>
            <button
              onClick={() => onNavigate('repository')}
              className="text-[#004c99] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Verify in Repository</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Disseminated Content Stream */}
      <div className="space-y-4">
        <div className="border-b border-slate-300 pb-2 flex items-center justify-between">
          <h2 className="text-sm font-bold font-serif uppercase tracking-wide text-[#002244]">
            Disseminated Outreach Articles & Social Media Feeds ({outreachItems.length})
          </h2>
          <button
            onClick={() => onNavigate('studio')}
            className="text-xs font-semibold text-[#004c99] hover:underline"
          >
            Create New Outreach →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {outreachItems.map((item) => (
            <div
              key={item.id}
              className="border border-slate-300 bg-white p-4 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 border-b border-slate-100 pb-1.5">
                  <span className="ds-badge ds-badge-neutral">{item.formatLabel}</span>
                  <span>{item.publishedAt || item.createdAt}</span>
                </div>

                <h3 className="text-sm font-bold font-serif text-[#002244] leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {item.content}
                </p>

                <div className="text-[10px] font-mono text-slate-500 pt-1">
                  Source: {item.sourceTitle.slice(0, 36)}...
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 text-[11px]">
                  Channels: {item.publishedChannels.length || 1}
                </span>
                <button
                  onClick={() => onNavigate('studio', { prefillSourceId: item.sourceId })}
                  className="text-xs font-semibold text-[#004c99] hover:underline cursor-pointer"
                >
                  Inspect in Studio →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
