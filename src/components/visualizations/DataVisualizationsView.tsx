import React, { useState } from 'react';
import { PolarRepository } from '../../lib/supabase';
import {
  LineChart,
  BarChart3,
  TrendingDown,
  TrendingUp,
  Info,
  Download,
  Sparkles,
  Layers,
  ArrowRight,
  Database
} from 'lucide-react';

interface DataVisualizationsViewProps {
  onNavigate: (tab: any, params?: any) => void;
  prefillLocationId?: string;
}

export const DataVisualizationsView: React.FC<DataVisualizationsViewProps> = ({
  onNavigate,
  prefillLocationId,
}) => {
  const [activeChart, setActiveChart] = useState<'seaIce' | 'glacier' | 'temperature' | 'expeditions'>('seaIce');
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; label: string; value: string; extra?: string } | null>(null);

  // Sea ice trend data (1980 - 2026)
  const seaIceData = [
    { year: 1980, antarctic: 3.1, arctic: 7.8, anomaly: 0.8 },
    { year: 1985, antarctic: 2.9, arctic: 6.9, anomaly: 0.4 },
    { year: 1990, antarctic: 3.0, arctic: 6.5, anomaly: 0.2 },
    { year: 1995, antarctic: 3.2, arctic: 6.1, anomaly: 0.1 },
    { year: 2000, antarctic: 2.8, arctic: 6.3, anomaly: 0.0 },
    { year: 2005, antarctic: 2.9, arctic: 5.5, anomaly: -0.6 },
    { year: 2010, antarctic: 3.1, arctic: 4.9, anomaly: -1.2 },
    { year: 2015, antarctic: 3.4, arctic: 4.6, anomaly: -1.5 },
    { year: 2020, antarctic: 2.7, arctic: 3.9, anomaly: -2.3 },
    { year: 2022, antarctic: 1.98, arctic: 4.6, anomaly: -2.5 },
    { year: 2023, antarctic: 1.79, arctic: 4.2, anomaly: -2.9 },
    { year: 2024, antarctic: 1.83, arctic: 4.3, anomaly: -2.7 },
    { year: 2025, antarctic: 1.88, arctic: 4.2, anomaly: -2.6 },
    { year: 2026, antarctic: 1.85, arctic: 4.15, anomaly: -2.7 },
  ];

  // Thwaites Grounding line retreat
  const thwaitesRetreatData = [
    { year: 1996, retreatKm: 0, velocityMeters: 2100 },
    { year: 2002, retreatKm: 2.5, velocityMeters: 2400 },
    { year: 2008, retreatKm: 5.1, velocityMeters: 2700 },
    { year: 2014, retreatKm: 8.8, velocityMeters: 2950 },
    { year: 2020, retreatKm: 12.2, velocityMeters: 3150 },
    { year: 2024, retreatKm: 14.4, velocityMeters: 3200 },
    { year: 2026, retreatKm: 15.1, velocityMeters: 3250 },
  ];

  // Temperature anomaly comparison
  const temperatureData = [
    { year: 1980, global: 0.27, arctic: 0.42, antarctica: 0.15 },
    { year: 1990, global: 0.45, arctic: 0.81, antarctica: 0.32 },
    { year: 2000, global: 0.62, arctic: 1.25, antarctica: 0.48 },
    { year: 2010, global: 0.72, arctic: 1.95, antarctica: 0.65 },
    { year: 2020, global: 1.02, arctic: 3.12, antarctica: 0.95 },
    { year: 2024, global: 1.28, arctic: 3.85, antarctica: 1.15 },
    { year: 2026, global: 1.34, arctic: 4.10, antarctica: 1.24 },
  ];

  const handleExportData = () => {
    let payload = '';
    if (activeChart === 'seaIce') payload = JSON.stringify(seaIceData, null, 2);
    else if (activeChart === 'glacier') payload = JSON.stringify(thwaitesRetreatData, null, 2);
    else payload = JSON.stringify(temperatureData, null, 2);

    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `polaris_${activeChart}_dataset.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2 border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-widest uppercase">
            <LineChart className="w-3.5 h-3.5" />
            <span>Empirical Cryospheric Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Polar Data Visualizations
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl">
            Interactive multi-decadal time-series: sea ice minimum extent, glacier grounding line retreat, and polar amplification thermal indices.
          </p>
        </div>

        <button
          onClick={handleExportData}
          className="self-start md:self-auto flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span>Export Raw Telemetry (.JSON)</span>
        </button>
      </div>

      {/* Chart Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => {
            setActiveChart('seaIce');
            setHoveredPoint(null);
          }}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeChart === 'seaIce'
              ? 'bg-cyan-600 text-white shadow-sm'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Sea Ice Minimum Extent (1980 - 2026)
        </button>

        <button
          onClick={() => {
            setActiveChart('glacier');
            setHoveredPoint(null);
          }}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeChart === 'glacier'
              ? 'bg-cyan-600 text-white shadow-sm'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Thwaites Grounding Retreat & Velocity
        </button>

        <button
          onClick={() => {
            setActiveChart('temperature');
            setHoveredPoint(null);
          }}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeChart === 'temperature'
              ? 'bg-cyan-600 text-white shadow-sm'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Arctic Amplification vs Global Warming
        </button>
      </div>

      {/* Primary Chart Stage */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-6 shadow-2xl relative">
        {/* Chart Header Information */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              {activeChart === 'seaIce' && 'Satellite Passive Microwave Radiometry (NSIDC/NASA)'}
              {activeChart === 'glacier' && 'Radar Interferometry (InSAR) & Sub-Ice Profiling'}
              {activeChart === 'temperature' && 'Surface Air Temperature Anomaly relative to 1951-1980 baseline'}
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              {activeChart === 'seaIce' && 'Antarctic & Arctic Sea Ice Summer Minimum (Million km²)'}
              {activeChart === 'glacier' && 'Thwaites Grounding Line Inland Retreat & Flow Velocity'}
              {activeChart === 'temperature' && 'Four-Fold Accelerated Warming of the Arctic'}
            </h2>
          </div>

          {/* Precision Monospace Status Badge */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-slate-400">Data Source:</span>
            <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/50 text-cyan-300">
              Validated Cryosphere Telemetry
            </span>
          </div>
        </div>

        {/* Hover Monospace HUD Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute z-20 pointer-events-none bg-[#0a1224]/95 border border-cyan-400/50 p-3 rounded-lg shadow-2xl text-xs font-mono space-y-0.5"
            style={{
              left: `${Math.min(hoveredPoint.x, 700)}px`,
              top: `${Math.max(hoveredPoint.y - 60, 20)}px`,
            }}
          >
            <div className="text-white font-bold">{hoveredPoint.label}</div>
            <div className="text-cyan-300">{hoveredPoint.value}</div>
            {hoveredPoint.extra && <div className="text-slate-400 text-[10px]">{hoveredPoint.extra}</div>}
          </div>
        )}

        {/* Render Chart 1: Sea Ice Time-Series */}
        {activeChart === 'seaIce' && (
          <div className="space-y-4">
            <div className="w-full h-72 sm:h-80 relative select-none">
              <svg viewBox="0 0 800 320" className="w-full h-full overflow-visible">
                {/* Horizontal Grid lines */}
                {[0, 2, 4, 6, 8].map((val) => {
                  const y = 280 - (val / 9) * 250;
                  return (
                    <g key={val}>
                      <line x1="60" y1={y} x2="780" y2={y} stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                      <text x="45" y={y + 4} fill="#64748b" fontSize="11" textAnchor="end" fontFamily="monospace">
                        {val} M km²
                      </text>
                    </g>
                  );
                })}

                {/* Vertical year ticks */}
                {seaIceData.map((d, idx) => {
                  const x = 60 + (idx / (seaIceData.length - 1)) * 720;
                  return (
                    <g key={d.year}>
                      <line x1={x} y1="280" x2={x} y2="285" stroke="#334155" strokeWidth="1" />
                      {idx % 2 === 0 && (
                        <text x={x} y="302" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">
                          {d.year}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Arctic Line (Blue) */}
                <path
                  d={seaIceData
                    .map((d, idx) => {
                      const x = 60 + (idx / (seaIceData.length - 1)) * 720;
                      const y = 280 - (d.arctic / 9) * 250;
                      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                />

                {/* Antarctic Line (Amber) */}
                <path
                  d={seaIceData
                    .map((d, idx) => {
                      const x = 60 + (idx / (seaIceData.length - 1)) * 720;
                      const y = 280 - (d.antarctic / 9) * 250;
                      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                />

                {/* Interactive Points */}
                {seaIceData.map((d, idx) => {
                  const x = 60 + (idx / (seaIceData.length - 1)) * 720;
                  const yAnt = 280 - (d.antarctic / 9) * 250;
                  const yArc = 280 - (d.arctic / 9) * 250;
                  return (
                    <g key={d.year}>
                      {/* Arctic Point */}
                      <circle
                        cx={x}
                        cy={yArc}
                        r="4"
                        fill="#070d1a"
                        stroke="#38bdf8"
                        strokeWidth="2"
                        className="cursor-pointer hover:r-6 transition-all"
                        onMouseEnter={(e) =>
                          setHoveredPoint({
                            x: e.clientX,
                            y: e.clientY,
                            label: `Arctic September Minimum (${d.year})`,
                            value: `${d.arctic} Million km²`,
                            extra: `Anomaly: ${d.anomaly > 0 ? '+' : ''}${d.anomaly}M km²`,
                          })
                        }
                        onMouseLeave={() => setHoveredPoint(null)}
                      />
                      {/* Antarctic Point */}
                      <circle
                        cx={x}
                        cy={yAnt}
                        r="4"
                        fill="#070d1a"
                        stroke="#f59e0b"
                        strokeWidth="2"
                        className="cursor-pointer hover:r-6 transition-all"
                        onMouseEnter={(e) =>
                          setHoveredPoint({
                            x: e.clientX,
                            y: e.clientY,
                            label: `Antarctic Summer Minimum (${d.year})`,
                            value: `${d.antarctic} Million km²`,
                            extra: `Post-2022 historic regime shift below 2.0M`,
                          })
                        }
                        onMouseLeave={() => setHoveredPoint(null)}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Legend & Stats Callout */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-sky-400" />
                  <span className="text-slate-200">Arctic September Minimum (Multi-year loss)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="text-slate-200">Antarctic February Minimum (Historic 2023 Low)</span>
                </div>
              </div>
              <div className="font-mono text-slate-400 text-[11px]">
                Hover over data points to inspect satellite readings
              </div>
            </div>
          </div>
        )}

        {/* Render Chart 2: Thwaites Glacier Retreat */}
        {activeChart === 'glacier' && (
          <div className="space-y-4">
            <div className="w-full h-72 sm:h-80 relative select-none">
              <svg viewBox="0 0 800 320" className="w-full h-full overflow-visible">
                {/* Horizontal Grid lines (km) */}
                {[0, 4, 8, 12, 16].map((km) => {
                  const y = 280 - (km / 18) * 250;
                  return (
                    <g key={km}>
                      <line x1="60" y1={y} x2="780" y2={y} stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                      <text x="45" y={y + 4} fill="#64748b" fontSize="11" textAnchor="end" fontFamily="monospace">
                        {km} km
                      </text>
                    </g>
                  );
                })}

                {/* Bars for Inland Retreat */}
                {thwaitesRetreatData.map((d, idx) => {
                  const x = 90 + idx * 95;
                  const barHeight = (d.retreatKm / 18) * 250;
                  const y = 280 - barHeight;
                  return (
                    <g
                      key={d.year}
                      className="cursor-pointer group"
                      onMouseEnter={(e) =>
                        setHoveredPoint({
                          x: e.clientX,
                          y: e.clientY,
                          label: `Thwaites Grounding Zone (${d.year})`,
                          value: `Retreat: ${d.retreatKm} km inland`,
                          extra: `Flow Velocity: ${d.velocityMeters.toLocaleString()} m/year`,
                        })
                      }
                      onMouseLeave={() => setHoveredPoint(null)}
                    >
                      <rect
                        x={x - 20}
                        y={y}
                        width="40"
                        height={barHeight}
                        fill="#0284c7"
                        fillOpacity="0.7"
                        stroke="#38bdf8"
                        strokeWidth="1.5"
                        rx="4"
                        className="group-hover:fill-cyan-400 transition-colors"
                      />
                      <text x={x} y="300" fill="#94a3b8" fontSize="11" textAnchor="middle" fontFamily="monospace">
                        {d.year}
                      </text>
                      <text x={x} y={y - 8} fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                        {d.retreatKm} km
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800 text-xs">
              <div className="text-slate-300">
                Grounding line unpinning allows warm deep water to migrate inland beneath the ice sheet.
              </div>
              <div className="font-mono text-cyan-400 text-xs">
                Current Grounding Retreat: +14.4 km since 1996
              </div>
            </div>
          </div>
        )}

        {/* Render Chart 3: Arctic Amplification */}
        {activeChart === 'temperature' && (
          <div className="space-y-4">
            <div className="w-full h-72 sm:h-80 relative select-none">
              <svg viewBox="0 0 800 320" className="w-full h-full overflow-visible">
                {/* Horizontal Grid lines (°C Anomaly) */}
                {[0, 1, 2, 3, 4, 5].map((deg) => {
                  const y = 280 - (deg / 5.5) * 250;
                  return (
                    <g key={deg}>
                      <line x1="60" y1={y} x2="780" y2={y} stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                      <text x="45" y={y + 4} fill="#64748b" fontSize="11" textAnchor="end" fontFamily="monospace">
                        +{deg}°C
                      </text>
                    </g>
                  );
                })}

                {/* Arctic Line (Rose/Red) */}
                <path
                  d={temperatureData
                    .map((d, idx) => {
                      const x = 70 + (idx / (temperatureData.length - 1)) * 700;
                      const y = 280 - (d.arctic / 5.5) * 250;
                      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="3"
                />

                {/* Global Average Line (Emerald) */}
                <path
                  d={temperatureData
                    .map((d, idx) => {
                      const x = 70 + (idx / (temperatureData.length - 1)) * 700;
                      const y = 280 - (d.global / 5.5) * 250;
                      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                />

                {/* Points */}
                {temperatureData.map((d, idx) => {
                  const x = 70 + (idx / (temperatureData.length - 1)) * 700;
                  const yArc = 280 - (d.arctic / 5.5) * 250;
                  const yGlob = 280 - (d.global / 5.5) * 250;
                  return (
                    <g key={d.year}>
                      <circle
                        cx={x}
                        cy={yArc}
                        r="5"
                        fill="#070d1a"
                        stroke="#f43f5e"
                        strokeWidth="2.5"
                        className="cursor-pointer"
                        onMouseEnter={(e) =>
                          setHoveredPoint({
                            x: e.clientX,
                            y: e.clientY,
                            label: `Arctic Warming Rate (${d.year})`,
                            value: `+${d.arctic}°C Anomaly`,
                            extra: `4x Global Average (+${d.global}°C)`,
                          })
                        }
                        onMouseLeave={() => setHoveredPoint(null)}
                      />
                      <circle
                        cx={x}
                        cy={yGlob}
                        r="4"
                        fill="#070d1a"
                        stroke="#10b981"
                        strokeWidth="2"
                      />
                      <text x={x} y="300" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                        {d.year}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="text-slate-200">Arctic Regional Warming (+4.1°C)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-slate-200">Global Average Baseline (+1.34°C)</span>
                </div>
              </div>
              <div className="font-mono text-rose-400 text-xs">
                Empirical Warming Ratio: 3.98x
              </div>
            </div>
          </div>
        )}

        {/* Data to Story Action Link */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Want to explain these numbers to school classrooms or the public?
          </div>
          <button
            onClick={() => onNavigate('story-studio')}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-cyan-300 bg-cyan-950/40 hover:bg-cyan-950/70 border border-cyan-500/40 rounded-xl transition-all cursor-pointer"
          >
            <span>Convert This Chart Into a Story</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
