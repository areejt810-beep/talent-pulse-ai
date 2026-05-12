import Common "common";

module {
  public type SkillEntry = {
    skill : Text;
    level : Text;
  };

  public type AnalysisSuggestion = {
    category : Text;
    suggestion : Text;
  };

  public type ResumeAnalysis = {
    id : Common.AnalysisId;
    resumeId : Common.ResumeId;
    owner : Common.UserId;
    atsScore : Nat;
    skills : [SkillEntry];
    gaps : [Text];
    suggestions : [AnalysisSuggestion];
    summary : Text;
    analyzedAt : Common.Timestamp;
  };
};
