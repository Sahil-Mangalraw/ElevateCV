import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, FileText, Zap, BookOpen, Clock, Award } from 'lucide-react';
import { AnalysisResult } from '../types';
import { SAMPLE_ANALYSIS_SWE } from '../data/sampleData';

interface DashboardViewProps {
  onStartAnalysis: () => void;
  onLoadSample: (sample: AnalysisResult) => void;
  onOpenRewriter: () => void;
  onViewHistory: () => void;
  recentAnalyses: AnalysisResult[];
  onSelectRecent: (analysis: AnalysisResult) => void;
  hasGeminiKey: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onStartAnalysis,
  onLoadSample,
  onOpenRewriter,
  onViewHistory,
  recentAnalyses,
  onSelectRecent,
  hasGeminiKey,
}) => {
  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="pt-10 sm:pt-16 pb-8 border-b border-slate-200">
        <div className="max-w-4xl">
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
            Technology Fellowship Candidate Demonstration
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight text-balance mb-6">
            Understand Your Skills. <br className="hidden sm:inline" />
            Improve Your Resume. <br className="hidden sm:inline" />
            <span className="text-blue-600">Apply Smarter.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl">
            ElevateCV AI helps students and entry-level job seekers understand how well their resumes match real job descriptions and provides transparent, actionable guidance to improve their applications.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onStartAnalysis}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-blue-600 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <span>Analyze My Resume</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onLoadSample(SAMPLE_ANALYSIS_SWE)}
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <span>Inspect Sample SWE Analysis</span>
            </button>

            <button
              onClick={onOpenRewriter}
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <span>Try Bullet Rewriter</span>
            </button>
          </div>

          {/* Environment Status Notice */}
          {!hasGeminiKey && (
            <div className="mt-8 p-4 bg-amber-50/80 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-3">
              <div className="font-semibold shrink-0 mt-0.5">Demo Mode Ready:</div>
              <div>
                Server environment is currently running with synthetic sample datasets enabled. You can evaluate the complete end-to-end UX, 0–100 weighted scoring, skill gap diagnostics, bullet rewriting, and printable exports immediately. Configure <code>GEMINI_API_KEY</code> in Settings &gt; Secrets for live Gemini API calls.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Mechanism-to-Outcome Chain */}
      <section>
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-900">How ElevateCV AI Works</h2>
          <p className="text-sm text-slate-600 mt-1">
            Built on transparent evaluation principles rather than opaque black-box AI scores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Evidence-Based Parsing</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Upload a PDF/DOCX or paste text. ElevateCV extracts skills evidenced with real projects, coursework, and internship contributions—not merely keyword-stuffed lists.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
              Preserves candidate privacy · Client-only history
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Transparent Match Scoring</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Receive an objective 0–100 score broken down into 4 clear factors: Skill Match (40%), Experience Evidence (30%), Education Relevance (15%), and ATS Formatting (15%).
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
              No fake hiring predictions · Realistic feedback
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Actionable Career Growth</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Get 5 high-impact recommendations, STAR-framework bullet rewrites with custom metric placeholders, and a personalized 4-week learning roadmap to bridge critical gaps.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
              Printable PDF reports · Markdown export
            </div>
          </div>
        </div>
      </section>

      {/* Recent Analyses Strip */}
      {recentAnalyses.length > 0 && (
        <section className="bg-slate-100/70 border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Analyses</h3>
              <p className="text-xs text-slate-600">Saved in local browser storage</p>
            </div>
            <button
              onClick={onViewHistory}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              View All ({recentAnalyses.length})
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentAnalyses.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectRecent(item)}
                className="bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="min-w-0 pr-3">
                  <div className="text-sm font-semibold text-slate-900 truncate">
                    {item.jobTitle || 'Target Role'}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {new Date(item.timestamp).toLocaleDateString()} · {item.matchedSkills.length} skills matched
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-lg font-bold text-slate-900 tabular-nums">
                    {item.overallScore}
                    <span className="text-xs font-normal text-slate-500">/100</span>
                  </div>
                  <div className="text-[11px] font-medium text-blue-600">View Report</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quick Try Sample Workflows */}
      <section className="border-t border-slate-200 pt-10">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900">Fellowship Evaluator Quick Starts</h2>
          <p className="text-xs text-slate-600 mt-1">
            Test the application workflow immediately using pre-configured student candidate profiles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white border border-slate-200 rounded-lg flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Scenario A</div>
              <h4 className="text-base font-bold text-slate-900 mb-1">Junior Software Engineer</h4>
              <p className="text-xs text-slate-600 mb-4">
                Graduating CS senior with React/TypeScript projects matched against a full-stack engineering position. High skill match with gaps in CI/CD and cloud deployment.
              </p>
            </div>
            <button
              onClick={() => onLoadSample(SAMPLE_ANALYSIS_SWE)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors w-full"
            >
              Load Sample Assessment Report
            </button>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-lg flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Scenario B</div>
              <h4 className="text-base font-bold text-slate-900 mb-1">Custom Resume & Role Evaluation</h4>
              <p className="text-xs text-slate-600 mb-4">
                Upload your own resume (PDF or Word DOCX) or paste plain text. Compare it against any live internship or entry-level job posting.
              </p>
            </div>
            <button
              onClick={onStartAnalysis}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-600 rounded-md transition-colors w-full"
            >
              Open Analysis Workspace
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
