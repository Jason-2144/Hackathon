/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header, ActiveTab } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/home/HomeView';
import { ExpeditionsView } from './components/expeditions/ExpeditionsView';
import { KnowledgeRepositoryView } from './components/repository/KnowledgeRepositoryView';
import { ContentStudioView } from './components/studio/ContentStudioView';
import { InstitutionalActivitiesView } from './components/activities/InstitutionalActivitiesView';
import { ExploreView } from './components/explore/ExploreView';
import { PolarAIView } from './components/ai/PolarAIView';
import { MediaPortalView } from './components/media/MediaPortalView';
import { PublicStoriesView } from './components/stories/PublicStoriesView';
import { ContributorDashboardView } from './components/admin/ContributorDashboardView';
import { AboutView } from './components/about/AboutView';
import { DemoFlowBanner } from './components/ui/DemoFlowBanner';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [navigationParams, setNavigationParams] = useState<any>({});
  const [demoTourActive, setDemoTourActive] = useState(false);

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
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col font-sans selection:bg-sky-500/20 selection:text-sky-200">
      {/* Top Navigation Bar with 3-Zone Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => handleNavigate(tab)}
        onStartDemoTour={() => setDemoTourActive(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'home' && <HomeView onNavigate={handleNavigate} />}

        {activeTab === 'expeditions' && (
          <ExpeditionsView
            onNavigate={handleNavigate}
            preselectExpeditionId={navigationParams.expeditionId}
          />
        )}

        {activeTab === 'repository' && (
          <KnowledgeRepositoryView
            onNavigate={handleNavigate}
            prefillLocationId={navigationParams.locationId}
          />
        )}

        {activeTab === 'studio' && (
          <ContentStudioView
            onNavigate={handleNavigate}
            prefillSourceId={navigationParams.sourceId}
            prefillSourceType={navigationParams.sourceType}
          />
        )}

        {activeTab === 'activities' && (
          <InstitutionalActivitiesView onNavigate={handleNavigate} />
        )}

        {activeTab === 'explore' && (
          <ExploreView
            onNavigate={handleNavigate}
            initialLocationId={navigationParams.locationId}
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

        {activeTab === 'stories' && (
          <PublicStoriesView onNavigate={handleNavigate} />
        )}

        {activeTab === 'dashboard' && (
          <ContributorDashboardView onNavigate={handleNavigate} />
        )}

        {activeTab === 'about' && <AboutView onNavigate={handleNavigate} />}
      </main>

      {/* Institutional Scientific Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Official 15-Step MoES Golden Demo Flow Guide */}
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
