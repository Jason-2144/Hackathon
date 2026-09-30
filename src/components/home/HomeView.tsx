import React, { useState } from 'react';
import { PolarRepository } from '../../lib/supabase';
import {
  Compass,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Layers,
  Thermometer,
  FileText,
  Database,
  Film,
  Globe2,
  BookOpen,
  Calendar,
  ExternalLink,
  ChevronRight,
  Play,
  Building,
  ShieldCheck,
  Share2,
  Users
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: any, params?: any) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const expeditions = PolarRepository.getExpeditions();
  const reports = PolarRepository.getExpeditionReports();
  const publications = PolarRepository.getResearch();
  const activities = PolarRepository.getActivities();
  const stories = PolarRepository.getStories();
  const outreach = PolarRepository.getOutreachItems();

  const [heroRegion, setHeroRegion] = useState<'Antarctica' | 'Arctic'>('Antarctica');

  const flagshipExpedition = expeditions[0];
  const featuredReport = reports[0];
  const featuredActivity = activities[0];

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Cinematic Hero Section with MoES Dignity & Architectural Pipeline */}
      <section className="relative min-h-[82vh] flex items-center justify-center overflow-hidden pt-6 pb-12 border-b border-slate-800/80 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.08)_0%,rgba(6,9,19,0)_70%)]">
        {/* Subtle coordinate graticule grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Hero Content & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* MoES Official Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                <Building className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-slate-400">MoES & NCPOR · Problem Statement 26063</span>
              </div>

              {/* Title & Product Positioning */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
                  POLARIS
                </h1>
                <p className="text-lg sm:text-2xl font-semibold text-slate-100 tracking-tight">
                  Polar Science Knowledge, Outreach & Dissemination Platform
                </p>
                <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
                  Archives national expedition reports, scientific datasets, publications, photographs, and institutional activities while automatically generating educational outreach and verified social media dissemination.
                </p>
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => onNavigate('expeditions')}
                  className="ds-btn-primary"
                >
                  <Compass className="w-4 h-4 text-slate-950" />
                  <span>Explore Expeditions</span>
                </button>

                <button
                  onClick={() => onNavigate('studio')}
                  className="ds-btn-secondary"
                >
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <span>AI Content Studio</span>
                </button>
              </div>

              {/* Official 6-Stage Core Product Flow: Precision Architectural Pipeline */}
              <div className="pt-6 border-t border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                    Core Operational Pipeline
                  </span>
                  <span className="text-[10px] font-mono text-sky-400">MoES Standard Workflow</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {[
                    { step: '01', label: 'Raw Science', sub: 'Reports & Data', active: false },
                    { step: '02', label: 'Repository', sub: 'Central Truth', active: true },
                    { step: '03', label: 'AI Studio', sub: 'Multi-Format Gen', active: false },
                    { step: '04', label: 'Media Assets', sub: 'Web & Social', active: false },
                    { step: '05', label: 'Human Review', sub: 'Audit & Approval', active: false },
                    { step: '06', label: 'Dissemination', sub: 'MoES Channels', active: false },
                  ].map((node) => (
                    <div
                      key={node.step}
                      className={`p-2.5 rounded border text-left transition-all ${
                        node.active
                          ? 'bg-slate-800/90 border-sky-500/50'
                          : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                        <span className={node.active ? 'text-sky-300 font-bold' : 'text-slate-500'}>
                          {node.step}
                        </span>
                        {node.active && <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />}
                      </div>
                      <div className={`text-xs font-semibold leading-tight ${node.active ? 'text-white' : 'text-slate-200'}`}>
                        {node.label}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
                        {node.sub}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Polar Stereographic Preview */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full aspect-square max-w-[390px] bg-[#090e1a] border border-slate-800 rounded-full p-4 shadow-xl flex items-center justify-center group overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.06)_0%,transparent_70%)]" />

                <svg viewBox="0 0 400 400" className="w-full h-full select-none">
                  <circle cx="200" cy="200" r="180" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="200" cy="200" r="130" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="200" cy="200" r="75" fill="none" stroke="#334155" strokeWidth="1" />

                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                    const rad = (deg * Math.PI) / 180;
                    return (
                      <line
                        key={deg}
                        x1="200"
                        y1="200"
                        x2={200 + 180 * Math.cos(rad)}
                        y2={200 + 180 * Math.sin(rad)}
                        stroke="#1a2436"
                        strokeWidth="0.8"
                      />
                    );
                  })}

                  {heroRegion === 'Antarctica' ? (
                    <g>
                      <path
                        d="M 190,80 C 250,90 310,130 330,190 C 345,240 310,300 260,320 C 210,340 150,320 120,280 C 95,240 95,190 115,145 C 135,110 160,80 190,80 Z"
                        fill="#0e172a"
                        stroke="#38bdf8"
                        strokeWidth="1.2"
                      />
                      <circle cx="200" cy="200" r="3" fill="#38bdf8" />
                      <text x="200" y="215" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">
                        South Pole (90°S)
                      </text>
                    </g>
                  ) : (
                    <g>
                      <path
                        d="M 180,260 C 200,230 220,195 210,170 C 195,145 165,160 155,190 C 145,225 160,265 180,260 Z"
                        fill="#0e172a"
                        stroke="#38bdf8"
                        strokeWidth="1.2"
                      />
                      <circle cx="200" cy="200" r="3" fill="#38bdf8" />
                      <text x="200" y="215" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">
                        North Pole (90°N)
                      </text>
                    </g>
                  )}

                  {/* Bharati Station Pin */}
                  <g
                    className="cursor-pointer"
                    onClick={() => onNavigate('expeditions', { expeditionId: 'exp-indian-antarctic-44' })}
                  >
                    <circle cx="270" cy="230" r="3.5" fill="#38bdf8" />
                    <circle cx="270" cy="230" r="7" fill="none" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />
                    <text x="270" y="219" fill="#e2e8f0" fontSize="8" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">
                      Bharati Station (MoES)
                    </text>
                  </g>

                  {/* Thwaites Glacier Pin */}
                  <g
                    className="cursor-pointer"
                    onClick={() => onNavigate('explore', { locationId: 'loc-thwaites' })}
                  >
                    <circle cx="150" cy="180" r="3.5" fill="#7dd3fc" />
                    <text x="150" y="169" fill="#cbd5e1" fontSize="8" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">
                      Thwaites Glacier
                    </text>
                  </g>
                </svg>

                <div className="absolute bottom-4 z-20 flex gap-1 p-1 bg-slate-900 border border-slate-800 rounded">
                  <button
                    onClick={() => setHeroRegion('Antarctica')}
                    className={`px-2.5 py-0.8 text-[11px] font-mono rounded cursor-pointer transition-colors ${
                      heroRegion === 'Antarctica'
                        ? 'bg-slate-800 text-white font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Antarctica 90°S
                  </button>
                  <button
                    onClick={() => setHeroRegion('Arctic')}
                    className={`px-2.5 py-0.8 text-[11px] font-mono rounded cursor-pointer transition-colors ${
                      heroRegion === 'Arctic'
                        ? 'bg-slate-800 text-white font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Arctic 90°N
                  </button>
                </div>
              </div>

              <div className="mt-2.5 text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Polar Stereographic Projection (EPSG:3031 / EPSG:3413)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key MoES Archiving & Dissemination Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-800 border border-slate-800 rounded-lg overflow-hidden">
          <div className="p-5 bg-[#0a0f1d] space-y-1">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              Antarctic Expeditions
            </div>
            <div className="text-3xl font-bold font-mono text-white tracking-tight">
              44 <span className="text-xs font-sans font-normal text-slate-400">Expeditions</span>
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 pt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>MoES continuous record since 1981</span>
            </div>
          </div>

          <div className="p-5 bg-[#0a0f1d] space-y-1">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              Archived Reports & Papers
            </div>
            <div className="text-3xl font-bold font-mono text-white tracking-tight">
              {reports.length + publications.length}+ <span className="text-xs font-sans font-normal text-slate-400">Records</span>
            </div>
            <div className="text-[11px] text-slate-400 pt-0.5">
              Linked to sensor datasets & media
            </div>
          </div>

          <div className="p-5 bg-[#0a0f1d] space-y-1">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              Smart Education Outreach
            </div>
            <div className="text-3xl font-bold font-mono text-white tracking-tight">
              15,400+ <span className="text-xs font-sans font-normal text-slate-400">Students</span>
            </div>
            <div className="text-[11px] text-slate-400 pt-0.5">
              Direct educational dissemination
            </div>
          </div>

          <div className="p-5 bg-[#0a0f1d] space-y-1">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              Dissemination Formats
            </div>
            <div className="text-3xl font-bold font-mono text-sky-400 tracking-tight">
              9 <span className="text-xs font-sans font-normal text-slate-400">Channels</span>
            </div>
            <div className="text-[11px] text-slate-400 pt-0.5">
              Web, Social, Press, Video & School Kits
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Expedition Spotlight: Indian Antarctic Expedition 44 */}
      {flagshipExpedition && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-end justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-0.5">
                Archived National Campaign
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Featured Expedition: {flagshipExpedition.name}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('expeditions', { expeditionId: flagshipExpedition.id })}
              className="text-xs font-medium text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Dossier & Assets</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-[#0b101d] border border-slate-800 rounded-lg p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <span className="ds-badge ds-badge-neutral">{flagshipExpedition.region}</span>
                <span>{flagshipExpedition.institution}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Vessel: {flagshipExpedition.vesselOrTeam}</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {flagshipExpedition.objective}
              </p>
              <div className="p-3.5 bg-slate-900/90 border-l-2 border-sky-400 rounded-r text-xs space-y-1">
                <span className="font-semibold text-slate-200">Empirical Findings:</span>
                <p className="text-slate-400">{flagshipExpedition.findingsSummary}</p>
              </div>

              {/* Action: Open in Content Studio */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() =>
                    onNavigate('studio', {
                      sourceId: featuredReport.id,
                      sourceType: 'Expedition Report',
                    })
                  }
                  className="ds-btn-primary"
                >
                  <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                  <span>Generate Outreach from Report</span>
                </button>
                <button
                  onClick={() => onNavigate('expeditions', { expeditionId: flagshipExpedition.id })}
                  className="ds-btn-secondary"
                >
                  Inspect Reports & Datasets
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-video rounded overflow-hidden bg-slate-950 border border-slate-800 shadow">
              <img
                src={flagshipExpedition.thumbnailUrl}
                alt={flagshipExpedition.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-2.5 left-3 right-3 text-[11px] text-slate-300 font-mono flex items-center justify-between">
                <span>Bharati Station · 69°24′S 76°11′E</span>
                <span className="text-sky-400 font-medium">MoES / NCPOR</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Content Studio Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0b101d] border border-slate-800 rounded-lg p-6 sm:p-8 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="ds-badge ds-badge-accent">
                <Sparkles className="w-3 h-3 text-sky-400" />
                <span>AI Dissemination Engine</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                POLARIS Content Studio
              </h2>

              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                Empower researchers, communication officers, and educators to select verified polar science reports and produce synchronized website articles, Instagram posts, LinkedIn briefings, and YouTube video scripts in minutes.
              </p>

              <div className="pt-1 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('studio')}
                  className="ds-btn-primary"
                >
                  <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                  <span>Launch Content Studio</span>
                </button>
                <button
                  onClick={() => onNavigate('stories')}
                  className="ds-btn-secondary"
                >
                  View Disseminated Stories
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-2">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded text-xs space-y-0.5">
                <span className="font-semibold text-slate-200 block">Strict Source Traceability</span>
                <span className="text-slate-400">Every public article cites primary report ID and DOI</span>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded text-xs space-y-0.5">
                <span className="font-semibold text-slate-200 block">Human Review Workflow</span>
                <span className="text-slate-400">Draft → Under Review → Approved → Published</span>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded text-xs space-y-0.5">
                <span className="font-semibold text-slate-200 block">Smart Education Integration</span>
                <span className="text-slate-400">Generates classroom analogies and school kits</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Institutional Activities & Announcements */}
      {featuredActivity && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-end justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-0.5">
                National Polar Timeline
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Latest Institutional Activities
              </h2>
            </div>
            <button
              onClick={() => onNavigate('activities')}
              className="text-xs font-medium text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Activities Feed</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-5 bg-[#0b101d] border border-slate-800 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="ds-badge ds-badge-neutral font-semibold">
                  {featuredActivity.type}
                </span>
                <span>{featuredActivity.date}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>{featuredActivity.location}</span>
              </div>
              <h3 className="text-base font-bold text-white">{featuredActivity.title}</h3>
              <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">{featuredActivity.summary}</p>
            </div>

            <button
              onClick={() => onNavigate('activities')}
              className="ds-btn-secondary shrink-0 text-xs py-1.5 px-3"
            >
              Read Details →
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
