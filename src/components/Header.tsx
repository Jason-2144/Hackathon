import React, { useState } from 'react';
import { Compass, Sparkles, Menu, X, PlayCircle, ChevronDown } from 'lucide-react';

export type ActiveTab =
  | 'home'
  | 'expeditions'
  | 'repository'
  | 'studio'
  | 'activities'
  | 'explore'
  | 'ai'
  | 'media'
  | 'stories'
  | 'dashboard'
  | 'about';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onStartDemoTour?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onStartDemoTour }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  // Top 5 primary items visible on desktop
  const primaryNavItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'expeditions', label: 'Expeditions' },
    { id: 'repository', label: 'Repository' },
    { id: 'studio', label: 'Content Studio' },
    { id: 'activities', label: 'Activities' },
  ];

  // Secondary items in clean "More" dropdown per Top Bar Contract
  const secondaryNavItems: { id: ActiveTab; label: string }[] = [
    { id: 'explore', label: 'Explore Map' },
    { id: 'ai', label: 'Polar AI' },
    { id: 'media', label: 'Media Portal' },
    { id: 'stories', label: 'Public Stories' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'about', label: 'About MoES' },
  ];

  const allNavItems = [...primaryNavItems, ...secondaryNavItems];

  return (
    <header className="sticky top-0 z-50 bg-[#060913]/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single Wordmark Brand Zone */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer shrink-0"
        >
          <div className="w-8 h-8 rounded border border-sky-500/40 bg-slate-900 flex items-center justify-center text-sky-400 group-hover:border-sky-400 transition-colors">
            <Compass className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white font-sans">POLARIS</span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-sky-400 font-semibold px-1.5 py-0.2 rounded bg-sky-950/60 border border-sky-800/60 hidden sm:inline">
                MoES
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono tracking-tight hidden md:inline">
              Polar Knowledge & Media Portal
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-300">
          {primaryNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded transition-all whitespace-nowrap text-xs xl:text-sm font-medium cursor-pointer ${
                  isActive
                    ? 'text-white bg-slate-800 border border-slate-700 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {/* More Dropdown for remaining items */}
          <div className="relative">
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded text-xs xl:text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 cursor-pointer transition-colors border border-transparent"
            >
              <span>More</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {moreDropdownOpen && (
              <div
                className="absolute top-full right-0 mt-1.5 w-48 bg-[#0e1526] border border-slate-800 rounded-lg p-1.5 shadow-xl z-50 space-y-0.5"
                onMouseLeave={() => setMoreDropdownOpen(false)}
              >
                {secondaryNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMoreDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded text-xs font-medium cursor-pointer transition-colors ${
                      activeTab === item.id
                        ? 'text-sky-300 bg-sky-950/40 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {onStartDemoTour && (
            <button
              onClick={onStartDemoTour}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded transition-colors cursor-pointer"
              title="Official 15-step PS 26063 Demo Flow"
            >
              <PlayCircle className="w-3.5 h-3.5 text-sky-400" />
              <span>MoES Demo Flow</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('studio')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded transition-all cursor-pointer whitespace-nowrap border border-sky-300/60 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>Content Studio</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0f1d] border-b border-slate-800 px-4 py-3 space-y-1">
          {allNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded text-sm font-medium ${
                activeTab === item.id
                  ? 'text-white bg-slate-800 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              {item.label}
            </button>
          ))}
          {onStartDemoTour && (
            <button
              onClick={() => {
                onStartDemoTour();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded text-sm font-medium text-sky-400 hover:bg-sky-950/30 flex items-center gap-2 pt-2 border-t border-slate-800"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Launch Official MoES Demo Tour</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
