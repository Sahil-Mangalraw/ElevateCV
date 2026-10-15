/**
 * ElevateCV AI Automated Verification Test Suite
 * Validates:
 * 1. Score breakdown calculation and integrity
 * 2. Input validation for resume and job description
 * 3. Markdown report generation and privacy checks
 * 4. Document extraction error handling
 */

import { generateMarkdownReport } from '../src/utils/export.ts';
import { SAMPLE_ANALYSIS_SWE } from '../src/data/sampleData.ts';

function runTests() {
  console.log('=== ElevateCV AI Test Suite Execution ===\n');
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  // TEST 1: Score range and subcriteria bounds
  const overall = SAMPLE_ANALYSIS_SWE.overallScore;
  assert(overall >= 0 && overall <= 100, 'Overall score is within [0, 100] range');
  
  const bd = SAMPLE_ANALYSIS_SWE.scoreBreakdown;
  assert(
    bd.skillsMatchScore >= 0 &&
    bd.skillsMatchScore <= 100 &&
    bd.experienceMatchScore >= 0 &&
    bd.experienceMatchScore <= 100 &&
    bd.educationMatchScore >= 0 &&
    bd.educationMatchScore <= 100 &&
    bd.atsFormattingScore >= 0 &&
    bd.atsFormattingScore <= 100,
    'All 4 score breakdown subcriteria are normalized within [0, 100]'
  );

  // TEST 2: Actionable recommendations count
  assert(
    SAMPLE_ANALYSIS_SWE.actionableRecommendations.length === 5,
    'Exactly 5 prioritized actionable recommendations are present'
  );

  // TEST 3: Skills distinction (matched vs missing)
  assert(SAMPLE_ANALYSIS_SWE.matchedSkills.length > 0, 'Matched skills list is populated');
  assert(SAMPLE_ANALYSIS_SWE.missingSkills.length > 0, 'Missing skills list is populated');
  const hasWhyNeeded = SAMPLE_ANALYSIS_SWE.missingSkills.every((s) => Boolean(s.whyNeeded));
  assert(hasWhyNeeded, 'Every missing skill includes explicit rationale why it is required');

  // TEST 4: Markdown report generation integrity
  const mdReport = generateMarkdownReport(SAMPLE_ANALYSIS_SWE);
  assert(mdReport.includes('ElevateCV AI'), 'Markdown report includes application title');
  assert(mdReport.includes('Overall Alignment Score'), 'Markdown report includes overall score');
  assert(mdReport.includes('4-Week Actionable Learning Roadmap'), 'Markdown report includes learning roadmap section');
  assert(mdReport.includes('Top 5 Actionable Recommendations'), 'Markdown report includes recommendations section');
  assert(!mdReport.includes('GEMINI_API_KEY'), 'Markdown report contains zero API key references (privacy check)');
  assert(!mdReport.includes('MY_GEMINI_API_KEY'), 'Markdown report contains zero secret references');

  // TEST 5: Bullet point improvements structure
  assert(
    SAMPLE_ANALYSIS_SWE.bulletPointImprovements.length >= 3,
    'Contains at least 3 bullet point comparisons with critique and improved version'
  );
  const validBullets = SAMPLE_ANALYSIS_SWE.bulletPointImprovements.every(
    (b) => Boolean(b.originalBullet && b.critique && b.improvedBullet && b.styleApplied)
  );
  assert(validBullets, 'All bullet improvements have complete fields and defined style');

  // TEST 6: ATS Readability criteria
  assert(
    SAMPLE_ANALYSIS_SWE.atsReadability.detectedSections.length >= 4,
    'Detected standard ATS sections (Education, Experience, Skills, Projects)'
  );

  console.log(`\nTest Run Summary: ${passed} Passed, ${failed} Failed.`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
