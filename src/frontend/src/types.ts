// Core domain types for Talent Pulse AI

export interface UserProfile {
  id: string;
  name: string;
  careerFocus: string;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface Resume {
  id: bigint;
  filename: string;
  fileKey: string;
  tag: string;
  isActive: boolean;
  uploadedAt: bigint;
}

export interface SkillEntry {
  name: string;
  level: string;
  yearsOfExperience: number;
}

export interface SkillMatch {
  skill: string;
  matched: boolean;
  relevance: bigint;
}

export interface ResumeAnalysis {
  resumeId: bigint;
  overallScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  skills: SkillEntry[];
  recommendations: string[];
  analyzedAt: bigint;
}

export interface JobMatch {
  id: bigint;
  jobTitle: string;
  company: string;
  location: string;
  relevanceScore: number;
  description: string;
  skillBreakdown: SkillMatch[];
  isSaved: boolean;
  matchedAt: bigint;
  coverLetterDraft: string;
  redFlags: string[];
  resumeId: bigint;
}

export interface DashboardStats {
  totalResumes: bigint;
  totalMatches: bigint;
  totalAnalyses: bigint;
  avgMatchScore: bigint;
  latestAtsScore?: bigint;
}

export type MatchScoreLevel = "excellent" | "good" | "fair" | "poor";

export function getMatchLevel(score: number): MatchScoreLevel {
  if (score >= 85) return "excellent";
  if (score >= 70) return "good";
  if (score >= 50) return "fair";
  return "poor";
}

export function getMatchColor(score: number): string {
  if (score >= 85) return "text-accent";
  if (score >= 70) return "text-chart-3";
  if (score >= 50) return "text-chart-4";
  return "text-destructive";
}

export function getMatchBg(score: number): string {
  if (score >= 85) return "bg-accent/10 border-accent/30";
  if (score >= 70) return "bg-chart-3/10 border-chart-3/30";
  if (score >= 50) return "bg-chart-4/10 border-chart-4/30";
  return "bg-destructive/10 border-destructive/30";
}
