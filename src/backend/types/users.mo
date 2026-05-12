import Common "common";

module {
  public type UserProfile = {
    id : Common.UserId;
    var name : Text;
    var careerFocus : Text;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  public type UserProfilePublic = {
    id : Common.UserId;
    name : Text;
    careerFocus : Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };
};
