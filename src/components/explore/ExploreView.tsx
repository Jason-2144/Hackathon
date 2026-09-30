import React, { useState } from 'react';
import { PolarLocation } from '../../types/polar';
import { PolarMapCanvas } from './PolarMapCanvas';
import { PolarRepository } from '../../lib/supabase';
import {
  Compass,
  Thermometer,
  Wind,
  Layers,
  FileText,
  Database,
  Film,
  Sparkles,
  ArrowRight,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  Share2
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
      {/* Page Title & Region Segmented Switch */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono tracking-widest uppercase mb-1">
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span>Interactive Polar Cartography</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Explore Polar Regions
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Examine high-latitude research stations, rapidly retreating ice streams, ecological reserves, and satellite telemetry across both planetary poles.
          </p>
        </div>

        {/* Region Switcher Tabs */}
        <div className="inline-flex p-0.5 bg-slate-900 border border-slate-800 rounded self-start md:self-auto">
          <button
            onClick={() => {
              setRegion('Antarctica');
              const antLoc = locations.find((l) => l.region === 'Antarctica');
              if (antLoc) setSelectedLocation(antLoc);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-all cursor-pointer whitespace-nowrap ${
              region === 'Antarctica'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
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
            className={`px-3 py-1.5 text-xs font-medium rounded transition-all cursor-pointer whitespace-nowrap ${
              region === 'Arctic'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Arctic (90°N)
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs text-slate-400 font-mono shrink-0 mr-1">Filter Sites:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === cat
                ? 'bg-slate-800 text-white border border-slate-700 font-semibold'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Split Layout: Interactive Map + Detailed Location Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Map Projection Canvas */}
        <div className="lg:col-span-6 space-y-3">
          <PolarMapCanvas
            region={region}
            locations={locations}
            selectedLocation={selectedLocation}
            onSelectLocation={setSelectedLocation}
            activeCategory={activeCategory}
          />

          {/* Quick Location Buttons Bar */}
          <div className="bg-[#0b101d] border border-slate-800 rounded-lg p-3">
            <div className="text-[11px] font-mono text-slate-400 mb-2 flex items-center justify-between">
              <span>Quick Jump Locations ({region}):</span>
              <span className="text-sky-400">Click to Inspect</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {locations
                .filter((l) => l.region === region || l.region === 'Global Polar')
                .map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`px-2 py-1 text-xs rounded transition-all cursor-pointer font-mono text-[11px] ${
                      selectedLocation.id === loc.id
                        ? 'bg-slate-800 text-white border border-slate-700 font-semibold'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {loc.name}
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Right: Detailed Location Inspector Panel */}
        <div className="lg:col-span-6 bg-[#0b101d] border border-slate-800 rounded-lg p-5 sm:p-6 space-y-5">
          {/* Header & Badges */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="ds-badge ds-badge-neutral">{selectedLocation.category}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>{selectedLocation.region}</span>
              </div>
              <span className="ds-badge ds-badge-neutral text-[10px]">
                {selectedLocation.currentStatus}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {selectedLocation.name}
            </h2>
            <div className="text-xs font-mono text-slate-400 mt-1 flex flex-wrap gap-2">
              <span>
                Coordinates: {selectedLocation.coordinates.lat.toFixed(2)}°, {selectedLocation.coordinates.lng.toFixed(2)}°
              </span>
              {selectedLocation.coordinates.elevationMeters !== undefined && (
                <>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>Elevation: {selectedLocation.coordinates.elevationMeters}m</span>
                </>
              )}
              {selectedLocation.operatingCountry && (
                <>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-slate-300">{selectedLocation.operatingCountry}</span>
                </>
              )}
            </div>
          </div>

          {/* Telemetry Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-900 rounded border border-slate-800">
            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                Temp Anomaly
              </div>
              <div className="text-xl font-bold font-mono text-white mt-0.5">
                +{selectedLocation.temperatureAnomalyC}°C
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Above baseline</div>
            </div>

            {selectedLocation.iceVelocityMetersPerYear !== undefined ? (
              <div>
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                  Ice Velocity
                </div>
                <div className="text-xl font-bold font-mono text-white mt-0.5">
                  {selectedLocation.iceVelocityMetersPerYear.toLocaleString()} m/yr
                </div>
                <div className="text-[10px] text-slate-500 font-mono">Sentinel-1 InSAR</div>
              </div>
            ) : (
              <div>
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                  Observation
                </div>
                <div className="text-xl font-bold font-mono text-white mt-0.5">
                  24/7 Monitored
                </div>
                <div className="text-[10px] text-slate-500 font-mono">Continuous telemetry</div>
              </div>
            )}

            <div className="col-span-2 sm:col-span-1">
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                Data Links
              </div>
              <div className="text-xl font-bold font-mono text-sky-400 mt-0.5">
                {relatedResearch.length + relatedDatasets.length} Records
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Open / Verified</div>
            </div>
          </div>

          {/* Description & Significance */}
          <div className="space-y-2 text-sm leading-relaxed text-slate-300">
            <p>{selectedLocation.summary}</p>
            <div className="p-3 bg-slate-900 border-l-2 border-sky-400 rounded-r text-slate-300 text-xs">
              <span className="font-semibold text-white block mb-0.5">Scientific Significance:</span>
              <span className="text-slate-400">{selectedLocation.scientificSignificance}</span>
            </div>
          </div>

          {/* Key Findings Checklist */}
          {selectedLocation.keyFindings && selectedLocation.keyFindings.length > 0 && (
            <div className="space-y-1.5">
              <h3 className="text-[11px] uppercase font-mono tracking-wider text-slate-400">
                Key Empirical Observations
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedLocation.keyFindings.map((finding, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons Hub */}
          <div className="pt-3 border-t border-slate-800 space-y-2.5">
            <div className="text-[11px] font-mono text-slate-400">Scientific Actions:</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => onNavigate('repository', { locationId: selectedLocation.id })}
                className="ds-btn-secondary text-xs py-1.5 px-2.5 justify-center"
              >
                <FileText className="w-3.5 h-3.5 text-slate-300" />
                <span>Read Research</span>
              </button>

              <button
                onClick={() => onNavigate('visualizations', { locationId: selectedLocation.id })}
                className="ds-btn-secondary text-xs py-1.5 px-2.5 justify-center"
              >
                <Database className="w-3.5 h-3.5 text-slate-300" />
                <span>View Data</span>
              </button>

              <button
                onClick={() => onNavigate('media', { locationId: selectedLocation.id })}
                className="ds-btn-secondary text-xs py-1.5 px-2.5 justify-center"
              >
                <Film className="w-3.5 h-3.5 text-slate-300" />
                <span>View Media</span>
              </button>

              <button
                onClick={() => onNavigate('ai', { query: `Tell me about ${selectedLocation.name}` })}
                className="ds-btn-primary text-xs py-1.5 px-2.5 justify-center"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span>Ask Polar AI</span>
              </button>
            </div>

            {/* Standout feature shortcut: Turn into Story */}
            <button
              onClick={() => onNavigate('studio', { sourceId: selectedLocation.relatedResearchIds?.[0] || 'res-thwaites-grounding', sourceType: 'Publication' })}
              className="w-full flex items-center justify-between p-3 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-400" />
                <span>Create Outreach Content from this Site</span>
              </div>
              <ArrowRight className="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
