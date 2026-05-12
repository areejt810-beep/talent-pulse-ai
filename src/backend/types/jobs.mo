import Common "common";

module {
  public type SkillMatch = {
    skill : Text;
    matched : Bool;
    relevance : Nat;
  };

  public type JobMatch = {
    id : Common.MatchId;
    owner : Common.UserId;
    resumeId : Common.ResumeId;
    jobTitle : Text;
    company : Text;
    location : Text;
    description : Text;
    relevanceScore : Nat;
    skillBreakdown : [SkillMatch];
    coverLetterDraft : Text;
    redFlags : [Text];
    var isSaved : Bool;
    matchedAt : Common.Timestamp;
  };

  public type JobMatchPublic = {
    id : Common.MatchId;
    owner : Common.UserId;
    resumeId : Common.ResumeId;
    jobTitle : Text;
    company : Text;
    location : Text;
    description : Text;
    relevanceScore : Nat;
    skillBreakdown : [SkillMatch];
    coverLetterDraft : Text;
    redFlags : [Text];
    isSaved : Bool;
    matchedAt : Common.Timestamp;
  };
};
