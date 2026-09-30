import React, { useState } from 'react';
import { PolarRepository } from '../../lib/supabase';
import { MediaItem } from '../../types/polar';
import {
  Film,
  Camera,
  Mic,
  Compass,
  Satellite,
  Waves,
  Play,
  X,
  ExternalLink,
  Share2,
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';

interface MediaPortalViewProps {
  onNavigate: (tab: any, params?: any) => void;
  prefillLocationId?: string;
}

export const MediaPortalView: React.FC<MediaPortalViewProps> = ({ onNavigate, prefillLocationId }) => {
  const mediaItems = PolarRepository.getMedia();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);

  const categories = [
    'All',
    'Videos',
    'Photography',
    'Scientist Stories',
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
      {/* Header */}
      <div className="space-y-2 border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono tracking-widest uppercase mb-1">
            <Film className="w-3.5 h-3.5 text-sky-400" />
            <span>Polar Field Cinematography & Photographic Archives</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Polar Media & Documentary Portal
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            High-definition field photography, expedition footage, submersible underwater video logs, and first-hand polar scientist journals.
          </p>
        </div>

        {/* Region Selector */}
        <div className="flex items-center gap-1 self-start md:self-auto bg-slate-900 border border-slate-800 p-0.5 rounded text-xs">
          {['All', 'Antarctica', 'Arctic'].map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRegion(r)}
              className={`px-3 py-1 rounded transition-colors cursor-pointer text-xs font-medium ${
                selectedRegion === r
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-slate-800 text-white border border-slate-700 font-semibold'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Media Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveMedia(item)}
            className="group bg-[#0b101d] hover:bg-[#0e1526] border border-slate-800 hover:border-slate-700 rounded-lg overflow-hidden shadow transition-all cursor-pointer flex flex-col justify-between"
          >
            {/* Visual Thumbnail Frame */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Type Badge & Duration */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
                <span className="ds-badge ds-badge-neutral text-[10px]">
                  {item.category}
                </span>
                {item.duration && (
                  <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-slate-300">
                    {item.duration}
                  </span>
                )}
              </div>

              {/* Play Button Indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all">
                <div className="w-10 h-10 rounded-full bg-slate-900/90 border border-slate-700 text-sky-400 flex items-center justify-center shadow-lg">
                  {item.type === 'video' ? (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  ) : item.type === 'audio' ? (
                    <Mic className="w-4 h-4 text-sky-400" />
                  ) : (
                    <Camera className="w-4 h-4 text-sky-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span>{item.region}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{item.date}</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-sky-200 transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Tags & Creator */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span className="truncate max-w-[180px]">{item.creator}</span>
                <span className="text-sky-400 font-medium group-hover:underline">View Media →</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Media Detail Modal / Viewer */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b101d] border border-slate-750 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setActiveMedia(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Media Presentation Display */}
            <div className="aspect-video w-full rounded overflow-hidden bg-black border border-slate-800 relative flex items-center justify-center">
              <img
                src={activeMedia.thumbnailUrl}
                alt={activeMedia.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-6 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 text-sky-400 flex items-center justify-center shadow-xl">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
                <div className="text-white text-sm font-semibold">
                  Interactive Polar Stream Preview Active
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Duration: {activeMedia.duration || 'Full HD Resolution'} · {activeMedia.region}
                </div>
              </div>
            </div>

            {/* Meta & Title */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                <span className="ds-badge ds-badge-neutral text-[10px]">{activeMedia.category}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>{activeMedia.region}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>{activeMedia.date}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Creator: {activeMedia.creator}</span>
              </div>
              <h2 className="text-xl font-bold text-white">
                {activeMedia.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeMedia.description}
              </p>
            </div>

            {/* Scientific Context */}
            <div className="p-3.5 bg-slate-900 border-l-2 border-sky-400 rounded-r space-y-1">
              <div className="text-xs font-semibold text-white uppercase tracking-wide">
                Scientific Context & Field Methodology
              </div>
              <div className="text-xs text-slate-400 leading-relaxed">
                {activeMedia.scientificContext}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2.5 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  const query = `Tell me more about the scientific context of ${activeMedia.title}`;
                  setActiveMedia(null);
                  onNavigate('ai', { query });
                }}
                className="ds-btn-primary text-xs py-1.5 px-3"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span>Ask Polar AI About This Media</span>
              </button>

              <button
                onClick={() => {
                  const mediaId = activeMedia.id;
                  setActiveMedia(null);
                  onNavigate('studio', { sourceId: activeMedia.relatedResearchId || 'res-thwaites-grounding', sourceType: 'Publication' });
                }}
                className="ds-btn-secondary text-xs py-1.5 px-3"
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
