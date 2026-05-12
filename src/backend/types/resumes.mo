import Common "common";

module {
  public type Resume = {
    id : Common.ResumeId;
    owner : Common.UserId;
    filename : Text;
    fileKey : Text;
    var tag : Text;
    uploadedAt : Common.Timestamp;
    var isActive : Bool;
  };

  public type ResumePublic = {
    id : Common.ResumeId;
    owner : Common.UserId;
    filename : Text;
    fileKey : Text;
    tag : Text;
    uploadedAt : Common.Timestamp;
    isActive : Bool;
  };
};
