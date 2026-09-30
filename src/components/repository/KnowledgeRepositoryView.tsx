import React, { useState, useMemo } from 'react';
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
  Satellite,
  Video,
  Image as ImageIcon,
  BookMarked,
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
  Share2,
  Layers,
  Download,
  LayoutGrid,
  List
} from 'lucide-react';

interface KnowledgeRepositoryViewProps {
  onNavigate: (tab: any, params?: any) => void;
  prefillLocationId?: string;
}

export const KnowledgeRepositoryView: React.FC<KnowledgeRepositoryViewProps> = ({
  onNavigate,
  prefillLocationId,
}) => {
  const researchItems = PolarRepository.getResearch();
  const reports = PolarRepository.getExpeditionReports();
  const datasets = PolarRepository.getDatasets();
  const mediaItems = PolarRepository.getMedia();
  const activities = PolarRepository.getActivities();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'citations'>('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Active preview modal state
  const [activeItem, setActiveItem] = useState<any>(null);
  const [activeItemType, setActiveItemType] = useState<string>('');
  const [copiedCitation, setCopiedCitation] = useState(false);

  // Content type categories per official requirements
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
        year: 2025,
        region: 'Antarctica',
        connectedExpeditionId: r.expeditionId,
        connectedDatasetIds: r.relatedDatasetIds,
        connectedMediaIds: r.relatedMediaIds,
      });
    });

    // 2. Publications
    researchItems.forEach((p) => {
      list.push({
        id: p.id,
        raw: p,
        categoryType: 'Publications',
        title: p.title,
        secondaryText: `${p.authors.join(', ')} · DOI: ${p.doi}`,
        abstract: p.abstract,
        institution: p.institution,
        year: p.year,
        region: p.region,
        connectedExpeditionId: p.relatedExpeditionId,
        connectedDatasetIds: p.datasetIds,
        connectedMediaIds: p.relatedMediaIds,
      });
    });

    // 3. Datasets
    datasets.forEach((d) => {
      list.push({
        id: d.id,
        raw: d,
        categoryType: 'Datasets',
        title: d.title,
        secondaryText: `Format: ${d.fileFormat} · ${d.temporalCoverage}`,
        abstract: d.description,
        institution: d.provider,
        year: 2024,
        region: d.region,
        connectedExpeditionId: d.relatedExpeditionId,
      });
    });

    // 4. Media
    mediaItems.forEach((m) => {
      list.push({
        id: m.id,
        raw: m,
        categoryType: m.type === 'video' ? 'Videos' : 'Photographs',
        title: m.title,
        secondaryText: `Creator: ${m.creator} · ${m.date}`,
        abstract: m.description,
        institution: m.institution || 'Ministry of Earth Sciences (MoES)',
        year: 2024,
        region: m.region,
        connectedExpeditionId: m.relatedExpeditionId,
        thumbnailUrl: m.thumbnailUrl,
      });
    });

    // 5. Activities
    activities.forEach((a) => {
      list.push({
        id: a.id,
        raw: a,
        categoryType: 'Institutional Activities',
        title: a.title,
        secondaryText: `${a.type} · ${a.date} · ${a.location}`,
        abstract: a.summary,
        institution: a.institution,
        year: 2025,
        region: 'Global Polar',
        connectedExpeditionId: a.relatedExpeditionId,
      });
    });

    return list;
  }, [researchItems, reports, datasets, mediaItems, activities]);

  // Filtered and sorted items
  const filteredItems = useMemo(() => {
    return unifiedItems.filter((item) => {
      if (selectedType !== 'All' && item.categoryType !== selectedType) return false;
      if (selectedRegion !== 'All' && item.region !== selectedRegion && item.region !== 'Global Polar')
        return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesAbstract = item.abstract.toLowerCase().includes(q);
        const matchesInst = item.institution.toLowerCase().includes(q);
        if (!matchesTitle && !matchesAbstract && !matchesInst) return false;
      }

      return true;
    });
  }, [unifiedItems, selectedType, selectedRegion, searchQuery]);

  const copyCitation = (item: any) => {
    const text = `${item.title} (${item.year}). ${item.institution}. Archived in POLARIS Central Knowledge Repository.`;
    navigator.clipboard.writeText(text);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="space-y-2 border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono tracking-widest uppercase mb-1">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span>Central Archive · Ministry of Earth Sciences (MoES)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Central Polar Knowledge Repository
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            Archival source of truth for expedition field logs, publications, cryogenic sensor datasets, photographic archives, and institutional activity records.
          </p>
        </div>

        <button
          onClick={() => onNavigate('studio')}
          className="self-start md:self-auto ds-btn-primary"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Open Content Studio</span>
        </button>
      </div>

      {/* Search Bar & Facets */}
      <div className="bg-[#0b101d] border border-slate-800 rounded-lg p-4 space-y-3.5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports, DOIs, datasets, photographs, Bharati station, Thwaites..."
              className="w-full pl-10 pr-16 py-2.5 bg-slate-900 border border-slate-800 rounded text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs px-1.5 py-0.5 cursor-pointer font-mono"
              >
                Clear
              </button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded p-0.5 self-start sm:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded text-xs flex items-center gap-1.5 cursor-pointer transition-colors ${
                viewMode === 'grid'
                  ? 'bg-slate-800 text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded text-xs flex items-center gap-1.5 cursor-pointer transition-colors ${
                viewMode === 'table'
                  ? 'bg-slate-800 text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Table View (High Density)"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Table</span>
            </button>
          </div>
        </div>

        {/* Content Type Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedType === t
                  ? 'bg-slate-800 text-white border border-slate-700 font-semibold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/80'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-1">
          <div>
            Showing <span className="text-white font-semibold">{filteredItems.length}</span> verified scientific records
          </div>
          {(selectedType !== 'All' || selectedRegion !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedType('All');
                setSelectedRegion('All');
                setSearchQuery('');
              }}
              className="text-sky-400 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* TABLE VIEW (Scientific Catalog Density) */}
      {viewMode === 'table' ? (
        <div className="bg-[#0b101d] border border-slate-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Title & Description</th>
                  <th className="py-3 px-4">Institution / Region</th>
                  <th className="py-3 px-4">Linked Relations</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-3 px-4 align-top">
                      <span className="ds-badge ds-badge-neutral text-[10px]">
                        {item.categoryType}
                      </span>
                    </td>
                    <td className="py-3 px-4 align-top max-w-md">
                      <div
                        onClick={() => {
                          setActiveItem(item);
                          setActiveItemType(item.categoryType);
                        }}
                        className="font-semibold text-white hover:text-sky-300 cursor-pointer line-clamp-1 leading-snug"
                      >
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">
                        {item.secondaryText}
                      </div>
                    </td>
                    <td className="py-3 px-4 align-top font-mono text-[11px] text-slate-400 whitespace-nowrap">
                      <div>{item.institution}</div>
                      <div className="text-slate-500">{item.region} · {item.year}</div>
                    </td>
                    <td className="py-3 px-4 align-top">
                      <div className="flex flex-wrap gap-1 text-[10px] font-mono">
                        {item.connectedExpeditionId && (
                          <span className="ds-badge ds-badge-accent py-0 text-[10px]">
                            Expedition
                          </span>
                        )}
                        {item.connectedDatasetIds && item.connectedDatasetIds.length > 0 && (
                          <span className="ds-badge ds-badge-success py-0 text-[10px]">
                            {item.connectedDatasetIds.length} Datasets
                          </span>
                        )}
                        {item.connectedMediaIds && item.connectedMediaIds.length > 0 && (
                          <span className="ds-badge ds-badge-neutral py-0 text-[10px]">
                            {item.connectedMediaIds.length} Media
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 align-top text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setActiveItem(item);
                            setActiveItemType(item.categoryType);
                          }}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono cursor-pointer"
                        >
                          Inspect
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
                          className="px-2.5 py-1 rounded bg-sky-400 hover:bg-sky-300 text-slate-950 text-[11px] font-semibold cursor-pointer"
                        >
                          Studio
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-[#0b101d] hover:bg-[#0e1526] border border-slate-800 hover:border-slate-700 rounded-lg p-5 transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                {/* Top metadata line with typographic separators */}
                <div className="flex items-center justify-between gap-2 text-xs font-mono">
                  <span className="ds-badge ds-badge-neutral">
                    {item.categoryType}
                  </span>
                  <span className="text-slate-400 text-[11px] truncate max-w-[200px]">{item.institution}</span>
                </div>

                {/* Title */}
                <h3
                  onClick={() => {
                    setActiveItem(item);
                    setActiveItemType(item.categoryType);
                  }}
                  className="text-base font-bold text-white group-hover:text-sky-200 transition-colors leading-snug cursor-pointer"
                >
                  {item.title}
                </h3>

                <div className="text-[11px] text-slate-400 font-mono">
                  {item.secondaryText}
                </div>

                {/* Summary */}
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.abstract}
                </p>

                {/* Visible Relational Connections */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] font-mono text-slate-400">
                  {item.connectedExpeditionId && (
                    <span className="ds-badge ds-badge-accent py-0 text-[10px]">
                      Linked Expedition
                    </span>
                  )}
                  {item.connectedDatasetIds && item.connectedDatasetIds.length > 0 && (
                    <span className="ds-badge ds-badge-success py-0 text-[10px]">
                      Datasets ({item.connectedDatasetIds.length})
                    </span>
                  )}
                  {item.connectedMediaIds && item.connectedMediaIds.length > 0 && (
                    <span className="ds-badge ds-badge-neutral py-0 text-[10px]">
                      Media ({item.connectedMediaIds.length})
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Card Actions: Launch Content Studio! */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-sky-400 hover:bg-sky-300 text-slate-950 text-xs font-semibold cursor-pointer shadow-sm transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                  <span>Create Outreach Content</span>
                </button>

                <button
                  onClick={() => {
                    setActiveItem(item);
                    setActiveItemType(item.categoryType);
                  }}
                  className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer font-mono text-[11px]"
                >
                  <span>Inspect Record</span>
                  <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Record Inspection Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b101d] border border-slate-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 pr-8">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="ds-badge ds-badge-neutral">{activeItem.categoryType}</span>
                <span>{activeItem.institution}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>{activeItem.year}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {activeItem.title}
              </h2>
              <div className="text-xs text-slate-400 font-mono">{activeItem.secondaryText}</div>
            </div>

            {/* Description / Summary */}
            <div className="space-y-1.5">
              <h3 className="text-[11px] uppercase font-mono tracking-wider text-slate-400">
                Scientific Overview & Empirical Findings
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/90 p-4 rounded border border-slate-800">
                {activeItem.abstract}
              </p>
            </div>

            {/* Citation Box */}
            <div className="p-3 bg-slate-900 border border-slate-800 rounded flex items-center justify-between text-xs font-mono">
              <div className="text-slate-400 truncate max-w-md">
                Archived in POLARIS Central Knowledge Repository (MoES)
              </div>
              <button
                onClick={() => copyCitation(activeItem)}
                className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded cursor-pointer transition-colors"
              >
                {copiedCitation ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy Citation</span>
                  </>
                )}
              </button>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-3">
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
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Transform Into Outreach Package in Content Studio</span>
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
                  <Compass className="w-4 h-4 text-sky-400" />
                  <span>View Connected Expedition</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
