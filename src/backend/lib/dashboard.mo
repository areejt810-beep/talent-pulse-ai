import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Common "../types/common";
import AnalysisTypes "../types/analyses";
import JobTypes "../types/jobs";
import ResumeTypes "../types/resumes";

module {
  public type DashboardStats = {
    totalResumes : Nat;
    totalAnalyses : Nat;
    avgMatchScore : Nat;
    totalMatches : Nat;
    latestAtsScore : ?Nat;
  };

  public type State = {
    resumes : Map.Map<Common.ResumeId, ResumeTypes.Resume>;
    analyses : Map.Map<Common.AnalysisId, AnalysisTypes.ResumeAnalysis>;
    jobMatches : Map.Map<Common.MatchId, JobTypes.JobMatch>;
  };

  public func getDashboardStats(
    state : State,
    principal : Common.UserId,
  ) : DashboardStats {
    var totalResumes = 0;
    var totalAnalyses = 0;
    var totalMatches = 0;
    var scoreSum = 0;
    var latestAnalysisId : ?Nat = null;
    var latestAtsScore : ?Nat = null;

    state.resumes.forEach(func(_, r : ResumeTypes.Resume) {
      if (Principal.equal(r.owner, principal)) { totalResumes += 1 };
    });

    state.analyses.forEach(func(_, a : AnalysisTypes.ResumeAnalysis) {
      if (Principal.equal(a.owner, principal)) {
        totalAnalyses += 1;
        switch (latestAnalysisId) {
          case null {
            latestAnalysisId := ?a.id;
            latestAtsScore := ?a.atsScore;
          };
          case (?lid) {
            if (a.id > lid) {
              latestAnalysisId := ?a.id;
              latestAtsScore := ?a.atsScore;
            };
          };
        };
      };
    });

    state.jobMatches.forEach(func(_, m : JobTypes.JobMatch) {
      if (Principal.equal(m.owner, principal)) {
        totalMatches += 1;
        scoreSum += m.relevanceScore;
      };
    });

    let avgMatchScore = if (totalMatches == 0) { 0 } else { scoreSum / totalMatches };

    {
      totalResumes = totalResumes;
      totalAnalyses = totalAnalyses;
      avgMatchScore = avgMatchScore;
      totalMatches = totalMatches;
      latestAtsScore = latestAtsScore;
    };
  };
};
