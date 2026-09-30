import React, { useState, useMemo, useEffect } from 'react';
import { PolarRepository } from '../../lib/supabase';
import {
  ResearchItem,
  ExpeditionReport,
  PolarDataset,
  MediaItem,
  InstitutionalActivity,
  ContentType
} from '../../types/polar';
import {
  Search,
  Filter,
  FileText,
  Database,
  Video,
  Image as ImageIcon,
  Compass,
  Calendar,
  Building,
  CheckCircle,
  Copy,
  ExternalLink,
  Sparkles,
  ArrowRight,
  BookOpen,
  X,
  Download,
  Table,
  List
} from 'lucide-react';

interface KnowledgeRepositoryViewProps {
  onNavigate: (tab: any, params?: any) => void;
  prefillLocationId?: string;
  prefillContentType?: string;
}

export const KnowledgeRepositoryView: React.FC<KnowledgeRepositoryViewProps> = ({
  onNavigate,
  prefillLocationId,
  prefillContentType,
}) => {
  const researchItems = PolarRepository.getResearch();
  const reports = PolarRepository.getExpeditionReports();
  const datasets = PolarRepository.getDatasets();
  const mediaItems = PolarRepository.getMedia();
  const activities = PolarRepository.getActivities();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>(
    prefillContentType === 'Publication'
      ? 'Publications'
      : prefillContentType === 'Dataset'
      ? 'Datasets'
      : 'All'
  );
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedInstitution, setSelectedInstitution] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'table' | 'list'>('table');

  // Active preview modal state
  const [activeItem, setActiveItem] = useState<any>(null);
  const [copiedCitation, setCopiedCitation] = useState(false);

  useEffect(() => {
    if (prefillContentType) {
      if (prefillContentType === 'Publication') setSelectedType('Publications');
      else if (prefillContentType === 'Dataset') setSelectedType('Datasets');
      else if (prefillContentType === 'Expedition Report') setSelectedType('Expedition Reports');
    }
  }, [prefillContentType]);

  // Content type categories
  const types = [
    'All',
    'Expedition Reports',
    'Publications',
    'Datasets',
    'Photographs',
    'Videos',
    'Institutional Activities',
  ];

  // Unified items list with normalized searchable structure
  const unifiedItems = useMemo(() => {
    const list: any[] = [];

    // 1. Reports
    reports.forEach((r) => {
      list.push({
        id: r.id,
        raw: r,
        categoryType: 'Expedition Reports',
        title: r.title,
        secondaryText: `Report #${r.reportNumber} · Lead: ${r.leadAuthor}`,
        abstract: r.summary,
        institution: r.institution,
        year: '2025',
        region: 'Antarctica',
        connectedExpeditionId: r.expeditionId,
        connectedDatasetIds: r.relatedDatasetIds,
        connectedMediaIds: r.relatedMediaIds,
        doiOrId: r.reportNumber,
      });
    });

    // 2. Publications
    researchItems.forEach((p) => {
      list.push({
        id: p.id,
        raw: p,
        categoryType: 'Publications',
        title: p.title,
        secondaryText: `${p.authors.slice(0, 2).join(', ')}${p.authors.length > 2 ? ' et al.' : ''} · ${p.category}`,
        abstract: p.abstract,
        institution: p.institution,
        year: String(p.year),
        region: p.region,
        connectedExpeditionId: p.relatedExpeditionId,
        connectedDatasetIds: p.datasetIds || [],
        connectedMediaIds: p.relatedMediaIds || [],
        doiOrId: `DOI: ${p.doi}`,
      });
    });

    // 3. Datasets
    datasets.forEach((d) => {
      list.push({
        id: d.id,
        raw: d,
        categoryType: 'Datasets',
        title: d.title,
        secondaryText: `Provider: ${d.provider} · Format: ${d.fileFormat} (${d.fileSizeMb} MB)`,
        abstract: d.description,
        institution: d.provider,
        year: '2024',
        region: d.region,
        connectedExpeditionId: d.relatedExpeditionId || 'exp-indian-antarctic-44',
        connectedDatasetIds: [],
        connectedMediaIds: [],
        doiOrId: `Format: ${d.fileFormat}`,
      });
    });

    // 4. Media
    mediaItems.forEach((m) => {
      list.push({
        id: m.id,
        raw: m,
        categoryType: m.type === 'video' ? 'Videos' : 'Photographs',
        title: m.title,
        secondaryText: `Photographer / Creator: ${m.creator} · ${m.date}`,
        abstract: m.description,
        institution: m.creator,
        year: m.date.split('-')[0] || '2024',
        region: m.region,
        connectedExpeditionId: 'exp-indian-antarctic-44',
        connectedDatasetIds: [],
        connectedMediaIds: [],
        doiOrId: `Ref: ${m.id}`,
      });
    });

    // 5. Activities
    activities.forEach((a) => {
      list.push({
        id: a.id,
        raw: a,
        categoryType: 'Institutional Activities',
        title: a.title,
        secondaryText: `${a.type} · ${a.location}`,
        abstract: a.description,
        institution: a.institution,
        year: a.date.split('-')[0] || '2025',
        region: 'Global Polar',
        connectedExpeditionId: a.relatedExpeditionId,
        connectedDatasetIds: [],
        connectedMediaIds: a.relatedMediaIds,
        doiOrId: `Activity #${a.id.slice(-4)}`,
      });
    });

    return list;
  }, [reports, researchItems, datasets, mediaItems, activities]);

  // Filtering
  const filteredItems = useMemo(() => {
    return unifiedItems.filter((item) => {
      // Type
      if (selectedType !== 'All' && item.categoryType !== selectedType) {
        return false;
      }
      // Region
      if (selectedRegion !== 'All' && item.region !== selectedRegion) {
        return false;
      }
      // Institution
      if (
        selectedInstitution !== 'All' &&
        !item.institution.toLowerCase().includes(selectedInstitution.toLowerCase())
      ) {
        return false;
      }
      // Year
      if (selectedYear !== 'All' && item.year !== selectedYear) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(q);
        const inSec = item.secondaryText.toLowerCase().includes(q);
        const inAbs = item.abstract.toLowerCase().includes(q);
        const inInst = item.institution.toLowerCase().includes(q);
        if (!inTitle && !inSec && !inAbs && !inInst) return false;
      }
      return true;
    });
  }, [unifiedItems, selectedType, selectedRegion, selectedInstitution, selectedYear, searchQuery]);

  const copyCitation = (item: any) => {
    const text = `${item.title}. ${item.institution}, ${item.year}. Retrieved from POLARIS Central Knowledge Repository (MoES), ${item.doiOrId}.`;
    navigator.clipboard.writeText(text);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-300 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#003366]">
            Official Science Archive · Ministry of Earth Sciences (MoES)
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#002244] tracking-tight mt-1">
            Central Knowledge Repository
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            The authoritative digital archive cataloguing expedition cruise reports, scientific datasets, peer-reviewed publications, high-resolution photography, submersible logs, and institutional milestones.
          </p>
        </div>

        <button
          onClick={() => onNavigate('studio')}
          className="ds-btn-primary self-start md:self-auto shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Launch Content Studio</span>
        </button>
      </div>

      {/* Structured Search & Multi-Param Filters */}
      <div className="bg-white border border-slate-300 p-4 space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, author, parameter, cruise report number, or DOI..."
            className="w-full pl-9 pr-4 py-2 border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:border-[#003366]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Content Type Filter Strip */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs border-b border-slate-200">
          <span className="text-slate-500 font-mono text-[11px] mr-2 shrink-0">Content Type:</span>
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-2.5 py-1 font-medium whitespace-nowrap cursor-pointer transition-colors border ${
                selectedType === t
                  ? 'bg-[#002244] text-white border-[#001730] font-semibold'
                  : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Parametric Dropdown Filters + View Mode Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* Region */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-mono text-[11px]">Region:</span>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="border border-slate-300 bg-white px-2 py-1 text-xs text-slate-800 focus:outline-none"
              >
                <option value="All">All Regions</option>
                <option value="Antarctica">Antarctica (90°S)</option>
                <option value="Arctic">Arctic (90°N)</option>
                <option value="Southern Ocean">Southern Ocean</option>
              </select>
            </div>

            {/* Institution */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-mono text-[11px]">Institution:</span>
              <select
                value={selectedInstitution}
                onChange={(e) => setSelectedInstitution(e.target.value)}
                className="border border-slate-300 bg-white px-2 py-1 text-xs text-slate-800 focus:outline-none"
              >
                <option value="All">All Institutions</option>
                <option value="NCPOR">NCPOR / MoES</option>
                <option value="British Antarctic Survey">British Antarctic Survey</option>
                <option value="Alfred Wegener">Alfred Wegener Institute</option>
                <option value="NSIDC">NSIDC Colorado</option>
              </select>
            </div>

            {/* Year */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-mono text-[11px]">Year:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border border-slate-300 bg-white px-2 py-1 text-xs text-slate-800 focus:outline-none"
              >
                <option value="All">All Years</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
          </div>

          {/* Results count & View Mode Switcher */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-slate-600">
              Showing <strong>{filteredItems.length}</strong> verified records
            </span>
            <div className="inline-flex border border-slate-300 bg-slate-100 p-0.5">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1 cursor-pointer ${
                  viewMode === 'table' ? 'bg-white text-[#002244] shadow-none font-bold' : 'text-slate-500'
                }`}
                title="Table View"
              >
                <Table className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1 cursor-pointer ${
                  viewMode === 'list' ? 'bg-white text-[#002244] shadow-none font-bold' : 'text-slate-500'
                }`}
                title="List / Detail View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Real Digital Archive Table View (DEFAULT) */}
      {viewMode === 'table' ? (
        <div className="overflow-x-auto border border-slate-300 bg-white">
          <table className="inst-table">
            <thead>
              <tr>
                <th className="w-2/5">Title & Record Identifier</th>
                <th>Type</th>
                <th>Expedition / Region</th>
                <th>Institution</th>
                <th>Year</th>
                <th>Access & Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500 font-mono text-xs">
                    No scientific records found matching the specified parameters.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="space-y-0.5">
                        <button
                          onClick={() => setActiveItem(item)}
                          className="font-bold text-[#002244] hover:text-[#004c99] text-left hover:underline cursor-pointer leading-snug"
                        >
                          {item.title}
                        </button>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {item.secondaryText}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="ds-badge ds-badge-neutral">
                        {item.categoryType}
                      </span>
                    </td>
                    <td className="text-xs text-slate-700 font-mono whitespace-nowrap">
                      {item.region}
                    </td>
                    <td className="text-xs text-slate-700 truncate max-w-[150px]">
                      {item.institution}
                    </td>
                    <td className="font-mono text-xs text-slate-600 whitespace-nowrap">
                      {item.year}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveItem(item)}
                          className="text-xs font-semibold text-[#004c99] hover:underline cursor-pointer whitespace-nowrap"
                        >
                          Inspect Record
                        </button>
                        <span className="text-slate-300">|</span>
                        <button
                          onClick={() =>
                            onNavigate('studio', {
                              sourceId: item.id,
                              sourceType:
                                item.categoryType === 'Expedition Reports'
                                  ? 'Expedition Report'
                                  : item.categoryType === 'Publications'
                                  ? 'Publication'
                                  : item.categoryType === 'Datasets'
                                  ? 'Dataset'
                                  : 'Activity',
                            })
                          }
                          className="text-xs font-semibold text-[#003366] hover:underline cursor-pointer whitespace-nowrap"
                        >
                          Studio →
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* Editorial List View */
        <div className="border border-slate-300 bg-white divide-y divide-slate-200">
          {filteredItems.map((item) => (
            <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                    <span className="ds-badge ds-badge-neutral">{item.categoryType}</span>
                    <span>{item.institution}</span>
                    <span>·</span>
                    <span>{item.region}</span>
                    <span>·</span>
                    <span>{item.year}</span>
                  </div>

                  <h3 className="text-sm font-bold text-[#002244]">
                    <button
                      onClick={() => setActiveItem(item)}
                      className="text-left cursor-pointer hover:underline"
                    >
                      {item.title}
                    </button>
                  </h3>

                  <div className="text-xs font-mono text-slate-600">{item.secondaryText}</div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-0.5">
                    {item.abstract}
                  </p>
                </div>

                <div className="shrink-0 flex sm:flex-col items-end gap-2 pt-2 sm:pt-0">
                  <button
                    onClick={() => setActiveItem(item)}
                    className="ds-btn-secondary text-xs"
                  >
                    Inspect Record
                  </button>
                  <button
                    onClick={() =>
                      onNavigate('studio', {
                        sourceId: item.id,
                        sourceType:
                          item.categoryType === 'Expedition Reports'
                            ? 'Expedition Report'
                            : item.categoryType === 'Publications'
                            ? 'Publication'
                            : item.categoryType === 'Datasets'
                            ? 'Dataset'
                            : 'Activity',
                      })
                    }
                    className="ds-btn-primary text-xs"
                  >
                    Draft Story
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Scientific Archive Publication Dossier (MODAL) */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-none">
          <div className="bg-white border border-slate-400 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-lg relative font-sans">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1 cursor-pointer border border-slate-300 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Document Header */}
            <div className="space-y-2 border-b border-slate-300 pb-4 pr-8">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-600">
                <span className="ds-badge ds-badge-neutral">{activeItem.categoryType}</span>
                <span>{activeItem.institution}</span>
                <span>·</span>
                <span>{activeItem.region}</span>
                <span>·</span>
                <span>Year: {activeItem.year}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-serif text-[#002244] leading-snug">
                {activeItem.title}
              </h2>
              <div className="text-xs text-slate-600 font-mono">{activeItem.secondaryText}</div>
            </div>

            {/* Abstract */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-mono uppercase font-bold text-slate-700 tracking-wider">
                Abstract & Empirical Findings
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 border border-slate-200">
                {activeItem.abstract}
              </p>
            </div>

            {/* Metadata Table */}
            <div className="border border-slate-300 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 p-2.5 bg-slate-50 border-b border-slate-200 font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Accession ID</span>
                  <span className="font-semibold text-slate-800">{activeItem.doiOrId}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">License</span>
                  <span className="font-semibold text-slate-800">CC-BY 4.0 Open</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Source Program</span>
                  <span className="font-semibold text-slate-800">MoES / NCPOR</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Integrity</span>
                  <span className="font-semibold text-emerald-700">Verified Peer-Reviewed</span>
                </div>
              </div>
            </div>

            {/* Citation Box */}
            <div className="p-3 bg-slate-100 border border-slate-300 flex items-center justify-between gap-3 text-xs font-mono">
              <div className="text-slate-700 truncate text-[11px]">
                Cite: {activeItem.title} ({activeItem.institution}, {activeItem.year})
              </div>
              <button
                onClick={() => copyCitation(activeItem)}
                className="ds-btn-secondary text-xs shrink-0 py-1"
              >
                {copiedCitation ? (
                  <>
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-slate-600" />
                    <span>Copy Citation</span>
                  </>
                )}
              </button>
            </div>

            {/* Dossier Actions */}
            <div className="pt-3 border-t border-slate-300 flex flex-wrap gap-2.5">
              <button
                onClick={() => {
                  const id = activeItem.id;
                  const type =
                    activeItem.categoryType === 'Expedition Reports'
                      ? 'Expedition Report'
                      : activeItem.categoryType === 'Publications'
                      ? 'Publication'
                      : activeItem.categoryType === 'Datasets'
                      ? 'Dataset'
                      : 'Activity';
                  setActiveItem(null);
                  onNavigate('studio', { sourceId: id, sourceType: type });
                }}
                className="ds-btn-primary"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open in Content Studio</span>
              </button>

              {activeItem.connectedExpeditionId && (
                <button
                  onClick={() => {
                    const expId = activeItem.connectedExpeditionId;
                    setActiveItem(null);
                    onNavigate('expeditions', { expeditionId: expId });
                  }}
                  className="ds-btn-secondary"
                >
                  <Compass className="w-3.5 h-3.5 text-slate-600" />
                  <span>Inspect Connected Expedition</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
