import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SkillMatch {
    skill: string;
    matched: boolean;
    relevance: bigint;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface SkillEntry {
    level: string;
    skill: string;
}
export type MatchId = bigint;
export interface http_header {
    value: string;
    name: string;
}
export interface ResumePublic {
    id: ResumeId;
    tag: string;
    owner: UserId;
    isActive: boolean;
    filename: string;
    uploadedAt: Timestamp;
    fileKey: string;
}
export type ResumeId = bigint;
export type UserId = Principal;
export interface UserProfilePublic {
    id: UserId;
    name: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    careerFocus: string;
}
export interface JobMatchPublic {
    id: MatchId;
    matchedAt: Timestamp;
    isSaved: boolean;
    coverLetterDraft: string;
    owner: UserId;
    description: string;
    relevanceScore: bigint;
    redFlags: Array<string>;
    resumeId: ResumeId;
    company: string;
    jobTitle: string;
    location: string;
    skillBreakdown: Array<SkillMatch>;
}
export interface ResumeAnalysis {
    id: AnalysisId;
    suggestions: Array<AnalysisSuggestion>;
    owner: UserId;
    gaps: Array<string>;
    summary: string;
    resumeId: ResumeId;
    atsScore: bigint;
    analyzedAt: Timestamp;
    skills: Array<SkillEntry>;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface DashboardStats {
    totalAnalyses: bigint;
    totalResumes: bigint;
    totalMatches: bigint;
    latestAtsScore?: bigint;
    avgMatchScore: bigint;
}
export interface AnalysisSuggestion {
    suggestion: string;
    category: string;
}
export type AnalysisId = bigint;
export interface backendInterface {
    analyzeResume(resumeId: ResumeId): Promise<ResumeAnalysis>;
    createProfile(name: string, careerFocus: string): Promise<UserProfilePublic>;
    deleteResume(resumeId: ResumeId): Promise<boolean>;
    findJobMatches(resumeId: ResumeId): Promise<Array<JobMatchPublic>>;
    getAnalysisHistory(): Promise<Array<ResumeAnalysis>>;
    getDashboardStats(): Promise<DashboardStats>;
    getJobMatches(): Promise<Array<JobMatchPublic>>;
    getLatestAnalysis(resumeId: ResumeId): Promise<ResumeAnalysis | null>;
    getMatchDetail(matchId: MatchId): Promise<JobMatchPublic | null>;
    getProfile(): Promise<UserProfilePublic | null>;
    listResumes(): Promise<Array<ResumePublic>>;
    removeJobMatch(matchId: MatchId): Promise<boolean>;
    saveJobMatch(matchId: MatchId): Promise<boolean>;
    setActiveResume(resumeId: ResumeId): Promise<boolean>;
    transformAnalysis(input: TransformationInput): Promise<TransformationOutput>;
    transformJobs(input: TransformationInput): Promise<TransformationOutput>;
    updateProfile(name: string, careerFocus: string): Promise<UserProfilePublic>;
    uploadResume(filename: string, fileKey: string, tag: string): Promise<ResumePublic>;
}
