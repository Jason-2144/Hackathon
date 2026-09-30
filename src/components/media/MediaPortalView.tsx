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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-widest uppercase">
          <Film className="w-3.5 h-3.5" />
          <span>Polar Discovery Cinema & Photographic Archives</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Polar Media & Documentary Portal
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          High-definition field photography, expedition footage, submersible underwater video logs, and first-hand polar scientist journals.
        </p>
      </div>

      {/* Filter Ribbon */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Region Selector */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0 text-xs">
          <span className="text-slate-500 font-mono">Region:</span>
          {['All', 'Antarctica', 'Arctic'].map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRegion(r)}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                selectedRegion === r
                  ? 'bg-slate-800 text-cyan-300 border border-slate-700 font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Media Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveMedia(item)}
            className="group bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl overflow-hidden shadow-lg transition-all cursor-pointer flex flex-col justify-between"
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
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-slate-700 text-[10px] font-mono text-cyan-300 uppercase">
                  {item.category}
                </span>
                {item.duration && (
                  <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-slate-300">
                    {item.duration}
                  </span>
                )}
              </div>

              {/* Play Button Indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                <div className="w-12 h-12 rounded-full bg-cyan-500/90 text-slate-950 flex items-center justify-center shadow-2xl">
                  {item.type === 'video' ? (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  ) : item.type === 'audio' ? (
                    <Mic className="w-5 h-5 text-slate-950" />
                  ) : (
                    <Camera className="w-5 h-5 text-slate-950" />
                  )}
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                {/* Unboxed metadata line with typographic separators */}
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span>{item.region}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.date}</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Tags & Creator */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span className="truncate max-w-[180px]">{item.creator}</span>
                <span className="text-cyan-400 font-medium group-hover:underline">View Media →</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Media Detail Modal / Viewer */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#090f1d] border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setActiveMedia(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Media Presentation Display */}
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-800 relative flex items-center justify-center">
              <img
                src={activeMedia.thumbnailUrl}
                alt={activeMedia.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-xl animate-pulse">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
                <div className="text-white text-sm font-semibold max-w-md">
                  Interactive Polar Stream Preview Active
                </div>
                <div className="text-xs text-slate-300 font-mono">
                  Duration: {activeMedia.duration || 'Full HD Resolution'} · {activeMedia.region}
                </div>
              </div>
            </div>

            {/* Meta & Title */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span>{activeMedia.category}</span>
                <span aria-hidden="true">·</span>
                <span>{activeMedia.region}</span>
                <span aria-hidden="true">·</span>
                <span>{activeMedia.date}</span>
                <span aria-hidden="true">·</span>
                <span>Creator: {activeMedia.creator}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {activeMedia.title}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeMedia.description}
              </p>
            </div>

            {/* Scientific Context */}
            <div className="p-4 bg-cyan-950/20 border-l-2 border-cyan-400 rounded-r-xl space-y-1">
              <div className="text-xs font-bold text-cyan-300 uppercase tracking-wide">
                Scientific Context & Field Methodology
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                {activeMedia.scientificContext}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  const query = `Tell me more about the scientific context of ${activeMedia.title}`;
                  setActiveMedia(null);
                  onNavigate('ai', { query });
                }}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                <span>Ask Polar AI About This Media</span>
              </button>

              <button
                onClick={() => {
                  setActiveMedia(null);
                  onNavigate('story-studio');
                }}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                <span>Generate Story Article</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
