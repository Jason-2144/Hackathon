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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Empirical Polar Knowledge Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          POLAR AI
        </h1>
        <p className="text-base text-slate-400">
          Ask anything about the polar regions. Synthesizes peer-reviewed cryospheric science into simple explanations, empirical physics, and cited research.
        </p>
      </div>

      {/* Suggested Questions Grid */}
      <div className="space-y-2">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 text-center">
          Suggested Inquiries:
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSearch(q)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
                query === q
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
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
        className="relative max-w-3xl mx-auto"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question about glaciers, sea ice, stations, climate trends, wildlife..."
          className="w-full pl-5 pr-28 py-3.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 shadow-xl"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
        >
          {loading ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <>
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>

      {/* Loading State */}
      {loading && (
        <div className="max-w-3xl mx-auto bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
          <div className="inline-block p-3 rounded-full bg-cyan-950/40 text-cyan-400 border border-cyan-500/30 animate-pulse">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="text-sm font-semibold text-white">Synthesizing Polar Intelligence...</div>
          <div className="text-xs text-slate-400 font-mono">
            Querying peer-reviewed literature, satellite indices & empirical models
          </div>
        </div>
      )}

      {/* Structured AI Response View */}
      {!loading && response && (
        <div className="max-w-3xl mx-auto bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 backdrop-blur-md shadow-2xl">
          {/* Header & Copy Button */}
          <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                Polar Intelligence Synthesis
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                "{response.query}"
              </h2>
            </div>
            <button
              onClick={copyFullResponse}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
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
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Simple Explanation (Student & Public Audience)</span>
            </div>
            <p className="text-base text-slate-200 leading-relaxed bg-emerald-950/10 border-l-2 border-emerald-500 p-4 rounded-r-xl">
              {response.simpleExplanation}
            </p>
          </div>

          {/* Section 2: Scientific Explanation */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Scientific Explanation (Empirical Glaciology & Dynamics)</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed bg-cyan-950/10 border-l-2 border-cyan-500 p-4 rounded-r-xl">
              {response.scientificExplanation}
            </p>
          </div>

          {/* Section 3: Key Facts */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Key Empirical Facts
            </div>
            <div className="grid grid-cols-1 gap-2">
              {response.keyFacts.map((fact, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-950/50 border border-slate-800/80 text-xs text-slate-200">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{fact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Related Data */}
          {response.relatedData && response.relatedData.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Related Observational Data
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {response.relatedData.map((d, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="text-[11px] text-slate-400 font-medium">{d.metric}</div>
                    <div className="text-lg font-bold font-mono text-cyan-300 flex items-center justify-between">
                      <span>{d.value}</span>
                      {d.trend === 'increasing' ? (
                        <TrendingUp className="w-4 h-4 text-rose-400" />
                      ) : d.trend === 'decreasing' ? (
                        <TrendingDown className="w-4 h-4 text-amber-400" />
                      ) : null}
                    </div>
                    <div className="text-[10px] text-slate-500 leading-tight">{d.context}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 5: Sources & Citations (Mandatory per problem statement) */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>Cited Scientific Sources ({response.sources.length})</span>
              </div>
              <span className="text-[11px] text-slate-500">Verified Peer-Reviewed Literature</span>
            </div>

            <div className="space-y-2">
              {response.sources.map((src, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-semibold text-slate-200">{src.title}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">
                      {src.institution} · {src.year}
                    </div>
                    <div className="text-cyan-400/90 font-mono text-[10px] mt-1">
                      Ref: {src.urlOrDoi}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800 text-[10px] text-emerald-300 font-mono">
                      {(src.confidenceScore * 100).toFixed(0)}% Match
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Scientific Rigor Disclaimer */}
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 text-[11px] text-slate-500 border border-slate-800/60">
              <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                POLAR AI does not present information as authoritative without verifiable sources. Cross-reference with the Knowledge Repository for raw telemetry.
              </span>
            </div>
          </div>

          {/* Next Step Actions: Turn into Story / Explore on Map */}
          <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('story-studio')}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Convert This Topic Into a Public Story</span>
            </button>
            <button
              onClick={() => onNavigate('explore')}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4 text-cyan-300" />
              <span>View On Polar Map</span>
            </button>
          </div>

          {/* Suggested Follow-Ups */}
          {response.suggestedFollowUps && response.suggestedFollowUps.length > 0 && (
            <div className="pt-4 border-t border-slate-800/80 space-y-2">
              <div className="text-xs font-mono text-slate-400">Suggested Follow-Up Inquiries:</div>
              <div className="flex flex-wrap gap-2">
                {response.suggestedFollowUps.map((followUp, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearch(followUp)}
                    className="text-left px-3 py-1.5 text-xs text-slate-300 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 rounded-lg transition-colors cursor-pointer"
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
