import { AnalysisResult } from '../types';

const STORAGE_KEY = 'elevatecv_analyses_history_v1';

export function getSavedAnalyses(): AnalysisResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to read analyses from localStorage', e);
    return [];
  }
}

export function saveAnalysis(analysis: AnalysisResult): void {
  try {
    const existing = getSavedAnalyses();
    // Prepend new analysis, filter out any with the same id, keep up to 15 items
    const updated = [analysis, ...existing.filter((item) => item.id !== analysis.id)].slice(0, 15);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save analysis to localStorage', e);
  }
}

export function deleteAnalysis(id: string): AnalysisResult[] {
  try {
    const existing = getSavedAnalyses();
    const updated = existing.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete analysis from localStorage', e);
    return [];
  }
}

export function clearAllAnalyses(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear analyses', e);
  }
}
