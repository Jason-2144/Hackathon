import React, { useState } from 'react';
import { PolarLocation } from '../../types/polar';
import { PolarMapCanvas } from './PolarMapCanvas';
import { PolarRepository } from '../../lib/supabase';
import {
  Compass,
  FileText,
  Database,
  Film,
  Sparkles,
  ArrowRight,
  ExternalLink,
  BookOpen,
  CheckCircle2
} from 'lucide-react';

interface ExploreViewProps {
  onNavigate: (tab: any, params?: any) => void;
  initialLocationId?: string;
}

export const ExploreView: React.FC<ExploreViewProps> = ({ onNavigate, initialLocationId }) => {
  const locations = PolarRepository.getLocations();

  const [region, setRegion] = useState<'Antarctica' | 'Arctic'>('Antarctica');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Default to Thwaites or initialLocationId
  const initialLoc = initialLocationId
    ? locations.find((l) => l.id === initialLocationId) || locations[0]
    : locations.find((l) => l.id === 'loc-thwaites') || locations[0];

  const [selectedLocation, setSelectedLocation] = useState<PolarLocation>(initialLoc);

  const categories = [
    'All',
    'Research',
    'Climate',
    'Glaciers',
    'Wildlife',
    'Expeditions',
    'Stations',
  ];

  // Related data lookups
  const relatedResearch = PolarRepository.getResearch().filter((r) =>
    selectedLocation.relatedResearchIds?.includes(r.id)
  );
  const relatedDatasets = PolarRepository.getDatasets().filter((d) =>
    selectedLocation.relatedDatasetIds?.includes(d.id)
  );
  const relatedMedia = PolarRepository.getMedia().filter((m) =>
    selectedLocation.relatedMediaIds?.includes(m.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* 1. Header & Region Switch */}
      <div className="border-b border-slate-300 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#003366]">
            Spatial Cartography · Ministry of Earth Sciences (MoES)
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#002244] tracking-tight mt-1">
            Polar Cartography & Observatories
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Polar stereographic cartography preventing Mercator high-latitude distortion. Inspect active Indian stations, grounding lines, ice streams, and satellite telemetry.
          </p>
        </div>

        {/* Region Switcher */}
        <div className="flex items-center gap-1 border border-slate-300 bg-white p-1 text-xs self-start md:self-auto font-mono">
          <button
            onClick={() => {
              setRegion('Antarctica');
              const antLoc = locations.find((l) => l.region === 'Antarctica');
              if (antLoc) setSelectedLocation(antLoc);
            }}
            className={`px-3 py-1.5 font-medium cursor-pointer transition-colors ${
              region === 'Antarctica'
                ? 'bg-[#002244] text-white font-bold'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Antarctica (90°S)
          </button>
          <button
            onClick={() => {
              setRegion('Arctic');
              const arcLoc = locations.find((l) => l.region === 'Arctic');
              if (arcLoc) setSelectedLocation(arcLoc);
            }}
            className={`px-3 py-1.5 font-medium cursor-pointer transition-colors ${
              region === 'Arctic'
                ? 'bg-[#002244] text-white font-bold'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Arctic (90°N)
          </button>
        </div>
      </div>

      {/* 2. Category Filter Strip */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs border-b border-slate-200">
        <span className="text-slate-500 font-mono text-[11px] mr-2 shrink-0">Filter Sites:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 font-medium whitespace-nowrap cursor-pointer transition-colors border ${
              activeCategory === cat
                ? 'bg-[#002244] text-white border-[#001730] font-semibold'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. Main Split Layout: Map Canvas + Location Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Map Projection Canvas */}
        <div className="lg:col-span-6 space-y-3">
          <div className="border border-slate-300 bg-white p-2">
            <PolarMapCanvas
              region={region}
              locations={locations}
              selectedLocation={selectedLocation}
              onSelectLocation={setSelectedLocation}
              activeCategory={activeCategory}
            />
          </div>

          {/* Quick Location Jump Bar */}
          <div className="bg-white border border-slate-300 p-3 space-y-2">
            <div className="text-[11px] font-mono text-slate-600 flex items-center justify-between font-semibold">
              <span>Catalogued Stations & Sites ({region}):</span>
              <span className="text-[#004c99]">Click to Inspect</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {locations
                .filter((l) => l.region === region || l.region === 'Global Polar')
                .map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`px-2 py-1 text-xs font-mono cursor-pointer border transition-colors ${
                      selectedLocation.id === loc.id
                        ? 'bg-[#002244] text-white border-[#001730] font-bold'
                        : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {loc.name}
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Right: Detailed Location Inspector Panel */}
        <div className="lg:col-span-6 border border-slate-300 bg-white p-5 space-y-4">
          {/* Header & Badges */}
          <div className="border-b border-slate-200 pb-3">
            <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-500 mb-1">
              <div>
                <span className="ds-badge ds-badge-neutral">{selectedLocation.category}</span>
                <span className="mx-1.5">·</span>
                <span>{selectedLocation.region}</span>
              </div>
              <span className="font-semibold text-slate-700">
                Status: {selectedLocation.currentStatus}
              </span>
            </div>

            <h2 className="text-xl font-bold font-serif text-[#002244]">
              {selectedLocation.name}
            </h2>
            <div className="text-xs font-mono text-slate-600 mt-1 flex flex-wrap gap-2">
              <span>
                Coordinates: {selectedLocation.coordinates.lat.toFixed(2)}°, {selectedLocation.coordinates.lng.toFixed(2)}°
              </span>
              {selectedLocation.coordinates.elevationMeters !== undefined && (
                <>
                  <span className="text-slate-300">·</span>
                  <span>Elevation: {selectedLocation.coordinates.elevationMeters}m</span>
                </>
              )}
              {selectedLocation.operatingCountry && (
                <>
                  <span className="text-slate-300">·</span>
                  <span>Operating State: {selectedLocation.operatingCountry}</span>
                </>
              )}
            </div>
          </div>

          {/* Telemetry Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-50 border border-slate-200 text-xs font-mono">
            <div>
              <div className="text-[10px] uppercase text-slate-500 font-bold">Temp Anomaly</div>
              <div className="text-lg font-bold text-[#002244] mt-0.5">
                +{selectedLocation.temperatureAnomalyC}°C
              </div>
              <div className="text-[10px] text-slate-500">Above historical baseline</div>
            </div>

            {selectedLocation.iceVelocityMetersPerYear !== undefined ? (
              <div>
                <div className="text-[10px] uppercase text-slate-500 font-bold">Ice Velocity</div>
                <div className="text-lg font-bold text-[#002244] mt-0.5">
                  {selectedLocation.iceVelocityMetersPerYear.toLocaleString()} m/yr
                </div>
                <div className="text-[10px] text-slate-500">Sentinel-1 InSAR</div>
              </div>
            ) : (
              <div>
                <div className="text-[10px] uppercase text-slate-500 font-bold">Observation</div>
                <div className="text-lg font-bold text-[#002244] mt-0.5">Continuous</div>
                <div className="text-[10px] text-slate-500">Real-time sensor feed</div>
              </div>
            )}

            <div className="col-span-2 sm:col-span-1">
              <div className="text-[10px] uppercase text-slate-500 font-bold">Linked Records</div>
              <div className="text-lg font-bold text-[#003366] mt-0.5">
                {relatedResearch.length + relatedDatasets.length} Papers & Feeds
              </div>
              <div className="text-[10px] text-slate-500">Archived in MoES</div>
            </div>
          </div>

          {/* Description & Significance */}
          <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>{selectedLocation.summary}</p>
            <div className="p-3 bg-slate-50 border-l-2 border-[#003366] border-t border-r border-b border-slate-200 space-y-0.5 text-xs">
              <span className="font-bold text-[#002244] uppercase font-mono text-[10px] block">
                Scientific Significance:
              </span>
              <p className="text-slate-700">{selectedLocation.scientificSignificance}</p>
            </div>
          </div>

          {/* Key Findings Checklist */}
          {selectedLocation.keyFindings && selectedLocation.keyFindings.length > 0 && (
            <div className="space-y-1.5">
              <h3 className="text-xs font-mono uppercase font-bold text-slate-700 tracking-wider">
                Key Empirical Observations
              </h3>
              <div className="border border-slate-300 divide-y divide-slate-200">
                {selectedLocation.keyFindings.map((finding, idx) => (
                  <div key={idx} className="p-2.5 text-xs text-slate-800 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{finding}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions Hub */}
          <div className="pt-3 border-t border-slate-200 space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => onNavigate('repository', { locationId: selectedLocation.id })}
                className="ds-btn-secondary text-xs justify-center"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Research</span>
              </button>

              <button
                onClick={() => onNavigate('repository', { locationId: selectedLocation.id, contentType: 'Dataset' })}
                className="ds-btn-secondary text-xs justify-center"
              >
                <Database className="w-3.5 h-3.5" />
                <span>Datasets</span>
              </button>

              <button
                onClick={() => onNavigate('media', { locationId: selectedLocation.id })}
                className="ds-btn-secondary text-xs justify-center"
              >
                <Film className="w-3.5 h-3.5" />
                <span>Media</span>
              </button>

              <button
                onClick={() => onNavigate('ai', { query: `Tell me about ${selectedLocation.name}` })}
                className="ds-btn-primary text-xs justify-center"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI</span>
              </button>
            </div>

            <button
              onClick={() =>
                onNavigate('studio', {
                  sourceId: selectedLocation.relatedResearchIds?.[0] || 'res-thwaites-grounding',
                  sourceType: 'Publication',
                })
              }
              className="w-full ds-btn-secondary justify-center py-2 text-xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#003366]" />
              <span>Draft Outreach Story for this Observatory</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
