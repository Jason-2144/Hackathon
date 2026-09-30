import React, { useState } from 'react';
import { PolarRepository } from '../../lib/supabase';
import { generateStoryFromResearch } from '../../lib/gemini';
import { ResearchItem, ScienceStory } from '../../types/polar';
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Share2,
  Copy,
  CheckCircle,
  FileText,
  GraduationCap,
  Users,
  MessageSquare,
  BookmarkPlus,
  RefreshCw,
  Sliders,
  Send
} from 'lucide-react';

interface StoryGeneratorViewProps {
  onNavigate: (tab: any, params?: any) => void;
  initialResearchId?: string;
}

export const StoryGeneratorView: React.FC<StoryGeneratorViewProps> = ({
  onNavigate,
  initialResearchId,
}) => {
  const researchItems = PolarRepository.getResearch();
  const existingStories = PolarRepository.getStories();

  const [selectedResearchId, setSelectedResearchId] = useState<string>(
    initialResearchId || researchItems[0]?.id || ''
  );
  const [targetAudience, setTargetAudience] = useState<
    'General Public' | 'High School Students' | 'Science Journalists' | 'Policymakers'
  >('General Public');
  const [readingLevel, setReadingLevel] = useState<string>('Grade 8 (Accessible to all)');

  const [generating, setGenerating] = useState(false);
  const [activeStory, setActiveStory] = useState<ScienceStory>(existingStories[0]);
  const [activeTab, setActiveTab] = useState<'scientific' | 'student' | 'public' | 'social'>('public');
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const selectedResearch =
    researchItems.find((r) => r.id === selectedResearchId) || researchItems[0];

  const handleGenerate = async () => {
    setGenerating(true);
    setSavedSuccess(false);
    try {
      const generated = await generateStoryFromResearch(selectedResearchId);
      generated.targetAudience = targetAudience;
      generated.readingLevel = readingLevel;
      setActiveStory(generated);
    } catch (err) {
      console.error('Error generating story:', err);
    } finally {
      setGenerating(false);
    }
  };

  const handleSaveToCommunity = () => {
    if (!activeStory) return;
    PolarRepository.addStory(activeStory);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleCopyCurrent = () => {
    let content = '';
    if (activeTab === 'scientific') content = activeStory.scientificSummary;
    else if (activeTab === 'student') content = activeStory.studentExplanation;
    else if (activeTab === 'public') content = activeStory.publicStory;
    else if (activeTab === 'social') content = activeStory.socialMediaThread.join('\n\n');

    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Introduction */}
      <div className="space-y-2 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-widest uppercase">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Science Outreach Transformation Studio</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Turn Science Into a Story
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Bridge the communication divide between dense academic cryospheric literature and the public. Select an empirical paper or dataset to generate multi-tiered, de-jargonized stories and social outreach kits.
        </p>
      </div>

      {/* Visual Workflow Pipeline Graphic per problem statement */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[600px] text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 font-bold">1</span>
            <span>Raw Scientific Paper</span>
          </div>
          <ArrowRight className="w-4 h-4 text-cyan-500/50" />
          <div className="flex items-center gap-2 text-cyan-300">
            <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold">2</span>
            <span>AI Translation & De-Jargon</span>
          </div>
          <ArrowRight className="w-4 h-4 text-cyan-500/50" />
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400 font-bold">3</span>
            <span>Multi-Tier Public Stories</span>
          </div>
          <ArrowRight className="w-4 h-4 text-cyan-500/50" />
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-purple-400 font-bold">4</span>
            <span>Public Media Sharing</span>
          </div>
        </div>
      </div>

      {/* Selection & Controls Bar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Paper Select */}
          <div className="md:col-span-6 space-y-1.5">
            <label className="block text-xs font-mono uppercase text-slate-400">
              Select Source Research Paper:
            </label>
            <select
              value={selectedResearchId}
              onChange={(e) => setSelectedResearchId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              {researchItems.map((item) => (
                <option key={item.id} value={item.id}>
                  [{item.region}] {item.title.slice(0, 75)}... ({item.year})
                </option>
              ))}
            </select>
          </div>

          {/* Target Audience */}
          <div className="md:col-span-3 space-y-1.5">
            <label className="block text-xs font-mono uppercase text-slate-400">
              Target Audience:
            </label>
            <select
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value as any)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="General Public">General Public</option>
              <option value="High School Students">High School / Students</option>
              <option value="Science Journalists">Science Journalists</option>
              <option value="Policymakers">Policymakers</option>
            </select>
          </div>

          {/* Action Trigger */}
          <div className="md:col-span-3">
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              {generating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing Science...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Transform Into Story</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Selected Paper Context Card */}
        {selectedResearch && (
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-semibold text-white">{selectedResearch.title}</span>
              <div className="text-slate-400 text-[11px] mt-0.5">
                {selectedResearch.authors[0]} et al. ({selectedResearch.year}) · {selectedResearch.institution} · DOI: {selectedResearch.doi}
              </div>
            </div>
            <button
              onClick={() => onNavigate('repository')}
              className="text-cyan-400 hover:underline shrink-0 text-[11px] cursor-pointer"
            >
              View in Repository →
            </button>
          </div>
        )}
      </div>

      {/* Generated Story Presentation Area */}
      {activeStory && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-6 shadow-2xl">
          {/* Story Title & Metaphor Kicker */}
          <div className="border-b border-slate-800 pb-5 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                Audience: {activeStory.targetAudience} · Reading Level: {activeStory.readingLevel}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveToCommunity}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  <BookmarkPlus className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{savedSuccess ? 'Saved to Portal!' : 'Save Story'}</span>
                </button>
                <button
                  onClick={handleCopyCurrent}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Tab</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {activeStory.title}
            </h2>

            {activeStory.keyMetaphor && (
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <span className="text-cyan-300 font-semibold">Core Analogy / Metaphor:</span>
                <span className="italic text-slate-300">"{activeStory.keyMetaphor}"</span>
              </div>
            )}
          </div>

          {/* Deliverable Level Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
            <button
              onClick={() => setActiveTab('public')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'public'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Public-Friendly Story</span>
            </button>

            <button
              onClick={() => setActiveTab('student')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'student'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student-Friendly Explanation</span>
            </button>

            <button
              onClick={() => setActiveTab('social')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'social'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Social Media Outreach Kit</span>
            </button>

            <button
              onClick={() => setActiveTab('scientific')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'scientific'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Scientific Summary</span>
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="pt-2">
            {activeTab === 'public' && (
              <div className="space-y-4">
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Narrative Public Article (Newspaper / Blog Feature):
                </div>
                <div className="text-base text-slate-200 leading-relaxed bg-slate-950/60 p-6 rounded-2xl border border-slate-800 space-y-4 font-serif">
                  {activeStory.publicStory.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'student' && (
              <div className="space-y-4">
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                  Middle & High School Educational Breakdown:
                </div>
                <div className="text-base text-slate-200 leading-relaxed bg-emerald-950/10 p-6 rounded-2xl border border-emerald-900/40 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                    <GraduationCap className="w-4 h-4" />
                    <span>How to understand this without a PhD:</span>
                  </div>
                  <p>{activeStory.studentExplanation}</p>
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="space-y-4">
                <div className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                  Outreach Twitter / Bluesky / Instagram Thread ({activeStory.socialMediaThread.length} Posts):
                </div>
                <div className="space-y-3">
                  {activeStory.socialMediaThread.map((post, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 leading-relaxed relative"
                    >
                      <div className="text-[10px] font-mono text-slate-500 mb-1">
                        Post #{idx + 1}
                      </div>
                      <p>{post}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'scientific' && (
              <div className="space-y-4">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Rigorous Academic Abstract & Findings:
                </div>
                <div className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <p>{activeStory.scientificSummary}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Community Stories Archive Showcase */}
      <div className="space-y-4 pt-6 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white tracking-tight">
            Recent Public Science Stories Generated by Researchers
          </h3>
          <span className="text-xs font-mono text-cyan-400">
            {existingStories.length} Stories Published
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {existingStories.map((story) => (
            <div
              key={story.id}
              onClick={() => setActiveStory(story)}
              className="p-5 bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/30 rounded-xl transition-all cursor-pointer space-y-2.5"
            >
              <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>{story.targetAudience}</span>
                <span className="text-cyan-400">{story.createdDate}</span>
              </div>
              <h4 className="text-base font-bold text-white hover:text-cyan-300 transition-colors">
                {story.title}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {story.publicStory}
              </p>
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                <span>Author: {story.author}</span>
                <span className="text-cyan-400 font-medium">Read Story →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
