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
  FileText,
  CheckCircle,
  Clock,
  Send,
  Share2,
  Copy,
  ExternalLink,
  Edit3,
  BookmarkCheck,
  ShieldCheck,
  Check,
  Image as ImageIcon,
  Database,
  ArrowRight,
  Sparkles,
  Save,
  RotateCcw
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

  // 2. Output Formats Selection Checkboxes (Per Prompt Specification)
  const [selectedFormat, setSelectedFormat] = useState<
    'Website Article' | 'Public Article' | 'Student Explanation' | 'Social Post' | 'Video Script' | 'Infographic Content'
  >('Website Article');

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

  // Run Generation
  const handleGenerateContent = async () => {
    setIsGenerating(true);
    try {
      const formatMapping: Record<string, OutreachFormat[]> = {
        'Website Article': ['website_article'],
        'Public Article': ['website_article'],
        'Student Explanation': ['website_article'],
        'Social Post': ['instagram_post', 'linkedin_post'],
        'Video Script': ['video_script'],
        'Infographic Content': ['website_article'],
      };

      const newItems = await generateContentStudioPackage({
        sourceId: selectedSourceId,
        sourceType,
        formats: formatMapping[selectedFormat] || ['website_article'],
        attachedMediaIds,
        attachedDatasetId,
      });

      // Save to repository
      newItems.forEach((item) => PolarRepository.addOutreachItem(item));
      const updated = PolarRepository.getOutreachItems();
      setGeneratedItems(updated);
      setActiveItemId(newItems[0].id);
    } catch (err) {
      console.error('Error in content generation:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Review Status Workflow Transitions (DRAFT -> REVIEW -> APPROVED -> PUBLISHED)
  const handleStatusChange = (newStatus: ReviewStatus) => {
    if (!activeItem) return;
    const channels =
      newStatus === 'published'
        ? ['Official MoES Portal', 'Press Information Bureau', 'POLARIS Stories']
        : activeItem.publishedChannels;

    PolarRepository.updateOutreachStatus(activeItem.id, newStatus, reviewNotesInput, channels);
    setGeneratedItems(PolarRepository.getOutreachItems());
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
  const currentSourceDataset = datasets.find((d) => d.id === selectedSourceId);
  const currentSourceExp = expeditions.find((e) => e.id === selectedSourceId);

  const sourceTitle =
    currentSourceReport?.title ||
    currentSourceResearch?.title ||
    currentSourceDataset?.title ||
    currentSourceExp?.name ||
    'MoES Polar Science Asset';

  const sourceIdentifier =
    currentSourceReport?.reportNumber ||
    currentSourceResearch?.doi ||
    currentSourceDataset?.fileFormat ||
    currentSourceExp?.id ||
    'REF-POLARIS-01';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* 1. Newsroom Header */}
      <div className="border-b border-slate-300 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#003366]">
            Ministry of Earth Sciences · Editorial Newsroom
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#002244] tracking-tight mt-1">
            POLARIS Content Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Editorial workspace translating complex expedition reports, peer-reviewed publications, and raw telemetry into verified website articles, school curriculum, and public media dissemination.
          </p>
        </div>

        {/* 4-Stage Workflow Indicator (PER PROMPT SPECIFICATION) */}
        <div className="flex items-center gap-1 border border-slate-300 bg-white p-1 text-[11px] font-mono self-start md:self-auto">
          <span className="text-slate-500 px-1 uppercase text-[10px]">Workflow:</span>
          <span className={`px-2 py-0.5 ${activeItem?.reviewStatus === 'draft' ? 'bg-[#002244] text-white font-bold' : 'text-slate-600'}`}>
            DRAFT
          </span>
          <span className="text-slate-400">→</span>
          <span className={`px-2 py-0.5 ${activeItem?.reviewStatus === 'under_review' || activeItem?.reviewStatus === 'ai_generated' ? 'bg-amber-600 text-white font-bold' : 'text-slate-600'}`}>
            REVIEW
          </span>
          <span className="text-slate-400">→</span>
          <span className={`px-2 py-0.5 ${activeItem?.reviewStatus === 'approved' ? 'bg-blue-700 text-white font-bold' : 'text-slate-600'}`}>
            APPROVED
          </span>
          <span className="text-slate-400">→</span>
          <span className={`px-2 py-0.5 ${activeItem?.reviewStatus === 'published' ? 'bg-emerald-700 text-white font-bold' : 'text-slate-600'}`}>
            PUBLISHED
          </span>
        </div>
      </div>

      {/* 2. Three-Column Newsroom Layout: LEFT (SOURCE) · MIDDLE (GENERATE) · RIGHT (OUTPUT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================
            COLUMN 1 (LEFT): SOURCE
            ======================================================== */}
        <div className="lg:col-span-3 border border-slate-300 bg-white p-4 space-y-4">
          <div className="border-b border-slate-300 pb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-[#002244]">
              1. Source Material
            </h2>
          </div>

          {/* Source Type Selector */}
          <div className="space-y-1">
            <label className="block text-[11px] font-mono text-slate-500 uppercase font-semibold">
              Source Category:
            </label>
            <div className="grid grid-cols-2 gap-1 text-xs">
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
                  className={`px-2 py-1.5 border text-left truncate cursor-pointer transition-colors text-xs ${
                    sourceType === t
                      ? 'bg-[#002244] text-white border-[#001730] font-semibold'
                      : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Specific Document Select */}
          <div className="space-y-1">
            <label className="block text-[11px] font-mono text-slate-500 uppercase font-semibold">
              Select Record:
            </label>
            <select
              value={selectedSourceId}
              onChange={(e) => setSelectedSourceId(e.target.value)}
              className="w-full p-2 border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none cursor-pointer"
            >
              {sourceType === 'Expedition Report' &&
                reports.map((r) => (
                  <option key={r.id} value={r.id}>
                    [{r.reportNumber}] {r.title.slice(0, 36)}...
                  </option>
                ))}
              {sourceType === 'Publication' &&
                research.map((p) => (
                  <option key={p.id} value={p.id}>
                    [{p.doi}] {p.title.slice(0, 36)}...
                  </option>
                ))}
              {sourceType === 'Dataset' &&
                datasets.map((d) => (
                  <option key={d.id} value={d.id}>
                    [{d.fileFormat}] {d.title.slice(0, 36)}...
                  </option>
                ))}
              {sourceType === 'Expedition' &&
                expeditions.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name.slice(0, 40)}
                  </option>
                ))}
            </select>
          </div>

          {/* Source Document Details Box */}
          <div className="p-3 bg-slate-50 border border-slate-300 space-y-2 text-xs">
            <div className="font-semibold text-slate-900 leading-snug">
              {sourceTitle}
            </div>
            <div className="text-[11px] font-mono text-[#004c99]">
              ID / DOI: {sourceIdentifier}
            </div>
            <div className="text-[11px] text-slate-600 line-clamp-3 leading-relaxed">
              {currentSourceReport?.summary ||
                currentSourceResearch?.abstract ||
                currentSourceDataset?.description ||
                currentSourceExp?.objective}
            </div>
            <div className="pt-2 border-t border-slate-200 text-[10px] font-mono text-slate-500">
              Institution: {currentSourceReport?.institution || 'NCPOR / MoES India'}
            </div>
          </div>

          {/* Attached Field Media */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-[11px] font-mono text-slate-500 uppercase font-semibold">
              Attached Field Media:
            </label>
            <div className="space-y-1">
              {allMedia.slice(0, 2).map((m) => {
                const isSelected = attachedMediaIds.includes(m.id);
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      if (isSelected) {
                        setAttachedMediaIds(attachedMediaIds.filter((id) => id !== m.id));
                      } else {
                        setAttachedMediaIds([...attachedMediaIds, m.id]);
                      }
                    }}
                    className={`w-full p-2 text-left border flex items-center gap-2 cursor-pointer text-xs ${
                      isSelected
                        ? 'bg-blue-50 border-blue-300 text-slate-900'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    <input type="checkbox" checked={isSelected} readOnly className="pointer-events-none" />
                    <span className="truncate flex-1">{m.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================
            COLUMN 2 (MIDDLE): GENERATE & NORMAL DOCUMENT EDITOR
            ======================================================== */}
        <div className="lg:col-span-6 border border-slate-300 bg-white p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-300 pb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-[#002244]">
              2. Generate & Editorial Document Editor
            </h2>
            <span className="text-[11px] font-mono text-slate-500">
              Normal Document View (No AI Chat)
            </span>
          </div>

          {/* Format Selector Buttons (PER PROMPT SPECIFICATION) */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono text-slate-500 uppercase font-semibold">
              Select Output Format:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs font-mono">
              {[
                'Website Article',
                'Public Article',
                'Student Explanation',
                'Social Post',
                'Video Script',
                'Infographic Content',
              ].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt as any)}
                  className={`p-2 border text-center cursor-pointer transition-colors text-xs ${
                    selectedFormat === fmt
                      ? 'bg-[#002244] text-white border-[#001730] font-semibold'
                      : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Action: Generate Outreach Document */}
          <button
            onClick={handleGenerateContent}
            disabled={isGenerating}
            className="w-full ds-btn-primary justify-center py-2 text-xs"
          >
            {isGenerating ? (
              <span>Synthesizing Scientific Outreach...</span>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate {selectedFormat} from Source</span>
              </>
            )}
          </button>

          {/* Normal Document Editor Box (PER USER PROMPT SPECIFICATION) */}
          {activeItem && (
            <div className="border border-slate-300 bg-slate-50 p-4 space-y-3">
              {/* Document Metadata Strip: Source, Generated From, Citation, Status */}
              <div className="p-2.5 bg-white border border-slate-300 space-y-1 text-xs font-mono text-slate-700">
                <div className="flex flex-wrap items-center justify-between gap-1 text-[11px]">
                  <span><strong>Source:</strong> {activeItem.sourceTitle.slice(0, 36)}...</span>
                  <span><strong>Status:</strong> <span className="ds-badge ds-badge-neutral">{activeItem.reviewStatus.toUpperCase()}</span></span>
                </div>
                <div className="text-[11px] text-slate-600">
                  <strong>Generated From:</strong> {sourceIdentifier}
                </div>
                <div className="text-[11px] text-[#004c99]">
                  <strong>Citation:</strong> MoES Polar Intelligence Archive · Ret: {activeItem.id}
                </div>
              </div>

              {/* Document Editor Area */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono text-slate-600 uppercase font-semibold">
                    Document Headline:
                  </label>
                  <span className="text-[11px] font-mono text-slate-400">
                    {editedContent.split(/\s+/).filter(Boolean).length} words
                  </span>
                </div>

                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => {
                    setEditedTitle(e.target.value);
                    setIsEditing(true);
                  }}
                  className="w-full p-2.5 bg-white border border-slate-300 text-sm font-bold font-serif text-[#002244] focus:outline-none focus:border-[#003366]"
                />

                <label className="block text-[11px] font-mono text-slate-600 uppercase font-semibold pt-1">
                  Document Text Body:
                </label>

                <textarea
                  rows={14}
                  value={editedContent}
                  onChange={(e) => {
                    setEditedContent(e.target.value);
                    setIsEditing(true);
                  }}
                  className="w-full p-3 bg-white border border-slate-300 text-xs sm:text-sm text-slate-800 font-sans leading-relaxed focus:outline-none focus:border-[#003366] resize-y"
                />
              </div>

              {/* Editor Bottom Actions */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  {isEditing && (
                    <button
                      onClick={handleSaveEdits}
                      className="ds-btn-primary text-xs"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Document</span>
                    </button>
                  )}
                  <button
                    onClick={handleCopyText}
                    className="ds-btn-secondary text-xs"
                  >
                    {copyFeedback ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-600" />
                        <span>Copy Text</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-[11px] font-mono text-slate-500">
                  Format: {activeItem.formatLabel}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================
            COLUMN 3 (RIGHT): OUTPUT & WORKFLOW
            ======================================================== */}
        <div className="lg:col-span-3 border border-slate-300 bg-white p-4 space-y-4">
          <div className="border-b border-slate-300 pb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-[#002244]">
              3. Editorial Workflow & Dissemination
            </h2>
          </div>

          {/* Workflow Status Controls */}
          {activeItem && (
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="block text-[11px] font-mono text-slate-500 uppercase font-semibold">
                  Transition Document Status:
                </label>
                <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
                  <button
                    onClick={() => handleStatusChange('draft')}
                    className={`p-1.5 border text-center cursor-pointer ${
                      activeItem.reviewStatus === 'draft'
                        ? 'bg-slate-800 text-white font-bold'
                        : 'bg-slate-100 border-slate-300 text-slate-700'
                    }`}
                  >
                    Draft
                  </button>
                  <button
                    onClick={() => handleStatusChange('under_review')}
                    className={`p-1.5 border text-center cursor-pointer ${
                      activeItem.reviewStatus === 'under_review' || activeItem.reviewStatus === 'ai_generated'
                        ? 'bg-amber-600 text-white font-bold'
                        : 'bg-slate-100 border-slate-300 text-slate-700'
                    }`}
                  >
                    Review
                  </button>
                  <button
                    onClick={() => handleStatusChange('approved')}
                    className={`p-1.5 border text-center cursor-pointer ${
                      activeItem.reviewStatus === 'approved'
                        ? 'bg-blue-700 text-white font-bold'
                        : 'bg-slate-100 border-slate-300 text-slate-700'
                    }`}
                  >
                    Approved
                  </button>
                  <button
                    onClick={() => handleStatusChange('published')}
                    className={`p-1.5 border text-center cursor-pointer ${
                      activeItem.reviewStatus === 'published'
                        ? 'bg-emerald-700 text-white font-bold'
                        : 'bg-slate-100 border-slate-300 text-slate-700'
                    }`}
                  >
                    Published
                  </button>
                </div>
              </div>

              {/* Reviewer Sign-Off Notes */}
              <div className="space-y-1">
                <label className="block text-[11px] font-mono text-slate-500 uppercase font-semibold">
                  Reviewer Notes:
                </label>
                <textarea
                  rows={3}
                  value={reviewNotesInput}
                  onChange={(e) => setReviewNotesInput(e.target.value)}
                  placeholder="e.g. Verified by Dr. M. Ravichandran. Figures matched with CTD transect data."
                  className="w-full p-2 border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none"
                />
              </div>

              {/* Target Dissemination Channels */}
              <div className="space-y-1.5 border-t border-slate-200 pt-3">
                <label className="block text-[11px] font-mono text-slate-500 uppercase font-semibold">
                  Active Channels:
                </label>
                <div className="space-y-1 text-xs text-slate-700">
                  <div className="p-2 bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span>MoES Web Portal</span>
                    <span className="text-emerald-700 font-bold text-[10px]">CONNECTED</span>
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span>Public Stories Feed</span>
                    <span className="text-emerald-700 font-bold text-[10px]">CONNECTED</span>
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span>PIB Science Wire</span>
                    <span className="text-slate-500 text-[10px]">READY</span>
                  </div>
                </div>
              </div>

              {/* Action Button: Disseminate to Public */}
              <button
                onClick={() => {
                  handleStatusChange('published');
                  onNavigate('stories');
                }}
                className="w-full ds-btn-primary justify-center py-2 text-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish to Public Stories</span>
              </button>
            </div>
          )}

          {/* Previously Generated Queue in Newsroom */}
          <div className="border-t border-slate-200 pt-3 space-y-2">
            <label className="block text-[11px] font-mono text-slate-500 uppercase font-semibold">
              Recent Newsroom Drafts:
            </label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {generatedItems.slice(0, 5).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveItemId(item.id)}
                  className={`w-full p-2 text-left border transition-colors cursor-pointer text-xs ${
                    activeItemId === item.id
                      ? 'bg-blue-50 border-[#003366] text-[#002244] font-semibold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="truncate text-xs font-semibold">{item.title}</div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                    <span>{item.formatLabel}</span>
                    <span className="uppercase">{item.reviewStatus}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
