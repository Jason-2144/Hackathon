import React, { useState } from 'react';
import { PolarRepository } from '../../lib/supabase';
import { PolarLocation } from '../../types/polar';
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
  Play
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: any, params?: any) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const locations = PolarRepository.getLocations();
  const research = PolarRepository.getResearch();
  const expeditions = PolarRepository.getExpeditions();
  const stories = PolarRepository.getStories();
  const media = PolarRepository.getMedia();

  const [heroRegion, setHeroRegion] = useState<'Antarctica' | 'Arctic'>('Antarctica');

  const featuredResearch = research.slice(0, 3);
  const featuredExpeditions = expeditions.slice(0, 2);
  const heroStory = stories[0];

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Cinematic Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-8 pb-16 border-b border-slate-900 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.12)_0%,rgba(6,10,18,0)_70%)]">
        {/* Subtle Background Polar Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c192c10_1px,transparent_1px),linear-gradient(to_bottom,#0c192c10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Hero Typography & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Domain Kicker */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                <span>PS 26063 · Polar Science Outreach & Public Knowledge Portal</span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
                  POLARIS
                </h1>
                <p className="text-xl sm:text-2xl font-semibold text-cyan-300">
                  Polar Science Intelligence & Media Portal
                </p>
                <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed pt-1">
                  "Explore the world's polar regions through science, data and stories."
                </p>
              </div>

              {/* Primary Hero Buttons per Problem Statement */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('explore')}
                  className="px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer flex items-center gap-2 group"
                >
                  <Compass className="w-4 h-4 text-cyan-200 group-hover:rotate-45 transition-transform" />
                  <span>Explore Polar Regions</span>
                </button>

                <button
                  onClick={() => onNavigate('ai')}
                  className="px-6 py-3.5 text-sm font-bold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400/50 rounded-xl transition-all cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Ask Polar AI</span>
                </button>
              </div>

              {/* Quick Science Outreach Philosophy Strip */}
              <div className="pt-6 border-t border-slate-800/80 flex items-center gap-3 text-xs text-slate-400 font-mono">
                <span className="text-cyan-400">Knowledge</span>
                <span>→</span>
                <span className="text-emerald-400">Data</span>
                <span>→</span>
                <span className="text-purple-400">AI</span>
                <span>→</span>
                <span className="text-amber-400">Visuals</span>
                <span>→</span>
                <span className="text-white">Public Understanding</span>
              </div>
            </div>

            {/* Right Column: Interactive Polar Globe / Stereographic Visualization */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full aspect-square max-w-[420px] bg-[#070e1e] border border-cyan-500/30 rounded-full p-4 shadow-[0_0_50px_rgba(6,182,212,0.15)] flex items-center justify-center group overflow-hidden">
                {/* Radial ambient glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_70%)] animate-pulse-glow" />

                {/* Animated SVG Concentric Orbits & Polar Projections */}
                <svg viewBox="0 0 400 400" className="w-full h-full select-none">
                  {/* Concentric rings */}
                  <circle cx="200" cy="200" r="180" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="200" cy="200" r="130" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="200" cy="200" r="75" fill="none" stroke="#334155" strokeWidth="1.2" />

                  {/* Meridian radial spokes */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                    const rad = (deg * Math.PI) / 180;
                    return (
                      <line
                        key={deg}
                        x1="200"
                        y1="200"
                        x2={200 + 180 * Math.cos(rad)}
                        y2={200 + 180 * Math.sin(rad)}
                        stroke="#132238"
                        strokeWidth="0.8"
                      />
                    );
                  })}

                  {/* Dynamic Continent Geometry */}
                  {heroRegion === 'Antarctica' ? (
                    <g>
                      <path
                        d="M 190,80 C 250,90 310,130 330,190 C 345,240 310,300 260,320 C 210,340 150,320 120,280 C 95,240 95,190 115,145 C 135,110 160,80 190,80 Z"
                        fill="#122742"
                        stroke="#38bdf8"
                        strokeWidth="1.5"
                      />
                      <circle cx="200" cy="200" r="4" fill="#38bdf8" />
                      <text x="200" y="215" fill="#7dd3fc" fontSize="9" textAnchor="middle" fontFamily="monospace">
                        South Pole (90°S)
                      </text>
                    </g>
                  ) : (
                    <g>
                      <path
                        d="M 180,260 C 200,230 220,195 210,170 C 195,145 165,160 155,190 C 145,225 160,265 180,260 Z"
                        fill="#122742"
                        stroke="#38bdf8"
                        strokeWidth="1.5"
                      />
                      <circle cx="200" cy="200" r="4" fill="#38bdf8" />
                      <text x="200" y="215" fill="#7dd3fc" fontSize="9" textAnchor="middle" fontFamily="monospace">
                        North Pole (90°N)
                      </text>
                    </g>
                  )}

                  {/* Pulsing Hotspot Pins */}
                  <g
                    className="cursor-pointer"
                    onClick={() => onNavigate('explore', { locationId: 'loc-thwaites' })}
                  >
                    <circle cx="150" cy="180" r="10" fill="#38bdf8" fillOpacity="0.3" className="animate-ping" />
                    <circle cx="150" cy="180" r="4" fill="#38bdf8" />
                    <text x="150" y="168" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                      Thwaites Glacier
                    </text>
                  </g>

                  <g
                    className="cursor-pointer"
                    onClick={() => onNavigate('explore', { locationId: 'loc-bharati' })}
                  >
                    <circle cx="270" cy="230" r="8" fill="#f59e0b" fillOpacity="0.3" className="animate-ping" />
                    <circle cx="270" cy="230" r="3.5" fill="#f59e0b" />
                    <text x="270" y="220" fill="#fde68a" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                      Bharati Station
                    </text>
                  </g>
                </svg>

                {/* Region toggle controls overlay */}
                <div className="absolute bottom-5 z-20 flex gap-1.5 p-1 bg-slate-950/80 backdrop-blur-md rounded-lg border border-slate-700">
                  <button
                    onClick={() => setHeroRegion('Antarctica')}
                    className={`px-3 py-1 text-[11px] font-semibold rounded cursor-pointer ${
                      heroRegion === 'Antarctica'
                        ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/50'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Antarctica 90°S
                  </button>
                  <button
                    onClick={() => setHeroRegion('Arctic')}
                    className={`px-3 py-1 text-[11px] font-semibold rounded cursor-pointer ${
                      heroRegion === 'Arctic'
                        ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/50'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Arctic 90°N
                  </button>
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-400 font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Polar Cartography · Click any pin to open</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Polar Statistics (Tabular Figures per frontend-design skill) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              Antarctic Sea Ice Low
            </div>
            <div className="text-3xl font-bold font-mono text-cyan-300 tracking-tight">
              1.79 <span className="text-sm font-sans font-normal text-slate-400">M km²</span>
            </div>
            <div className="text-[11px] text-rose-400 flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>Historic all-time satellite record low</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              Arctic Warming Ratio
            </div>
            <div className="text-3xl font-bold font-mono text-rose-400 tracking-tight">
              3.98x <span className="text-sm font-sans font-normal text-slate-400">vs Global</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Arctic Amplification albedo loop
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              Thwaites Discharge
            </div>
            <div className="text-3xl font-bold font-mono text-amber-300 tracking-tight">
              50+ <span className="text-sm font-sans font-normal text-slate-400">Gt / year</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Responsible for ~4% global SLR
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              Antarctic Fresh Water
            </div>
            <div className="text-3xl font-bold font-mono text-emerald-400 tracking-tight">
              68.7% <span className="text-sm font-sans font-normal text-slate-400">of Earth</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Locked in continental ice sheets
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Research & Latest Discoveries */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
              Peer-Reviewed Evidence
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Featured Research & Discoveries
            </h2>
          </div>
          <button
            onClick={() => onNavigate('repository')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Papers</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredResearch.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate('repository')}
              className="group bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span className="text-cyan-300 font-medium">{item.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.year}</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {item.abstract}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="truncate max-w-[170px] text-[11px]">{item.institution}</span>
                <span className="text-cyan-400 font-medium group-hover:translate-x-1 transition-transform">
                  Inspect Paper →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Standout Feature Callout: "Turn Science Into a Story" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-blue-950/40 border border-cyan-500/30 rounded-3xl p-8 sm:p-10 backdrop-blur-md relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Featured Outreach Innovation</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Turn Science Into a Story
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Transform any peer-reviewed glaciological paper or satellite radar dataset into student-friendly explanations, public narrative articles, and social media kits in seconds.
              </p>

              {heroStory && (
                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5 max-w-xl">
                  <div className="text-xs font-mono text-cyan-400 uppercase">
                    Sample Generated Story:
                  </div>
                  <div className="text-sm font-bold text-white">"{heroStory.title}"</div>
                  <p className="text-xs text-slate-400 line-clamp-2 italic">
                    "{heroStory.publicStory}"
                  </p>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('story-studio')}
                  className="px-5 py-3 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl shadow-lg transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  <span>Launch Story Generation Studio</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="p-4 bg-slate-950/90 border border-slate-800 rounded-xl text-xs space-y-1">
                <span className="font-semibold text-emerald-400 block">Student Explanations</span>
                <span className="text-slate-400">Analogy-rich concepts for middle and high schoolers</span>
              </div>
              <div className="p-4 bg-slate-950/90 border border-slate-800 rounded-xl text-xs space-y-1">
                <span className="font-semibold text-cyan-400 block">Public Narratives</span>
                <span className="text-slate-400">Journalism-ready storytelling without dense math</span>
              </div>
              <div className="p-4 bg-slate-950/90 border border-slate-800 rounded-xl text-xs space-y-1">
                <span className="font-semibold text-purple-400 block">Social Outreach Threads</span>
                <span className="text-slate-400">Formatted posts for Twitter, Bluesky & Instagram</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Expeditions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
              Field Science in Action
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Featured Polar Expeditions
            </h2>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
          >
            <span>Explore On Map</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredExpeditions.map((exp) => (
            <div
              key={exp.id}
              onClick={() => onNavigate('explore')}
              className="group bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl overflow-hidden shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                <img
                  src={exp.thumbnailUrl}
                  alt={exp.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-slate-700">
                  {exp.region} · {exp.status}
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {exp.name}
                  </h3>
                  <div className="text-xs text-cyan-300 font-mono">
                    Vessel / Team: {exp.vesselOrTeam}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {exp.objective}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Lead: {exp.leadScientist}</span>
                  <span className="text-cyan-400 font-medium group-hover:translate-x-1 transition-transform">
                    Explore Route →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
