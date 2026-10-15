import React, { useState } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';

export type ActiveScreen = 'dashboard' | 'workspace' | 'results' | 'rewriter' | 'history' | 'about';

interface NavbarProps {
  currentScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  hasActiveResult: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScreen, onNavigate, hasActiveResult }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (screen: ActiveScreen) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNav('dashboard')}
            className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-tight group-hover:bg-blue-600 transition-colors">
              EC
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
              ElevateCV <span className="text-blue-600">AI</span>
            </span>
          </button>

          {/* Zone 2: 4–5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleNav('dashboard')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentScreen === 'dashboard'
                  ? 'text-slate-900 border-blue-600 font-semibold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => handleNav('workspace')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentScreen === 'workspace'
                  ? 'text-slate-900 border-blue-600 font-semibold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              Analyze Resume
            </button>

            {hasActiveResult && (
              <button
                onClick={() => handleNav('results')}
                className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                  currentScreen === 'results'
                    ? 'text-slate-900 border-blue-600 font-semibold'
                    : 'border-transparent text-slate-600'
                }`}
              >
                Analysis Results
              </button>
            )}

            <button
              onClick={() => handleNav('rewriter')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentScreen === 'rewriter'
                  ? 'text-slate-900 border-blue-600 font-semibold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              Bullet Rewriter
            </button>

            <button
              onClick={() => handleNav('history')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentScreen === 'history'
                  ? 'text-slate-900 border-blue-600 font-semibold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              Recent Analyses
            </button>

            <button
              onClick={() => handleNav('about')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentScreen === 'about'
                  ? 'text-slate-900 border-blue-600 font-semibold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              About & Limits
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNav('workspace')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-blue-600 transition-colors shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Start Analysis</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-200 flex flex-col gap-1 pb-4">
            <button
              onClick={() => handleNav('dashboard')}
              className={`px-3 py-2 text-sm text-left rounded-md ${
                currentScreen === 'dashboard' ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-600'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNav('workspace')}
              className={`px-3 py-2 text-sm text-left rounded-md ${
                currentScreen === 'workspace' ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-600'
              }`}
            >
              Analyze Resume
            </button>
            {hasActiveResult && (
              <button
                onClick={() => handleNav('results')}
                className={`px-3 py-2 text-sm text-left rounded-md ${
                  currentScreen === 'results' ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-600'
                }`}
              >
                Analysis Results
              </button>
            )}
            <button
              onClick={() => handleNav('rewriter')}
              className={`px-3 py-2 text-sm text-left rounded-md ${
                currentScreen === 'rewriter' ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-600'
              }`}
            >
              Bullet Rewriter
            </button>
            <button
              onClick={() => handleNav('history')}
              className={`px-3 py-2 text-sm text-left rounded-md ${
                currentScreen === 'history' ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-600'
              }`}
            >
              Recent Analyses
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`px-3 py-2 text-sm text-left rounded-md ${
                currentScreen === 'about' ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-600'
              }`}
            >
              About & Limits
            </button>
            <div className="pt-2 px-3">
              <button
                onClick={() => handleNav('workspace')}
                className="w-full text-center px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Start Analysis
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
