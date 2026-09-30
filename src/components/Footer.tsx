import React from 'react';
import { Compass, ExternalLink, Globe, Database, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#04070d] border-t border-slate-900 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Mission */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-white text-base tracking-wider">POLARIS</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Polar Science Intelligence & Media Portal bridging the gap between empirical cryospheric research and the global public.
            </p>
            <div className="pt-2 font-mono text-[11px] text-slate-500 flex items-center gap-3">
              <span>90°00′S 00°00′E</span>
              <span aria-hidden="true">·</span>
              <span>90°00′N 00°00′E</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3 tracking-wide uppercase text-[11px]">Exploration</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigate('explore')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Interactive Polar Map
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('repository')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Knowledge Repository
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Polar AI Assistant
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('visualizations')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Cryosphere Visualizations
                </button>
              </li>
            </ul>
          </div>

          {/* Outreach & Contribution */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3 tracking-wide uppercase text-[11px]">Science Outreach</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigate('story-studio')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Turn Science Into a Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('media')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Media & Documentary Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contributor')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Researcher Submission Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Polar Treaty & Mission
                </button>
              </li>
            </ul>
          </div>

          {/* Data Sources */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3 tracking-wide uppercase text-[11px]">Data Attribution</h4>
            <p className="text-slate-500 mb-2 leading-relaxed text-[11px]">
              Empirical datasets synthesized from open polar science institutions:
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] text-cyan-400/90 font-mono">
              <span className="hover:text-cyan-300">NSIDC</span>
              <span>·</span>
              <span className="hover:text-cyan-300">NASA JPL</span>
              <span>·</span>
              <span className="hover:text-cyan-300">NCPOR India</span>
              <span>·</span>
              <span className="hover:text-cyan-300">British Antarctic Survey</span>
              <span>·</span>
              <span className="hover:text-cyan-300">ESA Copernicus</span>
              <span>·</span>
              <span className="hover:text-cyan-300">AWI Germany</span>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-emerald-400 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Open Science / CC-BY-4.0 Compliant</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-4">
          <p>© 2026 POLARIS. Problem Statement PS 26063: Polar Science Outreach & Public Knowledge Portal.</p>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Antarctic Treaty System Partner</span>
            <span aria-hidden="true">·</span>
            <span>Version 1.0 (Hackathon Release)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
