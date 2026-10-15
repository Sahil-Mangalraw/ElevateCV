# ElevateCV AI

> **Understand Your Skills. Improve Your Resume. Apply Smarter.**

ElevateCV AI is a modern, ethical AI web application engineered to help college students, recent graduates, and entry-level job seekers evaluate how well their resumes match target job postings, identify critical skill gaps, and take actionable steps to improve their applications.

Built as a technology fellowship demonstration, ElevateCV AI illustrates production-grade AI product engineering: server-side Gemini 3.8 Flash model execution with strict schema constraints, zero client-side credential exposure, evidence-based matching, anti-hallucination guarantees, document parsing, and WCAG AA accessibility compliance.

---

## 1. Problem Statement & Value Proposition

### The Problem
- **Keyword Wishlists vs. Reality:** Entry-level job descriptions are frequently overloaded with extensive tool wishlists, confusing applicants about what is genuinely required versus preferred.
- **Under-Articulated Evidence:** Early-career candidates often possess strong project and coursework qualifications but fail to articulate technical scale, metrics, or architectural impact in their resume bullets.
- **ATS Misconceptions:** Candidates are misinformed by social media claims that Applicant Tracking Systems (ATS) use secret algorithms to reject 95% of applicants. In reality, ATS software acts as a searchable database for human screeners.
- **AI Hallucinations in Other Tools:** Many generic AI resume tools invent false metrics, degrees, or employers, jeopardizing candidate credibility in technical interviews.

### The Solution: ElevateCV AI
- **Evidence-Based Parsing:** Distinguishes between competencies demonstrated in context (internships, projects, coursework) and keywords merely listed without evidence.
- **Transparent 0–100 Weighted Scoring:** Rather than an arbitrary single score, applicants receive transparent sub-scores across Skills Match (40%), Experience Evidence (30%), Education Alignment (15%), and ATS Formatting (15%).
- **STAR / XYZ Metric-Guarded Rewriter:** Enhances weak bullet points into high-impact lines using explicit bracketed placeholders (`[X%]`, `[N users]`) so candidates supply their own verified numbers.
- **4-Week Actionable Roadmap:** Generates an ordered timeline with concrete weekly milestones and project ideas to bridge verified gaps.

---

## 2. Architecture & Technical Highlights

```
┌─────────────────────────────────────────────────────────────┐
│                    ElevateCV AI Architecture                │
└─────────────────────────────────────────────────────────────┘

 [ Browser / Client ] (React 19 + TypeScript + Tailwind CSS v4)
         │
         │  • Multi-Screen Responsive Workspace (Dashboard, Results, Rewriter, History)
         │  • In-Memory File Upload (.pdf, .docx, .txt) with Drag & Drop
         │  • Client-side localStorage for History & Privacy Protection
         │  • Printable CSS & Markdown Report Export
         │
         ▼
 ─────────────────────────────────────────────────────────────
  API Boundary (Proxy Routes /api/* — No Browser API Key Leaks)
 ─────────────────────────────────────────────────────────────
         ▲
         │
 [ Server Runtime ] (Node.js / Express 4 / tsx)
         │
         ├── POST /api/extract-document
         │     ├── mammoth (DOCX text extraction)
         │     └── pdfjs-dist (In-memory multi-page PDF text streams)
         │
         ├── POST /api/analyze-resume
         │     └── @google/genai SDK (gemini-3.8-flash)
         │           • Strict JSON Schema (Type.OBJECT, Type.ARRAY)
         │           • Low temperature (0.2) for analytical consistency
         │           • Anti-hallucination system prompt guards
         │           • Untrusted text injection containment
         │
         ├── POST /api/rewrite-bullet
         │     └── @google/genai SDK (gemini-3.8-flash)
         │           • 3 Styles: Concise, Achievement-oriented, Technical
         │           • Bracketed metric placeholder generation
         │
         └── GET /api/status (Health check & Demo mode coordination)
```

### Key Engineering Decisions
1. **Server-Side AI Runtime:** All Gemini calls are executed server-side via the official `@google/genai` TypeScript SDK. The `GEMINI_API_KEY` is never injected into client bundles or sent over the wire.
2. **Strict Schema Constraints:** Uses `responseMimeType: "application/json"` and `responseSchema` with typed properties (`Type.INTEGER`, `Type.OBJECT`, `Type.ARRAY`) to prevent malformed or truncated responses.
3. **Graceful Demo Fallback:** If `GEMINI_API_KEY` is not configured, the system provides a clearly labeled interactive demo mode with synthetic sample datasets, enabling evaluators to test 100% of the UI, visualizations, and exports without crashing.
4. **Privacy First:** Uploaded documents are parsed ephemerally in server memory and discarded immediately. User history is stored exclusively in the browser's `localStorage` with a 1-click clear action.

---

## 3. Core Application Features

