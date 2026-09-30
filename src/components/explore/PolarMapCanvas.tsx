import React, { useState } from 'react';
import { PolarLocation, PolarRegion } from '../../types/polar';
import { MapPin, ZoomIn, ZoomOut, RotateCcw, Compass, Info } from 'lucide-react';

interface PolarMapCanvasProps {
  region: 'Antarctica' | 'Arctic';
  locations: PolarLocation[];
  selectedLocation: PolarLocation | null;
  onSelectLocation: (loc: PolarLocation) => void;
  activeCategory: string;
}

export const PolarMapCanvas: React.FC<PolarMapCanvasProps> = ({
  region,
  locations,
  selectedLocation,
  onSelectLocation,
  activeCategory,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hoveredLocation, setHoveredLocation] = useState<PolarLocation | null>(null);

  // Coordinate projection helper: converts Lat/Lng to circular stereographic (x, y) relative to 500x500 SVG center (250, 250)
  const projectCoordinates = (lat: number, lng: number, isAntarctica: boolean) => {
    const center = 250;
    const maxRadius = 210;

    if (isAntarctica) {
      // South Pole is at -90°. Equator is 0°. The outer rim is around -60°.
      // Distance from pole = (90 - abs(lat)) / 30 * maxRadius
      const colatitude = 90 - Math.abs(lat); // 0 at pole, 30 at -60°S
      const r = (colatitude / 30) * maxRadius;
      // Convert lng (-180 to 180) to radians. Antarctica standard orientation: 0° meridian up
      const rad = ((lng - 90) * Math.PI) / 180;
      const x = center + r * Math.cos(rad);
      const y = center + r * Math.sin(rad);
      return { x, y };
    } else {
      // North Pole is at 90°N. Outer rim is ~60°N.
      const colatitude = 90 - lat; // 0 at 90°N, 30 at 60°N
      const r = (colatitude / 30) * maxRadius;
      const rad = ((lng + 90) * Math.PI) / 180;
      const x = center + r * Math.cos(rad);
      const y = center + r * Math.sin(rad);
      return { x, y };
    }
  };

  const isAntarctica = region === 'Antarctica';

  const filteredLocations = locations.filter((loc) => {
    if (loc.region !== region && loc.region !== 'Global Polar') return false;
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Research' && (loc.category === 'Research Station' || loc.category === 'Climate Observatory')) return true;
    if (activeCategory === 'Climate' && loc.category === 'Climate Observatory') return true;
    if (activeCategory === 'Glaciers' && loc.category === 'Glacier') return true;
    if (activeCategory === 'Wildlife' && loc.category === 'Wildlife Habitat') return true;
    if (activeCategory === 'Expeditions' && loc.category === 'Expedition Site') return true;
    if (activeCategory === 'Stations' && loc.category === 'Research Station') return true;
    return true;
  });

  return (
    <div className="relative w-full aspect-square max-w-[620px] mx-auto bg-[#070d1a] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center p-4">
      {/* Background radial coordinates grid styling */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 bg-[#0a1224]/90 backdrop-blur-md p-1.5 rounded-lg border border-slate-700/80">
        <button
          onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
          className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
          className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoomLevel(1)}
          className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Projection Telemetry Badge */}
      <div className="absolute top-4 right-4 z-20 text-right pointer-events-none">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0a1224]/90 border border-slate-700 text-[11px] font-mono text-cyan-300">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>{isAntarctica ? 'EPSG:3031 · South Polar' : 'EPSG:3413 · North Polar'}</span>
        </div>
        <div className="text-[10px] text-slate-500 font-mono mt-1">Scale: 1:15,000,000</div>
      </div>

      {/* Hover preview tooltip */}
      {hoveredLocation && (
        <div className="absolute bottom-4 left-4 z-20 max-w-xs bg-[#0a1224]/95 border border-cyan-500/40 rounded-lg p-2.5 shadow-xl text-left pointer-events-none">
          <div className="text-xs font-semibold text-white flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-pulse" />
            {hoveredLocation.name}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
            {hoveredLocation.category} · {hoveredLocation.coordinates.lat.toFixed(2)}°, {hoveredLocation.coordinates.lng.toFixed(2)}°
          </div>
          <div className="text-[10px] text-cyan-300 font-mono mt-1">
            Temp Anomaly: +{hoveredLocation.temperatureAnomalyC}°C
          </div>
        </div>
      )}

      {/* Interactive SVG Projection */}
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full transition-transform duration-300 select-none"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <defs>
          <radialGradient id="polarOceanGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#08101f" />
            <stop offset="70%" stopColor="#050a14" />
            <stop offset="100%" stopColor="#03060a" />
          </radialGradient>

          <linearGradient id="iceShelfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0e2338" stopOpacity="0.6" />
          </linearGradient>

          <linearGradient id="landmassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#224263" />
            <stop offset="50%" stopColor="#172e47" />
            <stop offset="100%" stopColor="#102235" />
          </linearGradient>
        </defs>

        {/* Ocean Background Disk */}
        <circle cx="250" cy="250" r="230" fill="url(#polarOceanGrad)" stroke="#1e293b" strokeWidth="1.5" />

        {/* Graticule Radial Longitude Spokes */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x2 = 250 + 230 * Math.cos(rad);
          const y2 = 250 + 230 * Math.sin(rad);
          return (
            <line
              key={deg}
              x1="250"
              y1="250"
              x2={x2}
              y2={y2}
              stroke="#17253b"
              strokeWidth="0.7"
              strokeDasharray="3 3"
            />
          );
        })}

        {/* Latitude Concentric Rings */}
        <circle cx="250" cy="250" r="70" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
        <text x="250" y="176" fill="#475569" fontSize="8" textAnchor="middle" fontFamily="monospace">
          {isAntarctica ? '80°S' : '80°N'}
        </text>

        <circle cx="250" cy="250" r="140" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
        <text x="250" y="106" fill="#475569" fontSize="8" textAnchor="middle" fontFamily="monospace">
          {isAntarctica ? '70°S' : '70°N'}
        </text>

        <circle cx="250" cy="250" r="210" fill="none" stroke="#334155" strokeWidth="1.2" />
        <text x="250" y="36" fill="#64748b" fontSize="8" textAnchor="middle" fontFamily="monospace">
          {isAntarctica ? '60°S (Antarctic Treaty Boundary)' : '60°N (Arctic Circle)'}
        </text>

        {/* High-Precision Stylized Polar Landmasses */}
        {isAntarctica ? (
          <g id="antarctica-geometry">
            {/* Outer Sea Ice / Shelf Edge (Subtle semi-transparent) */}
            <path
              d="M 240,85 C 310,95 385,140 405,220 C 425,295 385,385 300,410 C 235,425 155,405 110,345 C 80,300 70,230 100,165 C 130,110 180,80 240,85 Z"
              fill="url(#iceShelfGrad)"
              stroke="#38bdf8"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />

            {/* Core Continental Bedrock & Sheet */}
            <path
              d="M 235,115 C 285,120 345,150 365,210 C 380,265 350,335 295,360 C 245,380 180,365 140,320 C 115,280 110,225 130,175 C 150,135 190,110 235,115 Z"
              fill="url(#landmassGrad)"
              stroke="#38bdf8"
              strokeWidth="1.2"
            />

            {/* Antarctic Peninsula Reach */}
            <path
              d="M 175,140 Q 145,95 130,65 Q 120,60 115,70 Q 130,105 160,150 Z"
              fill="url(#landmassGrad)"
              stroke="#38bdf8"
              strokeWidth="1"
            />

            {/* Ross Ice Shelf Embeyment (Carve out) */}
            <path
              d="M 260,330 C 280,340 270,300 245,300 C 220,300 230,340 260,330 Z"
              fill="#08101f"
              stroke="#38bdf8"
              strokeWidth="0.8"
              strokeDasharray="2 2"
            />

            {/* South Pole Center Marker */}
            <circle cx="250" cy="250" r="3" fill="#38bdf8" />
            <text x="250" y="263" fill="#7dd3fc" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
              South Pole 90°S
            </text>
          </g>
        ) : (
          <g id="arctic-geometry">
            {/* Greenland Continent */}
            <path
              d="M 220,320 C 240,290 260,250 250,220 C 235,190 205,210 195,245 C 185,285 200,325 220,320 Z"
              fill="url(#landmassGrad)"
              stroke="#38bdf8"
              strokeWidth="1.2"
            />
            {/* Svalbard Archipelago */}
            <ellipse cx="270" cy="180" rx="10" ry="7" fill="url(#landmassGrad)" stroke="#38bdf8" strokeWidth="0.8" />
            {/* Northern Eurasia / Russia coastline arc */}
            <path
              d="M 330,110 C 370,140 400,200 410,270 C 415,310 405,360 380,400"
              fill="none"
              stroke="#334155"
              strokeWidth="2"
            />
            {/* Canadian Archipelago & North America arc */}
            <path
              d="M 120,390 C 95,340 90,270 100,210 C 110,160 140,110 180,80"
              fill="none"
              stroke="#334155"
              strokeWidth="2"
            />
            {/* Arctic Ocean Basin Center */}
            <circle cx="250" cy="250" r="3" fill="#38bdf8" />
            <text x="250" y="263" fill="#7dd3fc" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
              North Pole 90°N
            </text>
          </g>
        )}

        {/* Location Markers */}
        {filteredLocations.map((loc) => {
          const { x, y } = projectCoordinates(loc.coordinates.lat, loc.coordinates.lng, isAntarctica);
          const isSelected = selectedLocation?.id === loc.id;
          const isHovered = hoveredLocation?.id === loc.id;

          // Color coded by category
          const color =
            loc.category === 'Glacier'
              ? '#38bdf8' // Cyan
              : loc.category === 'Research Station'
              ? '#f59e0b' // Amber
              : loc.category === 'Wildlife Habitat'
              ? '#10b981' // Emerald
              : loc.category === 'Expedition Site'
              ? '#a855f7' // Purple
              : '#3b82f6'; // Blue

          return (
            <g
              key={loc.id}
              className="cursor-pointer transition-transform"
              onClick={() => onSelectLocation(loc)}
              onMouseEnter={() => setHoveredLocation(loc)}
              onMouseLeave={() => setHoveredLocation(null)}
            >
              {/* Outer Pulsing Glow */}
              <circle
                cx={x}
                cy={y}
                r={isSelected ? 16 : isHovered ? 12 : 8}
                fill={color}
                fillOpacity={isSelected ? 0.35 : 0.2}
                className="animate-ping"
                style={{ animationDuration: '3s' }}
              />

              {/* Pin Base Halo */}
              <circle
                cx={x}
                cy={y}
                r={isSelected ? 8 : 6}
                fill="#070d1a"
                stroke={color}
                strokeWidth={isSelected ? 2.5 : 1.5}
              />

              {/* Pin Center Dot */}
              <circle cx={x} cy={y} r={isSelected ? 4 : 3} fill={color} />

              {/* Text Label on Selected or Hovered */}
              {(isSelected || isHovered) && (
                <text
                  x={x}
                  y={y - 12}
                  fill="#ffffff"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] font-sans"
                >
                  {loc.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
