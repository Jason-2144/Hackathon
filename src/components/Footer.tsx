import React from 'react';
import { Compass, ExternalLink, Globe, Database, ShieldCheck, Building } from 'lucide-react';
import { ActiveTab } from './Header';

interface FooterProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#001b38] border-t-4 border-[#003366] text-slate-300 text-xs py-10 mt-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-700/60">
          {/* Institutional Identification */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#002b49] text-white flex items-center justify-center border border-slate-600">
                <Compass className="w-4 h-4 text-sky-300" />
              </div>
              <span className="font-bold text-white text-base tracking-tight font-serif">POLARIS</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs">
              National Polar Science Outreach, Public Knowledge Repository & Media Dissemination Portal.
            </p>
            <div className="text-[11px] font-mono text-slate-400">
              National Centre for Polar and Ocean Research (NCPOR)<br />
              Ministry of Earth Sciences, Govt. of India<br />
              Headland Sada, Vasco-da-Gama, Goa — 403804
            </div>
          </div>

          {/* Research & Data Catalogues */}
          <div>
            <h4 className="text-white font-semibold mb-3 tracking-wide uppercase text-[11px] font-mono border-b border-slate-700 pb-1">
              Scientific Archives
            </h4>
            <ul className="space-y-1.5 text-slate-300 text-xs">
              <li>
                <button onClick={() => onNavigate('repository')} className="hover:text-white hover:underline cursor-pointer">
                  Central Knowledge Repository
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('expeditions')} className="hover:text-white hover:underline cursor-pointer">
                  Indian Scientific Expeditions (ISEA)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explore')} className="hover:text-white hover:underline cursor-pointer">
                  Polar Cartography & Observatories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('activities')} className="hover:text-white hover:underline cursor-pointer">
                  Institutional Activities & Symposia
                </button>
              </li>
            </ul>
          </div>

          {/* Outreach & Newsroom */}
          <div>
            <h4 className="text-white font-semibold mb-3 tracking-wide uppercase text-[11px] font-mono border-b border-slate-700 pb-1">
              Public Dissemination
            </h4>
            <ul className="space-y-1.5 text-slate-300 text-xs">
              <li>
                <button onClick={() => onNavigate('studio')} className="hover:text-white hover:underline cursor-pointer">
                  Editorial Content Studio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('stories')} className="hover:text-white hover:underline cursor-pointer">
                  Smart Education Public Stories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('media')} className="hover:text-white hover:underline cursor-pointer">
                  Photographic & Video Archives
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai')} className="hover:text-white hover:underline cursor-pointer">
                  Polar AI Research Assistant
                </button>
              </li>
            </ul>
          </div>

          {/* Governance & Policy */}
          <div>
            <h4 className="text-white font-semibold mb-3 tracking-wide uppercase text-[11px] font-mono border-b border-slate-700 pb-1">
              Institutional Governance
            </h4>
            <ul className="space-y-1.5 text-slate-300 text-xs">
              <li>
                <a href="https://moes.gov.in" target="_blank" rel="noreferrer" className="hover:text-white hover:underline flex items-center gap-1">
                  <span>Ministry of Earth Sciences (MoES)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://ncpor.res.in" target="_blank" rel="noreferrer" className="hover:text-white hover:underline flex items-center gap-1">
                  <span>NCPOR Institutional Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <span className="text-slate-400">Antarctic Treaty System (1959)</span>
              </li>
              <li>
                <span className="text-slate-400">Indian Antarctic Act (2022)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Open Access Notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-mono">
          <div>
            © {new Date().getFullYear()} Ministry of Earth Sciences (MoES), Government of India. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Open Data Policy</span>
            <span>·</span>
            <span>Terms of Access</span>
            <span>·</span>
            <span>Scientific Rigor & Citation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
