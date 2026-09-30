import React, { useState, useEffect } from 'react';
import { askPolarAI } from '../../lib/gemini';
import { AIResponse } from '../../types/polar';
import {
  Sparkles,
  Send,
  BookOpen,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  CheckCircle,
  Database,
  Compass,
  Copy,
  TrendingDown,
  TrendingUp,
  RefreshCw
} from 'lucide-react';

interface PolarAIViewProps {
  onNavigate: (tab: any, params?: any) => void;
  prefillQuery?: string;
}

export const PolarAIView: React.FC<PolarAIViewProps> = ({ onNavigate, prefillQuery }) => {
  const [query, setQuery] = useState(prefillQuery || '');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  const suggestedQuestions = [
    'Tell me about Thwaites Glacier.',
    'Why is Antarctic ice melting?',
    'What happens if sea ice disappears?',
    'How do scientists study Antarctica?',
    'What animals live in the Arctic?',
  ];

  const handleSearch = async (targetQuery: string) => {
    if (!targetQuery.trim()) return;
    setLoading(true);
    setQuery(targetQuery);
    try {
      const res = await askPolarAI(targetQuery);
      setResponse(res);
    } catch (err) {
      console.error('AI query error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (prefillQuery) {
      handleSearch(prefillQuery);
    } else if (!response) {
      // Pre-load Thwaites question for an instant impressive initial state
      handleSearch('Tell me about Thwaites Glacier.');
    }
  }, [prefillQuery]);

  const copyFullResponse = () => {
    if (!response) return;
    const text = `POLAR AI INTELLIGENCE RECORD
Query: ${response.query}

SIMPLE EXPLANATION:
${response.simpleExplanation}

SCIENTIFIC EXPLANATION:
${response.scientificExplanation}

KEY FACTS:
${response.keyFacts.map((f) => `- ${f}`).join('\n')}

SOURCES CITED:
${response.sources.map((s) => `${s.title} (${s.institution}, ${s.year}) - ${s.urlOrDoi}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5 space-y-2">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-mono tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Empirical Polar Knowledge Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          POLAR AI
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Synthesize peer-reviewed cryospheric science into dual-audience explanations (Student/Public and Glaciologist/Research level), complete with empirical facts and verifiable institutional citations.
        </p>
      </div>

      {/* Suggested Questions Grid */}
      <div className="space-y-1.5">
        <div className="text-xs font-mono text-slate-400">
          Suggested Inquiries:
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSearch(q)}
              className={`px-3 py-1 text-xs rounded transition-colors cursor-pointer ${
                query === q
                  ? 'bg-slate-800 text-white border border-slate-700 font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Query Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(query);
        }}
        className="relative max-w-3xl"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question about glaciers, sea ice, stations, climate trends, wildlife..."
          className="w-full pl-4 pr-28 py-3 bg-slate-900 border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-500 shadow-sm"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 ds-btn-primary text-xs py-1.5 px-3.5 disabled:opacity-50"
        >
          {loading ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <>
              <span>Ask</span>
              <Send className="w-3 h-3 text-slate-950" />
            </>
          )}
        </button>
      </form>

      {/* Loading State */}
      {loading && (
        <div className="max-w-3xl bg-[#0b101d] border border-slate-800 rounded-lg p-8 text-center space-y-3">
          <div className="inline-block p-3 rounded-md bg-slate-900 text-sky-400 border border-slate-800 animate-pulse">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="text-sm font-semibold text-white">Synthesizing Polar Intelligence...</div>
          <div className="text-xs text-slate-400 font-mono">
            Querying peer-reviewed literature, satellite indices & empirical models
          </div>
        </div>
      )}

      {/* Structured AI Response View */}
      {!loading && response && (
        <div className="max-w-3xl bg-[#0b101d] border border-slate-800 rounded-lg p-5 sm:p-6 space-y-6 shadow">
          {/* Header & Copy Button */}
          <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                Polar Intelligence Synthesis
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                "{response.query}"
              </h2>
            </div>
            <button
              onClick={copyFullResponse}
              className="ds-btn-secondary text-xs py-1 px-2.5"
            >
              {copiedText ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Report</span>
                </>
              )}
            </button>
          </div>

          {/* Section 1: Simple Explanation */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-300">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>Simple Explanation (Student & Public Audience)</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed bg-slate-900 border-l-2 border-sky-400 p-3.5 rounded-r">
              {response.simpleExplanation}
            </p>
          </div>

          {/* Section 2: Scientific Explanation */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-300">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              <span>Scientific Explanation (Empirical Glaciology & Dynamics)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900 border-l-2 border-slate-600 p-3.5 rounded-r">
              {response.scientificExplanation}
            </p>
          </div>

          {/* Section 3: Key Facts */}
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Key Empirical Facts
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {response.keyFacts.map((fact, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-200">
                  <CheckCircle className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{fact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Related Data */}
          {response.relatedData && response.relatedData.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Related Observational Data
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {response.relatedData.map((d, idx) => (
                  <div key={idx} className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                    <div className="text-[11px] text-slate-400 font-medium">{d.metric}</div>
                    <div className="text-lg font-bold font-mono text-white flex items-center justify-between">
                      <span>{d.value}</span>
                      {d.trend === 'increasing' ? (
                        <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
                      ) : d.trend === 'decreasing' ? (
                        <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
                      ) : null}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono leading-tight">{d.context}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 5: Sources & Citations */}
          <div className="pt-4 border-t border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                <span>Cited Scientific Sources ({response.sources.length})</span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">Peer-Reviewed / Institutional</span>
            </div>

            <div className="space-y-2">
              {response.sources.map((src, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-900 border border-slate-800 rounded flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-semibold text-slate-200">{src.title}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">
                      {src.institution} · {src.year}
                    </div>
                    <div className="text-sky-400 font-mono text-[10px] mt-1">
                      Ref: {src.urlOrDoi}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="ds-badge ds-badge-neutral text-[10px]">
                      {(src.confidenceScore * 100).toFixed(0)}% Match
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Scientific Rigor Disclaimer */}
            <div className="flex items-center gap-2 p-2.5 rounded bg-slate-900/60 text-[11px] text-slate-400 border border-slate-800">
              <ShieldAlert className="w-4 h-4 text-sky-400 shrink-0" />
              <span>
                POLAR AI grounds responses strictly in peer-reviewed polar science and MoES research. Cross-reference with the Knowledge Repository for raw telemetry.
              </span>
            </div>
          </div>

          {/* Next Step Actions: Turn into Story / Explore on Map */}
          <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2.5">
            <button
              onClick={() => onNavigate('studio')}
              className="ds-btn-primary text-xs py-1.5 px-3"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-950" />
              <span>Convert Topic Into Outreach Content</span>
            </button>
            <button
              onClick={() => onNavigate('explore')}
              className="ds-btn-secondary text-xs py-1.5 px-3"
            >
              <Compass className="w-3.5 h-3.5 text-slate-300" />
              <span>View On Polar Map</span>
            </button>
          </div>

          {/* Suggested Follow-Ups */}
          {response.suggestedFollowUps && response.suggestedFollowUps.length > 0 && (
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <div className="text-xs font-mono text-slate-400">Suggested Follow-Up Inquiries:</div>
              <div className="flex flex-wrap gap-1.5">
                {response.suggestedFollowUps.map((followUp, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearch(followUp)}
                    className="text-left px-2.5 py-1 text-xs text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded transition-colors cursor-pointer"
                  >
                    → {followUp}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
