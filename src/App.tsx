/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, ActiveScreen } from './components/Navbar';
import { Footer } from './components/Footer';
import { DashboardView } from './components/DashboardView';
import { AnalysisWorkspace } from './components/AnalysisWorkspace';
import { ResultsView } from './components/ResultsView';
import { BulletRewriter } from './components/BulletRewriter';
import { HistoryView } from './components/HistoryView';
import { AboutView } from './components/AboutView';
import { AnalysisResult } from './types';
import { getSavedAnalyses, saveAnalysis, deleteAnalysis, clearAllAnalyses } from './utils/storage';
import { SAMPLE_ANALYSIS_SWE } from './data/sampleData';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('dashboard');
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [recentAnalyses, setRecentAnalyses] = useState<AnalysisResult[]>([]);
  const [hasGeminiKey, setHasGeminiKey] = useState<boolean>(true);
  const [rewriterInitialBullet, setRewriterInitialBullet] = useState<string>('');

  // Initial load: fetch status & load history from localStorage
  useEffect(() => {
    // Load local history
    const saved = getSavedAnalyses();
    setRecentAnalyses(saved);

    // If no saved analyses exist yet, preload the sample analysis into recent history for review ease
    if (saved.length === 0) {
      saveAnalysis(SAMPLE_ANALYSIS_SWE);
      setRecentAnalyses([SAMPLE_ANALYSIS_SWE]);
    }

    // Check server Gemini status
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.hasGeminiKey === 'boolean') {
          setHasGeminiKey(data.hasGeminiKey);
        }
      })
      .catch((err) => {
        console.warn('Status check warning:', err);
      });
  }, []);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setCurrentAnalysis(result);
    saveAnalysis(result);
    setRecentAnalyses(getSavedAnalyses());
    setCurrentScreen('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadSample = (sample: AnalysisResult) => {
    setCurrentAnalysis(sample);
    setCurrentScreen('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRewriterWithBullet = (bullet: string) => {
    setRewriterInitialBullet(bullet);
    setCurrentScreen('rewriter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRecent = (analysis: AnalysisResult) => {
    setCurrentAnalysis(analysis);
    setCurrentScreen('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteAnalysis = (id: string) => {
    const updated = deleteAnalysis(id);
    setRecentAnalyses(updated);
    if (currentAnalysis?.id === id) {
      setCurrentAnalysis(null);
    }
  };

  const handleClearAll = () => {
    clearAllAnalyses();
    setRecentAnalyses([]);
    setCurrentAnalysis(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* 3-Zone Top Navigation Contract */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        hasActiveResult={Boolean(currentAnalysis)}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentScreen === 'dashboard' && (
          <DashboardView
            onStartAnalysis={() => setCurrentScreen('workspace')}
            onLoadSample={handleLoadSample}
            onOpenRewriter={() => setCurrentScreen('rewriter')}
            onViewHistory={() => setCurrentScreen('history')}
            recentAnalyses={recentAnalyses}
            onSelectRecent={handleSelectRecent}
            hasGeminiKey={hasGeminiKey}
          />
        )}

        {currentScreen === 'workspace' && (
          <AnalysisWorkspace
            onAnalysisComplete={handleAnalysisComplete}
            hasGeminiKey={hasGeminiKey}
          />
        )}

        {currentScreen === 'results' && currentAnalysis && (
          <ResultsView
            analysis={currentAnalysis}
            onOpenRewriterWithBullet={handleOpenRewriterWithBullet}
            onNewAnalysis={() => setCurrentScreen('workspace')}
          />
        )}

        {currentScreen === 'results' && !currentAnalysis && (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-4">
            <h3 className="text-base font-bold text-slate-900">No Active Analysis to Display</h3>
            <p className="text-xs text-slate-600">
              Run an analysis or select a past report from history to inspect the results dashboard.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => handleLoadSample(SAMPLE_ANALYSIS_SWE)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md"
              >
                Inspect Sample Report
              </button>
              <button
                onClick={() => setCurrentScreen('workspace')}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-600 rounded-md"
              >
                Open Workspace
              </button>
            </div>
          </div>
        )}

        {currentScreen === 'rewriter' && (
          <BulletRewriter
            initialBullet={rewriterInitialBullet}
            hasGeminiKey={hasGeminiKey}
          />
        )}

        {currentScreen === 'history' && (
          <HistoryView
            analyses={recentAnalyses}
            onSelectAnalysis={handleSelectRecent}
            onDeleteAnalysis={handleDeleteAnalysis}
            onClearAll={handleClearAll}
            onStartNew={() => setCurrentScreen('workspace')}
          />
        )}

        {currentScreen === 'about' && <AboutView />}
      </main>

      {/* Quiet Footer */}
      <Footer
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
