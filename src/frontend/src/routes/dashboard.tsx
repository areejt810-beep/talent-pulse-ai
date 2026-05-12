import {
  useGetDashboardStats,
  useGetJobMatches,
  useGetProfile,
  useListResumes,
} from "@/api";
import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getMatchBg, getMatchColor } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Brain,
  Briefcase,
  CheckCircle2,
  Clock,
  FileText,
  MapPin,
  Search,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Upload,
  Zap,
} from "lucide-react";

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  bg,
  loading,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  bg: string;
  loading?: boolean;
}) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground mb-1.5 truncate">
              {label}
            </p>
            {loading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <p className="font-display text-2xl font-bold text-foreground leading-none">
                {value}
              </p>
            )}
          </div>
          <div
            className={`flex items-center justify-center w-9 h-9 rounded-lg shrink-0 ${bg}`}
          >
            <Icon className={`h-4 w-4 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ScorePill({ score }: { score: number }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-bold border ${getMatchBg(score)} ${getMatchColor(score)}`}
    >
      {score}%
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const { data: stats, isLoading: statsLoading } = useGetDashboardStats();
  const { data: resumes, isLoading: resumesLoading } = useListResumes();
  const { data: matches, isLoading: matchesLoading } = useGetJobMatches();

  const activeResume = resumes?.find((r) => r.isActive) ?? resumes?.[0] ?? null;
  const topMatches = matches
    ? [...matches]
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, 5)
    : [];

  const analysisCount = stats ? Number(stats.totalAnalyses) : 0;
  const totalResumes = stats ? Number(stats.totalResumes) : 0;
  const totalMatches = stats ? Number(stats.totalMatches) : 0;
  const avgScore = stats ? Number(stats.avgMatchScore) : 0;

  const statCards = [
    {
      label: "Total Resumes",
      value: totalResumes,
      icon: FileText,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Analyses Run",
      value: analysisCount,
      icon: Brain,
      color: "text-chart-5",
      bg: "bg-chart-5/10",
    },
    {
      label: "Avg Match Score",
      value: avgScore > 0 ? `${avgScore}%` : "—",
      icon: TrendingUp,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      label: "Job Matches",
      value: totalMatches,
      icon: Target,
      color: "text-chart-3",
      bg: "bg-chart-3/10",
    },
  ];

  const quickActions = [
    {
      to: "/resumes",
      icon: Upload,
      label: "Upload Resume",
      desc: "Add a new resume to your profile",
      color: "text-primary",
      bg: "bg-primary/10",
      ocid: "dashboard.upload_resume.button",
    },
    {
      to: "/resumes",
      icon: FileText,
      label: "View Resumes",
      desc: "Manage your uploaded resumes",
      color: "text-chart-5",
      bg: "bg-chart-5/10",
      ocid: "dashboard.view_resumes.button",
    },
    {
      to: "/matches",
      icon: Search,
      label: "Find Job Matches",
      desc: "Discover AI-powered job recommendations",
      color: "text-chart-3",
      bg: "bg-chart-3/10",
      ocid: "dashboard.find_matches.button",
    },
    {
      to: "/analysis",
      icon: Zap,
      label: "Run Analysis",
      desc: "Get deep AI resume insights",
      color: "text-accent",
      bg: "bg-accent/10",
      ocid: "dashboard.run_analysis.button",
    },
  ];

  const displayName =
    profile?.name || (profileLoading ? null : "Career Seeker");

  const careerFocus =
    profile?.careerFocus || (profileLoading ? null : "Software Engineering");

  const lastAnalyzedDate = null;

  return (
    <ProtectedRoute>
      <Layout>
        <div className="p-6 space-y-6 max-w-7xl" data-ocid="dashboard.page">
          {/* ── Welcome Banner ─────────────────────────────────────── */}
          <div
            className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-accent/5 p-5"
            data-ocid="dashboard.welcome.section"
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span className="text-xs font-mono text-accent uppercase tracking-widest">
                    AI Career Intelligence
                  </span>
                </div>
                {profileLoading ? (
                  <Skeleton className="h-8 w-56 mb-2" />
                ) : (
                  <h1 className="font-display text-2xl font-bold text-foreground">
                    Welcome back, {displayName}
                  </h1>
                )}
                {careerFocus && (
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5" />
                    Focused on{" "}
                    <span className="text-foreground font-medium">
                      {careerFocus}
                    </span>
                  </p>
                )}
              </div>
              <Link to="/analysis">
                <Button
                  data-ocid="dashboard.analyze.primary_button"
                  size="sm"
                  className="gap-2 shrink-0"
                >
                  <Brain className="h-4 w-4" />
                  Run Analysis
                </Button>
              </Link>
            </div>
          </div>

          {/* ── Stats Row ──────────────────────────────────────────── */}
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            data-ocid="dashboard.stats.section"
          >
            {statCards.map(({ label, value, icon, color, bg }) => (
              <StatCard
                key={label}
                label={label}
                value={value}
                icon={icon}
                color={color}
                bg={bg}
                loading={statsLoading}
              />
            ))}
          </div>

          {/* ── Active Resume + Recent Matches ─────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Active Resume Card */}
            <div
              className="lg:col-span-2"
              data-ocid="dashboard.active_resume.section"
            >
              <h2 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
                Active Resume
              </h2>
              {resumesLoading ? (
                <Card className="bg-card border-border">
                  <CardContent className="p-4 space-y-3">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-8 w-full" />
                  </CardContent>
                </Card>
              ) : activeResume ? (
                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 shrink-0">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className="text-sm font-medium text-foreground truncate"
                          title={activeResume.filename}
                        >
                          {activeResume.filename}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {activeResume.tag && (
                            <Badge
                              variant="outline"
                              className="text-[10px] h-4 px-1.5 border-primary/30 text-primary"
                            >
                              {activeResume.tag}
                            </Badge>
                          )}
                          {lastAnalyzedDate && (
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Analyzed {lastAnalyzedDate}
                            </span>
                          )}
                        </div>
                      </div>
                      <CheckCircle2 className="h-4 w-4 text-chart-3 shrink-0 mt-0.5" />
                    </div>
                    <Link to="/analysis">
                      <Button
                        size="sm"
                        className="w-full gap-2"
                        data-ocid="dashboard.quick_analyze.button"
                      >
                        <Zap className="h-3.5 w-3.5" />
                        Quick Analyze
                      </Button>
                    </Link>
                    <Link to="/resumes">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-2 text-muted-foreground hover:text-foreground"
                        data-ocid="dashboard.manage_resumes.button"
                      >
                        Manage Resumes
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <Card
                  className="bg-card border-border border-dashed"
                  data-ocid="dashboard.active_resume.empty_state"
                >
                  <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-muted">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        No Resume Yet
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Upload your first resume to get started
                      </p>
                    </div>
                    <Link to="/resumes">
                      <Button
                        size="sm"
                        className="gap-2"
                        data-ocid="dashboard.upload_first_resume.button"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        Upload Resume
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Recent Matches */}
            <div
              className="lg:col-span-3"
              data-ocid="dashboard.recent_matches.section"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  Top Job Matches
                </h2>
                <Link to="/matches">
                  <Button
                    variant="ghost"
                    size="sm"
                    data-ocid="dashboard.view_all_matches.button"
                    className="text-muted-foreground hover:text-foreground text-xs h-7"
                  >
                    View all <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </Link>
              </div>

              {matchesLoading ? (
                <Card className="bg-card border-border">
                  <div className="divide-y divide-border">
                    {[0, 1, 2, 3].map((skIdx) => (
                      <div
                        key={skIdx}
                        className="flex items-center gap-3 px-4 py-3"
                      >
                        <div className="flex-1 space-y-1.5">
                          <Skeleton className="h-3.5 w-40" />
                          <Skeleton className="h-3 w-28" />
                        </div>
                        <Skeleton className="h-5 w-12" />
                      </div>
                    ))}
                  </div>
                </Card>
              ) : topMatches.length === 0 ? (
                <Card
                  className="bg-card border-border border-dashed"
                  data-ocid="dashboard.matches.empty_state"
                >
                  <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-muted">
                      <Target className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        No Matches Found
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Analyze your resume to unlock AI job matches
                      </p>
                    </div>
                    <Link to="/analysis">
                      <Button
                        size="sm"
                        className="gap-2"
                        data-ocid="dashboard.find_matches_cta.button"
                      >
                        <Brain className="h-3.5 w-3.5" />
                        Run Analysis
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-card border-border">
                  <div className="divide-y divide-border">
                    {topMatches.map((match, i) => (
                      <Link
                        key={match.id.toString()}
                        to="/matches/$matchId"
                        params={{ matchId: match.id.toString() }}
                        data-ocid={`dashboard.match.item.${i + 1}`}
                      >
                        <div className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-smooth cursor-pointer">
                          {/* Rank */}
                          <span className="font-mono text-[10px] text-muted-foreground/50 w-4 shrink-0 text-center">
                            {i + 1}
                          </span>
                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {match.jobTitle}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs text-muted-foreground truncate">
                                {match.company}
                              </span>
                              {match.location && (
                                <>
                                  <span className="text-muted-foreground/30">
                                    ·
                                  </span>
                                  <span className="text-xs text-muted-foreground flex items-center gap-0.5 truncate">
                                    <MapPin className="h-2.5 w-2.5 shrink-0" />
                                    {match.location}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          {/* Score + saved */}
                          <div className="flex items-center gap-2 shrink-0">
                            {match.isSaved && (
                              <Star className="h-3 w-3 text-accent fill-accent" />
                            )}
                            <ScorePill score={match.relevanceScore} />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* ── Quick Actions ──────────────────────────────────────── */}
          <div data-ocid="dashboard.quick_actions.section">
            <h2 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {quickActions.map(
                ({ to, icon: Icon, label, desc, color, bg }, i) => (
                  <Link
                    key={to + label}
                    to={to}
                    data-ocid={`dashboard.quick_action.item.${i + 1}`}
                  >
                    <Card className="bg-card border-border hover:border-primary/30 hover:bg-muted/20 transition-smooth cursor-pointer h-full group">
                      <CardContent className="p-4">
                        <div
                          className={`flex items-center justify-center w-9 h-9 rounded-lg ${bg} mb-3`}
                        >
                          <Icon className={`h-4 w-4 ${color}`} />
                        </div>
                        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-smooth">
                          {label}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 leading-snug">
                          {desc}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ),
              )}
            </div>
          </div>

          {/* ── AI Insight Banner ──────────────────────────────────── */}
          <div
            className="rounded-xl border border-accent/20 bg-accent/5 p-4 flex items-start gap-3"
            data-ocid="dashboard.ai_insight.section"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/15 shrink-0">
              <Sparkles className="h-4 w-4 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">
                AI-Powered Matching
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Every analysis runs through our AI engine to surface the best
                opportunities. Your match score improves as you refine your
                resume and profile.
              </p>
            </div>
            <Link to="/analysis">
              <Button
                variant="ghost"
                size="sm"
                data-ocid="dashboard.ai_insight_cta.button"
                className="shrink-0 text-accent hover:text-accent hover:bg-accent/10"
              >
                Analyze Now <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
