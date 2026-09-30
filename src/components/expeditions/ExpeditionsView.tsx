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
  CheckCircle2,
  Table,
  MapPin
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

  const tabs: { id: typeof activeTab; label: string; count?: number }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'reports', label: 'Reports', count: bundle?.reports.length },
    { id: 'publications', label: 'Publications', count: bundle?.publications.length },
    { id: 'datasets', label: 'Datasets', count: bundle?.datasets.length },
    { id: 'media', label: 'Media', count: bundle?.media.length },
    { id: 'researchers', label: 'Researchers', count: bundle?.expedition.researchers.length },
    { id: 'activities', label: 'Activities', count: bundle?.activities.length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* 1. Page Header & Expedition Switcher */}
      <div className="border-b border-slate-300 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#003366]">
            Field Operations Archive · National Polar Research Program
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#002244] tracking-tight mt-1">
            Scientific Expeditions Archive
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Archive record of national and international campaigns, linking field expedition logs directly to research papers, sensor datasets, and media archives.
          </p>
        </div>

        {/* Switcher Dropdown */}
        <div className="flex items-center gap-2 border border-slate-300 bg-white p-1 text-xs self-start md:self-auto">
          <span className="font-mono text-slate-500 pl-2">Select Campaign:</span>
          <select
            value={selectedExpeditionId}
            onChange={(e) => {
              setSelectedExpeditionId(e.target.value);
              setActiveTab('overview');
            }}
            className="border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-[#002244] focus:outline-none cursor-pointer"
          >
            {expeditions.map((exp) => (
              <option key={exp.id} value={exp.id}>
                {exp.name} ({exp.region})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Scientific Archive Record Header (PER PROMPT SPECIFICATION) */}
      <div className="border border-slate-300 bg-white p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <div className="text-xs font-mono font-semibold text-[#004c99] uppercase tracking-wider">
              Archive Record #{currentExp.id.toUpperCase()}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#002244]">
              {currentExp.name}
            </h2>
            <div className="text-xs text-slate-600 font-mono">
              Vessel / Research Base: <span className="font-semibold text-slate-800">{currentExp.vesselOrTeam}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="ds-badge ds-badge-neutral text-xs">
              Status: {currentExp.status.toUpperCase()}
            </span>
            <button
              onClick={() =>
                onNavigate('studio', {
                  sourceId: bundle?.reports[0]?.id || currentExp.id,
                  sourceType: 'Expedition Report',
                })
              }
              className="ds-btn-primary text-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Create Outreach Package</span>
            </button>
          </div>
        </div>

        {/* Structured Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 border border-slate-200 text-xs font-mono">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Location</span>
            <span className="font-semibold text-slate-800">{currentExp.region}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Operational Dates</span>
            <span className="font-semibold text-slate-800">
              {currentExp.startDate} — {currentExp.endDate || 'Active Mission'}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Lead Institution</span>
            <span className="font-semibold text-slate-800">{currentExp.institution}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Scientific Assets</span>
            <span className="font-semibold text-[#003366]">
              {bundle?.reports.length} Reports · {bundle?.datasets.length} Datasets
            </span>
          </div>
        </div>
      </div>

      {/* 3. Simple Tabs: Overview | Reports | Publications | Datasets | Media | Researchers | Activities */}
      <div className="border border-slate-300 bg-white">
        <div className="flex items-center overflow-x-auto border-b border-slate-300 bg-slate-100 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors border-r border-slate-300 ${
                  isActive
                    ? 'bg-white text-[#002244] border-b-2 border-b-[#002244] -mb-px'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="ml-1.5 text-[10px] font-mono text-slate-500">
                    ({tab.count})
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="p-5">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-bold font-serif uppercase tracking-wide text-[#002244]">
                  Mission Overview & Field Scope
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 border border-slate-200">
                  {currentExp.findingsSummary || currentExp.objective}
                </p>
              </div>

              {/* Objectives List */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold font-serif uppercase tracking-wide text-[#002244]">
                  Key Scientific Milestones & Objectives
                </h3>
                <div className="border border-slate-300 divide-y divide-slate-200">
                  {(currentExp.milestones || [currentExp.objective]).map((obj: string, i: number) => (
                    <div key={i} className="p-3 text-xs text-slate-800 flex items-start gap-2.5">
                      <span className="font-mono font-bold text-[#003366] shrink-0 mt-0.5">
                        {String(i + 1).padStart(2, '0')}.
                      </span>
                      <span className="leading-relaxed">{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Research Facilities Involved */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold font-serif uppercase tracking-wide text-[#002244]">
                  Active Research Stations & Platforms
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-3 border border-slate-300 bg-slate-50">
                    <span className="text-slate-500 block text-[10px] uppercase">Primary Base</span>
                    <span className="font-bold text-slate-900">Bharati Station (Larsemann Hills)</span>
                    <span className="text-slate-500 block text-[11px] mt-0.5">69°24′S 76°11′E</span>
                  </div>
                  <div className="p-3 border border-slate-300 bg-slate-50">
                    <span className="text-slate-500 block text-[10px] uppercase">Secondary Facility</span>
                    <span className="font-bold text-slate-900">Maitri Station (Schirmacher Oasis)</span>
                    <span className="text-slate-500 block text-[11px] mt-0.5">70°46′S 11°44′E</span>
                  </div>
                  <div className="p-3 border border-slate-300 bg-slate-50">
                    <span className="text-slate-500 block text-[10px] uppercase">Icebreaker / Logistics</span>
                    <span className="font-bold text-slate-900">{currentExp.vesselOrTeam}</span>
                    <span className="text-slate-500 block text-[11px] mt-0.5">Polar Class 4 Vessel</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EXPEDITION REPORTS */}
          {activeTab === 'reports' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold font-serif uppercase tracking-wide text-[#002244]">
                  Official Expedition Reports ({bundle?.reports.length})
                </h3>
                <span className="text-xs text-slate-500 font-mono">Archived in MoES Repository</span>
              </div>

              <div className="overflow-x-auto border border-slate-300">
                <table className="inst-table">
                  <thead>
                    <tr>
                      <th>Report Number</th>
                      <th>Title & Scope</th>
                      <th>Lead Scientist</th>
                      <th>Date Archived</th>
                      <th>Connected Assets</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bundle?.reports.map((rep) => (
                      <tr key={rep.id}>
                        <td className="font-mono text-xs font-semibold text-[#003366]">
                          {rep.reportNumber}
                        </td>
                        <td>
                          <div className="font-bold text-[#002244]">{rep.title}</div>
                          <div className="text-[11px] text-slate-600 line-clamp-1">{rep.summary}</div>
                        </td>
                        <td className="text-slate-700 text-xs">{rep.leadAuthor}</td>
                        <td className="font-mono text-xs text-slate-600">{rep.date}</td>
                        <td className="font-mono text-xs text-slate-600">
                          {rep.relatedDatasetIds?.length || 0} Data · {rep.relatedMediaIds?.length || 0} Media
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              onNavigate('studio', { sourceId: rep.id, sourceType: 'Expedition Report' })
                            }
                            className="ds-btn-primary text-xs whitespace-nowrap"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>Draft Outreach</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PUBLICATIONS */}
          {activeTab === 'publications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold font-serif uppercase tracking-wide text-[#002244]">
                  Connected Publications ({bundle?.publications.length})
                </h3>
              </div>

              <div className="border border-slate-300 divide-y divide-slate-200">
                {bundle?.publications.map((pub) => (
                  <div key={pub.id} className="p-3.5 hover:bg-slate-50 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-bold text-[#002244]">
                        {pub.title}
                      </h4>
                      <div className="text-xs text-slate-600">
                        {pub.authors.join(', ')} · <span className="font-semibold text-slate-700">{pub.category}</span> ({pub.year})
                      </div>
                      <div className="text-[11px] font-mono text-slate-500">
                        DOI: {pub.doi} · Region: {pub.region}
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        onNavigate('studio', { sourceId: pub.id, sourceType: 'Publication' })
                      }
                      className="ds-btn-secondary text-xs shrink-0"
                    >
                      <span>Draft Story</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DATASETS */}
          {activeTab === 'datasets' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold font-serif uppercase tracking-wide text-[#002244]">
                  Expedition Sensor Feeds & Datasets ({bundle?.datasets.length})
                </h3>
              </div>

              <div className="overflow-x-auto border border-slate-300">
                <table className="inst-table">
                  <thead>
                    <tr>
                      <th>Dataset Title</th>
                      <th>Telemetry Parameters</th>
                      <th>Time Coverage</th>
                      <th>Format</th>
                      <th>Access</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bundle?.datasets.map((d) => (
                      <tr key={d.id}>
                        <td className="font-bold text-[#002244]">{d.title}</td>
                        <td className="text-xs text-slate-600">{d.parameters.join(', ')}</td>
                        <td className="font-mono text-xs text-slate-600">{d.temporalCoverage}</td>
                        <td>
                          <span className="ds-badge ds-badge-neutral text-[10px]">{d.fileFormat}</span>
                        </td>
                        <td>
                          <button
                            onClick={() => onNavigate('repository', { prefillContentType: 'Dataset' })}
                            className="text-xs font-semibold text-[#004c99] hover:underline cursor-pointer"
                          >
                            Download ({d.fileSizeMb} MB)
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: MEDIA */}
          {activeTab === 'media' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold font-serif uppercase tracking-wide text-[#002244]">
                  Field Photographic & Video Records ({bundle?.media.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {bundle?.media.map((m) => (
                  <div key={m.id} className="border border-slate-300 bg-white">
                    <div className="relative aspect-video bg-slate-200 overflow-hidden">
                      <img
                        src={m.thumbnailUrl}
                        alt={m.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-mono px-1">
                        {m.category}
                      </span>
                    </div>
                    <div className="p-3 space-y-1">
                      <div className="text-[10px] font-mono text-slate-500">
                        {m.date} · {m.region}
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">
                        {m.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 line-clamp-2">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: RESEARCHERS */}
          {activeTab === 'researchers' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold font-serif uppercase tracking-wide text-[#002244]">
                  Scientific Personnel & Cruise Leadership ({currentExp.researchers.length})
                </h3>
              </div>

              <div className="overflow-x-auto border border-slate-300">
                <table className="inst-table">
                  <thead>
                    <tr>
                      <th>Scientist Name</th>
                      <th>Role in Campaign</th>
                      <th>Affiliation</th>
                      <th>Specialization</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentExp.researchers.map((s, idx) => (
                      <tr key={idx}>
                        <td className="font-bold text-[#002244]">{s.name}</td>
                        <td className="text-xs text-slate-700">
                          {s.role}
                        </td>
                        <td className="text-xs text-slate-600 font-mono">
                          {s.institution}
                        </td>
                        <td className="text-xs text-slate-500 font-mono">
                          {s.specialization}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: ACTIVITIES */}
          {activeTab === 'activities' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold font-serif uppercase tracking-wide text-[#002244]">
                  Institutional Activities & Milestones ({bundle?.activities.length})
                </h3>
              </div>

              <div className="overflow-x-auto border border-slate-300">
                <table className="inst-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Activity Title</th>
                      <th>Type</th>
                      <th>Location</th>
                      <th>Lead Coordinator</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bundle?.activities.map((act) => (
                      <tr key={act.id}>
                        <td className="font-mono text-xs text-slate-600">{act.date}</td>
                        <td className="font-bold text-[#002244]">{act.title}</td>
                        <td>
                          <span className="ds-badge ds-badge-neutral text-[10px]">{act.type}</span>
                        </td>
                        <td className="text-xs text-slate-600 font-mono">{act.location}</td>
                        <td className="text-xs text-slate-700">{act.leadCoordinator}</td>
                        <td>
                          <button
                            onClick={() =>
                              onNavigate('studio', { sourceId: act.id, sourceType: 'Activity' })
                            }
                            className="text-xs font-semibold text-[#004c99] hover:underline cursor-pointer"
                          >
                            Draft Story →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
