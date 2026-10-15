import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, ArrowRight, RefreshCw, Sparkles, X, FileCheck } from 'lucide-react';
import { AnalysisResult } from '../types';
import { SAMPLE_RESUME_SWE, SAMPLE_JOB_SWE, SAMPLE_ANALYSIS_SWE } from '../data/sampleData';

interface AnalysisWorkspaceProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  hasGeminiKey: boolean;
}

export const AnalysisWorkspace: React.FC<AnalysisWorkspaceProps> = ({
  onAnalysisComplete,
  hasGeminiKey,
}) => {
  // Input states
  const [inputMode, setInputMode] = useState<'upload' | 'paste'>('upload');
  const [resumeText, setResumeText] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  // Upload metadata
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [detectedDocType, setDetectedDocType] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionError, setExtractionError] = useState<string | null>(null);

  // Analysis progress & error
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStage, setAnalysisStage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection and server extraction
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setExtractionError(null);
    setErrorMessage(null);

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setExtractionError('File exceeds the 5MB size limit. Please upload a smaller document or paste text.');
      return;
    }

    // Validate extension
    const extension = file.name.split('.').pop()?.toLowerCase();
    const validExtensions = ['pdf', 'docx', 'txt', 'rtf', 'md'];
    if (!extension || !validExtensions.includes(extension)) {
      setExtractionError('Unsupported file type. Please upload a PDF (.pdf), Word document (.docx), or plain text (.txt).');
      return;
    }

    setIsExtracting(true);
    setUploadedFileName(file.name);

    try {
      // Convert to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const res = reader.result as string;
          // Strip data url prefix
          const base64 = res.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
      });
      reader.readAsDataURL(file);
      const fileBase64 = await base64Promise;

      const response = await fetch('/api/extract-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileBase64,
          fileName: file.name,
          mimeType: file.type,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to extract text from document.');
      }

      setResumeText(data.text);
      setDetectedDocType(data.detectedType);
    } catch (err: any) {
      console.error('File parsing error', err);
      setExtractionError(err.message || 'Error extracting text. You can switch to the "Paste Text" tab to paste directly.');
    } finally {
      setIsExtracting(false);
    }
  };

  // Pre-fill sample data
  const handleLoadSampleInputs = () => {
    setJobTitle(SAMPLE_JOB_SWE.title);
    setJobDescription(SAMPLE_JOB_SWE.description);
    setResumeText(SAMPLE_RESUME_SWE);
    setUploadedFileName('Alex_Chen_SWE_Resume.pdf (Sample)');
    setDetectedDocType('Preloaded CS Candidate Profile');
    setExtractionError(null);
    setErrorMessage(null);
  };

  // Clear inputs
  const handleClear = () => {
    setResumeText('');
    setJobTitle('');
    setJobDescription('');
    setUploadedFileName(null);
    setDetectedDocType(null);
    setExtractionError(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Execute Analysis
  const handleRunAnalysis = async () => {
    setErrorMessage(null);

    // Validation
    if (!resumeText || resumeText.trim().length < 50) {
      setErrorMessage('Please provide a complete resume with at least 50 characters.');
      return;
    }

    if (!jobDescription || jobDescription.trim().length < 50) {
      setErrorMessage('Please paste the target job description with at least 50 characters.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisStage('Parsing resume credentials & technical qualifications...');

    const timer1 = setTimeout(() => {
      setAnalysisStage('Extracting required competencies from target job posting...');
    }, 1200);

    const timer2 = setTimeout(() => {
      setAnalysisStage('Evaluating skill coverage & calculating weighted alignment...');
    }, 2500);

    const timer3 = setTimeout(() => {
      setAnalysisStage('Synthesizing 5 recommendations and personalized learning roadmap...');
    }, 4000);

    try {
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          jobDescription,
          jobTitle: jobTitle.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If API key is not configured, give clear actionable notice and offer demo
        if (data.error === 'GEMINI_NOT_CONFIGURED') {
          throw new Error('DEMO_MODE_PROMPT');
        }
        throw new Error(data.message || 'Analysis failed. Please verify your inputs.');
      }

      onAnalysisComplete(data);
    } catch (err: any) {
      if (err.message === 'DEMO_MODE_PROMPT') {
        setErrorMessage(
          'GEMINI_API_KEY is not configured on the server. Click "Load Demo Analysis" below to inspect the full structured evaluation report immediately.'
        );
      } else {
        setErrorMessage(err.message || 'An unexpected error occurred during analysis.');
      }
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      setIsAnalyzing(false);
    }
  };

  const resumeWordCount = resumeText.split(/\s+/).filter(Boolean).length;
  const jobWordCount = jobDescription.split(/\s+/).filter(Boolean).length;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Resume Match Workspace</h1>
          <p className="text-sm text-slate-600 mt-1">
            Upload your document or paste text to evaluate skill coverage and application strength.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleLoadSampleInputs}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-md transition-colors shadow-2xs"
          >
            <span>Load Sample Profile</span>
          </button>

          {(resumeText || jobDescription) && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-red-600 transition-colors"
            >
              <span>Reset Fields</span>
            </button>
          )}
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm leading-relaxed">{errorMessage}</p>
          </div>
          {errorMessage.includes('GEMINI_API_KEY') && (
            <button
              onClick={() => onAnalysisComplete(SAMPLE_ANALYSIS_SWE)}
              className="px-3 py-1.5 bg-red-900 text-white text-xs font-semibold rounded hover:bg-red-800 transition-colors shrink-0"
            >
              Load Demo Analysis
            </button>
          )}
        </div>
      )}

      {/* Main 2-Column Split Input Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Column 1: Candidate Resume */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900">1. Candidate Resume</span>
              <span className="text-xs text-slate-500">
                ({resumeWordCount} {resumeWordCount === 1 ? 'word' : 'words'})
              </span>
            </div>

            {/* Input Mode Selector */}
            <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg text-xs font-medium">
              <button
                type="button"
                onClick={() => setInputMode('upload')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  inputMode === 'upload' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Upload Document
              </button>
              <button
                type="button"
                onClick={() => setInputMode('paste')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  inputMode === 'paste' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Paste Text
              </button>
            </div>
          </div>

          {/* Upload Mode */}
          {inputMode === 'upload' && (
            <div className="space-y-3">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/60 hover:bg-blue-50/20 rounded-lg p-6 text-center cursor-pointer transition-colors"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt,.rtf,.md"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-800">
                  Click to upload PDF, Word (.docx), or TXT
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Maximum file size: 5MB · Extracted directly in memory
                </p>
              </div>

              {isExtracting && (
                <div className="p-3 bg-blue-50 text-blue-800 text-xs rounded-md flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                  <span>Extracting readable text from document...</span>
                </div>
              )}

              {extractionError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-md flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span>{extractionError}</span>
                    <button
                      onClick={() => setInputMode('paste')}
                      className="block font-semibold underline mt-1"
                    >
                      Switch to Paste Text
                    </button>
                  </div>
                </div>
              )}

              {uploadedFileName && !isExtracting && !extractionError && (
                <div className="p-3 bg-slate-100 rounded-lg text-xs text-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium truncate">{uploadedFileName}</span>
                    {detectedDocType && (
                      <span className="text-slate-500 shrink-0">· {detectedDocType}</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setUploadedFileName(null);
                      setResumeText('');
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="text-slate-400 hover:text-slate-700 p-1"
                    title="Remove file"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Extracted text preview & edit */}
              {resumeText && (
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                    <span>Extracted Resume Content (editable):</span>
                    <span>{resumeText.length} characters</span>
                  </div>
                  <textarea
                    rows={8}
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Your resume content will appear here..."
                    className="w-full text-xs font-mono p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-y"
                  />
                </div>
              )}
            </div>
          )}

          {/* Direct Paste Mode */}
          {inputMode === 'paste' && (
            <div className="space-y-2">
              <textarea
                rows={12}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste the full text of your resume here (Education, Experience, Technical Skills, Projects, Coursework)..."
                className="w-full text-xs font-mono p-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-y"
              />
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Minimum 50 characters required</span>
                <span className="tabular-nums">{resumeText.length} characters</span>
              </div>
            </div>
          )}
        </div>

        {/* Column 2: Target Job Posting */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-900">2. Target Job Posting</span>
            <span className="text-xs text-slate-500">
              ({jobWordCount} {jobWordCount === 1 ? 'word' : 'words'})
            </span>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Job Title <span className="text-slate-400 font-normal">(optional, helps context)</span>
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Junior Software Engineer, Associate Data Analyst, Tech Intern"
              className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Complete Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={10}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the complete job description here, including responsibilities, required qualifications, and preferred tech stack..."
              className="w-full text-xs p-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-y"
            />
            <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
              <span>Include full requirements for best accuracy</span>
              <span className="tabular-nums">{jobDescription.length} characters</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
            <span className="font-semibold text-slate-700">Evaluation Logic:</span> The AI compares your actual project evidence against the role requirements, isolating core must-haves from bonus qualifications.
          </div>
        </div>
      </div>

      {/* Action Strip */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-slate-900">Ready to Analyze</div>
          <div className="text-xs text-slate-500">
            {resumeText.trim().length >= 50 && jobDescription.trim().length >= 50
              ? 'Inputs satisfied. Evaluation takes approximately 4–6 seconds.'
              : 'Please enter both your resume and the target job description to begin.'}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            disabled={isAnalyzing || resumeText.trim().length < 50 || jobDescription.trim().length < 50}
            onClick={handleRunAnalysis}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg shadow-sm transition-all cursor-pointer ${
              isAnalyzing || resumeText.trim().length < 50 || jobDescription.trim().length < 50
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-slate-900 text-white hover:bg-blue-600'
            }`}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Evaluating...</span>
              </>
            ) : (
              <>
                <span>Analyze Match & Generate Report</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Multi-Stage Loading Modal / Overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-md w-full p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
              <RefreshCw className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Evaluating Resume Alignment</h3>
              <p className="text-xs text-slate-500 mt-1">
                Gemini 3.8 Flash is performing structured analysis.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg text-xs font-medium text-slate-700 min-h-12 flex items-center justify-center text-center">
              {analysisStage}
            </div>

            <div className="text-[11px] text-slate-400">
              Examining skill evidence · Verifying ATS scannability · Designing roadmap
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
