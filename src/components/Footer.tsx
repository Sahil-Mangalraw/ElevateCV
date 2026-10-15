import React from 'react';

interface FooterProps {
  onNavigate: (screen: 'dashboard' | 'workspace' | 'rewriter' | 'history' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                EC
              </div>
              <span className="text-white font-bold tracking-tight text-base">ElevateCV AI</span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed mb-4">
              Understand Your Skills. Improve Your Resume. Apply Smarter. Designed specifically for college students, fresh graduates, and entry-level job seekers.
            </p>
            <div className="text-xs text-slate-500">
              <span>Client-side storage only</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>No API keys exposed</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Gemini 3.8 Flash Engine</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workspace')} className="hover:text-white transition-colors">
                  Resume Match Workspace
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('rewriter')} className="hover:text-white transition-colors">
                  Bullet Point Assistant
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('history')} className="hover:text-white transition-colors">
                  Analysis History
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">Integrity & Limits</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Ethical AI Boundaries
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  ATS Truths & Misconceptions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Fellowship Demo Guide
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ElevateCV AI. Built for Technology Fellowship Demonstration.</p>
          <p className="text-slate-400">
            Advisory career tool. AI outputs are suggestions and do not represent actual hiring decisions.
          </p>
        </div>
      </div>
    </footer>
  );
};
