import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  DashboardStats,
  JobMatch,
  Resume,
  ResumeAnalysis,
  UserProfile,
} from "./types";

function useBackendActor() {
  return useActor(createActor);
}

// Profile
export function useGetProfile() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<UserProfile | null>({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!actor) return null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (actor as any).getProfile();
      if (!result || result.length === 0) return null;
      return result[0] as UserProfile;
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useCreateProfile() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).createProfile() as Promise<UserProfile>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useUpdateProfile() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      careerFocus,
    }: { name: string; careerFocus: string }) => {
      if (!actor) throw new Error("Actor not available");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).updateProfile(
        name,
        careerFocus,
      ) as Promise<UserProfile>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

// Resumes
export function useListResumes() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Resume[]>({
    queryKey: ["resumes"],
    queryFn: async () => {
      if (!actor) return [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).listResumes() as Promise<Resume[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUploadResume() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      filename,
      fileKey,
      tag,
    }: { filename: string; fileKey: string; tag: string }) => {
      if (!actor) throw new Error("Actor not available");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).uploadResume(
        filename,
        fileKey,
        tag,
      ) as Promise<Resume>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["resumes"] });
    },
  });
}

export function useDeleteResume() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (resumeId: bigint) => {
      if (!actor) throw new Error("Actor not available");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).deleteResume(resumeId) as Promise<boolean>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["resumes"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useSetActiveResume() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (resumeId: bigint) => {
      if (!actor) throw new Error("Actor not available");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).setActiveResume(resumeId) as Promise<boolean>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["resumes"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

// Analysis
export function useAnalyzeResume() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (resumeId: bigint) => {
      if (!actor) throw new Error("Actor not available");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (actor as any).analyzeResume(resumeId);
      if (!result || result.length === 0) return null;
      return result[0] as ResumeAnalysis;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["analysis"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useGetAnalysisHistory() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ResumeAnalysis[]>({
    queryKey: ["analysis"],
    queryFn: async () => {
      if (!actor) return [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).getAnalysisHistory() as Promise<ResumeAnalysis[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetLatestAnalysis(resumeId: bigint | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ResumeAnalysis | null>({
    queryKey: ["analysis", "latest", resumeId?.toString()],
    queryFn: async () => {
      if (!actor || !resumeId) return null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (actor as any).getLatestAnalysis(resumeId);
      if (!result || result.length === 0) return null;
      return result[0] as ResumeAnalysis;
    },
    enabled: !!actor && !isFetching && !!resumeId,
  });
}

// Job Matches
export function useFindJobMatches() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (resumeId: bigint) => {
      if (!actor) throw new Error("Actor not available");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).findJobMatches(resumeId) as Promise<JobMatch[]>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["matches"] });
    },
  });
}

export function useGetJobMatches() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<JobMatch[]>({
    queryKey: ["matches"],
    queryFn: async () => {
      if (!actor) return [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).getJobMatches() as Promise<JobMatch[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetMatchDetail(matchId: bigint | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<JobMatch | null>({
    queryKey: ["matches", matchId?.toString()],
    queryFn: async () => {
      if (!actor || !matchId) return null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (actor as any).getMatchDetail(matchId);
      if (!result || result.length === 0) return null;
      return result[0] as JobMatch;
    },
    enabled: !!actor && !isFetching && !!matchId,
  });
}

export function useSaveJobMatch() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (matchId: bigint) => {
      if (!actor) throw new Error("Actor not available");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).saveJobMatch(matchId) as Promise<boolean>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["matches"] });
    },
  });
}

export function useRemoveJobMatch() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (matchId: bigint) => {
      if (!actor) throw new Error("Actor not available");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).removeJobMatch(matchId) as Promise<boolean>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["matches"] });
    },
  });
}

// Dashboard
export function useGetDashboardStats() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<DashboardStats | null>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      if (!actor) return null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).getDashboardStats() as Promise<DashboardStats>;
    },
    enabled: !!actor && !isFetching,
  });
}
