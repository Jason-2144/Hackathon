import React, { useState } from 'react';
import { Compass, Sparkles, Menu, X, PlayCircle, BookOpen, Layers } from 'lucide-react';

export type ActiveTab =
  | 'home'
  | 'explore'
  | 'repository'
  | 'ai'
  | 'media'
  | 'story-studio'
  | 'visualizations'
  | 'contributor'
  | 'about';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onStartDemoTour?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onStartDemoTour }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'explore', label: 'Explore' },
    { id: 'repository', label: 'Knowledge Repository' },
    { id: 'ai', label: 'Polar AI' },
    { id: 'media', label: 'Media' },
    { id: 'story-studio', label: 'Turn Science to Story' },
    { id: 'visualizations', label: 'Data Visualizations' },
    { id: 'contributor', label: 'Contributor' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#060a12]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single Wordmark */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/60 transition-colors">
            <Compass className="w-4 h-4 animate-spin-slow" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-extrabold text-lg tracking-wider text-white">POLARIS</span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold hidden sm:inline">
              POLAR PORTAL
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Clean text with active highlight) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-300">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap text-xs xl:text-sm font-medium cursor-pointer ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5">
          {onStartDemoTour && (
            <button
              onClick={onStartDemoTour}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors cursor-pointer"
              title="Step-by-step hackathon demo flow"
            >
              <PlayCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Demo Tour</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('ai')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap border border-cyan-400/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            <span>Ask Polar AI</span>
          </button>

          {/* Mobile hamburger toggle */}
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
        <div className="lg:hidden bg-[#070d1a] border-b border-slate-800 px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === item.id
                  ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/30'
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
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-cyan-400 hover:bg-cyan-950/30 flex items-center gap-2"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Launch Hackathon Golden Demo Tour</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
