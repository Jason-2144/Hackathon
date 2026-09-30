import React, { useState, useEffect } from 'react';
import { askPolarAI } from '../../lib/gemini';
import { AIResponse } from '../../types/polar';
import {
  Search,
  BookOpen,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Copy,
  TrendingDown,
  TrendingUp,
  RefreshCw,
  Compass,
  FileText,
  Database
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
      handleSearch('Tell me about Thwaites Glacier.');
    }
  }, [prefillQuery]);

  const copyFullResponse = () => {
    if (!response) return;
    const text = `POLARIS SCIENTIFIC RESEARCH RECORD
Query: ${response.query}

ANSWER:
${response.simpleExplanation}

EMPIRICAL DYNAMICS:
${response.scientificExplanation}

KEY EMPIRICAL FACTS:
${response.keyFacts.map((f, i) => `${i + 1}. ${f}`).join('\n')}

SOURCES CITED:
${response.sources.map((s, i) => `${i + 1}. ${s.title} (${s.institution}, ${s.year}) - Ref: ${s.urlOrDoi}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* 1. Header (Clean Institutional Header) */}
      <div className="border-b border-slate-300 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#003366]">
            Ministry of Earth Sciences (MoES) · Automated Science Assistant
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#002244] tracking-tight mt-1">
            ASK POLARIS
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Scientific research assistant querying peer-reviewed cryospheric literature, expedition reports, and empirical datasets with verifiable institutional source citations.
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-300 text-xs font-mono text-slate-700 self-start sm:self-auto shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          <span>Gemini 3.8 Flash AI Integration</span>
        </div>
      </div>

      {/* 2. Simple Rectangular Search Bar */}
      <div className="bg-white border border-slate-300 p-4 space-y-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(query);
          }}
          className="flex flex-col sm:flex-row gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a scientific question regarding glaciers, ice sheets, stations, or climate models..."
              className="w-full pl-9 pr-3 py-2 border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:border-[#003366]"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="ds-btn-primary shrink-0 justify-center"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Searching Literature...</span>
              </>
            ) : (
              <span>Ask POLARIS</span>
            )}
          </button>
        </form>

        {/* Suggested Queries */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          <span className="text-slate-500 font-mono text-[11px] mr-1">Inquiries:</span>
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSearch(q)}
              className={`px-2 py-0.5 border text-xs cursor-pointer transition-colors ${
                query === q
                  ? 'bg-[#002244] text-white border-[#001730] font-semibold'
                  : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Loading Indicator */}
      {loading && (
        <div className="bg-white border border-slate-300 p-8 text-center space-y-2">
          <RefreshCw className="w-6 h-6 animate-spin text-[#003366] mx-auto" />
          <div className="text-sm font-bold text-slate-900">Retrieving Peer-Reviewed Cryospheric Data</div>
          <div className="text-xs text-slate-500 font-mono">
            Cross-referencing NCPOR reports, InSAR radar telemetry, and published glaciological papers...
          </div>
        </div>
      )}

      {/* 4. Structured Answer & Visible Citations (PER PROMPT SPECIFICATION) */}
      {!loading && response && (
        <div className="bg-white border border-slate-300 p-6 space-y-6">
          {/* Header & Copy */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-slate-500">
                Inquiry Record
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-serif text-[#002244] mt-0.5">
                "{response.query}"
              </h2>
            </div>
            <button
              onClick={copyFullResponse}
              className="ds-btn-secondary text-xs shrink-0"
            >
              {copiedText ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Report Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-600" />
                  <span>Copy Research Synthesis</span>
                </>
              )}
            </button>
          </div>

          {/* Answer Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-mono uppercase font-bold text-slate-700 tracking-wider mb-1.5">
                Answer (Executive & Student Context)
              </h3>
              <p className="text-sm text-slate-800 leading-relaxed bg-slate-50 p-4 border border-slate-200">
                {response.simpleExplanation}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase font-bold text-slate-700 tracking-wider mb-1.5">
                Empirical Glaciology & Dynamics
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 border border-slate-200">
                {response.scientificExplanation}
              </p>
            </div>
          </div>

          {/* Key Facts */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase font-bold text-slate-700 tracking-wider">
              Key Empirical Observations
            </h3>
            <div className="border border-slate-300 divide-y divide-slate-200">
              {response.keyFacts.map((fact, idx) => (
                <div key={idx} className="p-3 text-xs text-slate-800 flex items-start gap-2.5">
                  <span className="font-mono font-bold text-[#003366] shrink-0 mt-0.5">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <span className="leading-relaxed">{fact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Data Feeds */}
          {response.relatedData && response.relatedData.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase font-bold text-slate-700 tracking-wider">
                Related Observational Telemetry
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {response.relatedData.map((d, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-300 space-y-0.5">
                    <div className="text-[11px] text-slate-600 font-medium">{d.metric}</div>
                    <div className="text-lg font-bold font-mono text-[#002244] flex items-center justify-between">
                      <span>{d.value}</span>
                      {d.trend === 'increasing' ? (
                        <TrendingUp className="w-4 h-4 text-rose-600" />
                      ) : d.trend === 'decreasing' ? (
                        <TrendingDown className="w-4 h-4 text-amber-600" />
                      ) : null}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">{d.context}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prominent Sources & Citations (EXACTLY AS SPECIFIED IN USER PROMPT) */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase font-bold text-[#003366] tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Sources & Academic Citations ({response.sources.length})</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">Peer-Reviewed Literature</span>
            </div>

            <div className="border border-slate-300 divide-y divide-slate-200 bg-slate-50">
              {response.sources.map((src, idx) => (
                <div key={idx} className="p-3 flex items-start justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-slate-900">
                      {idx + 1}. {src.title}
                    </div>
                    <div className="text-slate-600 text-[11px]">
                      {src.institution} · Published {src.year}
                    </div>
                    <div className="font-mono text-[11px] text-[#004c99]">
                      Reference / DOI: {src.urlOrDoi}
                    </div>
                  </div>
                  <span className="ds-badge ds-badge-neutral text-[10px] shrink-0">
                    {(src.confidenceScore * 100).toFixed(0)}% Citation Match
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 border-t border-slate-200 flex flex-wrap gap-2.5">
            <button
              onClick={() => onNavigate('studio', { prefillSourceId: response.sources[0]?.urlOrDoi })}
              className="ds-btn-primary"
            >
              <span>Transform Topic Into Outreach Story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('repository')}
              className="ds-btn-secondary"
            >
              <Database className="w-3.5 h-3.5 text-slate-600" />
              <span>Cross-Reference Central Repository</span>
            </button>
            <button
              onClick={() => onNavigate('explore')}
              className="ds-btn-secondary"
            >
              <Compass className="w-3.5 h-3.5 text-slate-600" />
              <span>Inspect on Cartography Map</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
