import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Common "../types/common";
import Types "../types/resumes";

module {
  public type State = {
    resumes : Map.Map<Common.ResumeId, Types.Resume>;
    counters : { var nextResumeId : Nat };
  };

  public func uploadResume(
    state : State,
    principal : Common.UserId,
    filename : Text,
    fileKey : Text,
    tag : Text,
  ) : Types.ResumePublic {
    let id = state.counters.nextResumeId;
    state.counters.nextResumeId += 1;
    let resume : Types.Resume = {
      id = id;
      owner = principal;
      filename = filename;
      fileKey = fileKey;
      var tag = tag;
      uploadedAt = Common.now();
      var isActive = false;
    };
    state.resumes.add(id, resume);
    toPublic(resume);
  };

  public func listResumes(
    state : State,
    principal : Common.UserId,
  ) : [Types.ResumePublic] {
    let results = state.resumes.values()
      |> _.filter(func(r : Types.Resume) : Bool { Principal.equal(r.owner, principal) })
      |> _.map(func(r : Types.Resume) : Types.ResumePublic { toPublic(r) })
      |> _.toArray();
    results;
  };

  public func deleteResume(
    state : State,
    principal : Common.UserId,
    resumeId : Common.ResumeId,
  ) : Bool {
    switch (state.resumes.get(resumeId)) {
      case (?resume) {
        if (Principal.equal(resume.owner, principal)) {
          state.resumes.remove(resumeId);
          true;
        } else { false };
      };
      case null { false };
    };
  };

  public func setActiveResume(
    state : State,
    principal : Common.UserId,
    resumeId : Common.ResumeId,
  ) : Bool {
    // Deactivate all owned resumes first
    state.resumes.forEach(func(_, r : Types.Resume) {
      if (Principal.equal(r.owner, principal)) {
        r.isActive := false;
      };
    });
    // Activate the target resume
    switch (state.resumes.get(resumeId)) {
      case (?resume) {
        if (Principal.equal(resume.owner, principal)) {
          resume.isActive := true;
          true;
        } else { false };
      };
      case null { false };
    };
  };

  public func toPublic(resume : Types.Resume) : Types.ResumePublic {
    {
      id = resume.id;
      owner = resume.owner;
      filename = resume.filename;
      fileKey = resume.fileKey;
      tag = resume.tag;
      uploadedAt = resume.uploadedAt;
      isActive = resume.isActive;
    };
  };
};
