import { useGetJobMatches, useRemoveJobMatch, useSaveJobMatch } from "@/api";
import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getMatchBg, getMatchColor } from "@/types";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Briefcase,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Mail,
  MapPin,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function formatPostedDate(matchedAt: bigint): string {
  const diffMs = Date.now() - Number(matchedAt) / 1_000_000;
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays === 0) return "Matched today";
  if (diffDays === 1) return "Matched yesterday";
  if (diffDays < 7) return `Matched ${diffDays} days ago`;
  if (diffDays < 30) return `Matched ${Math.floor(diffDays / 7)} weeks ago`;
  return `Matched ${Math.floor(diffDays / 30)} months ago`;
}

export default function MatchDetailPage() {
  const { matchId } = useParams({ strict: false }) as { matchId: string };
  const navigate = useNavigate();
  const { data: matches, isLoading } = useGetJobMatches();
  const saveMutation = useSaveJobMatch();
  const removeMutation = useRemoveJobMatch();

  const match = matches?.find((m) => m.id.toString() === matchId);
  const [coverLetterOpen, setCoverLetterOpen] = useState(false);

  const handleSave = () => {
    if (!match) return;
    saveMutation.mutate(match.id, {
      onSuccess: () => toast.success("Job saved to your list"),
      onError: () => toast.error("Failed to save job"),
    });
  };

  const handleRemove = () => {
    if (!match) return;
    removeMutation.mutate(match.id, {
      onSuccess: () => toast.success("Job removed from saved list"),
      onError: () => toast.error("Failed to remove job"),
    });
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="p-6 space-y-5 max-w-3xl" data-ocid="match-detail.page">
          {/* Back */}
          <button
            type="button"
            onClick={() => navigate({ to: "/matches" })}
            data-ocid="match-detail.back_button"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Job Matches
          </button>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <LoadingSpinner />
            </div>
          ) : !match ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-center"
              data-ocid="match-detail.empty_state"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                Match not found
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs mb-6">
                This job match may have been removed or the link is invalid.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate({ to: "/matches" })}
                data-ocid="match-detail.back.button"
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                View All Matches
              </Button>
            </div>
          ) : (
            <>
              {/* Hero card */}
              <Card
                className="bg-card border-border"
                data-ocid="match-detail.card"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h1 className="font-display text-xl font-bold text-foreground">
                        {match.jobTitle}
                      </h1>
                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Briefcase className="h-3.5 w-3.5" />
                          <span className="text-sm font-medium">
                            {match.company}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          <span className="text-sm">{match.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <CalendarDays className="h-3.5 w-3.5" />
                          <span className="text-sm">
                            {formatPostedDate(match.matchedAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-mono font-bold ${getMatchBg(
                          match.relevanceScore,
                        )} ${getMatchColor(match.relevanceScore)}`}
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        {match.relevanceScore}% Match
                      </div>
                      <button
                        type="button"
                        onClick={match.isSaved ? handleRemove : handleSave}
                        data-ocid={
                          match.isSaved
                            ? "match-detail.unsave.button"
                            : "match-detail.save.button"
                        }
                        aria-label={
                          match.isSaved ? "Remove bookmark" : "Save job"
                        }
                        className={`p-2 rounded-lg border transition-smooth ${
                          match.isSaved
                            ? "text-accent border-accent/30 bg-accent/10 hover:bg-accent/20"
                            : "text-muted-foreground border-border hover:text-accent hover:border-accent/30"
                        }`}
                      >
                        {match.isSaved ? (
                          <BookmarkCheck className="h-4 w-4" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-5 pt-0">
                  {/* Description */}
                  <div>
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                      Role Overview
                    </h2>
                    <p className="text-sm text-foreground leading-relaxed">
                      {match.description}
                    </p>
                  </div>

                  {/* Required Skills */}
                  {match.skillBreakdown && match.skillBreakdown.length > 0 && (
                    <div>
                      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                        Required Skills
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {match.skillBreakdown.map((sm) => (
                          <Badge
                            key={sm.skill}
                            variant="secondary"
                            className="text-xs px-2.5 py-1"
                          >
                            {sm.skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skill Match Breakdown */}
                  {match.skillBreakdown && match.skillBreakdown.length > 0 && (
                    <div>
                      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                        Skill Match Breakdown
                      </h2>
                      <div className="space-y-2.5">
                        {match.skillBreakdown.map((sm) => {
                          const pct = Number(sm.relevance);
                          return (
                            <div
                              key={sm.skill}
                              className="flex items-center gap-3"
                            >
                              <span className="text-xs text-foreground w-28 truncate shrink-0">
                                {sm.skill}
                              </span>
                              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all ${getMatchColor(pct).replace("text-", "bg-")}`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <span
                                className={`text-xs font-mono font-bold w-10 text-right ${getMatchColor(pct)}`}
                              >
                                {pct}%
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* AI Insight card */}
              <Card
                className="bg-accent/5 border-accent/20"
                data-ocid="match-detail.insight.card"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-accent/15 shrink-0">
                      <TrendingUp className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-1">
                        AI Match Insight
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Your profile aligns{" "}
                        <span
                          className={`font-semibold ${getMatchColor(match.relevanceScore)}`}
                        >
                          {match.relevanceScore >= 85
                            ? "exceptionally well"
                            : match.relevanceScore >= 70
                              ? "well"
                              : "moderately"}
                        </span>{" "}
                        with this role.
                        {match.relevanceScore < 80 &&
                          " Consider upskilling in the requirements to improve your match."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Red Flags */}
              {match.redFlags && match.redFlags.length > 0 && (
                <Card
                  className="bg-destructive/5 border-destructive/20"
                  data-ocid="match-detail.red_flags.card"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-destructive/10 shrink-0">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      </div>
                      <p className="text-xs font-semibold text-destructive pt-2">
                        Red Flags
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      {match.redFlags.map((flag, i) => (
                        <div
                          key={flag}
                          data-ocid={`match-detail.red_flag.item.${i + 1}`}
                          className="flex items-start gap-2"
                        >
                          <AlertTriangle className="h-3 w-3 text-destructive mt-0.5 shrink-0" />
                          <p className="text-xs text-foreground">{flag}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Cover Letter */}
              {match.coverLetterDraft && (
                <Collapsible
                  open={coverLetterOpen}
                  onOpenChange={setCoverLetterOpen}
                >
                  <Card
                    className="bg-card border-border"
                    data-ocid="match-detail.cover_letter.card"
                  >
                    <CardContent className="p-0">
                      <CollapsibleTrigger asChild>
                        <button
                          type="button"
                          className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/30 transition-smooth rounded-t-lg"
                          data-ocid="match-detail.cover_letter.toggle"
                        >
                          <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                            <Mail className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-foreground">
                              AI Cover Letter Draft
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Personalized for this role
                            </p>
                          </div>
                          {coverLetterOpen ? (
                            <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                          )}
                        </button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="px-4 pb-4 pt-0 border-t border-border">
                          <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap font-mono bg-muted/30 rounded-lg p-3 mt-3">
                            {match.coverLetterDraft}
                          </p>
                        </div>
                      </CollapsibleContent>
                    </CardContent>
                  </Card>
                </Collapsible>
              )}

              {/* Actions */}
              <div
                className="flex items-center gap-3"
                data-ocid="match-detail.actions"
              >
                <Button
                  type="button"
                  onClick={match.isSaved ? handleRemove : handleSave}
                  disabled={saveMutation.isPending || removeMutation.isPending}
                  data-ocid="match-detail.save.primary_button"
                  variant={match.isSaved ? "outline" : "default"}
                  className="gap-2"
                >
                  {match.isSaved ? (
                    <>
                      <BookmarkCheck className="h-4 w-4" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-4 w-4" />
                      Save Job
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate({ to: "/matches" })}
                  data-ocid="match-detail.all_matches.button"
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  All Matches
                </Button>
              </div>
            </>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
