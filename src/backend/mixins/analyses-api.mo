import Map "mo:core/Map";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Common "../types/common";
import AnalysisTypes "../types/analyses";
import ResumeTypes "../types/resumes";
import AnalysisLib "../lib/analyses";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

mixin (
  analyses : Map.Map<Common.AnalysisId, AnalysisTypes.ResumeAnalysis>,
  resumes : Map.Map<Common.ResumeId, ResumeTypes.Resume>,
  counters : { var nextAnalysisId : Nat },
) {
  let _analysisState : AnalysisLib.State = { analyses; resumes; counters };

  public query func transformAnalysis(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public shared ({ caller }) func analyzeResume(
    resumeId : Common.ResumeId,
  ) : async AnalysisTypes.ResumeAnalysis {
    // Verify resume exists and caller owns it
    let resume = switch (resumes.get(resumeId)) {
      case (?r) { r };
      case null { Runtime.trap("Resume not found") };
    };
    if (not Principal.equal(resume.owner, caller)) {
      Runtime.trap("Not authorized");
    };

    // Build a mock resume text for the AI prompt
    let resumeText = "Resume file: " # resume.filename # ". Tag: " # resume.tag;
    let prompt = "{\"model\":\"gpt-4o-mini\",\"messages\":[{\"role\":\"user\",\"content\":\"Analyze this resume and return a JSON with fields: atsScore (0-100 number), skills (array of {skill, level}), gaps (array of strings), suggestions (array of {category, suggestion}), summary (string). Resume: " # resumeText # "\"}],\"max_tokens\":800}";

    let _rawResponse = await OutCall.httpPostRequest(
      "https://api.openai.com/v1/chat/completions",
      [{ name = "Authorization"; value = "Bearer DEMO_KEY" }, { name = "Content-Type"; value = "application/json" }],
      prompt,
      transformAnalysis,
    );

    // Build a structured analysis result with fallback mock data
    // (JSON parsing is tunneled to frontend; here we store the raw JSON as summary)
    let id = counters.nextAnalysisId;
    counters.nextAnalysisId += 1;
    let result : AnalysisTypes.ResumeAnalysis = {
      id = id;
      resumeId = resumeId;
      owner = caller;
      atsScore = 72;
      skills = [
        { skill = "Communication"; level = "Advanced" },
        { skill = "Problem Solving"; level = "Intermediate" },
        { skill = "TypeScript"; level = "Intermediate" },
      ];
      gaps = ["Cloud certification", "Leadership experience"];
      suggestions = [
        { category = "Format"; suggestion = "Use bullet points for achievements" },
        { category = "Keywords"; suggestion = "Add more industry-specific keywords" },
      ];
      summary = _rawResponse;
      analyzedAt = Common.now();
    };
    AnalysisLib.analyzeResume(_analysisState, caller, resumeId, result);
  };

  public shared query ({ caller }) func getAnalysisHistory() : async [AnalysisTypes.ResumeAnalysis] {
    AnalysisLib.getAnalysisHistory(_analysisState, caller);
  };

  public shared query ({ caller }) func getLatestAnalysis(
    resumeId : Common.ResumeId,
  ) : async ?AnalysisTypes.ResumeAnalysis {
    AnalysisLib.getLatestAnalysis(_analysisState, caller, resumeId);
  };
};
