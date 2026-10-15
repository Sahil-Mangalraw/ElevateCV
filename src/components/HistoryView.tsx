import React, { useState } from 'react';
import { Trash2, ExternalLink, Calendar, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { AnalysisResult } from '../types';

interface HistoryViewProps {
  analyses: AnalysisResult[];
  onSelectAnalysis: (analysis: AnalysisResult) => void;
  onDeleteAnalysis: (id: string) => void;
  onClearAll: () => void;
  onStartNew: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  analyses,
  onSelectAnalysis,
  onDeleteAnalysis,
  onClearAll,
  onStartNew,
}) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Recent Analyses</h1>
          <p className="text-sm text-slate-600 mt-1">
            Browse and compare your previously evaluated resumes and target job postings.
          </p>
        </div>

        {analyses.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowClearConfirm(true)}
              className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors"
            >
              Clear All History
            </button>
            <button
              onClick={onStartNew}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-600 rounded-md transition-colors"
            >
              New Analysis
            </button>
          </div>
        )}
      </div>

      {/* Privacy Notice */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-800">Privacy Safeguard:</span> Your resume history is stored strictly in your browser's local storage (<code className="bg-white px-1 py-0.5 rounded border border-slate-200">localStorage</code>). No personal data or uploaded resumes are retained in external databases.
        </div>
      </div>

      {/* Confirmation Modal */}
      {showClearConfirm && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-xs text-red-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>Are you sure you want to delete all saved analyses? This cannot be undone.</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                onClearAll();
                setShowClearConfirm(false);
              }}
              className="px-3 py-1 bg-red-700 hover:bg-red-800 text-white font-semibold rounded"
            >
              Confirm Clear
            </button>
            <button
              onClick={() => setShowClearConfirm(false)}
              className="px-3 py-1 bg-white border border-red-300 text-red-700 rounded hover:bg-red-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {analyses.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center font-bold text-lg">
            EC
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No Past Analyses Recorded</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
              When you evaluate a resume against a target job description, your match scores and recommendations will appear here for easy comparison.
            </p>
          </div>
          <button
            onClick={onStartNew}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-600 rounded-lg transition-colors cursor-pointer"
          >
            Run Your First Analysis
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {analyses.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div
                onClick={() => onSelectAnalysis(item)}
                className="cursor-pointer min-w-0 flex-1 space-y-1"
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900 truncate hover:text-blue-600 transition-colors">
                    {item.jobTitle || 'Target Position'}
                  </h3>
                  {item.isDemo && (
                    <span className="text-[10px] text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.2 rounded font-medium">
                      Demo
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
                  <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.matchedSkills.length} skills matched</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.missingSkills.length} gaps identified</span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="text-right">
                  <div className="text-xl font-bold text-slate-900 tabular-nums">
                    {item.overallScore}
                    <span className="text-xs font-normal text-slate-400">/100</span>
                  </div>
                  <div className="text-[11px] text-slate-500">Alignment</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectAnalysis(item)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                  >
                    View Report
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteAnalysis(item.id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded transition-colors"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
