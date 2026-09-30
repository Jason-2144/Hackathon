import React, { useState, useMemo } from 'react';
import { PolarRepository } from '../../lib/supabase';
import { ResearchItem, ContentType, PolarRegion } from '../../types/polar';
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
  Share2
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
  const datasets = PolarRepository.getDatasets();

  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Modal inspection state
  const [activeItem, setActiveItem] = useState<ResearchItem | null>(null);
  const [copiedDoi, setCopiedDoi] = useState(false);

  // Content type tags mapping
  const contentTypes = [
    'All',
    'Research Paper',
    'Scientific Report',
    'Dataset',
    'Satellite Data',
  ];

  const regions = ['All', 'Antarctica', 'Arctic', 'Global Polar'];
  const years = ['All', '2025', '2024', '2023'];
  const categories = [
    'All',
    'Glaciology & Ocean Dynamics',
    'Climate & Sea Ice',
    'Atmospheric Physics',
    'Polar Ecology',
    'Geology & Geophysics',
  ];

  // Filtering Logic
  const filteredItems = useMemo(() => {
    return researchItems.filter((item) => {
      // Search text
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesAbstract = item.abstract.toLowerCase().includes(query);
        const matchesAuthor = item.authors.some((a) => a.toLowerCase().includes(query));
        const matchesInstitution = item.institution.toLowerCase().includes(query);
        const matchesTopics = item.topics.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesAbstract && !matchesAuthor && !matchesInstitution && !matchesTopics) {
          return false;
        }
      }

      // Region filter
      if (selectedRegion !== 'All' && item.region !== selectedRegion) {
        return false;
      }

      // Content Type filter
      if (selectedType !== 'All' && item.contentType !== selectedType) {
        return false;
      }

      // Year filter
      if (selectedYear !== 'All' && item.year.toString() !== selectedYear) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [researchItems, searchQuery, selectedRegion, selectedType, selectedYear, selectedCategory]);

  const copyCitation = (item: ResearchItem) => {
    const citation = `${item.authors.join(', ')} (${item.year}). ${item.title}. ${item.institution}. DOI: ${item.doi}`;
    navigator.clipboard.writeText(citation);
    setCopiedDoi(true);
    setTimeout(() => setCopiedDoi(false), 2000);
  };

  const getContentTypeIcon = (type: ContentType) => {
    switch (type) {
      case 'Research Paper':
        return <FileText className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Dataset':
        return <Database className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Satellite Data':
        return <Satellite className="w-3.5 h-3.5 text-blue-400" />;
      case 'Scientific Report':
        return <BookMarked className="w-3.5 h-3.5 text-purple-400" />;
      case 'Expedition Record':
        return <Compass className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-widest uppercase">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Peer-Reviewed & Open Data Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Explore Polar Knowledge
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Search open glaciological papers, multi-decadal cryospheric datasets, satellite telemetry indices, and expedition logs.
        </p>
      </div>

      {/* Search Bar & Primary Facets */}
      <div className="space-y-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search research, datasets, expeditions, glaciers, Thwaites, albedo..."
            className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Dropdowns and Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {/* Region */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Region</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Content Type */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Content Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              {contentTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Publication Year */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Counter and Active Filter Tags */}
        <div className="flex items-center justify-between pt-2 text-xs text-slate-400 font-mono">
          <div>
            Showing <span className="text-cyan-400 font-bold">{filteredItems.length}</span> verified records
          </div>
          {(selectedRegion !== 'All' || selectedType !== 'All' || selectedYear !== 'All' || selectedCategory !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedRegion('All');
                setSelectedType('All');
                setSelectedYear('All');
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-xs text-cyan-400 hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-xl p-5 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Unboxed metadata line with typographic separators per zero-pill rule */}
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1 text-cyan-300 font-semibold">
                  {getContentTypeIcon(item.contentType)}
                  <span>{item.contentType}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span>{item.region}</span>
                <span aria-hidden="true">·</span>
                <span>{item.year}</span>
              </div>

              {/* Title */}
              <h2 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                {item.title}
              </h2>

              {/* Abstract Snippet */}
              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                {item.abstract}
              </p>

              {/* Key Takeaway Banner */}
              <div className="p-2.5 bg-slate-950/70 border-l-2 border-cyan-400 rounded-r text-[11px] text-slate-300">
                <span className="text-cyan-300 font-semibold mr-1">Finding:</span>
                {item.keyTakeaway}
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <div className="truncate max-w-[200px] text-slate-400 text-[11px]">
                {item.institution}
              </div>
              <div className="flex items-center gap-1.5 text-cyan-400 font-medium group-hover:translate-x-0.5 transition-transform">
                <span>View Full Record</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-2xl p-8 space-y-3">
          <div className="text-slate-400 text-sm">No research records found matching your filters.</div>
          <button
            onClick={() => {
              setSelectedRegion('All');
              setSelectedType('All');
              setSelectedYear('All');
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 rounded-lg hover:bg-cyan-900/60 cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Detailed Record Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#090f1d] border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-8">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span>{activeItem.contentType}</span>
                <span aria-hidden="true">·</span>
                <span>{activeItem.region}</span>
                <span aria-hidden="true">·</span>
                <span>{activeItem.year}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                {activeItem.title}
              </h2>
              <div className="text-xs text-slate-400">
                Authors: <span className="text-slate-200">{activeItem.authors.join(', ')}</span>
              </div>
              <div className="text-xs text-slate-400">
                Institution: <span className="text-cyan-300">{activeItem.institution}</span>
              </div>
            </div>

            {/* DOI & Citations Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-slate-500">DOI:</span>
                <span className="text-cyan-300">{activeItem.doi}</span>
              </div>
              <button
                onClick={() => copyCitation(activeItem)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                {copiedDoi ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy Citation</span>
                  </>
                )}
              </button>
            </div>

            {/* Abstract */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400">
                Scientific Abstract
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
                {activeItem.abstract}
              </p>
            </div>

            {/* Key Takeaway */}
            <div className="p-4 bg-cyan-950/20 border-l-3 border-cyan-400 rounded-r-xl space-y-1">
              <div className="text-xs font-bold text-cyan-300 uppercase tracking-wide">
                Key Empirical Takeaway
              </div>
              <div className="text-sm text-slate-200 leading-relaxed">
                {activeItem.keyTakeaway}
              </div>
            </div>

            {/* Topics */}
            <div>
              <div className="text-xs font-mono text-slate-400 mb-2">Research Keywords & Topics:</div>
              <div className="flex flex-wrap gap-2 text-xs">
                {activeItem.topics.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  const id = activeItem.id;
                  setActiveItem(null);
                  onNavigate('story-studio', { researchId: id });
                }}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Turn This Research Into a Public Story</span>
              </button>

              <button
                onClick={() => {
                  const title = activeItem.title;
                  setActiveItem(null);
                  onNavigate('ai', { query: `Explain the scientific research: "${title}"` });
                }}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Ask Polar AI About This Paper</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
