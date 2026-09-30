import React, { useState, useEffect } from 'react';
import { PolarRepository } from '../../lib/supabase';
import { generateContentStudioPackage } from '../../lib/gemini';
import {
  OutreachFormat,
  GeneratedOutreachItem,
  ReviewStatus,
  MediaItem,
  ExpeditionReport,
  ResearchItem
} from '../../types/polar';
import {
  Sparkles,
  FileText,
  CheckCircle,
  Clock,
  Send,
  Share2,
  Copy,
  ExternalLink,
  RotateCcw,
  Sliders,
  Eye,
  Edit3,
  BookmarkCheck,
  ShieldCheck,
  Check,
  Image as ImageIcon,
  Database,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface ContentStudioViewProps {
  onNavigate: (tab: any, params?: any) => void;
  prefillSourceId?: string;
  prefillSourceType?: 'Expedition Report' | 'Publication' | 'Dataset' | 'Expedition';
}

export const ContentStudioView: React.FC<ContentStudioViewProps> = ({
  onNavigate,
  prefillSourceId,
  prefillSourceType,
}) => {
  const reports = PolarRepository.getExpeditionReports();
  const research = PolarRepository.getResearch();
  const datasets = PolarRepository.getDatasets();
  const expeditions = PolarRepository.getExpeditions();
  const allMedia = PolarRepository.getMedia();
  const storedOutreach = PolarRepository.getOutreachItems();

  // 1. Source Selection State
  const [sourceType, setSourceType] = useState<'Expedition Report' | 'Publication' | 'Dataset' | 'Expedition'>(
    prefillSourceType || 'Expedition Report'
  );
  const [selectedSourceId, setSelectedSourceId] = useState<string>(
    prefillSourceId || reports[0]?.id || ''
  );

  // 2. Output Formats Selection Checkboxes (Per Requirement 4)
  const [selectedFormats, setSelectedFormats] = useState<OutreachFormat[]>([
    'website_article',
    'instagram_post',
    'linkedin_post',
    'video_script',
  ]);

  // 3. Media & Dataset Attachments
  const [attachedMediaIds, setAttachedMediaIds] = useState<string[]>(['med-bharati-life']);
  const [attachedDatasetId, setAttachedDatasetId] = useState<string>('data-bharati-met');

  // 4. Generation & Active Item State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItems, setGeneratedItems] = useState<GeneratedOutreachItem[]>(storedOutreach);
  const [activeItemId, setActiveItemId] = useState<string>(storedOutreach[0]?.id || '');
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [reviewNotesInput, setReviewNotesInput] = useState('');

  // Find active item
  const activeItem = generatedItems.find((i) => i.id === activeItemId) || generatedItems[0];

  useEffect(() => {
    if (activeItem) {
      setEditedTitle(activeItem.title);
      setEditedContent(activeItem.content);
      setReviewNotesInput(activeItem.reviewNotes || '');
      setIsEditing(false);
    }
  }, [activeItemId]);

  useEffect(() => {
    if (prefillSourceId) {
      setSelectedSourceId(prefillSourceId);
      if (prefillSourceType) setSourceType(prefillSourceType);
    }
  }, [prefillSourceId, prefillSourceType]);

  // Format selection toggle
  const toggleFormat = (fmt: OutreachFormat) => {
    if (selectedFormats.includes(fmt)) {
      if (selectedFormats.length > 1) {
        setSelectedFormats(selectedFormats.filter((f) => f !== fmt));
      }
    } else {
      setSelectedFormats([...selectedFormats, fmt]);
    }
  };

  // Run AI Generation
  const handleGenerateContent = async () => {
    setIsGenerating(true);
    try {
      const newItems = await generateContentStudioPackage({
        sourceId: selectedSourceId,
        sourceType,
        formats: selectedFormats,
        attachedMediaIds,
        attachedDatasetId,
      });

      // Save to repository
      newItems.forEach((item) => PolarRepository.addOutreachItem(item));
      setGeneratedItems([...newItems, ...PolarRepository.getOutreachItems()]);
      setActiveItemId(newItems[0].id);
    } catch (err) {
      console.error('Error in content generation:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Review Status Workflow Transitions (Requirement 6)
  const handleStatusChange = (newStatus: ReviewStatus) => {
    if (!activeItem) return;
    const channels =
      newStatus === 'published'
        ? ['Official MoES Portal', 'Press Information Bureau', 'POLARIS Stories']
        : activeItem.publishedChannels;

    PolarRepository.updateOutreachStatus(activeItem.id, newStatus, reviewNotesInput, channels);
    // Refresh local list
    const updated = PolarRepository.getOutreachItems();
    setGeneratedItems(updated);
  };

  const handleSaveEdits = () => {
    if (!activeItem) return;
    PolarRepository.updateOutreachContent(activeItem.id, editedTitle, editedContent);
    setIsEditing(false);
    setGeneratedItems(PolarRepository.getOutreachItems());
  };

  const handleCopyText = () => {
    if (!activeItem) return;
    navigator.clipboard.writeText(`${activeItem.title}\n\n${activeItem.content}`);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  // Resolve source item details
  const currentSourceReport = reports.find((r) => r.id === selectedSourceId);
  const currentSourceResearch = research.find((r) => r.id === selectedSourceId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono tracking-widest uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>AI Science-to-Outreach Generation & Dissemination Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            POLARIS Content Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
            Transform expedition field logs, publications, and raw sensor datasets into website articles, student curriculum, and verified social media dissemination with complete source traceability.
          </p>
        </div>

        {/* Quick Review Workflow Legend */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded text-[10px] font-mono">
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400">Draft</span>
          <span className="text-slate-600">→</span>
          <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/60">Review</span>
          <span className="text-slate-600">→</span>
          <span className="px-2 py-0.5 rounded bg-sky-950/60 text-sky-300 border border-sky-800/60">Approved</span>
          <span className="text-slate-600">→</span>
          <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-medium">Published</span>
        </div>
      </div>

      {/* Main 3-Column Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* COLUMN 1 (LEFT): Source Material & Attachments */}
        <div className="lg:col-span-4 bg-[#0b101d] border border-slate-800 rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono uppercase text-slate-300 font-semibold">
              1. Source Selection
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Primary Material</span>
          </div>

          {/* Source Type Selector */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono text-slate-400 uppercase">
              Source Category:
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
              {(['Expedition Report', 'Publication', 'Dataset', 'Expedition'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setSourceType(t);
                    if (t === 'Expedition Report') setSelectedSourceId(reports[0]?.id);
                    else if (t === 'Publication') setSelectedSourceId(research[0]?.id);
                    else if (t === 'Dataset') setSelectedSourceId(datasets[0]?.id);
                    else setSelectedSourceId(expeditions[0]?.id);
                  }}
                  className={`px-2.5 py-1.5 rounded border text-left truncate cursor-pointer transition-colors ${
                    sourceType === t
                      ? 'bg-slate-800 border-slate-700 text-white font-semibold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Specific Source Dropdown */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono text-slate-400 uppercase">
              Choose Document / Record:
            </label>
            <select
              value={selectedSourceId}
              onChange={(e) => setSelectedSourceId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-xs text-slate-200 focus:outline-none focus:border-sky-500 cursor-pointer"
            >
              {sourceType === 'Expedition Report' &&
                reports.map((r) => (
                  <option key={r.id} value={r.id}>
                    [{r.reportNumber}] {r.title.slice(0, 45)}...
                  </option>
                ))}
              {sourceType === 'Publication' &&
                research.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title.slice(0, 48)}... ({p.year})
                  </option>
                ))}
              {sourceType === 'Dataset' &&
                datasets.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.title.slice(0, 48)}...
                  </option>
                ))}
              {sourceType === 'Expedition' &&
                expeditions.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Selected Source Summary Card */}
          <div className="p-3 bg-slate-900 border border-slate-800 rounded space-y-1 text-xs">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Selected Source:</div>
            <div className="font-semibold text-white leading-tight">
              {currentSourceReport?.title || currentSourceResearch?.title || 'Selected Polar Science Material'}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Institution: {currentSourceReport?.institution || currentSourceResearch?.institution || 'Ministry of Earth Sciences (MoES)'}
            </div>
          </div>

          {/* Output Formats Checklist */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="block text-[11px] font-mono text-slate-300 uppercase font-semibold">
              2. Select Desired Output Formats:
            </label>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'website_article', label: 'Website Feature Article' },
                { id: 'public_article', label: 'Public Science Narrative' },
                { id: 'student_explanation', label: 'Student-Friendly Explanation' },
                { id: 'instagram_post', label: 'Instagram Visual Post' },
                { id: 'linkedin_post', label: 'LinkedIn Professional Update' },
                { id: 'x_post', label: 'X / Twitter Outreach Thread' },
                { id: 'youtube_description', label: 'YouTube Video Description' },
                { id: 'video_script', label: 'Short Video / Reel Script' },
                { id: 'infographic_content', label: 'Infographic Content & Metrics' },
              ].map((fmt) => (
                <label
                  key={fmt.id}
                  className="flex items-center gap-2.5 p-2 rounded bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 cursor-pointer select-none text-slate-300"
                >
                  <input
                    type="checkbox"
                    checked={selectedFormats.includes(fmt.id as any)}
                    onChange={() => toggleFormat(fmt.id as any)}
                    className="rounded border-slate-700 text-sky-500 focus:ring-0 cursor-pointer"
                  />
                  <span>{fmt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Attach Evidence & Media */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="block text-[11px] font-mono text-slate-300 uppercase font-semibold">
              3. Attach Science Evidence:
            </label>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block mb-1">Attached Photographs:</span>
                <select
                  value={attachedMediaIds[0] || ''}
                  onChange={(e) => setAttachedMediaIds([e.target.value])}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-slate-300 cursor-pointer"
                >
                  {allMedia.map((m) => (
                    <option key={m.id} value={m.id}>
                      [{m.category}] {m.title.slice(0, 38)}...
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block mb-1">Attached Dataset:</span>
                <select
                  value={attachedDatasetId}
                  onChange={(e) => setAttachedDatasetId(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-slate-300 cursor-pointer"
                >
                  {datasets.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title.slice(0, 40)}...
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={handleGenerateContent}
            disabled={isGenerating}
            className="w-full ds-btn-primary justify-center disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin" />
                <span>Generating Outreach Content...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>GENERATE CONTENT ({selectedFormats.length} FORMATS)</span>
              </>
            )}
          </button>
        </div>

        {/* COLUMN 2 (CENTER): AI Processing & Generated Formats */}
        <div className="lg:col-span-5 bg-[#0b101d] border border-slate-800 rounded-lg p-5 sm:p-6 space-y-4 shadow-xl">
          {/* Format Switcher Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-slate-800">
            {generatedItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveItemId(item.id)}
                className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  activeItem?.id === item.id
                    ? 'bg-slate-800 text-white border border-slate-700 font-semibold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800/80'
                }`}
              >
                {item.formatLabel}
              </button>
            ))}
          </div>

          {activeItem ? (
            <div className="space-y-4">
              {/* SOURCE TRACEABILITY BANNER */}
              <div className="p-3 bg-slate-900 border border-slate-800 rounded space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-300 font-mono font-semibold uppercase tracking-wide text-[10px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Scientific Source Traceability</span>
                  </div>
                  <button
                    onClick={() => onNavigate('repository')}
                    className="text-sky-400 hover:underline text-[11px] font-mono flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Primary Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                <div className="text-white font-medium text-xs leading-snug">
                  SOURCE: <span className="text-slate-300">{activeItem.sourceTitle}</span>
                </div>

                <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-2 font-mono">
                  <span>Institution: {activeItem.sourceInstitution}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>Type: {activeItem.sourceType}</span>
                </div>

                {activeItem.attachedMediaIds && activeItem.attachedMediaIds.length > 0 && (
                  <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1 pt-0.5">
                    <ImageIcon className="w-3 h-3 text-sky-400" />
                    <span>Attached Evidence: {activeItem.attachedMediaIds.length} Photographs / Submersible Videos</span>
                  </div>
                )}
              </div>

              {/* Title & Editable View */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono uppercase text-slate-400">
                    Format: <span className="text-white font-semibold">{activeItem.formatLabel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyText}
                      className="px-2.5 py-1 text-xs text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded flex items-center gap-1 cursor-pointer"
                    >
                      {copyFeedback ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-2.5 py-1 text-xs text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-sky-400" />
                      <span>{isEditing ? 'Cancel Edit' : 'Edit Content'}</span>
                    </button>
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-sm font-bold text-white focus:outline-none focus:border-sky-500"
                    />
                    <textarea
                      rows={12}
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="w-full p-4 bg-slate-900 border border-slate-800 rounded text-xs text-slate-200 font-mono leading-relaxed focus:outline-none focus:border-sky-500"
                    />
                    <button
                      onClick={handleSaveEdits}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded cursor-pointer flex items-center gap-1.5"
                    >
                      <BookmarkCheck className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                ) : (
                  /* HIGH-FIDELITY PLATFORM SIMULATOR PREVIEW */
                  <div className="space-y-3 bg-slate-900/90 p-5 rounded border border-slate-800">
                    {/* Platform Badge Indicator */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] font-mono text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-sky-400" />
                        <span>Channel Preview: {activeItem.formatLabel}</span>
                      </div>
                      <span>Simulated MoES Output</span>
                    </div>

                    <h3 className="text-base font-bold text-white leading-snug">
                      {activeItem.title}
                    </h3>
                    <div className="text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                      {activeItem.content}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs font-mono">
              Select source and generate content to review outreach packages.
            </div>
          )}
        </div>

        {/* COLUMN 3 (RIGHT): Human Review & Dissemination Pipeline */}
        <div className="lg:col-span-3 bg-[#0b101d] border border-slate-800 rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono uppercase text-slate-300 font-semibold">
              Review & Publishing
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Stage Gate</span>
          </div>

          {activeItem && (
            <div className="space-y-4">
              {/* Current Status Indicator */}
              <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-1.5">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Workflow State:</div>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      activeItem.reviewStatus === 'published'
                        ? 'bg-emerald-400'
                        : activeItem.reviewStatus === 'approved'
                        ? 'bg-sky-400'
                        : activeItem.reviewStatus === 'under_review'
                        ? 'bg-amber-400'
                        : 'bg-slate-400'
                    }`}
                  />
                  <span className="text-xs font-bold font-mono text-white uppercase tracking-wider">
                    {activeItem.reviewStatus.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Created: {activeItem.createdAt} · Target: {activeItem.targetAudience}
                </div>
              </div>

              {/* Reviewer Notes Box */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono text-slate-400 uppercase">
                  Scientific Reviewer Notes:
                </label>
                <textarea
                  rows={3}
                  value={reviewNotesInput}
                  onChange={(e) => setReviewNotesInput(e.target.value)}
                  placeholder="Verification comments by scientific outreach officer..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-xs text-slate-300 focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Dissemination Channels */}
              <div className="space-y-2">
                <span className="block text-[11px] font-mono text-slate-400 uppercase">
                  Target Dissemination Channels:
                </span>
                <div className="space-y-1 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-sky-400" />
                    <span>Ministry of Earth Sciences (MoES) Web</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-sky-400" />
                    <span>Press Information Bureau (PIB) Wire</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-sky-400" />
                    <span>Social Channels (X, Instagram, LinkedIn)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-sky-400" />
                    <span>Smart Education / School Science Portals</span>
                  </div>
                </div>
              </div>

              {/* Stage Transition Action Buttons */}
              <div className="space-y-2 pt-3 border-t border-slate-800">
                <button
                  onClick={() => handleStatusChange('under_review')}
                  className="w-full py-2 px-3 text-xs font-semibold rounded bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border border-amber-800/60 cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Submit for Scientific Review</span>
                </button>

                <button
                  onClick={() => handleStatusChange('approved')}
                  className="w-full py-2 px-3 text-xs font-semibold rounded bg-sky-950/40 hover:bg-sky-900/50 text-sky-300 border border-sky-800/60 cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Approve Content for Dissemination</span>
                </button>

                <button
                  onClick={() => handleStatusChange('published')}
                  className="w-full py-2 px-3 text-xs font-bold rounded bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer flex items-center justify-center gap-1.5 shadow transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish to Website & Social Channels</span>
                </button>
              </div>

              {activeItem.reviewStatus === 'published' && (
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded space-y-2 text-xs">
                  <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    <span>Published to Public Portal</span>
                  </div>
                  <button
                    onClick={() => onNavigate('stories')}
                    className="w-full py-1.5 text-xs text-center text-sky-300 bg-slate-900 rounded hover:underline cursor-pointer"
                  >
                    View in Public Stories →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
