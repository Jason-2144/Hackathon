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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header */}
      <div className="border-b border-slate-300 pb-4">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#003366]">
          Institutional Mandate · Ministry of Earth Sciences (MoES)
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#002244] tracking-tight mt-1">
          About POLARIS
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          The national polar research repository established under Problem Statement 26063 to archive expedition reports, datasets, publications, and institutional activities while generating content for websites and social media.
        </p>
      </div>

      {/* 2. Dissemination Pipeline Architecture */}
      <div className="border border-slate-300 bg-white p-5 space-y-4">
        <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-[#002244]">
            Official Operational Dissemination Architecture
          </h2>
          <span className="text-[11px] font-mono text-slate-500">End-to-End Pipeline</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="p-3 bg-slate-50 border border-slate-300 space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#003366] block">STAGE 01</span>
            <div className="text-xs font-bold text-slate-900">Scientific Content</div>
            <p className="text-[11px] text-slate-600 leading-normal">Peer-reviewed publications, cruise logs, and CTD transects.</p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-300 space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#003366] block">STAGE 02</span>
            <div className="text-xs font-bold text-slate-900">Central Repository</div>
            <p className="text-[11px] text-slate-600 leading-normal">Relational cataloguing connecting expeditions to data.</p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-300 space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#003366] block">STAGE 03</span>
            <div className="text-xs font-bold text-slate-900">AI Content Studio</div>
            <p className="text-[11px] text-slate-600 leading-normal">Multi-format synthesis: Articles, X threads, scripts.</p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-300 space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#003366] block">STAGE 04</span>
            <div className="text-xs font-bold text-slate-900">Human Review</div>
            <p className="text-[11px] text-slate-600 leading-normal">Scientific integrity audit & institutional sign-off.</p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-300 space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#003366] block">STAGE 05</span>
            <div className="text-xs font-bold text-slate-900">Dissemination</div>
            <p className="text-[11px] text-slate-600 leading-normal">Websites, social feeds & Smart Education curriculum.</p>
          </div>
        </div>
      </div>

      {/* 3. Treaty System & Open Science Policy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <div className="border border-slate-300 bg-white p-5 space-y-2.5 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#003366] text-xs font-mono font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5" />
              <span>Antarctic Treaty System (1959)</span>
            </div>
            <h3 className="text-base font-bold font-serif text-[#002244]">
              Continent Dedicated Exclusively to Peace & Science
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Designates Antarctica south of 60°S as a scientific preserve, guarantees freedom of scientific investigation, and mandates that scientific observations and results be exchanged and freely available across 56 consultative nations.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-200 text-[11px] font-mono text-slate-500">
            Indian Antarctic Act (2022) Statutory Compliance
          </div>
        </div>

        <div className="border border-slate-300 bg-white p-5 space-y-2.5 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-mono font-bold uppercase tracking-wider">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Open Science & Verification</span>
            </div>
            <h3 className="text-base font-bold font-serif text-[#002244]">
              Empirical Ground Truth · No Fabricated Telemetry
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every data record and report in POLARIS is grounded in verified institutions: National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences, British Antarctic Survey, and the National Snow and Ice Data Center.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-200 text-[11px] font-mono text-slate-500">
            Creative Commons Attribution 4.0 International
          </div>
        </div>
      </div>

      {/* 4. Technical Architecture Specifications */}
      <div className="border border-slate-300 bg-white p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
          <Code2 className="w-3.5 h-3.5 text-[#003366]" />
          <span>Technical Architecture Specifications</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
          <div className="p-3 bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Supabase PostgreSQL</span>
            <p className="text-slate-600 text-[11px]">
              Full relational schema with RLS security policies, foreign keys, and tsvector full-text search indexing in <code className="text-[#004c99]">supabase/schema.sql</code>.
            </p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Gemini Flash AI Engine</span>
            <p className="text-slate-600 text-[11px]">
              Connectable to server-side Gemini 2.5 Flash via <code className="text-[#004c99]">@google/genai</code> with structured JSON output and strict citation fallback.
            </p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Polar Stereographic Projection</span>
            <p className="text-slate-600 text-[11px]">
              EPSG:3031 and EPSG:3413 vector cartography preventing high-latitude Mercator distortion with real coordinates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
