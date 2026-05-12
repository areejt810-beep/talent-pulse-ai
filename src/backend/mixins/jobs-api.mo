import Map "mo:core/Map";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Common "../types/common";
import JobTypes "../types/jobs";
import ResumeTypes "../types/resumes";
import JobLib "../lib/jobs";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

mixin (
  jobMatches : Map.Map<Common.MatchId, JobTypes.JobMatch>,
  resumes : Map.Map<Common.ResumeId, ResumeTypes.Resume>,
  counters : { var nextMatchId : Nat },
) {
  let _jobState : JobLib.State = { jobMatches; counters };

  public query func transformJobs(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public shared ({ caller }) func findJobMatches(
    resumeId : Common.ResumeId,
  ) : async [JobTypes.JobMatchPublic] {
    let resume = switch (resumes.get(resumeId)) {
      case (?r) { r };
      case null { Runtime.trap("Resume not found") };
    };
    if (not Principal.equal(resume.owner, caller)) {
      Runtime.trap("Not authorized");
    };

    let resumeContext = "Resume: " # resume.filename # ", tag: " # resume.tag;
    let prompt = "{\"model\":\"gpt-4o-mini\",\"messages\":[{\"role\":\"user\",\"content\":\"Find 3 job matches for this resume. Return JSON array with fields: jobTitle, company, location, description, relevanceScore (0-100), skillBreakdown (array of {skill, matched, relevance}), coverLetterDraft (string), redFlags (array of strings). " # resumeContext # "\"}],\"max_tokens\":1200}";

    let _rawResponse = await OutCall.httpPostRequest(
      "https://api.openai.com/v1/chat/completions",
      [{ name = "Authorization"; value = "Bearer DEMO_KEY" }, { name = "Content-Type"; value = "application/json" }],
      prompt,
      transformJobs,
    );

    // Store mock job matches — raw AI response is stored in coverLetterDraft[0] summary for frontend parsing
    let now = Common.now();
    let mockMatches : [JobTypes.JobMatchPublic] = [
      {
        id = 0; owner = caller; resumeId = resumeId;
        jobTitle = "Software Engineer"; company = "TechCorp"; location = "Remote";
        description = "Build and maintain scalable web applications.";
        relevanceScore = 88;
        skillBreakdown = [
          { skill = "TypeScript"; matched = true; relevance = 90 },
          { skill = "React"; matched = true; relevance = 85 },
        ];
        coverLetterDraft = _rawResponse;
        redFlags = [];
        isSaved = false; matchedAt = now;
      },
      {
        id = 0; owner = caller; resumeId = resumeId;
        jobTitle = "Frontend Developer"; company = "InnovateCo"; location = "New York, NY";
        description = "Design and implement user interfaces.";
        relevanceScore = 75;
        skillBreakdown = [
          { skill = "React"; matched = true; relevance = 95 },
          { skill = "CSS"; matched = true; relevance = 80 },
        ];
        coverLetterDraft = "Cover letter for InnovateCo Frontend role.";
        redFlags = ["Requires 5+ years experience"];
        isSaved = false; matchedAt = now;
      },
      {
        id = 0; owner = caller; resumeId = resumeId;
        jobTitle = "Full Stack Developer"; company = "StartupXYZ"; location = "San Francisco, CA";
        description = "End-to-end feature development in a fast-paced startup.";
        relevanceScore = 68;
        skillBreakdown = [
          { skill = "Node.js"; matched = false; relevance = 60 },
          { skill = "TypeScript"; matched = true; relevance = 75 },
        ];
        coverLetterDraft = "Cover letter for StartupXYZ Full Stack role.";
        redFlags = ["Early-stage startup risk"];
        isSaved = false; matchedAt = now;
      },
    ];
    JobLib.storeJobMatches(_jobState, caller, resumeId, mockMatches);
  };

  public shared query ({ caller }) func getJobMatches() : async [JobTypes.JobMatchPublic] {
    JobLib.getJobMatches(_jobState, caller);
  };

  public shared ({ caller }) func saveJobMatch(matchId : Common.MatchId) : async Bool {
    JobLib.saveJobMatch(_jobState, caller, matchId);
  };

  public shared ({ caller }) func removeJobMatch(matchId : Common.MatchId) : async Bool {
    JobLib.removeJobMatch(_jobState, caller, matchId);
  };

  public shared query ({ caller }) func getMatchDetail(
    matchId : Common.MatchId,
  ) : async ?JobTypes.JobMatchPublic {
    JobLib.getMatchDetail(_jobState, caller, matchId);
  };
};
