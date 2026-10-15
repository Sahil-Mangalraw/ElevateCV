import React, { useState } from 'react';
import {
  Download,
  Printer,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  FileCheck2,
  Calendar,
  Layers,
  Award,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { AnalysisResult, MissingSkill } from '../types';
import { generateMarkdownReport, downloadFile, copyToClipboard } from '../utils/export';

interface ResultsViewProps {
  analysis: AnalysisResult;
  onOpenRewriterWithBullet?: (bullet: string) => void;
  onNewAnalysis: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  analysis,
  onOpenRewriterWithBullet,
  onNewAnalysis,
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [roadmapCompleted, setRoadmapCompleted] = useState<Record<number, boolean>>({});

  const handleCopyRecommendations = async () => {
    const text = analysis.actionableRecommendations
      .map(
        (r, idx) =>
          `${idx + 1}. ${r.title}\nAction: ${r.action}\nImpact: ${r.impact}${
            r.exampleSnippet ? `\nExample: ${r.exampleSnippet}` : ''
          }\n`
      )
      .join('\n');

    const success = await copyToClipboard(text);
    if (success) {
      setCopiedSection('recommendations');
      setTimeout(() => setCopiedSection(null), 2500);
    }
  };

  const handleDownloadMarkdown = () => {
    const markdown = generateMarkdownReport(analysis);
    const sanitizedTitle = (analysis.jobTitle || 'Role')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_');
    downloadFile(markdown, `elevatecv_analysis_${sanitizedTitle}.md`);
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleRoadmapItem = (index: number) => {
    setRoadmapCompleted((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Color tone for overall score
  const getScoreColorClass = (score: number) => {
    if (score >= 80) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 60) return 'text-blue-700 bg-blue-50 border-blue-200';
    if (score >= 40) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-red-700 bg-red-50 border-red-200';
  };

  return (
    <div className="space-y-10 pb-16 print:p-0">
      {/* Top Banner: Controls & Export Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 no-print">
        <div>
          <div className="text-xs text-slate-500 font-medium">
            Evaluation Report · {new Date(analysis.timestamp).toLocaleDateString()}
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            {analysis.jobTitle || 'Target Position'} Alignment
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleCopyRecommendations}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-md transition-colors shadow-2xs cursor-pointer"
          >
            {copiedSection === 'recommendations' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Recommendations</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-md transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Report (.md)</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors shadow-2xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>

          <button
            onClick={onNewAnalysis}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors ml-2 cursor-pointer"
          >
            <span>New Analysis</span>
          </button>
        </div>
      </div>

      {/* Demo Mode Notice if synthetic data */}
      {analysis.isDemo && (
        <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-center justify-between no-print">
          <div>
            <span className="font-semibold">Interactive Demo Dataset:</span> This report displays an evaluated CS senior profile for Junior Software Engineer with React and TypeScript.
          </div>
          <button
            onClick={onNewAnalysis}
            className="font-semibold underline ml-3 shrink-0"
          >
            Run Custom Analysis
          </button>
        </div>
      )}

      {/* SECTION 1: Overall Match Score & Weighted Breakdown */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Big Score Card */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">
              Overall Alignment Score
            </div>
            <div className="text-6xl sm:text-7xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              {analysis.overallScore}
              <span className="text-2xl font-normal text-slate-400">/100</span>
            </div>
            <div className="text-xs text-slate-600 mt-2 max-w-xs">
              Weighted composite of skill coverage, evidence depth, education, and ATS scannability.
            </div>
          </div>

          {/* 4 Weighted Sub-Criteria */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Transparent Scoring Breakdown</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {analysis.scoreBreakdown.explanation}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800">Skills Match (40% weight)</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {analysis.scoreBreakdown.skillsMatchScore}/100
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full"
                    style={{ width: `${analysis.scoreBreakdown.skillsMatchScore}%` }}
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800">Experience Evidence (30% weight)</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {analysis.scoreBreakdown.experienceMatchScore}/100
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full"
                    style={{ width: `${analysis.scoreBreakdown.experienceMatchScore}%` }}
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800">Education Relevance (15% weight)</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {analysis.scoreBreakdown.educationMatchScore}/100
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full"
                    style={{ width: `${analysis.scoreBreakdown.educationMatchScore}%` }}
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800">ATS Formatting & Layout (15% weight)</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {analysis.scoreBreakdown.atsFormattingScore}/100
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full"
                    style={{ width: `${analysis.scoreBreakdown.atsFormattingScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ethical Disclaimer */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
          <span className="font-semibold text-slate-700">Advisory Disclaimer:</span> This alignment evaluation is generated by Gemini 3.8 Flash based strictly on the text provided. It is designed to help job seekers identify gaps and improve their applications. It does not represent an actual hiring decision or a guarantee of interview selection.
        </div>
      </section>

      {/* SECTION 2: Skills Match Visualization (Demonstrated vs Missing) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Demonstrated Skills */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">
                Demonstrated Skills ({analysis.matchedSkills.length})
              </h2>
              <span className="text-xs text-slate-500">Evidenced in resume</span>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Competencies found with tangible project, coursework, or internship evidence.
            </p>

            <div className="space-y-3">
              {analysis.matchedSkills.map((skill, index) => (
                <div
                  key={index}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">{skill.name}</span>
                    <span className="text-slate-500">{skill.category}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{skill.contextInResume}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Missing / Gap Skills */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">
                Skills Gaps to Bridge ({analysis.missingSkills.length})
              </h2>
              <span className="text-xs text-slate-500">From job description</span>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Requirements or preferred tools mentioned in the posting that are missing from your resume.
            </p>

            <div className="space-y-3">
              {analysis.missingSkills.map((skill, index) => (
                <div
                  key={index}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">{skill.name}</span>
                    <span className="text-slate-500 font-medium">
                      {skill.importance === 'critical'
                        ? 'Critical Requirement'
                        : skill.importance === 'important'
                        ? 'Important'
                        : 'Bonus / Preferred'}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{skill.whyNeeded}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Strengths & Improvement Areas */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-3">Resume Strengths</h2>
          <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
            {analysis.strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-bold text-blue-600 shrink-0">{idx + 1}.</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-3">Areas for Improvement</h2>
          <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
            {analysis.areasForImprovement.map((area, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-bold text-amber-600 shrink-0">{idx + 1}.</span>
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 4: Top 5 Specific & Actionable Recommendations */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">5 High-Impact Actionable Recommendations</h2>
            <p className="text-xs text-slate-600 mt-1">
              Prioritized adjustments you can make immediately to strengthen your candidacy.
            </p>
          </div>
          <button
            onClick={handleCopyRecommendations}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 no-print"
          >
            {copiedSection === 'recommendations' ? 'Copied to Clipboard' : 'Copy All 5'}
          </button>
        </div>

        <div className="space-y-4 mt-6">
          {analysis.actionableRecommendations.map((rec, idx) => (
            <div
              key={rec.id || idx}
              className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">
                  {idx + 1}. {rec.title}
                </h4>
              </div>
              <p className="text-slate-700 leading-relaxed">
                <span className="font-semibold text-slate-900">Action:</span> {rec.action}
              </p>
              <p className="text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-800">Expected Impact:</span> {rec.impact}
              </p>
              {rec.exampleSnippet && (
                <div className="p-2.5 bg-white border border-slate-200 rounded font-mono text-[11px] text-slate-800">
                  <span className="text-slate-400 select-none mr-2">Example:</span>
                  {rec.exampleSnippet}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: Suggested Bullet Point Improvements with Quick-Rewrite Link */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900">Resume Bullet Point Improvements</h2>
          <p className="text-xs text-slate-600 mt-1">
            Real lines from your resume paired with editorial critiques and enhanced rewrites.
          </p>
        </div>

        <div className="space-y-6">
          {analysis.bulletPointImprovements.map((item, idx) => (
            <div
              key={idx}
              className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs"
            >
              <div className="flex items-center justify-between text-slate-500">
                <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-700">
                  Example {idx + 1} · Style: {item.styleApplied}
                </span>
                {onOpenRewriterWithBullet && (
                  <button
                    onClick={() => onOpenRewriterWithBullet(item.originalBullet)}
                    className="text-blue-600 font-semibold hover:underline flex items-center gap-1 no-print"
                  >
                    <span>Tune in Rewriter</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Original */}
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <div className="text-[11px] font-semibold text-slate-500 mb-1">Original Bullet:</div>
                <div className="text-slate-800 leading-relaxed font-mono text-xs">
                  "{item.originalBullet}"
                </div>
              </div>

              {/* Critique */}
              <div className="text-slate-600 leading-relaxed pl-1">
                <span className="font-semibold text-slate-900">Critique:</span> {item.critique}
              </div>

              {/* Improved */}
              <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-lg">
                <div className="text-[11px] font-semibold text-blue-900 mb-1">
                  Suggested Rewrite:
                </div>
                <div className="text-slate-900 leading-relaxed font-mono text-xs font-medium">
                  "{item.improvedBullet}"
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: ATS Readability & Formatting */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">ATS Readability & Layout Health</h2>
            <p className="text-xs text-slate-600 mt-1">
              Evaluates how easily applicant tracking systems and human screeners can parse your sections.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {analysis.atsReadability.score}
              <span className="text-sm font-normal text-slate-400">/100</span>
            </div>
            <div className="text-[11px] text-slate-500">Readability Score</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div>
            <h4 className="font-bold text-slate-900 mb-2">Detected Sections</h4>
            <div className="space-y-1 text-slate-700">
              {analysis.atsReadability.detectedSections.map((sec, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{sec}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-2">Formatting Observations</h4>
            <ul className="space-y-1.5 text-slate-600">
              {analysis.atsReadability.observations.map((obs, i) => (
                <li key={i}>· {obs}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-2">Recommendations</h4>
            <ul className="space-y-1.5 text-slate-600">
              {analysis.atsReadability.recommendations.map((rec, i) => (
                <li key={i}>· {rec}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 7: 4-Week Personalized Learning Roadmap */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900">4-Week Personalized Learning Roadmap</h2>
          <p className="text-xs text-slate-600 mt-1">
            Structured steps to systematically close the critical skill gaps identified in this job posting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysis.learningRoadmap.map((item, idx) => {
            const isCompleted = roadmapCompleted[idx];
            return (
              <div
                key={idx}
                onClick={() => toggleRoadmapItem(idx)}
                className={`p-5 rounded-xl border text-xs cursor-pointer transition-all ${
                  isCompleted
                    ? 'bg-slate-50 border-slate-200 opacity-60'
                    : 'bg-white border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={Boolean(isCompleted)}
                      onChange={() => {}}
                      className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <span className="font-bold text-slate-900 text-sm">
                      {item.milestone}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {item.timeframe}
                  </span>
                </div>

                <div className="text-slate-500 text-[11px] mb-2">
                  Focus: {item.focusSkills.join(', ')}
                </div>

                <p className="text-slate-700 leading-relaxed mb-3">
                  <span className="font-semibold text-slate-900">Action:</span> {item.suggestedAction}
                </p>

                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-800">Resource / Project:</span>{' '}
                  {item.suggestedResourceOrProject}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-slate-900 text-white rounded-xl no-print">
        <div>
          <h3 className="text-base font-bold">Ready to apply these improvements?</h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Refine individual bullet points with the interactive rewriter or export this report.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Print Clean Report
          </button>
          <button
            onClick={onNewAnalysis}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
          >
            Analyze Another Role
          </button>
        </div>
      </div>
    </div>
  );
};
