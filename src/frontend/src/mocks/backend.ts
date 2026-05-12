import type { backendInterface } from "../backend";

const mockUserId = { _isPrincipal: true, _arr: new Uint8Array([1, 2, 3]) } as any;

const mockResume = {
  id: BigInt(1),
  tag: "Software Engineer",
  owner: mockUserId,
  isActive: true,
  filename: "resume_alex_chen.pdf",
  uploadedAt: BigInt(Date.now() * 1_000_000),
  fileKey: "resume-001",
};

const mockProfile = {
  id: mockUserId,
  name: "Alex Chen",
  createdAt: BigInt(Date.now() * 1_000_000),
  updatedAt: BigInt(Date.now() * 1_000_000),
  careerFocus: "Full Stack Development",
};

const mockSkillMatches = [
  { skill: "React", matched: true, relevance: BigInt(95) },
  { skill: "TypeScript", matched: true, relevance: BigInt(90) },
  { skill: "Node.js", matched: true, relevance: BigInt(85) },
  { skill: "GraphQL", matched: false, relevance: BigInt(60) },
];

const mockJobMatch = {
  id: BigInt(1),
  matchedAt: BigInt(Date.now() * 1_000_000),
  isSaved: false,
  coverLetterDraft: "Dear Hiring Manager, I am excited to apply for this position...",
  owner: mockUserId,
  description: "We are looking for a Senior Frontend Engineer to join our growing team. You will work on cutting-edge web applications using React and TypeScript.",
  relevanceScore: BigInt(88),
  redFlags: ["Requires 5+ years React experience"],
  resumeId: BigInt(1),
  company: "TechCorp Inc.",
  jobTitle: "Senior Frontend Engineer",
  location: "San Francisco, CA (Remote)",
  skillBreakdown: mockSkillMatches,
};

const mockJobMatch2 = {
  id: BigInt(2),
  matchedAt: BigInt(Date.now() * 1_000_000),
  isSaved: true,
  coverLetterDraft: "Dear Team, I am writing to express my interest in the Full Stack Developer role...",
  owner: mockUserId,
  description: "Join our innovative startup building the next generation of developer tools. We use React, TypeScript, and Go.",
  relevanceScore: BigInt(76),
  redFlags: [],
  resumeId: BigInt(1),
  company: "DevTools Startup",
  jobTitle: "Full Stack Developer",
  location: "New York, NY",
  skillBreakdown: [
    { skill: "React", matched: true, relevance: BigInt(90) },
    { skill: "Go", matched: false, relevance: BigInt(40) },
  ],
};

const mockJobMatch3 = {
  id: BigInt(3),
  matchedAt: BigInt(Date.now() * 1_000_000),
  isSaved: false,
  coverLetterDraft: "Hello, I would love to join your team as a Frontend Lead...",
  owner: mockUserId,
  description: "Lead our frontend engineering team in building scalable React applications with a focus on performance.",
  relevanceScore: BigInt(94),
  redFlags: ["Leadership experience required"],
  resumeId: BigInt(1),
  company: "Scale Corp",
  jobTitle: "Frontend Lead Engineer",
  location: "Austin, TX (Hybrid)",
  skillBreakdown: mockSkillMatches,
};

const mockAnalysis = {
  id: BigInt(1),
  suggestions: [
    { suggestion: "Add quantifiable achievements to your work experience section", category: "Impact" },
    { suggestion: "Include a professional summary at the top of your resume", category: "Structure" },
    { suggestion: "Add more keywords relevant to cloud technologies", category: "Keywords" },
    { suggestion: "Consider adding a projects section to showcase personal work", category: "Content" },
  ],
  owner: mockUserId,
  gaps: ["Docker/Kubernetes experience", "Cloud platform certifications", "System design experience"],
  summary: "Your resume demonstrates strong frontend engineering skills with excellent coverage of modern JavaScript frameworks. The ATS score is solid, but there are opportunities to better highlight your impact through quantifiable metrics and expand coverage of backend and DevOps competencies.",
  resumeId: BigInt(1),
  atsScore: BigInt(82),
  analyzedAt: BigInt(Date.now() * 1_000_000),
  skills: [
    { skill: "React", level: "Expert" },
    { skill: "TypeScript", level: "Advanced" },
    { skill: "Node.js", level: "Intermediate" },
    { skill: "CSS/Tailwind", level: "Expert" },
    { skill: "SQL", level: "Intermediate" },
    { skill: "Git", level: "Advanced" },
  ],
};

const mockDashboardStats = {
  totalAnalyses: BigInt(3),
  totalResumes: BigInt(1),
  totalMatches: BigInt(12),
  latestAtsScore: BigInt(82),
  avgMatchScore: BigInt(84),
};

export const mockBackend: backendInterface = {
  analyzeResume: async (_resumeId) => mockAnalysis,
  createProfile: async (name, careerFocus) => ({ ...mockProfile, name, careerFocus }),
  deleteResume: async (_resumeId) => true,
  findJobMatches: async (_resumeId) => [mockJobMatch, mockJobMatch2, mockJobMatch3],
  getAnalysisHistory: async () => [mockAnalysis],
  getDashboardStats: async () => mockDashboardStats,
  getJobMatches: async () => [mockJobMatch, mockJobMatch2, mockJobMatch3],
  getLatestAnalysis: async (_resumeId) => mockAnalysis,
  getMatchDetail: async (_matchId) => mockJobMatch,
  getProfile: async () => mockProfile,
  listResumes: async () => [mockResume],
  removeJobMatch: async (_matchId) => true,
  saveJobMatch: async (_matchId) => true,
  setActiveResume: async (_resumeId) => true,
  transformAnalysis: async (input) => ({
    status: BigInt(200),
    body: new Uint8Array(),
    headers: [],
  }),
  transformJobs: async (input) => ({
    status: BigInt(200),
    body: new Uint8Array(),
    headers: [],
  }),
  updateProfile: async (name, careerFocus) => ({ ...mockProfile, name, careerFocus }),
  uploadResume: async (filename, fileKey, tag) => ({ ...mockResume, filename, fileKey, tag }),
};
