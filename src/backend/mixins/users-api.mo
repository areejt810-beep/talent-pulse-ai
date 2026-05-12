import Map "mo:core/Map";
import Common "../types/common";
import UserTypes "../types/users";
import UserLib "../lib/users";

mixin (users : Map.Map<Common.UserId, UserTypes.UserProfile>) {
  let _userState : UserLib.State = { users };

  public shared ({ caller }) func createProfile(
    name : Text,
    careerFocus : Text,
  ) : async UserTypes.UserProfilePublic {
    UserLib.createUser(_userState, caller, name, careerFocus);
  };

  public shared query ({ caller }) func getProfile() : async ?UserTypes.UserProfilePublic {
    UserLib.getUserProfile(_userState, caller);
  };

  public shared ({ caller }) func updateProfile(
    name : Text,
    careerFocus : Text,
  ) : async UserTypes.UserProfilePublic {
    UserLib.updateUserProfile(_userState, caller, name, careerFocus);
  };
};