| Screen / Feature | Description |
| :--- | :--- |
| **Welcome & Dashboard** | Overview of core value proposition, mechanism-to-outcome chain, 1-click sample scenarios, and quick access to recent evaluations. |
| **Resume Analysis Workspace** | Dual-mode input: In-memory file upload (PDF/DOCX, up to 5MB) or direct text paste with character counts, preloaded sample job postings, and multi-stage loading animation. |
| **Results Dashboard** | 0–100 overall score, 4 weighted criteria gauges, demonstrated vs missing skills breakdown, strengths/improvements, 5 high-impact recommendations, ATS readability checklist, and interactive 4-week learning roadmap. |
| **Resume Bullet Assistant** | Interactive bullet rewriter supporting 3 distinct styles (*Concise & Professional*, *Achievement-Oriented*, *Technical & Impact*), preserving core meaning while inserting metric placeholders. |
| **Recent Analyses** | Local persistence of past evaluations for side-by-side role comparison, with individual deletion and full privacy-wipe actions. |
| **About & Ethical Boundaries** | Transparent documentation explaining Gemini model usage, demystifying ATS myths, clarifying anti-hallucination safeguards, and detailing limitations. |
| **Export & Sharing** | One-click clean printable report (`window.print()` with custom print CSS), full Markdown report download, and instant clipboard copy actions. |

---

## 4. Getting Started & Local Setup

### Prerequisites
- Node.js (version 20 or higher recommended)
- npm or pnpm

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd elevatecv-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Add your Google Gemini API key:
   ```env
   GEMINI_API_KEY="your-gemini-api-key-here"
   PORT=3000
   ```
   *(Note: If no API key is supplied, the app automatically runs in interactive demo mode using synthetic candidate data).*

4. Run Development Server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

5. Run Automated Tests:
   ```bash
   npm test
   ```

6. Build for Production:
   ```bash
   npm run build
   npm start
   ```

---

## 5. Demonstration Workflow for Evaluators

To inspect the application during an evaluation or interview demonstration:

1. **Quick-Start Scenario A (Zero Configuration):**
   - On the landing page, click **"Inspect Sample SWE Analysis"**.
   - Review the 0–100 alignment score (84/100) and inspect the transparent 4-part breakdown.
   - Examine the **Demonstrated Skills** (React, TypeScript, Node.js) contrasted with **Skills Gaps to Bridge** (CI/CD Pipelines, Cloud deployment).
   - Click **"Tune in Rewriter"** on any bullet point to see how the rewrite assistant preserves the original contribution while inserting bracketed metric placeholders.
   - Click **"Print Report"** or **"Download Report (.md)"** to test export fidelity.

2. **Quick-Start Scenario B (Custom Candidate Upload):**
   - Click **"Analyze My Resume"** from the top bar.
   - Click **"Load Sample Profile"** to populate realistic candidate text and target job posting, or upload your own `.pdf` / `.docx` resume.
   - Click **"Analyze Match & Generate Report"** to observe live multi-stage Gemini parsing and structured synthesis.

---

## 6. Secure Deployment & Cloud Publishing

### Publishing to Public GitHub without Leaking Secrets
1. Verify `.gitignore` contains sensitive and environment files:
   ```gitignore
   .env
   .env.local
   node_modules
   dist
   ```
2. Verify `.env.example` contains only placeholder values:
   ```env
   GEMINI_API_KEY="MY_GEMINI_API_KEY"
   APP_URL="MY_APP_URL"
   ```
3. Commit and push:
   ```bash
   git add .
   git commit -m "feat: complete ElevateCV AI application for fellowship submission"
   git push origin main
   ```

### Deploying to Google Cloud Run / Container Platforms
1. Build the production container using a standard Node.js Dockerfile:
   ```dockerfile
   FROM node:22-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build
   EXPOSE 3000
   ENV NODE_ENV=production
   CMD ["npm", "start"]
   ```
2. Deploy to Google Cloud Run:
   ```bash
   gcloud run deploy elevatecv-ai \
     --source . \
     --platform managed \
     --allow-unauthenticated \
     --set-env-vars GEMINI_API_KEY=projects/$PROJECT/secrets/gemini-api-key:latest
   ```

---

## 7. Known Limitations & Roadmap

- **Scanned Image PDFs:** PDFs consisting purely of flat scanned bitmap images without embedded text layers require OCR preprocessing before upload; a built-in optical character recognition pipeline is planned for v2.
- **Multi-Page Resumes:** The ATS readability guidelines recommend 1 single page for students/graduates; multi-page detection currently flags a formatting observation.
- **Interdisciplinary Alignment:** Job postings with proprietary internal nomenclature (e.g., internal job grades or bespoke company frameworks) are evaluated against general industry equivalents.

---

## License & Attribution

Distributed under the Apache-2.0 License. Built for Technology Fellowship Demonstration.
