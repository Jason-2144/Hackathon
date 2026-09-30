import React, { useState } from 'react';
import { PolarRepository } from '../../lib/supabase';
import {
  PlusCircle,
  FileText,
  Database,
  Film,
  MapPin,
  CheckCircle,
  RotateCcw,
  Sparkles,
  Layers,
  ShieldCheck,
  TrendingUp,
  Clock,
  Send,
  Building,
  Compass,
  ArrowRight,
  Activity
} from 'lucide-react';

interface ContributorDashboardViewProps {
  onNavigate: (tab: any, params?: any) => void;
}

export const ContributorDashboardView: React.FC<ContributorDashboardViewProps> = ({ onNavigate }) => {
  const [activeForm, setActiveForm] = useState<'report' | 'research' | 'dataset' | 'activity'>('report');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [reportTitle, setReportTitle] = useState('');
  const [reportNumber, setReportNumber] = useState('MoES-ISEA-45-CR-01');
  const [reportAuthor, setReportAuthor] = useState('');
  const [reportSummary, setReportSummary] = useState('');

  const [researchTitle, setResearchTitle] = useState('');
  const [researchAbstract, setResearchAbstract] = useState('');
  const [researchAuthors, setResearchAuthors] = useState('');
  const [researchInstitution, setResearchInstitution] = useState('');

  const [datasetTitle, setDatasetTitle] = useState('');
  const [datasetDesc, setDatasetDesc] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportTitle || !reportSummary) return;

    PolarRepository.addExpeditionReport({
      id: `rep-${Date.now()}`,
      expeditionId: 'exp-indian-antarctic-44',
      reportNumber: reportNumber || `MoES-CR-${Date.now().toString().slice(-4)}`,
      title: reportTitle,
      leadAuthor: reportAuthor || 'National Polar Scientist',
      institution: 'Ministry of Earth Sciences (MoES) / NCPOR',
      date: new Date().toISOString().split('T')[0],
      summary: reportSummary,
      methodology: 'Integrated satellite radar altimetry and in-situ field measurement.',
      keyFindings: [reportSummary.slice(0, 80) + '...'],
      sections: [{ title: '1. Executive Summary', content: reportSummary }],
      relatedDatasetIds: ['data-bharati-met'],
      relatedMediaIds: ['med-bharati-life'],
    });

    setReportTitle('');
    setReportSummary('');
    setReportAuthor('');
    showToast('Expedition report archived into Central Repository!');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all repository records back to verified initial seed data?')) {
      PolarRepository.resetToSeed();
      showToast('Repository reset to verified scientific seed data.');
    }
  };

  // Metrics calculation per Requirement 13
  const reports = PolarRepository.getExpeditionReports();
  const publications = PolarRepository.getResearch();
  const datasets = PolarRepository.getDatasets();
  const media = PolarRepository.getMedia();
  const expeditions = PolarRepository.getExpeditions();
  const activities = PolarRepository.getActivities();
  const stories = PolarRepository.getStories();
  const outreach = PolarRepository.getOutreachItems();

  const totalRepositoryItems =
    reports.length + publications.length + datasets.length + media.length + activities.length;

  const awaitingReview = outreach.filter((item) => item.reviewStatus === 'under_review' || item.reviewStatus === 'ai_generated');
  const publishedContent = outreach.filter((item) => item.reviewStatus === 'published');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3.5 py-2.5 bg-[#0b1220] border border-slate-700 rounded-lg text-xs text-slate-200 shadow-2xl">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="space-y-2 border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono tracking-widest uppercase mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Ministry of Earth Sciences (MoES) Portal Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Knowledge & Dissemination Dashboard
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            Monitor the lifecycle of polar scientific assets from initial field reports and datasets through AI content synthesis, scientific review, and public dissemination.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => onNavigate('studio')}
            className="ds-btn-primary text-xs py-1.5 px-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>Content Studio</span>
          </button>

          <button
            onClick={handleResetData}
            className="ds-btn-secondary text-xs py-1.5 px-3"
            title="Reset database to seed records"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 bg-[#0b101d] border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-400">Total Archive</div>
          <div className="text-2xl font-bold font-mono text-white">{totalRepositoryItems}</div>
          <div className="text-[10px] text-slate-500 font-mono">All content types</div>
        </div>

        <div className="p-3.5 bg-[#0b101d] border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-400">Expeditions</div>
          <div className="text-2xl font-bold font-mono text-white">{expeditions.length}</div>
          <div className="text-[10px] text-slate-500 font-mono">Antarctic & Arctic</div>
        </div>

        <div className="p-3.5 bg-[#0b101d] border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-400">Reports & Papers</div>
          <div className="text-2xl font-bold font-mono text-white">{reports.length + publications.length}</div>
          <div className="text-[10px] text-slate-500 font-mono">Peer-reviewed</div>
        </div>

        <div className="p-3.5 bg-[#0b101d] border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-400">Datasets</div>
          <div className="text-2xl font-bold font-mono text-white">{datasets.length}</div>
          <div className="text-[10px] text-slate-500 font-mono">Telemetry feeds</div>
        </div>

        <div className="p-3.5 bg-[#0b101d] border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-400">Under Review</div>
          <div className="text-2xl font-bold font-mono text-amber-400">{awaitingReview.length}</div>
          <div className="text-[10px] text-amber-500/80 font-mono">Awaiting sign-off</div>
        </div>

        <div className="p-3.5 bg-[#0b101d] border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-400">Published Stories</div>
          <div className="text-2xl font-bold font-mono text-emerald-400">{publishedContent.length + stories.length}</div>
          <div className="text-[10px] text-slate-500 font-mono">Active outreach</div>
        </div>
      </div>

      {/* Dissemination Pipeline Status Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Content Awaiting Review Table */}
        <div className="lg:col-span-7 bg-[#0b101d] border border-slate-800 rounded-lg p-5 space-y-4 shadow">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Outreach Content Awaiting Review ({awaitingReview.length})
              </h3>
            </div>
            <button
              onClick={() => onNavigate('studio')}
              className="text-xs text-sky-400 hover:underline cursor-pointer font-mono"
            >
              Open in Studio →
            </button>
          </div>

          <div className="space-y-2.5">
            {awaitingReview.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-slate-900 border border-slate-800 rounded flex items-start justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-400 font-mono text-[10px]">
                    <span className="ds-badge ds-badge-neutral text-[9px] uppercase">{item.formatLabel}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>Created: {item.createdAt}</span>
                  </div>
                  <h4 className="font-bold text-white text-xs sm:text-sm">{item.title}</h4>
                  <div className="text-slate-400 text-[11px] font-mono">
                    Source: {item.sourceTitle.slice(0, 45)}...
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-end gap-1.5">
                  <span className="ds-badge ds-badge-neutral text-[10px] text-amber-400 border-amber-800/60 uppercase">
                    {item.reviewStatus.replace('_', ' ')}
                  </span>
                  <button
                    onClick={() => onNavigate('studio', { prefillSourceId: item.sourceId })}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 cursor-pointer text-[11px] font-mono transition-colors"
                  >
                    Review Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Ingestion Form */}
        <div className="lg:col-span-5 bg-[#0b101d] border border-slate-800 rounded-lg p-5 space-y-4 shadow">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-sky-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Archive Expedition Report
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-500">MoES Ingestion</span>
          </div>

          <form onSubmit={handleSubmitReport} className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="block font-mono uppercase text-slate-400 text-[11px]">
                Report Title *
              </label>
              <input
                type="text"
                required
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                placeholder="e.g. Sub-ice Cavity Profiling and Southern Ocean CTD Cruise"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block font-mono uppercase text-slate-400 text-[11px]">
                  Report ID / Number
                </label>
                <input
                  type="text"
                  value={reportNumber}
                  onChange={(e) => setReportNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-slate-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono uppercase text-slate-400 text-[11px]">
                  Lead Scientist
                </label>
                <input
                  type="text"
                  value={reportAuthor}
                  onChange={(e) => setReportAuthor(e.target.value)}
                  placeholder="e.g. Dr. Rahul Mohan"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block font-mono uppercase text-slate-400 text-[11px]">
                Executive Findings Summary *
              </label>
              <textarea
                required
                rows={3}
                value={reportSummary}
                onChange={(e) => setReportSummary(e.target.value)}
                placeholder="Field discoveries, recovered ice cores, renewable microgrid upgrades..."
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-500"
              />
            </div>

            <button
              type="submit"
              className="w-full ds-btn-primary text-xs py-2 px-4 justify-center"
            >
              <PlusCircle className="w-3.5 h-3.5 text-slate-950" />
              <span>Archive Report & Enable AI Outreach</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
