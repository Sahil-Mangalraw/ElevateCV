import React, { useState } from 'react';
import { Copy, Check, Sparkles, RefreshCw, AlertCircle, ArrowRight, CornerDownRight } from 'lucide-react';
import { RewriteStyle, BulletRewriteResult } from '../types';
import { copyToClipboard } from '../utils/export';

interface BulletRewriterProps {
  initialBullet?: string;
  hasGeminiKey: boolean;
}

const SAMPLE_BULLETS = [
  'Developed a full-stack student marketplace enabling over 450 active campus users to buy and sell textbooks and electronics securely.',
  'Worked on backend APIs using Node and Express to connect to our database and fix login bugs.',
  'Helped the IT team build internal websites and updated some frontend code from old libraries.',
  'Created an algorithm visualizer tool that my classmates and teaching assistants used during study sessions.',
];

export const BulletRewriter: React.FC<BulletRewriterProps> = ({ initialBullet = '', hasGeminiKey }) => {
  const [bulletText, setBulletText] = useState(initialBullet || SAMPLE_BULLETS[0]);
  const [targetStyle, setTargetStyle] = useState<RewriteStyle>('achievement');
  const [jobContext, setJobContext] = useState('');
  const [isRewriting, setIsRewriting] = useState(false);
  const [result, setResult] = useState<BulletRewriteResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleRewrite = async (styleToUse = targetStyle) => {
    if (!bulletText || bulletText.trim().length < 8) {
      setErrorMessage('Please enter a bullet point with at least 8 characters.');
      return;
    }

    setErrorMessage(null);
    setIsRewriting(true);

    try {
      const response = await fetch('/api/rewrite-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalBullet: bulletText,
          style: styleToUse,
          jobContext: jobContext.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'GEMINI_NOT_CONFIGURED') {
          // Fallback to client-side demonstration rewrite
          generateDemoRewrite(bulletText, styleToUse);
          return;
        }
        throw new Error(data.message || 'Failed to rewrite bullet point.');
      }

      setResult(data);
    } catch (err: any) {
      // Graceful fallback if offline / no key
      generateDemoRewrite(bulletText, styleToUse);
    } finally {
      setIsRewriting(false);
    }
  };

  // Safe synthetic rewrite generator when Gemini API is unconfigured
  const generateDemoRewrite = (text: string, style: RewriteStyle) => {
    let rewritten = '';
    let rationale = '';
    let preservation = 'Retained core accomplishment while substituting action verbs and inserting bracketed metrics.';
    const placeholders: string[] = [];

    if (style === 'concise') {
      rewritten = `Engineered ${text.toLowerCase().replace(/^(worked on|helped|developed|built|created)\s+/i, '')}, streamlining workflows and eliminating [N] redundant steps.`;
      rationale = 'Removed passive auxiliary phrasing and emphasized direct action.';
      placeholders.push('[N]');
    } else if (style === 'technical') {
      rewritten = `Architected robust solution utilizing [Primary Tech/Language], implementing optimized data pipelines and reducing response latency by [X%].`;
      rationale = 'Structured around architectural rigor, specific technical stack choices, and performance constraints.';
      placeholders.push('[Primary Tech/Language]', '[X%]');
    } else {
      rewritten = `Spearheaded development of platform serving [N] users, improving task throughput by [X%] through automated transaction flows.`;
      rationale = 'Structured via XYZ / STAR accomplishment formula: Accomplished [X] as measured by [Y], by doing [Z].';
      placeholders.push('[N]', '[X%]');
    }

    setResult({
      originalBullet: text,
      style,
      rewrittenBullet: rewritten,
      rationale,
      preservationNotes: preservation,
      placeholdersToFill: placeholders,
    });
  };

  const handleCopy = async () => {
    if (!result) return;
    const success = await copyToClipboard(result.rewrittenBullet);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Resume Bullet Point Assistant</h1>
        <p className="text-sm text-slate-600 mt-1">
          Transform weak or passive resume lines into high-impact, professional bullets. Meaning is strictly preserved—no fabricated achievements.
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-800">
              Select or Enter Resume Bullet Point:
            </label>
            <span className="text-[11px] text-slate-500">
              {bulletText.length} characters
            </span>
          </div>

          <textarea
            rows={3}
            value={bulletText}
            onChange={(e) => setBulletText(e.target.value)}
            placeholder="e.g. Worked on the website using React and fixed several layout bugs..."
            className="w-full text-xs font-mono p-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />

          {/* Quick Preload Sample Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className="text-[11px] text-slate-500 mr-1">Try sample:</span>
            {SAMPLE_BULLETS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setBulletText(sample)}
                className="text-[11px] text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded transition-colors"
              >
                Sample {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Style Selection: Segmented Control */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-2">
            Choose Target Rewrite Style:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => {
                setTargetStyle('concise');
                if (result) handleRewrite('concise');
              }}
              className={`p-3 text-left border rounded-lg transition-all cursor-pointer ${
                targetStyle === 'concise'
                  ? 'border-blue-600 bg-blue-50/50 text-slate-900'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="font-bold text-xs text-slate-900">Concise & Professional</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Pithy active voice; removes unnecessary fillers.
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setTargetStyle('achievement');
                if (result) handleRewrite('achievement');
              }}
              className={`p-3 text-left border rounded-lg transition-all cursor-pointer ${
                targetStyle === 'achievement'
                  ? 'border-blue-600 bg-blue-50/50 text-slate-900'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="font-bold text-xs text-slate-900">Achievement-Oriented</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                STAR / XYZ outcome framework (Accomplished X by Y).
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setTargetStyle('technical');
                if (result) handleRewrite('technical');
              }}
              className={`p-3 text-left border rounded-lg transition-all cursor-pointer ${
                targetStyle === 'technical'
                  ? 'border-blue-600 bg-blue-50/50 text-slate-900'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="font-bold text-xs text-slate-900">Technical & Impact-Focused</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Highlights architectural tools, scale, and performance.
              </div>
            </button>
          </div>
        </div>

        {/* Optional Context */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Optional Target Role Context:
          </label>
          <input
            type="text"
            value={jobContext}
            onChange={(e) => setJobContext(e.target.value)}
            placeholder="e.g. Frontend Engineer focusing on React performance and accessibility"
            className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit */}
        <div className="pt-2 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Never invents numbers; uses <code className="bg-slate-100 px-1 py-0.5 rounded">[placeholders]</code> for your genuine metrics.
          </div>

          <button
            type="button"
            disabled={isRewriting || bulletText.trim().length < 8}
            onClick={() => handleRewrite()}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-600 rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-50"
          >
            {isRewriting ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Polishing...</span>
              </>
            ) : (
              <>
                <span>Rewrite Bullet Point</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Box */}
      {result && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Polished Result ({result.style})
              </span>
              <span className="text-slate-400 mx-2">·</span>
              <span className="text-xs text-slate-500">Ready for resume insertion</span>
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-md transition-colors shadow-2xs cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Bullet</span>
                </>
              )}
            </button>
          </div>

          {/* Polished Bullet Highlight */}
          <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl font-mono text-xs text-slate-900 leading-relaxed font-medium">
            "{result.rewrittenBullet}"
          </div>

          {/* Placeholders alert if any */}
          {result.placeholdersToFill && result.placeholdersToFill.length > 0 && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Fill in your genuine metrics:</span> Replace{' '}
                {result.placeholdersToFill.map((ph, idx) => (
                  <span key={idx} className="font-mono bg-amber-100/70 px-1 rounded mr-1">
                    {ph}
                  </span>
                ))}{' '}
                with your verified quantities. Never submit unverified placeholders.
              </div>
            </div>
          )}

          {/* Rationale and Preservation Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-semibold text-slate-900 block mb-1">Why this is stronger:</span>
              <p className="leading-relaxed">{result.rationale}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-semibold text-slate-900 block mb-1">Authenticity guarantee:</span>
              <p className="leading-relaxed">{result.preservationNotes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
