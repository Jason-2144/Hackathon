import React, { useState } from 'react';
import { PolarRepository } from '../../lib/supabase';
import {
  FileText,
  Database,
  Film,
  CheckCircle,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Clock,
  Plus,
  ArrowRight
} from 'lucide-react';

interface ContributorDashboardViewProps {
  onNavigate: (tab: any, params?: any) => void;
}

export const ContributorDashboardView: React.FC<ContributorDashboardViewProps> = ({ onNavigate }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [reportTitle, setReportTitle] = useState('');
  const [reportNumber, setReportNumber] = useState('MoES-ISEA-45-CR-01');
  const [reportAuthor, setReportAuthor] = useState('');
  const [reportSummary, setReportSummary] = useState('');

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
    showToast('Expedition report successfully archived into repository.');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all repository records back to verified initial seed data?')) {
      PolarRepository.resetToSeed();
      showToast('Repository reset to verified scientific seed data.');
    }
  };

  // Metrics calculation per Prompt Specification:
  // Repository Items | Expeditions | Publications | Datasets | Media | Pending Reviews
  const reports = PolarRepository.getExpeditionReports();
  const publications = PolarRepository.getResearch();
  const datasets = PolarRepository.getDatasets();
  const media = PolarRepository.getMedia();
  const expeditions = PolarRepository.getExpeditions();
  const activities = PolarRepository.getActivities();
  const outreach = PolarRepository.getOutreachItems();

  const totalRepositoryItems =
    reports.length + publications.length + datasets.length + media.length + activities.length;

  const awaitingReview = outreach.filter(
    (item) => item.reviewStatus === 'under_review' || item.reviewStatus === 'ai_generated'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-[#002244] text-white text-xs border border-[#001730] shadow-lg">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-slate-300 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#003366]">
            Administrative Portal · Ministry of Earth Sciences (MoES)
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#002244] tracking-tight mt-1">
            Institutional Archive Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Record auditing and asset ledger monitoring the lifecycle of polar scientific artifacts from cruise ingestion to verified public dissemination.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => onNavigate('studio')}
            className="ds-btn-primary"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open Content Studio</span>
          </button>

          <button
            onClick={handleResetData}
            className="ds-btn-secondary"
            title="Reset repository to seed records"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            <span>Reset Demo Seed Data</span>
          </button>
        </div>
      </div>

      {/* 1. Simple Institutional Overview (PER USER PROMPT SPECIFICATION) */}
      {/* Columns: Repository Items | Expeditions | Publications | Datasets | Media | Pending Reviews */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 bg-white border border-slate-300 space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Repository Items</div>
          <div className="text-2xl font-bold font-mono text-[#002244]">{totalRepositoryItems}</div>
          <div className="text-[11px] text-slate-500">All archived types</div>
        </div>

        <div className="p-3.5 bg-white border border-slate-300 space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Expeditions</div>
          <div className="text-2xl font-bold font-mono text-[#002244]">{expeditions.length}</div>
          <div className="text-[11px] text-slate-500">Active campaigns</div>
        </div>

        <div className="p-3.5 bg-white border border-slate-300 space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Publications</div>
          <div className="text-2xl font-bold font-mono text-[#002244]">{publications.length}</div>
          <div className="text-[11px] text-slate-500">Peer-reviewed papers</div>
        </div>

        <div className="p-3.5 bg-white border border-slate-300 space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Datasets</div>
          <div className="text-2xl font-bold font-mono text-[#002244]">{datasets.length}</div>
          <div className="text-[11px] text-slate-500">Telemetry packages</div>
        </div>

        <div className="p-3.5 bg-white border border-slate-300 space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Media</div>
          <div className="text-2xl font-bold font-mono text-[#002244]">{media.length}</div>
          <div className="text-[11px] text-slate-500">Photos & footage</div>
        </div>

        <div className="p-3.5 bg-white border border-slate-300 space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Pending Reviews</div>
          <div className="text-2xl font-bold font-mono text-amber-700">{awaitingReview.length}</div>
          <div className="text-[11px] text-slate-500">Awaiting sign-off</div>
        </div>
      </div>

      {/* 2. Main Ledger: Content Awaiting Review + Ingestion Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Content Awaiting Review Table */}
        <div className="lg:col-span-7 bg-white border border-slate-300 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-[#002244]">
              Outreach Assets Awaiting Scientific Sign-off ({awaitingReview.length})
            </h2>
            <button
              onClick={() => onNavigate('studio')}
              className="text-xs font-semibold text-[#004c99] hover:underline"
            >
              Open Studio →
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200">
            <table className="inst-table">
              <thead>
                <tr>
                  <th>Headline & Format</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {awaitingReview.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="font-bold text-[#002244] text-xs">{item.title}</div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {item.formatLabel} · Source: {item.sourceTitle.slice(0, 30)}...
                      </div>
                    </td>
                    <td>
                      <span className="ds-badge ds-badge-warning text-[10px]">
                        {item.reviewStatus.toUpperCase()}
                      </span>
                    </td>
                    <td className="font-mono text-xs text-slate-600 whitespace-nowrap">
                      {item.createdAt}
                    </td>
                    <td>
                      <button
                        onClick={() => onNavigate('studio', { prefillSourceId: item.sourceId })}
                        className="text-xs font-semibold text-[#004c99] hover:underline cursor-pointer"
                      >
                        Review Document →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Quick Archival / Ingestion Form */}
        <div className="lg:col-span-5 bg-white border border-slate-300 p-5 space-y-4">
          <div className="border-b border-slate-200 pb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-[#002244]">
              Archive Primary Expedition Report
            </h2>
          </div>

          <form onSubmit={handleSubmitReport} className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="block font-mono uppercase text-slate-600 text-[11px] font-semibold">
                Report Title *
              </label>
              <input
                type="text"
                required
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                placeholder="e.g. Sub-ice Cavity Profiling and Southern Ocean CTD Cruise"
                className="w-full px-3 py-1.5 border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-[#003366]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block font-mono uppercase text-slate-600 text-[11px] font-semibold">
                  Report ID Number
                </label>
                <input
                  type="text"
                  value={reportNumber}
                  onChange={(e) => setReportNumber(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 text-xs text-slate-900 bg-white font-mono focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono uppercase text-slate-600 text-[11px] font-semibold">
                  Lead Scientist
                </label>
                <input
                  type="text"
                  value={reportAuthor}
                  onChange={(e) => setReportAuthor(e.target.value)}
                  placeholder="e.g. Dr. Rahul Mohan"
                  className="w-full px-3 py-1.5 border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block font-mono uppercase text-slate-600 text-[11px] font-semibold">
                Executive Findings Summary *
              </label>
              <textarea
                required
                rows={3}
                value={reportSummary}
                onChange={(e) => setReportSummary(e.target.value)}
                placeholder="Field discoveries, recovered ice cores, renewable microgrid upgrades..."
                className="w-full px-3 py-1.5 border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full ds-btn-primary justify-center py-2 text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Archive Report into Central Repository</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
