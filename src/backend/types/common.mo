import Time "mo:core/Time";

module {
  public type UserId = Principal;
  public type Timestamp = Int;
  public type ResumeId = Nat;
  public type AnalysisId = Nat;
  public type MatchId = Nat;

  public func now() : Timestamp { Time.now() };
};
