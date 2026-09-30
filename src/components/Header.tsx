import React, { useState } from 'react';
import { Compass, Menu, X, Play, BookOpen, Database, FileText, ChevronRight } from 'lucide-react';

export type ActiveTab =
  | 'home'
  | 'expeditions'
  | 'repository'
  | 'publications'
  | 'datasets'
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
  setActiveTab: (tab: ActiveTab, params?: any) => void;
  onStartDemoTour?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onStartDemoTour }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact navigation as requested by problem statement & user prompt
  const mainNavItems: { id: ActiveTab; label: string; contentType?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'expeditions', label: 'Expeditions' },
    { id: 'repository', label: 'Repository' },
    { id: 'publications', label: 'Publications', contentType: 'Publication' },
    { id: 'datasets', label: 'Datasets', contentType: 'Dataset' },
    { id: 'media', label: 'Media' },
    { id: 'activities', label: 'Activities' },
    { id: 'ai', label: 'Polar AI' },
    { id: 'studio', label: 'Content Studio' },
  ];

  const utilityNavItems: { id: ActiveTab; label: string }[] = [
    { id: 'explore', label: 'Cartography Map' },
    { id: 'stories', label: 'Public Stories' },
    { id: 'dashboard', label: 'Institutional Dashboard' },
    { id: 'about', label: 'About MoES' },
  ];

  const handleNavClick = (item: { id: ActiveTab; label: string; contentType?: string }) => {
    if (item.contentType) {
      setActiveTab('repository', { contentType: item.contentType });
    } else {
      setActiveTab(item.id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-white border-b border-slate-300">
      {/* 1. Official Government of India / MoES Institutional Top Bar */}
      <div className="bg-[#002244] text-white text-[11px] font-mono border-b border-[#001730]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-wider text-slate-200">
              Hackathon project - Team Converse
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <span className="hidden md:inline text-[10px] text-slate-400">
              Problem Statement 26063: Polar Knowledge & Outreach
            </span>
            {onStartDemoTour && (
              <button
                onClick={onStartDemoTour}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#003870] hover:bg-[#004c99] text-white text-[10px] font-sans font-semibold cursor-pointer border border-[#004c99] transition-colors"
                title="Launch 15-step interactive walkthrough"
              >
                <Play className="w-2.5 h-2.5 fill-current" />
                <span>MoES Demo Tour</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Title Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 text-left cursor-pointer group"
          >
            <div className="w-9 h-9 bg-[#002244] text-white flex items-center justify-center border border-[#001730]">
              <Compass className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#002244] font-serif leading-none">
                POLARIS
              </div>
              <div className="text-[11px] text-slate-600 font-sans tracking-tight mt-0.5 font-medium">
                Integrated Polar Science Outreach & Knowledge Repository
              </div>
            </div>
          </button>
        </div>

        {/* Quick Utility Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-slate-600">
          <button
            onClick={() => setActiveTab('explore')}
            className={`hover:text-[#002244] hover:underline cursor-pointer ${
              activeTab === 'explore' ? 'font-bold text-[#002244]' : ''
            }`}
          >
            Cartography
          </button>
          <span className="text-slate-300">|</span>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`hover:text-[#002244] hover:underline cursor-pointer ${
              activeTab === 'dashboard' ? 'font-bold text-[#002244]' : ''
            }`}
          >
            Archive Admin
          </button>
          <span className="text-slate-300">|</span>
          <button
            onClick={() => setActiveTab('about')}
            className={`hover:text-[#002244] hover:underline cursor-pointer ${
              activeTab === 'about' ? 'font-bold text-[#002244]' : ''
            }`}
          >
            About
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 border border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* 3. Primary Navigation Bar (Traditional Institutional Rectangular Strip) */}
      <nav className="bg-[#f1f5f9] border-t border-b border-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto scrollbar-none">
          <div className="hidden lg:flex items-center">
            {mainNavItems.map((item) => {
              const isActive =
                activeTab === item.id ||
                (item.id === 'publications' && activeTab === 'publications') ||
                (item.id === 'datasets' && activeTab === 'datasets');

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`px-4 py-2.5 text-xs font-semibold tracking-wide transition-colors whitespace-nowrap cursor-pointer border-r border-slate-300 ${
                    isActive
                      ? 'bg-[#002244] text-white border-b-2 border-b-[#001730]'
                      : 'text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center text-[11px] font-mono text-slate-500 py-1.5">
            <span>Antarctica 90°S · Arctic 90°N · Indian Ocean</span>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-300 p-3 space-y-1">
            <div className="text-[10px] font-mono uppercase text-slate-400 px-3 py-1 font-bold">
              Main Sections
            </div>
            {mainNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="w-full text-left px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-100 border-b border-slate-100 flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ))}

            <div className="text-[10px] font-mono uppercase text-slate-400 px-3 pt-3 pb-1 font-bold">
              Additional Portals
            </div>
            {utilityNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-slate-600 hover:bg-slate-100 flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};
