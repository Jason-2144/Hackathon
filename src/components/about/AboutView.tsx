import React from 'react';
import {
  Compass,
  Globe2,
  BookOpen,
  Sparkles,
  LineChart,
  Users,
  Shield,
  ExternalLink,
  Code2,
  Database
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (tab: any, params?: any) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Mission */}
      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-mono tracking-widest uppercase mb-1">
          <Compass className="w-3.5 h-3.5 text-sky-400" />
          <span>Problem Statement 26063 · Ministry of Earth Sciences (MoES)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
          Explore. Understand. Discover the Poles.
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          POLARIS is an institutional knowledge and outreach portal engineered to archive expedition reports, scientific datasets, peer-reviewed publications, photographs, videos, and institutional activities while generating content for websites and social media.
        </p>
      </div>

      {/* The 5-Stage Transformation Philosophy Graphic */}
      <div className="bg-[#0b101d] border border-slate-800 rounded-lg p-5 sm:p-6 space-y-4 shadow">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-300">
            The Official MoES Dissemination Architecture
          </h2>
          <span className="text-[11px] font-mono text-slate-500">End-to-End Pipeline</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="p-3.5 rounded bg-slate-900 border border-slate-800 space-y-1.5">
            <BookOpen className="w-4 h-4 text-sky-400" />
            <div className="text-xs font-bold text-white">1. Scientific Content</div>
            <div className="text-[11px] text-slate-400 leading-normal">Peer-reviewed publications, reports & CTD transects</div>
          </div>

          <div className="p-3.5 rounded bg-slate-900 border border-slate-800 space-y-1.5">
            <Database className="w-4 h-4 text-slate-300" />
            <div className="text-xs font-bold text-white">2. Central Repository</div>
            <div className="text-[11px] text-slate-400 leading-normal">Relational archive connecting expeditions, media & data</div>
          </div>

          <div className="p-3.5 rounded bg-slate-900 border border-slate-800 space-y-1.5">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <div className="text-xs font-bold text-white">3. AI Content Studio</div>
            <div className="text-[11px] text-slate-400 leading-normal">Multi-format synthesis: Articles, X threads, scripts</div>
          </div>

          <div className="p-3.5 rounded bg-slate-900 border border-slate-800 space-y-1.5">
            <LineChart className="w-4 h-4 text-slate-300" />
            <div className="text-xs font-bold text-white">4. Human Review</div>
            <div className="text-[11px] text-slate-400 leading-normal">Rigorous scientific verification & editorial approval</div>
          </div>

          <div className="p-3.5 rounded bg-slate-900 border border-slate-800 space-y-1.5">
            <Users className="w-4 h-4 text-sky-400" />
            <div className="text-xs font-bold text-white">5. Dissemination</div>
            <div className="text-[11px] text-slate-400 leading-normal">Press releases, websites, social feeds & Smart Education</div>
          </div>
        </div>
      </div>

      {/* The Antarctic Treaty & Arctic Governance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <div className="p-5 sm:p-6 bg-[#0b101d] border border-slate-800 rounded-lg space-y-3 flex flex-col justify-between shadow">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-mono uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-sky-400" />
              <span>Antarctic Treaty System (1959)</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              A Continent Dedicated Exclusively to Peace & Science
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Signed in Washington in 1959, the Antarctic Treaty entered into force in 1961. It designates Antarctica south of 60°S as a scientific preserve, guarantees freedom of scientific investigation, bans military activity and weapons testing, and requires all scientific observations and results to be exchanged and freely available.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400">
            Consultative Parties: 56 Sovereign Nations
          </div>
        </div>

        <div className="p-5 sm:p-6 bg-[#0b101d] border border-slate-800 rounded-lg space-y-3 flex flex-col justify-between shadow">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-mono uppercase tracking-wider">
              <Globe2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Open Data Transparency</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Zero Hallucination · Pure Empirical Evidence
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every data point in POLARIS is grounded in verified polar research institutes: National Centre for Polar and Ocean Research (NCPOR, India), Ministry of Earth Sciences (MoES), British Antarctic Survey (BAS), Alfred Wegener Institute (AWI), and National Snow and Ice Data Center (NSIDC).
            </p>
          </div>
          <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400">
            Open Access / Creative Commons Attribution 4.0
          </div>
        </div>
      </div>

      {/* Developer & Architecture Specifications */}
      <div className="p-5 sm:p-6 bg-[#0b101d] border border-slate-800 rounded-lg space-y-3 shadow">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-mono uppercase tracking-wider">
          <Code2 className="w-3.5 h-3.5 text-sky-400" />
          <span>Technical Architecture & Integrations</span>
        </div>
        <h3 className="text-base font-bold text-white">Production-Ready Full-Stack System</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-1">
            <span className="font-semibold text-white block">Supabase PostgreSQL</span>
            <p className="text-slate-400 text-[11px]">
              Full relational schema with RLS policies, foreign keys, and tsvector full-text search indexing in <code className="text-sky-300">supabase/schema.sql</code>.
            </p>
          </div>

          <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-1">
            <span className="font-semibold text-white block">Gemini Flash AI Engine</span>
            <p className="text-slate-400 text-[11px]">
              Connected to server-side Gemini 2.5 Flash via <code className="text-sky-300">@google/genai</code> with structured JSON output and rigorous citation fallback.
            </p>
          </div>

          <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-1">
            <span className="font-semibold text-white block">Polar Cartography</span>
            <p className="text-slate-400 text-[11px]">
              EPSG:3031 and EPSG:3413 polar projection cartography preventing high-latitude Mercator distortion with live coordinates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
