import Map "mo:core/Map";
import CommonTypes "types/common";
import UserTypes "types/users";
import ResumeTypes "types/resumes";
import AnalysisTypes "types/analyses";
import JobTypes "types/jobs";
import UsersApi "mixins/users-api";
import ResumesApi "mixins/resumes-api";
import AnalysesApi "mixins/analyses-api";
import JobsApi "mixins/jobs-api";
import DashboardApi "mixins/dashboard-api";

actor {
  // --- Stable state ---
  let users = Map.empty<CommonTypes.UserId, UserTypes.UserProfile>();
  let resumes = Map.empty<CommonTypes.ResumeId, ResumeTypes.Resume>();
  let analyses = Map.empty<CommonTypes.AnalysisId, AnalysisTypes.ResumeAnalysis>();
  let jobMatches = Map.empty<CommonTypes.MatchId, JobTypes.JobMatch>();

  let counters = {
    var nextResumeId : Nat = 0;
    var nextAnalysisId : Nat = 0;
    var nextMatchId : Nat = 0;
  };

  // --- Mixin composition ---
  include UsersApi(users);
  include ResumesApi(resumes, counters);
  include AnalysesApi(analyses, resumes, counters);
  include JobsApi(jobMatches, resumes, counters);
  include DashboardApi(resumes, analyses, jobMatches);
};
