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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero Mission */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>PS 26063 Polar Science Outreach & Public Knowledge Portal</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Explore. Understand. Discover the Poles.
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          POLARIS is an open digital intelligence bridge engineered to translate dense glaciological papers, multi-terabyte satellite radar datasets, and isolated polar expeditions into captivating public stories, interactive cartography, and accessible AI answers.
        </p>
      </div>

      {/* The 5-Stage Transformation Philosophy Graphic */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
        <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-400 text-center">
          The POLARIS Knowledge Pipeline
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <BookOpen className="w-6 h-6 text-cyan-400 mx-auto" />
            <div className="text-xs font-bold text-white uppercase">1. Scientific Knowledge</div>
            <div className="text-[11px] text-slate-400">Peer-reviewed glaciology & ocean dynamics papers</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <Database className="w-6 h-6 text-emerald-400 mx-auto" />
            <div className="text-xs font-bold text-white uppercase">2. Raw Telemetry Data</div>
            <div className="text-[11px] text-slate-400">Sentinel InSAR velocity, GRACE gravity & passive microwave</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <Sparkles className="w-6 h-6 text-purple-400 mx-auto" />
            <div className="text-xs font-bold text-white uppercase">3. Polar AI Synthesis</div>
            <div className="text-[11px] text-slate-400">De-jargonization with rigorous academic source citation</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <LineChart className="w-6 h-6 text-amber-400 mx-auto" />
            <div className="text-xs font-bold text-white uppercase">4. Interactive Visuals</div>
            <div className="text-[11px] text-slate-400">Polar stereographic cartography & anomaly curves</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <Users className="w-6 h-6 text-sky-400 mx-auto" />
            <div className="text-xs font-bold text-white uppercase">5. Public Understanding</div>
            <div className="text-[11px] text-slate-400">Student analogies, media documentaries & social outreach</div>
          </div>
        </div>
      </div>

      {/* The Antarctic Treaty & Arctic Governance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div className="p-6 sm:p-8 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              <span>Antarctic Treaty System (1959)</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              A Continent Dedicated Exclusively to Peace & Science
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Signed in Washington in 1959, the Antarctic Treaty entered into force in 1961. It designates Antarctica south of 60°S as a scientific preserve, guarantees freedom of scientific investigation, bans military activity and weapons testing, and requires all scientific observations and results to be exchanged and freely available.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-800/80 text-[11px] font-mono text-cyan-400">
            Current Consultative Parties: 56 Sovereign Nations
          </div>
        </div>

        <div className="p-6 sm:p-8 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider">
              <Globe2 className="w-4 h-4" />
              <span>Open Data Transparency</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              No Fabricated Metrics · Pure Empirical Evidence
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every data point in POLARIS is grounded in verified polar research institutes: National Centre for Polar and Ocean Research (NCPOR, India), British Antarctic Survey (BAS), Alfred Wegener Institute (AWI), National Snow and Ice Data Center (NSIDC), and NASA Jet Propulsion Laboratory.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-800/80 text-[11px] font-mono text-emerald-400">
            Open Access / Creative Commons Attribution 4.0
          </div>
        </div>
      </div>

      {/* Developer & Architecture Specifications */}
      <div className="p-6 sm:p-8 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider">
          <Code2 className="w-4 h-4" />
          <span>Technical Architecture & Integrations</span>
        </div>
        <h3 className="text-xl font-bold text-white">Production-Ready Full-Stack System</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
            <span className="font-semibold text-white block">Supabase PostgreSQL</span>
            <p className="text-slate-400 text-[11px]">
              Full relational schema with RLS policies, foreign keys, and tsvector full-text search indexing in <code className="text-cyan-400">supabase/schema.sql</code>.
            </p>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
            <span className="font-semibold text-white block">Gemini Flash AI Engine</span>
            <p className="text-slate-400 text-[11px]">
              Connectable to server-side Gemini 2.5 Flash via <code className="text-cyan-400">@google/genai</code> with structured JSON output and rigorous citation fallback.
            </p>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
            <span className="font-semibold text-white block">Polar Stereographic Projection</span>
            <p className="text-slate-400 text-[11px]">
              EPSG:3031 and EPSG:3413 vector cartography preventing high-latitude Mercator distortion with live coordinates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
