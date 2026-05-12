import Map "mo:core/Map";
import Common "../types/common";
import ResumeTypes "../types/resumes";
import ResumeLib "../lib/resumes";

mixin (
  resumes : Map.Map<Common.ResumeId, ResumeTypes.Resume>,
  counters : { var nextResumeId : Nat },
) {
  let _resumeState : ResumeLib.State = { resumes; counters };

  public shared ({ caller }) func uploadResume(
    filename : Text,
    fileKey : Text,
    tag : Text,
  ) : async ResumeTypes.ResumePublic {
    ResumeLib.uploadResume(_resumeState, caller, filename, fileKey, tag);
  };

  public shared query ({ caller }) func listResumes() : async [ResumeTypes.ResumePublic] {
    ResumeLib.listResumes(_resumeState, caller);
  };

  public shared ({ caller }) func deleteResume(resumeId : Common.ResumeId) : async Bool {
    ResumeLib.deleteResume(_resumeState, caller, resumeId);
  };

  public shared ({ caller }) func setActiveResume(resumeId : Common.ResumeId) : async Bool {
    ResumeLib.setActiveResume(_resumeState, caller, resumeId);
  };
};
