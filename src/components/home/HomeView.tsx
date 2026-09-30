import React from 'react';
import { PolarRepository } from '../../lib/supabase';
import {
  Compass,
  ArrowRight,
  FileText,
  Database,
  Film,
  Building,
  Calendar,
  ExternalLink,
  BookOpen,
  Sparkles,
  MapPin,
  CheckCircle2
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: any, params?: any) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const expeditions = PolarRepository.getExpeditions();
  const reports = PolarRepository.getExpeditionReports();
  const publications = PolarRepository.getResearch();
  const datasets = PolarRepository.getDatasets();
  const media = PolarRepository.getMedia();
  const activities = PolarRepository.getActivities();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. Restrained Institutional Header (NO SaaS HERO) */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#003366]">
            Ministry of Earth Sciences (MoES) · Government of India
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#002244] tracking-tight mt-1">
            POLARIS
          </h1>
          <div className="text-base sm:text-lg font-medium text-slate-700 mt-1">
            Integrated Polar Science Outreach & Knowledge Repository
          </div>
        </div>

        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          The national repository and dissemination system archiving scientific expedition reports, research datasets, peer-reviewed publications, photographic and video archives, and institutional activities across India’s Antarctic, Arctic, and Southern Ocean programs.
        </p>

        {/* Action Row */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('repository')}
            className="ds-btn-primary"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Search Central Repository</span>
          </button>

          <button
            onClick={() => onNavigate('expeditions')}
            className="ds-btn-secondary"
          >
            <Compass className="w-3.5 h-3.5 text-slate-600" />
            <span>Browse Expeditions</span>
          </button>

          <button
            onClick={() => onNavigate('studio')}
            className="ds-btn-secondary"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#004c99]" />
            <span>Editorial Content Studio</span>
          </button>
        </div>

        {/* Institutional Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-3.5 bg-slate-100 border border-slate-300 text-xs font-mono text-slate-700 mt-4">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Antarctic Missions</span>
            <span className="text-base font-bold text-[#002244]">44 Scientific Expeditions</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Arctic Programs</span>
            <span className="text-base font-bold text-[#002244]">18 Annual Campaigns</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Archived Publications</span>
            <span className="text-base font-bold text-[#002244]">480+ Peer-Reviewed</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Access Status</span>
            <span className="text-base font-bold text-emerald-700">100% Open Access</span>
          </div>
        </div>
      </section>

      {/* Simple Horizontal Divider */}
      <hr className="border-t border-slate-300" />

      {/* 2. Featured Expeditions */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-300 pb-2">
          <div>
            <h2 className="text-lg font-bold text-[#002244] font-serif uppercase tracking-wide">
              Featured Expeditions
            </h2>
            <p className="text-xs text-slate-500">
              National polar campaigns operating under the Indian Antarctic and Arctic Research Programs.
            </p>
          </div>
          <button
            onClick={() => onNavigate('expeditions')}
            className="text-xs font-semibold text-[#004c99] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Expeditions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto border border-slate-300 bg-white">
          <table className="inst-table">
            <thead>
              <tr>
                <th>Expedition Name</th>
                <th>Region / Base</th>
                <th>Operational Dates</th>
                <th>Lead Institution</th>
                <th>Status</th>
                <th>Records</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expeditions.slice(0, 4).map((exp) => (
                <tr key={exp.id}>
                  <td className="font-semibold text-[#002244]">
                    <div>{exp.name}</div>
                    <div className="text-[11px] font-mono text-slate-500">{exp.vesselOrTeam}</div>
                  </td>
                  <td className="text-slate-600 font-mono text-xs">{exp.region}</td>
                  <td className="text-slate-600 font-mono text-xs">
                    {exp.startDate} to {exp.endDate || 'Active'}
                  </td>
                  <td className="text-slate-700">{exp.institution}</td>
                  <td>
                    <span className="ds-badge ds-badge-neutral">
                      {exp.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="font-mono text-xs text-slate-600">
                    {exp.reportIds.length} Rep · {exp.publicationIds.length} Pub
                  </td>
                  <td>
                    <button
                      onClick={() => onNavigate('expeditions', { expeditionId: exp.id })}
                      className="text-xs font-semibold text-[#004c99] hover:underline cursor-pointer"
                    >
                      Inspect Dossier →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Latest Publications */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-300 pb-2">
          <div>
            <h2 className="text-lg font-bold text-[#002244] font-serif uppercase tracking-wide">
              Latest Publications & Research Reports
            </h2>
            <p className="text-xs text-slate-500">
              Peer-reviewed glaciological, atmospheric, and oceanographic research archived in the repository.
            </p>
          </div>
          <button
            onClick={() => onNavigate('publications')}
            className="text-xs font-semibold text-[#004c99] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Browse All Publications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="border border-slate-300 bg-white divide-y divide-slate-200">
          {publications.slice(0, 4).map((pub) => (
            <div key={pub.id} className="p-4 hover:bg-slate-50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-[#002244] hover:text-[#004c99] leading-snug">
                    <button
                      onClick={() => onNavigate('repository', { prefillContentType: 'Publication' })}
                      className="text-left cursor-pointer hover:underline"
                    >
                      {pub.title}
                    </button>
                  </h3>
                  <div className="text-xs text-slate-600">
                    <span>{pub.authors.join(', ')}</span>
                    <span className="mx-1.5 text-slate-400">·</span>
                    <span className="font-semibold text-slate-700">{pub.category}</span>
                    <span className="mx-1.5 text-slate-400">·</span>
                    <span className="font-mono text-slate-500">{pub.year}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 pt-1 leading-relaxed">
                    {pub.abstract}
                  </p>
                </div>

                <div className="shrink-0 flex sm:flex-col items-end gap-1.5 pt-2 sm:pt-0">
                  <span className="ds-badge ds-badge-neutral text-[10px]">
                    DOI: {pub.doi}
                  </span>
                  <button
                    onClick={() =>
                      onNavigate('studio', { sourceId: pub.id, sourceType: 'Publication' })
                    }
                    className="text-[11px] font-semibold text-[#004c99] hover:underline cursor-pointer"
                  >
                    Draft Outreach Story →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Latest Datasets */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-300 pb-2">
          <div>
            <h2 className="text-lg font-bold text-[#002244] font-serif uppercase tracking-wide">
              Latest Datasets & Sensor Feeds
            </h2>
            <p className="text-xs text-slate-500">
              Verified cryospheric measurements, radar altimetry, in-situ CTD casts, and meteorological telemetry.
            </p>
          </div>
          <button
            onClick={() => onNavigate('datasets')}
            className="text-xs font-semibold text-[#004c99] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Open Data Catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto border border-slate-300 bg-white">
          <table className="inst-table">
            <thead>
              <tr>
                <th>Dataset Title</th>
                <th>Source / Station</th>
                <th>Temporal Coverage</th>
                <th>Region</th>
                <th>Format</th>
                <th>License</th>
                <th>Access</th>
              </tr>
            </thead>
            <tbody>
              {datasets.slice(0, 4).map((d) => (
                <tr key={d.id}>
                  <td className="font-semibold text-[#002244]">
                    <div>{d.title}</div>
                    <div className="text-[11px] text-slate-500">{d.parameters.join(', ')}</div>
                  </td>
                  <td className="text-slate-700">{d.provider}</td>
                  <td className="font-mono text-xs text-slate-600">{d.temporalCoverage}</td>
                  <td className="text-slate-600 font-mono text-xs">{d.region}</td>
                  <td>
                    <span className="ds-badge ds-badge-neutral text-[10px]">
                      {d.fileFormat}
                    </span>
                  </td>
                  <td className="text-[11px] text-slate-600 font-mono">CC-BY 4.0</td>
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
      </section>

      {/* 5. Recent Media (Clean Editorial Documentary Gallery) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-300 pb-2">
          <div>
            <h2 className="text-lg font-bold text-[#002244] font-serif uppercase tracking-wide">
              Recent Media & Photographic Archives
            </h2>
            <p className="text-xs text-slate-500">
              Photographs, station drone records, and expedition footage supporting scientific publications.
            </p>
          </div>
          <button
            onClick={() => onNavigate('media')}
            className="text-xs font-semibold text-[#004c99] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View Media Gallery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {media.slice(0, 4).map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate('media')}
              className="inst-card cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-video bg-slate-200 overflow-hidden border-b border-slate-200">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-mono px-1 py-0.2">
                  {item.category}
                </span>
              </div>
              <div className="p-3 space-y-1">
                <div className="text-[10px] font-mono text-slate-500">
                  {item.region} · {item.date}
                </div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#004c99] leading-snug">
                  {item.title}
                </h4>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 flex items-center justify-between">
                  <span>{item.creator}</span>
                  <span className="text-[#004c99] font-medium">Inspect →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Institutional Activities (Chronological Ledger) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-300 pb-2">
          <div>
            <h2 className="text-lg font-bold text-[#002244] font-serif uppercase tracking-wide">
              Institutional Activities & MoES Milestones
            </h2>
            <p className="text-xs text-slate-500">
              Official record of polar conferences, expedition flag-offs, school outreach, and treaty meetings.
            </p>
          </div>
          <button
            onClick={() => onNavigate('activities')}
            className="text-xs font-semibold text-[#004c99] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Activities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto border border-slate-300 bg-white">
          <table className="inst-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Activity Title</th>
                <th>Category</th>
                <th>Host Organization</th>
                <th>Location</th>
                <th>Lead Coordinator</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.slice(0, 4).map((act) => (
                <tr key={act.id}>
                  <td className="font-mono text-xs text-slate-600 whitespace-nowrap">{act.date}</td>
                  <td className="font-semibold text-[#002244]">
                    <div>{act.title}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">{act.summary}</div>
                  </td>
                  <td>
                    <span className="ds-badge ds-badge-neutral text-[10px]">
                      {act.type}
                    </span>
                  </td>
                  <td className="text-slate-700 text-xs">{act.institution}</td>
                  <td className="text-slate-600 font-mono text-xs">{act.location}</td>
                  <td className="text-slate-600 text-xs">{act.leadCoordinator}</td>
                  <td>
                    <button
                      onClick={() => onNavigate('studio', { sourceId: act.id, sourceType: 'Activity' })}
                      className="text-xs font-semibold text-[#004c99] hover:underline cursor-pointer whitespace-nowrap"
                    >
                      Draft Press Release →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
