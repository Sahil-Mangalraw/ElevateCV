import React from 'react';
import { ShieldAlert, Cpu, Sparkles, BookOpen, Layers, CheckCircle, Lock, Terminal } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
          Product Strategy & Architecture
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          About ElevateCV AI & Ethical AI Boundaries
        </h1>
        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
          Designed for college students, fresh graduates, and career changers navigating competitive early-career hiring.
        </p>
      </div>

      {/* Problem & Mission */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900">The Problem & Our Mission</h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Entry-level job applicants often struggle to understand why their applications do not convert to interviews. Job descriptions are frequently overloaded with wishlist qualifications, and students frequently under-articulate real projects or coursework.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          ElevateCV AI exists to bridge this gap. Our mission is encapsulated in our tagline:
          <span className="block font-semibold text-slate-900 mt-1">
            "Understand Your Skills. Improve Your Resume. Apply Smarter."
          </span>
        </p>
      </section>

      {/* System Architecture */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Technical Architecture</h2>
          <p className="text-xs text-slate-600 mt-1">
            Production-grade full-stack implementation using the official Google Gen AI SDK.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
            <h4 className="font-bold text-slate-900">Frontend Presentation</h4>
            <ul className="space-y-1.5 text-slate-600">
              <li>· React 19 + TypeScript on Vite</li>
              <li>· Tailwind CSS (v4) with zero-pill metadata discipline</li>
              <li>· WCAG AA accessibility contrast compliance</li>
              <li>· Local storage for client-side analysis persistence</li>
              <li>· Printable report CSS & Markdown exports</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
            <h4 className="font-bold text-slate-900">Backend & AI Runtime</h4>
            <ul className="space-y-1.5 text-slate-600">
              <li>· Express Node.js server with Vite middleware</li>
              <li>· Google GenAI SDK (<code>@google/genai</code>)</li>
              <li>· Model: <code>gemini-3.8-flash</code> for high-speed structured JSON</li>
              <li>· Schema-constrained responses with <code>Type.OBJECT</code></li>
              <li>· Server-only API keys; zero exposure to browser</li>
              <li>· In-memory PDF / DOCX extraction via <code>mammoth</code> & <code>pdfjs-dist</code></li>
            </ul>
          </div>
        </div>

        {/* Security Box */}
        <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-lg text-xs text-blue-950 flex items-start gap-3">
          <Lock className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold">Credential & Privacy Security:</span>
            <p className="text-blue-900 leading-relaxed">
              API keys are never sent to the browser or stored in client bundles. Resume content sent for analysis is processed ephemerally in server memory and never written to permanent databases.
            </p>
          </div>
        </div>
      </section>

      {/* Demystifying ATS & Ethical AI */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Demystifying ATS & Responsible AI Boundaries</h2>
          <p className="text-xs text-slate-600 mt-1">
            Honest truths versus internet myths about recruitment algorithms.
          </p>
        </div>

        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h4 className="font-bold text-slate-900 mb-1">Myth vs Reality: ATS Systems</h4>
            <p>
              Popular social media claims suggest ATS software automatically "rejects 95% of resumes based on a secret score." In reality, ATS tools (like Greenhouse, Lever, and Workday) are primarily workflow databases that extract contact info, work history, and education so human recruiters can filter candidates. ElevateCV's score reflects <span className="font-semibold text-slate-800">content alignment against requirements</span>, not an internal ATS calculation.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h4 className="font-bold text-slate-900 mb-1">Anti-Hallucination & Provenance Policy</h4>
            <p>
              ElevateCV strictly instructs Gemini never to invent qualifications, employment records, or certifications. When our assistant improves bullet points, it inserts explicit bracketed placeholders (such as <code className="bg-white px-1 py-0.5 rounded border border-slate-200">[N users]</code> or <code className="bg-white px-1 py-0.5 rounded border border-slate-200">[X%]</code>) so applicants supply their own verified figures.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h4 className="font-bold text-slate-900 mb-1">Prompt Injection & Untrusted Data Isolation</h4>
            <p>
              Uploaded resume files and job descriptions are treated as untrusted strings. The server prompt isolates user text inside boundary quotes and reinforces that user input cannot override application guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* Known Limitations */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Known Limitations & Edge Cases</h2>
        <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="font-bold text-slate-400">1.</span>
            <span>
              <strong className="text-slate-800">Scanned Image PDFs:</strong> PDFs without embedded text streams (such as photocopied or flat raster scans) cannot be parsed by text extractors. Users should utilize the text paste tab or run OCR prior to upload.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-slate-400">2.</span>
            <span>
              <strong className="text-slate-800">Stylistic & Human Discretion:</strong> Hiring decisions are inherently human and subjective. Recommendations should be viewed as strategic advice rather than guaranteed outcomes.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-slate-400">3.</span>
            <span>
              <strong className="text-slate-800">Niche or Interdisciplinary Domains:</strong> If a job description uses non-standard titles or unconventional terminology, matching accuracy may vary slightly compared to mainstream software or technical disciplines.
            </span>
          </li>
        </ul>
      </section>

      {/* Fellowship Demonstration Notice */}
      <div className="p-5 bg-slate-900 text-slate-300 rounded-xl text-xs space-y-2">
        <div className="font-bold text-white text-sm">Technology Fellowship Demonstration Notes</div>
        <p className="leading-relaxed">
          This project was engineered to demonstrate senior-level AI product craftsmanship: strict separation of concerns, zero client API key exposure, robust document parsing with client fallbacks, schema-enforced structured Gemini output, and an accessible, anti-slop user interface.
        </p>
      </div>
    </div>
  );
};
