import React from 'react';
import { Compass, ExternalLink, Globe, Database, ShieldCheck, Building } from 'lucide-react';
import { ActiveTab } from './Header';

interface FooterProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#050811] border-t border-slate-800 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Mission */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded border border-slate-700 bg-slate-900 flex items-center justify-center text-sky-400">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-white text-base tracking-tight font-sans">POLARIS</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Ministry of Earth Sciences (MoES) Polar Science Knowledge, Outreach & Media Dissemination Platform.
            </p>
            <div className="pt-2 font-mono text-[11px] text-slate-500 flex items-center gap-2">
              <span>Bharati: 69°24′S 76°11′E</span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span>Himadri: 78°55′N 11°56′E</span>
            </div>
          </div>

          {/* Central Knowledge Archive */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3 tracking-wide uppercase text-[11px] font-mono">Knowledge Archive</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigate('expeditions')} className="hover:text-slate-200 transition-colors cursor-pointer">
                  Expeditions Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('repository')} className="hover:text-slate-200 transition-colors cursor-pointer">
                  Central Knowledge Repository
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('activities')} className="hover:text-slate-200 transition-colors cursor-pointer">
                  Institutional Activities (MoES)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explore')} className="hover:text-slate-200 transition-colors cursor-pointer">
                  Interactive Polar Map
                </button>
              </li>
            </ul>
          </div>

          {/* Science Outreach & Media */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3 tracking-wide uppercase text-[11px] font-mono">Outreach & Media</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigate('studio')} className="hover:text-sky-300 text-sky-400 transition-colors cursor-pointer font-medium">
                  POLARIS Content Studio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('stories')} className="hover:text-slate-200 transition-colors cursor-pointer">
                  Public Stories & Education
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('media')} className="hover:text-slate-200 transition-colors cursor-pointer">
                  Media & Photographic Archive
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai')} className="hover:text-slate-200 transition-colors cursor-pointer">
                  Polar AI Public Assistant
                </button>
              </li>
            </ul>
          </div>

          {/* Governing Organizations */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3 tracking-wide uppercase text-[11px] font-mono">Institutional Nodes</h4>
            <p className="text-slate-400 mb-2 leading-relaxed text-[11px]">
              Coordinated under the Ministry of Earth Sciences (MoES), Government of India:
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 font-mono">
              <span className="text-slate-300 font-semibold">MoES India</span>
              <span className="text-slate-700">·</span>
              <span className="text-slate-300 font-semibold">NCPOR Goa</span>
              <span className="text-slate-700">·</span>
              <span>NSIDC</span>
              <span className="text-slate-700">·</span>
              <span>NASA JPL</span>
              <span className="text-slate-700">·</span>
              <span>BAS</span>
              <span className="text-slate-700">·</span>
              <span>AWI</span>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-emerald-400 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Smart Education / Open Science Initiative</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-400 gap-4">
          <p>© 2026 POLARIS. Problem Statement PS 26063: Ministry of Earth Sciences (MoES) — Smart Education.</p>
          <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
            <span>Antarctic Treaty System Partner</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>Release 2.0 (Official Spec)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
