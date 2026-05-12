import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Common "../types/common";
import Types "../types/users";

module {
  public type State = {
    users : Map.Map<Common.UserId, Types.UserProfile>;
  };

  public func createUser(
    state : State,
    principal : Common.UserId,
    name : Text,
    careerFocus : Text,
  ) : Types.UserProfilePublic {
    switch (state.users.get(principal)) {
      case (?existing) { toPublic(existing) };
      case null {
        let profile : Types.UserProfile = {
          id = principal;
          var name = name;
          var careerFocus = careerFocus;
          createdAt = Common.now();
          var updatedAt = Common.now();
        };
        state.users.add(principal, profile);
        toPublic(profile);
      };
    };
  };

  public func getUserProfile(
    state : State,
    principal : Common.UserId,
  ) : ?Types.UserProfilePublic {
    switch (state.users.get(principal)) {
      case (?profile) { ?toPublic(profile) };
      case null { null };
    };
  };

  public func updateUserProfile(
    state : State,
    principal : Common.UserId,
    name : Text,
    careerFocus : Text,
  ) : Types.UserProfilePublic {
    switch (state.users.get(principal)) {
      case (?profile) {
        profile.name := name;
        profile.careerFocus := careerFocus;
        profile.updatedAt := Common.now();
        toPublic(profile);
      };
      case null { Runtime.trap("Profile not found") };
    };
  };

  public func toPublic(profile : Types.UserProfile) : Types.UserProfilePublic {
    {
      id = profile.id;
      name = profile.name;
      careerFocus = profile.careerFocus;
      createdAt = profile.createdAt;
      updatedAt = profile.updatedAt;
    };
  };
};
