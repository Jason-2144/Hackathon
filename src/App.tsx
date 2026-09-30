/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/home/HomeView';
import { ExploreView } from './components/explore/ExploreView';
import { KnowledgeRepositoryView } from './components/repository/KnowledgeRepositoryView';
import { PolarAIView } from './components/ai/PolarAIView';
import { MediaPortalView } from './components/media/MediaPortalView';
import { StoryGeneratorView } from './components/story/StoryGeneratorView';
import { DataVisualizationsView } from './components/visualizations/DataVisualizationsView';
import { ContributorDashboardView } from './components/admin/ContributorDashboardView';
import { AboutView } from './components/about/AboutView';
import { DemoFlowBanner } from './components/ui/DemoFlowBanner';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [navigationParams, setNavigationParams] = useState<any>({});
  const [demoTourActive, setDemoTourActive] = useState(false);

  // Smooth scroll to top when changing views
  const handleNavigate = (tab: ActiveTab, params?: any) => {
    setActiveTab(tab);
    if (params) {
      setNavigationParams(params);
    } else {
      setNavigationParams({});
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Top Navigation Bar following 3-Zone Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => handleNavigate(tab)}
        onStartDemoTour={() => setDemoTourActive(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'home' && <HomeView onNavigate={handleNavigate} />}

        {activeTab === 'explore' && (
          <ExploreView
            onNavigate={handleNavigate}
            initialLocationId={navigationParams.locationId}
          />
        )}

        {activeTab === 'repository' && (
          <KnowledgeRepositoryView
            onNavigate={handleNavigate}
            prefillLocationId={navigationParams.locationId}
          />
        )}

        {activeTab === 'ai' && (
          <PolarAIView
            onNavigate={handleNavigate}
            prefillQuery={navigationParams.query}
          />
        )}

        {activeTab === 'media' && (
          <MediaPortalView
            onNavigate={handleNavigate}
            prefillLocationId={navigationParams.locationId}
          />
        )}

        {activeTab === 'story-studio' && (
          <StoryGeneratorView
            onNavigate={handleNavigate}
            initialResearchId={navigationParams.researchId}
          />
        )}

        {activeTab === 'visualizations' && (
          <DataVisualizationsView
            onNavigate={handleNavigate}
            prefillLocationId={navigationParams.locationId}
          />
        )}

        {activeTab === 'contributor' && (
          <ContributorDashboardView onNavigate={handleNavigate} />
        )}

        {activeTab === 'about' && <AboutView onNavigate={handleNavigate} />}
      </main>

      {/* Institutional Scientific Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Golden Demo Tour Assistant */}
      {demoTourActive && (
        <DemoFlowBanner
          currentTab={activeTab}
          onNavigate={handleNavigate}
          onClose={() => setDemoTourActive(false)}
        />
      )}
    </div>
  );
}
