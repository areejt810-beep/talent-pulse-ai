import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Common "../types/common";
import AnalysisTypes "../types/analyses";
import ResumeTypes "../types/resumes";

module {
  public type State = {
    analyses : Map.Map<Common.AnalysisId, AnalysisTypes.ResumeAnalysis>;
    resumes : Map.Map<Common.ResumeId, ResumeTypes.Resume>;
    counters : { var nextAnalysisId : Nat };
  };

  public func analyzeResume(
    state : State,
    principal : Common.UserId,
    resumeId : Common.ResumeId,
    analysisResult : AnalysisTypes.ResumeAnalysis,
  ) : AnalysisTypes.ResumeAnalysis {
    // Verify ownership of resume
    switch (state.resumes.get(resumeId)) {
      case null { Runtime.trap("Resume not found") };
      case (?resume) {
        if (not Principal.equal(resume.owner, principal)) {
          Runtime.trap("Not authorized");
        };
      };
    };
    state.analyses.add(analysisResult.id, analysisResult);
    analysisResult;
  };

  public func getAnalysisHistory(
    state : State,
    principal : Common.UserId,
  ) : [AnalysisTypes.ResumeAnalysis] {
    state.analyses.values()
      |> _.filter(func(a : AnalysisTypes.ResumeAnalysis) : Bool { Principal.equal(a.owner, principal) })
      |> _.toArray();
  };

  public func getLatestAnalysis(
    state : State,
    principal : Common.UserId,
    resumeId : Common.ResumeId,
  ) : ?AnalysisTypes.ResumeAnalysis {
    let owned = state.analyses.values()
      |> _.filter(func(a : AnalysisTypes.ResumeAnalysis) : Bool {
        Principal.equal(a.owner, principal) and a.resumeId == resumeId
      })
      |> _.toArray();
    // Return the analysis with the highest id (latest stored)
    if (owned.size() == 0) { null } else {
      var latest = owned[0];
      for (a in owned.values()) {
        if (a.id > latest.id) { latest := a };
      };
      ?latest;
    };
  };
};
