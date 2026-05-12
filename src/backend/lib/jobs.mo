import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Common "../types/common";
import Types "../types/jobs";

module {
  public type State = {
    jobMatches : Map.Map<Common.MatchId, Types.JobMatch>;
    counters : { var nextMatchId : Nat };
  };

  public func storeJobMatches(
    state : State,
    principal : Common.UserId,
    resumeId : Common.ResumeId,
    matches : [Types.JobMatchPublic],
  ) : [Types.JobMatchPublic] {
    let stored = matches.map(func(m) {
      let id = state.counters.nextMatchId;
      state.counters.nextMatchId += 1;
      let jm : Types.JobMatch = {
        id = id;
        owner = principal;
        resumeId = resumeId;
        jobTitle = m.jobTitle;
        company = m.company;
        location = m.location;
        description = m.description;
        relevanceScore = m.relevanceScore;
        skillBreakdown = m.skillBreakdown;
        coverLetterDraft = m.coverLetterDraft;
        redFlags = m.redFlags;
        var isSaved = false;
        matchedAt = m.matchedAt;
      };
      state.jobMatches.add(id, jm);
      toPublic(jm);
    });
    stored;
  };

  public func getJobMatches(
    state : State,
    principal : Common.UserId,
  ) : [Types.JobMatchPublic] {
    state.jobMatches.values()
      |> _.filter(func(m : Types.JobMatch) : Bool { Principal.equal(m.owner, principal) })
      |> _.map(func(m : Types.JobMatch) : Types.JobMatchPublic { toPublic(m) })
      |> _.toArray();
  };

  public func saveJobMatch(
    state : State,
    principal : Common.UserId,
    matchId : Common.MatchId,
  ) : Bool {
    switch (state.jobMatches.get(matchId)) {
      case (?m) {
        if (Principal.equal(m.owner, principal)) {
          m.isSaved := true;
          true;
        } else { false };
      };
      case null { false };
    };
  };

  public func removeJobMatch(
    state : State,
    principal : Common.UserId,
    matchId : Common.MatchId,
  ) : Bool {
    switch (state.jobMatches.get(matchId)) {
      case (?m) {
        if (Principal.equal(m.owner, principal)) {
          m.isSaved := false;
          true;
        } else { false };
      };
      case null { false };
    };
  };

  public func getMatchDetail(
    state : State,
    principal : Common.UserId,
    matchId : Common.MatchId,
  ) : ?Types.JobMatchPublic {
    switch (state.jobMatches.get(matchId)) {
      case (?m) {
        if (Principal.equal(m.owner, principal)) { ?toPublic(m) } else { null };
      };
      case null { null };
    };
  };

  public func toPublic(match : Types.JobMatch) : Types.JobMatchPublic {
    {
      id = match.id;
      owner = match.owner;
      resumeId = match.resumeId;
      jobTitle = match.jobTitle;
      company = match.company;
      location = match.location;
      description = match.description;
      relevanceScore = match.relevanceScore;
      skillBreakdown = match.skillBreakdown;
      coverLetterDraft = match.coverLetterDraft;
      redFlags = match.redFlags;
      isSaved = match.isSaved;
      matchedAt = match.matchedAt;
    };
  };
};
