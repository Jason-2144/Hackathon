import React, { useState } from 'react';
import { PolarRepository } from '../../lib/supabase';
import { MediaItem } from '../../types/polar';
import {
  Film,
  Camera,
  Play,
  X,
  Compass,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface MediaPortalViewProps {
  onNavigate: (tab: any, params?: any) => void;
  prefillLocationId?: string;
}

export const MediaPortalView: React.FC<MediaPortalViewProps> = ({ onNavigate }) => {
  const mediaItems = PolarRepository.getMedia();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);

  const categories = [
    'All',
    'Photography',
    'Videos',
    'Expeditions',
    'Satellite Imagery',
    'Wildlife',
    'Climate Stories',
  ];

  const filteredMedia = mediaItems.filter((m) => {
    if (selectedCategory !== 'All' && m.category !== selectedCategory) return false;
    if (selectedRegion !== 'All' && m.region !== selectedRegion) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* 1. Header */}
      <div className="border-b border-slate-300 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#003366]">
            Visual Archives · Ministry of Earth Sciences (MoES)
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#002244] tracking-tight mt-1">
            Polar Photographic & Documentary Archives
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            High-resolution documentary field photography, aerial drone surveys, submersible ROV recordings, and scientist journals from Indian polar expeditions.
          </p>
        </div>

        {/* Region Filter */}
        <div className="flex items-center gap-1.5 border border-slate-300 bg-white p-1 text-xs self-start md:self-auto font-mono">
          <span className="text-slate-500 pl-2">Region:</span>
          {['All', 'Antarctica', 'Arctic'].map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRegion(r)}
              className={`px-2.5 py-1 text-xs font-medium cursor-pointer transition-colors ${
                selectedRegion === r
                  ? 'bg-[#002244] text-white font-bold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Category Filter Strip */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs border-b border-slate-200">
        <span className="text-slate-500 font-mono text-[11px] mr-2 shrink-0">Category:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 font-medium whitespace-nowrap cursor-pointer transition-colors border ${
              selectedCategory === cat
                ? 'bg-[#002244] text-white border-[#001730] font-semibold'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. Simple Editorial Gallery (PER USER PROMPT SPECIFICATION) */}
      {/* Large photographs with: Title, Location, Expedition, Date, Source */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="border border-slate-300 bg-white flex flex-col justify-between"
          >
            {/* Large Photograph */}
            <div
              onClick={() => setActiveMedia(item)}
              className="relative aspect-[16/10] w-full bg-slate-100 border-b border-slate-300 overflow-hidden cursor-pointer group"
            >
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5">
                {item.category.toUpperCase()} {item.duration ? `· ${item.duration}` : ''}
              </span>
            </div>

            {/* Editorial Information Block */}
            <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <h3
                  onClick={() => setActiveMedia(item)}
                  className="text-base font-bold font-serif text-[#002244] hover:text-[#004c99] cursor-pointer leading-snug"
                >
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Exact metadata required by user: Title, Location, Expedition, Date, Source */}
              <div className="pt-3 border-t border-slate-200 text-xs font-mono space-y-1 text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold text-slate-800">{item.region}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Expedition:</span>
                  <span className="text-slate-800 truncate max-w-[180px]">
                    44th Indian Antarctic Expedition
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Date:</span>
                  <span className="text-slate-800">{item.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Source:</span>
                  <span className="text-[#003366] font-semibold truncate max-w-[180px]">
                    {item.creator}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => setActiveMedia(item)}
                  className="text-xs font-semibold text-[#004c99] hover:underline cursor-pointer"
                >
                  Inspect Archive Dossier →
                </button>
                <button
                  onClick={() =>
                    onNavigate('studio', {
                      sourceId: item.relatedResearchId || item.id,
                      sourceType: 'Publication',
                    })
                  }
                  className="ds-btn-secondary text-[11px] py-1 px-2"
                >
                  <Sparkles className="w-3 h-3 text-[#004c99]" />
                  <span>Outreach</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Inspection Modal */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-none">
          <div className="bg-white border border-slate-400 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-xl relative font-sans">
            <button
              onClick={() => setActiveMedia(null)}
              className="absolute top-4 right-4 p-1 border border-slate-300 text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Large Image */}
            <div className="aspect-video w-full bg-slate-100 border border-slate-300 overflow-hidden">
              <img
                src={activeMedia.thumbnailUrl}
                alt={activeMedia.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="space-y-1.5 border-b border-slate-200 pb-3">
              <div className="text-xs font-mono text-slate-500 uppercase">
                {activeMedia.category} · {activeMedia.region} · {activeMedia.date}
              </div>
              <h2 className="text-xl font-bold font-serif text-[#002244]">
                {activeMedia.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {activeMedia.description}
              </p>
            </div>

            {/* Scientific Context */}
            <div className="p-3 bg-slate-50 border border-slate-200 space-y-1 text-xs">
              <span className="font-bold text-slate-900 uppercase font-mono text-[11px] block">
                Scientific Context & Field Methodology:
              </span>
              <p className="text-slate-700 leading-relaxed">
                {activeMedia.scientificContext}
              </p>
            </div>

            {/* Metadata Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono bg-slate-100 p-2.5 border border-slate-200">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Location</span>
                <span className="font-semibold text-slate-800">{activeMedia.region}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Date</span>
                <span className="font-semibold text-slate-800">{activeMedia.date}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Expedition</span>
                <span className="font-semibold text-slate-800">ISEA 44</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Source</span>
                <span className="font-semibold text-slate-800">{activeMedia.creator}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 border-t border-slate-200 flex flex-wrap gap-2.5">
              <button
                onClick={() => {
                  const query = `Tell me more about the scientific context of ${activeMedia.title}`;
                  setActiveMedia(null);
                  onNavigate('ai', { query });
                }}
                className="ds-btn-primary text-xs"
              >
                <span>Ask Polar AI About This Media</span>
              </button>
              <button
                onClick={() => {
                  setActiveMedia(null);
                  onNavigate('studio', {
                    sourceId: activeMedia.relatedResearchId || activeMedia.id,
                    sourceType: 'Publication',
                  });
                }}
                className="ds-btn-secondary text-xs"
              >
                <span>Generate Outreach Package</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
