import React, { useState } from 'react';
import { PolarRepository } from '../../lib/supabase';
import { Expedition, ExpeditionReport } from '../../types/polar';
import {
  Compass,
  FileText,
  Database,
  Film,
  Calendar,
  Users,
  Building,
  Sparkles,
  ArrowRight,
  Download,
  ExternalLink,
  ChevronRight,
  Clock,
  Layers,
  Award
} from 'lucide-react';

interface ExpeditionsViewProps {
  onNavigate: (tab: any, params?: any) => void;
  preselectExpeditionId?: string;
}

export const ExpeditionsView: React.FC<ExpeditionsViewProps> = ({
  onNavigate,
  preselectExpeditionId,
}) => {
  const expeditions = PolarRepository.getExpeditions();
  const [selectedExpeditionId, setSelectedExpeditionId] = useState<string>(
    preselectExpeditionId || expeditions[0]?.id || 'exp-indian-antarctic-44'
  );
  const [activeTab, setActiveTab] = useState<
    'overview' | 'reports' | 'publications' | 'datasets' | 'media' | 'researchers' | 'activities'
  >('overview');

  const bundle = PolarRepository.getExpeditionBundle(selectedExpeditionId);
  const currentExp = bundle?.expedition || expeditions[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title & MoES Institutional Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono tracking-widest uppercase mb-1">
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span>Polar Field Operations & Scientific Archives</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Polar Expeditions Hub
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Archive of national and international polar campaigns. Connects expedition field logs directly to peer-reviewed publications, sensor datasets, photo/video evidence, and outreach stories.
          </p>
        </div>

        {/* Expedition Selector Dropdown / Switcher */}
        <div className="flex items-center gap-2 bg-[#0b101d] border border-slate-800 p-1.5 rounded">
          <span className="text-xs font-mono text-slate-400 pl-2">Expedition:</span>
          <select
            value={selectedExpeditionId}
            onChange={(e) => {
              setSelectedExpeditionId(e.target.value);
              setActiveTab('overview');
            }}
            className="bg-slate-900 border border-slate-800 rounded text-xs font-medium text-white py-1.5 px-3 focus:outline-none focus:border-sky-500 cursor-pointer"
          >
            {expeditions.map((exp) => (
              <option key={exp.id} value={exp.id}>
                {exp.name} ({exp.region})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Expedition Banner Card */}
      <div className="bg-[#0b101d] border border-slate-800 rounded-lg overflow-hidden shadow-xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left: Thumbnail & Badges */}
          <div className="lg:col-span-4 relative aspect-video lg:aspect-auto min-h-[220px] bg-slate-950">
            <img
              src={currentExp.thumbnailUrl}
              alt={currentExp.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              <span className="ds-badge ds-badge-neutral bg-black/80">
                {currentExp.region} · {currentExp.status}
              </span>
              <span className="ds-badge ds-badge-neutral bg-black/80 text-[10px]">
                {currentExp.startDate} to {currentExp.endDate || 'Present'}
              </span>
            </div>
          </div>

          {/* Right: Identity & High-Level Metrics */}
          <div className="lg:col-span-8 p-6 sm:p-7 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Building className="w-3.5 h-3.5 text-sky-400" />
                <span className="font-semibold text-slate-300">{currentExp.institution}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Vessel/Team: {currentExp.vesselOrTeam}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {currentExp.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                {currentExp.objective}
              </p>
            </div>

            {/* Quick Connected Entity Counters */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-4 border-t border-slate-800 text-center font-mono">
              <div
                onClick={() => setActiveTab('reports')}
                className="p-2 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors"
              >
                <div className="text-lg font-bold text-white">{bundle?.reports.length || 0}</div>
                <div className="text-[10px] text-slate-400 uppercase">Reports</div>
              </div>

              <div
                onClick={() => setActiveTab('publications')}
                className="p-2 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors"
              >
                <div className="text-lg font-bold text-white">{bundle?.publications.length || 0}</div>
                <div className="text-[10px] text-slate-400 uppercase">Papers</div>
              </div>

              <div
                onClick={() => setActiveTab('datasets')}
                className="p-2 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors"
              >
                <div className="text-lg font-bold text-white">{bundle?.datasets.length || 0}</div>
                <div className="text-[10px] text-slate-400 uppercase">Datasets</div>
              </div>

              <div
                onClick={() => setActiveTab('media')}
                className="p-2 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors"
              >
                <div className="text-lg font-bold text-white">{bundle?.media.length || 0}</div>
                <div className="text-[10px] text-slate-400 uppercase">Media</div>
              </div>

              <div
                onClick={() => setActiveTab('researchers')}
                className="p-2 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors"
              >
                <div className="text-lg font-bold text-white">{bundle?.researchers.length || 0}</div>
                <div className="text-[10px] text-slate-400 uppercase">Team</div>
              </div>

              <div
                onClick={() => setActiveTab('activities')}
                className="p-2 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors"
              >
                <div className="text-lg font-bold text-sky-400">{bundle?.activities.length || 0}</div>
                <div className="text-[10px] text-slate-400 uppercase">Activities</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expedition Detail Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-slate-800">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'reports', label: `Reports (${bundle?.reports.length || 0})` },
          { id: 'publications', label: `Publications (${bundle?.publications.length || 0})` },
          { id: 'datasets', label: `Datasets (${bundle?.datasets.length || 0})` },
          { id: 'media', label: `Media (${bundle?.media.length || 0})` },
          { id: 'researchers', label: `Researchers (${bundle?.researchers.length || 0})` },
          { id: 'activities', label: `Activities (${bundle?.activities.length || 0})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-slate-800 text-white border border-slate-700 font-semibold'
                : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div>
        {/* 1. OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 space-y-4">
              <div className="p-6 bg-[#0b101d] border border-slate-800 rounded-lg space-y-3">
                <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400">
                  Mission Objectives & Scope
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {currentExp.objective}
                </p>
                <div className="pt-2">
                  <h4 className="text-xs font-semibold text-white mb-2">Key Milestones:</h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {currentExp.milestones.map((m, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-5 bg-slate-900/90 border-l-2 border-sky-400 rounded-r text-xs space-y-1.5">
                <h3 className="text-xs uppercase font-mono tracking-wider text-slate-200 font-semibold">
                  Scientific Findings Summary
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {currentExp.findingsSummary}
                </p>
              </div>
            </div>

            <div className="md:col-span-4 space-y-4">
              <div className="p-5 bg-[#0b101d] border border-slate-800 rounded-lg space-y-3 text-xs">
                <h3 className="text-[11px] uppercase font-mono tracking-wider text-slate-400">
                  Expedition Telemetry
                </h3>
                <div className="space-y-2 font-mono">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Lead Scientist:</span>
                    <span className="text-white font-medium">{currentExp.leadScientist}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Governing Institution:</span>
                    <span className="text-slate-300">{currentExp.institution}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Vessel / Base:</span>
                    <span className="text-slate-300">{currentExp.vesselOrTeam}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <span className="text-slate-400 block text-[11px] mb-1">Staging Route Waypoints:</span>
                  <div className="space-y-1 font-mono text-[11px] text-slate-300">
                    {currentExp.routeCoordinates.map((w, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className="text-sky-400">#{idx + 1}</span>
                        <span>{w.label}</span>
                        <span className="text-slate-400 text-[10px]">({w.lat.toFixed(1)}°, {w.lng.toFixed(1)}°)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. REPORTS */}
        {activeTab === 'reports' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Archived Cruise & Technical Reports:</span>
              <span className="text-sky-400">All reports open-access</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bundle?.reports.map((report) => (
                <div
                  key={report.id}
                  className="p-5 bg-[#0b101d] hover:bg-[#0e1526] border border-slate-800 hover:border-slate-700 rounded-lg transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 text-xs font-mono">
                      <span className="ds-badge ds-badge-neutral text-[10px]">
                        {report.reportNumber}
                      </span>
                      <span className="text-slate-400 text-[11px]">{report.date}</span>
                    </div>

                    <h3 className="text-base font-bold text-white hover:text-sky-200 transition-colors leading-snug">
                      {report.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {report.summary}
                    </p>

                    <div className="text-[11px] text-slate-400 font-mono">
                      Lead Author: <span className="text-slate-200">{report.leadAuthor}</span> · {report.institution}
                    </div>
                  </div>

                  {/* Actions for this Report: Launch Content Studio! */}
                  <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                    <button
                      onClick={() =>
                        onNavigate('studio', {
                          sourceId: report.id,
                          sourceType: 'Expedition Report',
                        })
                      }
                      className="ds-btn-primary text-xs py-1.5 px-3"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                      <span>Create Outreach Content</span>
                    </button>

                    <a
                      href={report.downloadUrl || '#download'}
                      className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {(!bundle?.reports || bundle.reports.length === 0) && (
              <div className="text-center py-12 text-slate-400 text-sm">
                No formal expedition reports uploaded yet.
              </div>
            )}
          </div>
        )}

        {/* 3. PUBLICATIONS */}
        {activeTab === 'publications' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bundle?.publications.map((pub) => (
                <div
                  key={pub.id}
                  className="p-5 bg-[#0b101d] border border-slate-800 rounded-lg space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <span className="ds-badge ds-badge-neutral">{pub.category}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>{pub.year}</span>
                    </div>
                    <h3 className="text-base font-bold text-white leading-snug">{pub.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {pub.abstract}
                    </p>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {pub.authors.join(', ')} · <span className="text-sky-400 font-mono">DOI: {pub.doi}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() =>
                        onNavigate('studio', {
                          sourceId: pub.id,
                          sourceType: 'Publication',
                        })
                      }
                      className="ds-btn-primary text-xs py-1.5 px-3"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                      <span>Generate Story</span>
                    </button>
                    <button
                      onClick={() => onNavigate('repository')}
                      className="text-xs text-sky-400 hover:underline cursor-pointer font-mono"
                    >
                      View in Repository →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. DATASETS */}
        {activeTab === 'datasets' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bundle?.datasets.map((dataset) => (
              <div
                key={dataset.id}
                className="p-5 bg-[#0b101d] border border-slate-800 rounded-lg space-y-3"
              >
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase mb-1">
                    {dataset.provider}
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug">{dataset.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {dataset.description}
                  </p>
                </div>

                <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-1 text-xs font-mono">
                  <div className="text-slate-400 text-[11px]">Telemetry Parameters:</div>
                  <div className="text-slate-200 text-[11px]">{dataset.parameters.join(' · ')}</div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    onClick={() => onNavigate('visualizations')}
                    className="text-sky-400 hover:underline cursor-pointer flex items-center gap-1 font-mono text-[11px]"
                  >
                    <span>Visualize Telemetry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-slate-400 text-[11px]">{dataset.fileFormat}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 5. MEDIA */}
        {activeTab === 'media' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bundle?.media.map((med) => (
              <div
                key={med.id}
                onClick={() => onNavigate('media')}
                className="group bg-[#0b101d] hover:bg-[#0e1526] border border-slate-800 hover:border-slate-700 rounded-lg overflow-hidden cursor-pointer transition-all"
              >
                <div className="relative aspect-video bg-slate-950">
                  <img
                    src={med.thumbnailUrl}
                    alt={med.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-slate-300 border border-slate-700">
                    {med.category}
                  </div>
                </div>
                <div className="p-3.5 space-y-1">
                  <h4 className="text-xs font-semibold text-white group-hover:text-sky-200 line-clamp-1">
                    {med.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{med.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 6. RESEARCHERS */}
        {activeTab === 'researchers' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bundle?.researchers.map((res, i) => (
              <div
                key={i}
                className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 flex items-center justify-center font-bold text-sm mx-auto">
                  {res.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <h4 className="text-sm font-bold text-white">{res.name}</h4>
                <div className="text-xs text-cyan-400 font-mono">{res.role}</div>
                <div className="text-[11px] text-slate-400">{res.institution}</div>
                <div className="text-[10px] text-slate-500 italic mt-1">{res.specialization}</div>
              </div>
            ))}
          </div>
        )}

        {/* 7. ACTIVITIES */}
        {activeTab === 'activities' && (
          <div className="space-y-4">
            {bundle?.activities.map((act) => (
              <div
                key={act.id}
                className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-[10px]">
                      {act.type}
                    </span>
                    <span>{act.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{act.location}</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{act.title}</h4>
                  <p className="text-xs text-slate-400 max-w-2xl">{act.summary}</p>
                </div>

                <button
                  onClick={() => onNavigate('activities')}
                  className="shrink-0 text-xs text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Activity Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
