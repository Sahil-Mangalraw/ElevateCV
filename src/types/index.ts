/**
 * Core type definitions for ElevateCV AI
 */

export type SkillImportance = 'critical' | 'important' | 'bonus';

export interface MatchedSkill {
  name: string;
  category: string;
  contextInResume: string;
}

export interface MissingSkill {
  name: string;
  importance: SkillImportance;
  whyNeeded: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year?: string;
  relevance: string;
}

export interface ExperienceOrProjectItem {
  title: string;
  organization?: string;
  highlights: string;
  relevance: string;
}

export interface ActionableRecommendation {
  id: string;
  title: string;
  action: string;
  impact: string;
  exampleSnippet?: string;
}

export interface BulletImprovement {
  originalBullet: string;
  critique: string;
  improvedBullet: string;
  styleApplied: string;
}

export interface AtsReadability {
  score: number;
  observations: string[];
  detectedSections: string[];
  formattingRisks: string[];
  recommendations: string[];
}

export interface RoadmapItem {
  milestone: string;
  timeframe: string;
  focusSkills: string[];
  suggestedAction: string;
  suggestedResourceOrProject: string;
}

export interface ScoreBreakdown {
  skillsMatchScore: number; // 40% weight
  experienceMatchScore: number; // 30% weight
  educationMatchScore: number; // 15% weight
  atsFormattingScore: number; // 15% weight
  explanation: string;
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  jobTitle: string;
  jobDescription: string;
  resumeText: string;
  overallScore: number; // 0-100
  scoreBreakdown: ScoreBreakdown;
  matchedSkills: MatchedSkill[];
  missingSkills: MissingSkill[];
  identifiedExperience: {
    education: EducationItem[];
    rolesAndProjects: ExperienceOrProjectItem[];
  };
  strengths: string[];
  areasForImprovement: string[];
  actionableRecommendations: ActionableRecommendation[]; // Exactly 5
  bulletPointImprovements: BulletImprovement[];
  atsReadability: AtsReadability;
  learningRoadmap: RoadmapItem[];
  isDemo?: boolean;
}

export type RewriteStyle = 'concise' | 'achievement' | 'technical';

export interface BulletRewriteResult {
  originalBullet: string;
  style: RewriteStyle;
  rewrittenBullet: string;
  rationale: string;
  preservationNotes: string;
  placeholdersToFill: string[];
}
