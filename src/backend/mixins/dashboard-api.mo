import Map "mo:core/Map";
import Common "../types/common";
import AnalysisTypes "../types/analyses";
import JobTypes "../types/jobs";
import ResumeTypes "../types/resumes";
import DashboardLib "../lib/dashboard";

mixin (
  resumes : Map.Map<Common.ResumeId, ResumeTypes.Resume>,
  analyses : Map.Map<Common.AnalysisId, AnalysisTypes.ResumeAnalysis>,
  jobMatches : Map.Map<Common.MatchId, JobTypes.JobMatch>,
) {
  let _dashState : DashboardLib.State = { resumes; analyses; jobMatches };

  public shared query ({ caller }) func getDashboardStats() : async DashboardLib.DashboardStats {
    DashboardLib.getDashboardStats(_dashState, caller);
  };
};
