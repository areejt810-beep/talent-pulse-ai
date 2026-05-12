import {
  useAnalyzeResume,
  useGetAnalysisHistory,
  useGetLatestAnalysis,
  useListResumes,
} from "@/api";
import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ResumeAnalysis } from "@/types";
import { useRouter } from "@tanstack/react-router";
import {
  AlertCircle,
  AlertTriangle,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  Info,
  Lightbulb,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Sample / fallback data ────────────────────────────────────────────────

const SAMPLE_ANALYSIS: ResumeAnalysis = {
  resumeId: BigInt(1),
  overallScore: 87,
  summary:
    "Strong senior frontend profile with 8+ years React expertise. AI detected 94% alignment with current market demand for TypeScript and modern React patterns. Minor gaps in system design documentation.",
  strengths: [
    "Exceptional React & TypeScript proficiency",
    "Strong performance optimization track record",
    "Open source contributions (2.4k GitHub stars)",
    "Cross-functional team leadership experience",
  ],
  weaknesses: [
    "Limited system design case studies",
    "No explicit mention of CI/CD pipelines",
    "Missing quantified performance improvements",
  ],
  skills: [
    { name: "React", level: "Expert", yearsOfExperience: 8 },
    { name: "TypeScript", level: "Expert", yearsOfExperience: 6 },
    { name: "Node.js", level: "Advanced", yearsOfExperience: 5 },
    { name: "GraphQL", level: "Intermediate", yearsOfExperience: 3 },
    { name: "AWS", level: "Intermediate", yearsOfExperience: 4 },
    { name: "Docker", level: "Beginner", yearsOfExperience: 1 },
  ],
  recommendations: [
    "Add 3-4 system design case studies from past projects",
    "Quantify your performance improvements with metrics",
    "Highlight CI/CD experience in the skills section",
    'Consider adding a dedicated "Impact" section',
  ],
  analyzedAt: BigInt(Date.now() - 3600000),
};

const HISTORY_SAMPLE: Array<ResumeAnalysis & { label: string }> = [
  {
    ...SAMPLE_ANALYSIS,
    overallScore: 87,
    analyzedAt: BigInt(Date.now() - 3600000),
    label: "v3 — Latest",
  },
  {
    ...SAMPLE_ANALYSIS,
    overallScore: 74,
    analyzedAt: BigInt(Date.now() - 86400000),
    label: "v2",
  },
  {
    ...SAMPLE_ANALYSIS,
    overallScore: 61,
    analyzedAt: BigInt(Date.now() - 172800000),
    label: "v1",
  },
];

const SKILLS_GAP = [
  {
    skill: "System Design",
    importance: "critical" as const,
    reason: "Required in 89% of senior roles",
  },
  {
    skill: "CI/CD (GitHub Actions)",
    importance: "critical" as const,
    reason: "DevOps integration expected",
  },
  {
    skill: "Kubernetes",
    importance: "important" as const,
    reason: "Cloud-native deployments trend",
  },
  {
    skill: "Testing (Jest / RTL)",
    importance: "important" as const,
    reason: "Quality signal for employers",
  },
  {
    skill: "Micro-frontends",
    importance: "nice-to-have" as const,
    reason: "Emerging architecture pattern",
  },
  {
    skill: "Web Performance APIs",
    importance: "nice-to-have" as const,
    reason: "Differentiates senior candidates",
  },
];

const SUGGESTIONS = [
  {
    id: 1,
    category: "Formatting",
    title: "Improve ATS keyword density",
    description:
      "Your resume lacks critical keywords that ATS systems scan for in senior frontend roles.",
    before: "Built and maintained web applications using modern technologies.",
    after:
      "Architected and delivered 5+ React + TypeScript SPAs serving 200k+ monthly users, improving Core Web Vitals by 40%.",
  },
  {
    id: 2,
    category: "Structure",
    title: "Add quantified impact metrics",
    description:
      "Hiring managers and AI screeners weigh quantified achievements 3× more than generic descriptions.",
    before: "Reduced load times significantly in the main product.",
    after:
      "Reduced initial bundle size by 62% (4.2 MB → 1.6 MB) via code-splitting and tree-shaking, cutting LCP from 4.8s to 1.9s.",
  },
  {
    id: 3,
    category: "Keywords",
    title: "Align skills to job description language",
    description:
      "Recruiters search exact terms. Replace generic labels with industry-standard terminology.",
    before: "Experience with cloud services and container technology.",
    after:
      "AWS (ECS, Lambda, S3), Docker, Terraform IaC — 3 years production experience.",
  },
  {
    id: 4,
    category: "Content",
    title: "Surface open source contributions",
    description:
      "Your GitHub contributions signal expertise but are not visible in the current resume.",
    before: "Contributed to several open-source projects.",
    after:
      "Maintainer of react-virtual-list (2.4k ★) — 12 releases, 40+ contributors; merged into Tanstack Virtual roadmap.",
  },
];

// ─── Sub-components ─────────────────────────────────────────────────────────

function AtsGauge({ score }: { score: number }) {
  const r = 52;
  const cx = 64;
  const cy = 64;
  const circumference = 2 * Math.PI * r;
  // Arc covers 270 degrees (from 225° to 135°)
  const arcLen = circumference * 0.75;
  const filled = arcLen * (score / 100);
  const _rotation = 135; // start angle

  const color =
    score >= 70
      ? score >= 85
        ? "oklch(var(--accent))"
        : "oklch(var(--chart-3))"
      : score >= 50
        ? "oklch(var(--chart-4))"
        : "oklch(var(--destructive))";

  const textColor =
    score >= 70
      ? score >= 85
        ? "text-accent"
        : "text-chart-3"
      : score >= 50
        ? "text-chart-4"
        : "text-destructive";

  const label =
    score >= 85
      ? "Excellent"
      : score >= 70
        ? "Good"
        : score >= 50
          ? "Fair"
          : "Needs Work";

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-32 h-32">
        <svg
          viewBox="0 0 128 128"
          className="w-full h-full -rotate-[135deg]"
          aria-label={`Score: ${score}%`}
          role="img"
        >
          {/* Track */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="oklch(var(--border))"
            strokeWidth="10"
            strokeDasharray={`${arcLen} ${circumference}`}
            strokeLinecap="round"
          />
          {/* Fill */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={`${filled} ${circumference}`}
            strokeLinecap="round"
            style={{
              transition: "stroke-dasharray 0.8s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`font-display text-3xl font-bold leading-none ${textColor}`}
          >
            {score}
          </span>
          <span className="text-xs text-muted-foreground font-mono">/100</span>
        </div>
      </div>
      <span
        className={`text-xs font-semibold uppercase tracking-wider ${textColor}`}
      >
        {label}
      </span>
      <span className="text-[10px] text-muted-foreground">ATS Score</span>
    </div>
  );
}

const importanceMeta = {
  critical: {
    label: "Critical",
    icon: AlertCircle,
    cls: "text-destructive border-destructive/40 bg-destructive/10",
  },
  important: {
    label: "Important",
    icon: AlertTriangle,
    cls: "text-chart-4 border-chart-4/40 bg-chart-4/10",
  },
  "nice-to-have": {
    label: "Nice to Have",
    icon: Info,
    cls: "text-muted-foreground border-border bg-muted/30",
  },
};

function SkillsGapSection() {
  return (
    <Card
      className="bg-card border-border"
      data-ocid="analysis.skills_gap.card"
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <TrendingDown className="h-3.5 w-3.5 text-destructive" />
          Skills Gap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {SKILLS_GAP.map((item, i) => {
            const meta = importanceMeta[item.importance];
            const Icon = meta.icon;
            return (
              <div
                key={item.skill}
                data-ocid={`analysis.skill_gap.item.${i + 1}`}
                className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0"
              >
                <Icon
                  className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${meta.cls.split(" ")[0]}`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {item.skill}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.reason}</p>
                </div>
                <Badge
                  variant="outline"
                  className={`text-[10px] shrink-0 ${meta.cls}`}
                >
                  {meta.label}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function SuggestionCard({
  s,
  index,
}: { s: (typeof SUGGESTIONS)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const categoryColor: Record<string, string> = {
    Formatting: "text-primary border-primary/30 bg-primary/10",
    Structure: "text-accent border-accent/30 bg-accent/10",
    Keywords: "text-chart-5 border-chart-5/30 bg-chart-5/10",
    Content: "text-chart-3 border-chart-3/30 bg-chart-3/10",
  };
  const cls =
    categoryColor[s.category] ??
    "text-muted-foreground border-border bg-muted/30";

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button
          type="button"
          data-ocid={`analysis.suggestion.item.${index + 1}`}
          className="w-full flex items-start gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-smooth text-left"
        >
          <Lightbulb className="h-4 w-4 text-accent mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className={`text-[10px] ${cls}`}>
                {s.category}
              </Badge>
              <span className="text-sm font-medium text-foreground">
                {s.title}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
              {s.description}
            </p>
          </div>
          {open ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
          )}
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 mx-0.5 rounded-lg border border-border overflow-hidden">
          <div className="p-3 bg-destructive/5 border-b border-border">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
              Before
            </p>
            <p className="text-xs text-foreground font-mono leading-relaxed">
              {s.before}
            </p>
          </div>
          <div className="p-3 bg-accent/5">
            <p className="text-[10px] font-semibold text-accent uppercase tracking-wider mb-1.5">
              After (AI Suggested)
            </p>
            <p className="text-xs text-foreground font-mono leading-relaxed">
              {s.after}
            </p>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function HistoryItem({
  analysis,
  index,
  isSelected,
  onClick,
}: {
  analysis: ResumeAnalysis;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  const date = new Date(Number(analysis.analyzedAt)).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );
  const timeAgo = (() => {
    const diffMs = Date.now() - Number(analysis.analyzedAt);
    const h = Math.floor(diffMs / 3600000);
    const d = Math.floor(diffMs / 86400000);
    if (h < 1) return "just now";
    if (h < 24) return `${h}h ago`;
    return `${d}d ago`;
  })();
  const scoreColor =
    analysis.overallScore >= 85
      ? "text-accent"
      : analysis.overallScore >= 70
        ? "text-chart-3"
        : analysis.overallScore >= 50
          ? "text-chart-4"
          : "text-destructive";
  const scoreBg =
    analysis.overallScore >= 85
      ? "bg-accent/10 border-accent/30"
      : analysis.overallScore >= 70
        ? "bg-chart-3/10 border-chart-3/30"
        : analysis.overallScore >= 50
          ? "bg-chart-4/10 border-chart-4/30"
          : "bg-destructive/10 border-destructive/30";

  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={`analysis.history.item.${index + 1}`}
      className={`w-full flex items-center gap-3 p-2.5 rounded-lg border transition-smooth text-left ${
        isSelected
          ? "border-accent/50 bg-accent/5"
          : "border-border bg-card hover:bg-muted/30"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 ${scoreBg}`}
      >
        <span className={`font-display text-sm font-bold ${scoreColor}`}>
          {analysis.overallScore}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{date}</p>
        <p className="text-xs text-muted-foreground">{timeAgo}</p>
      </div>
      {isSelected && (
        <ChevronRight className="h-3.5 w-3.5 text-accent shrink-0" />
      )}
    </button>
  );
}

function EmptyState({
  onAnalyze,
  isPending,
}: { onAnalyze: () => void; isPending: boolean }) {
  const router = useRouter();
  return (
    <div
      className="flex flex-col items-center justify-center py-20 gap-6"
      data-ocid="analysis.empty_state"
    >
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
          <Brain className="h-10 w-10 text-accent" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      <div className="text-center max-w-sm">
        <h3 className="font-display text-xl font-semibold text-foreground">
          No Analysis Yet
        </h3>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Upload your resume and run an AI analysis to get your ATS score,
          skills gap report, and personalized improvement suggestions.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          type="button"
          variant="outline"
          className="gap-2"
          data-ocid="analysis.empty.upload_button"
          onClick={() => router.navigate({ to: "/resumes" })}
        >
          <FileText className="h-4 w-4" />
          Upload Resume
        </Button>
        <Button
          type="button"
          onClick={onAnalyze}
          disabled={isPending}
          className="gap-2"
          data-ocid="analysis.empty.run_button"
        >
          {isPending ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          Run AI Analysis
        </Button>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function AnalysisPage() {
  const { data: analyses, isLoading } = useGetAnalysisHistory();
  const { data: resumes } = useListResumes();
  const analyzeMutation = useAnalyzeResume();

  const activeResume = resumes?.find((r) => r.isActive);

  // For history navigation
  const allAnalyses =
    analyses && analyses.length > 0 ? analyses : HISTORY_SAMPLE;
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selectedAnalysis: ResumeAnalysis =
    allAnalyses[selectedIdx] ?? SAMPLE_ANALYSIS;

  // latest analysis query (for real backend)
  useGetLatestAnalysis(activeResume?.id ?? null);

  const hasRealData = analyses && analyses.length > 0;

  const handleAnalyze = () => {
    if (!activeResume) {
      toast.error("Please set an active resume first");
      return;
    }
    analyzeMutation.mutate(activeResume.id, {
      onSuccess: () => toast.success("Analysis complete! AI insights ready."),
      onError: () => toast.error("Analysis failed. Please try again."),
    });
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="p-6 space-y-6" data-ocid="analysis.page">
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                AI Analysis
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Deep resume insights powered by AI
              </p>
            </div>
            <Button
              type="button"
              onClick={handleAnalyze}
              disabled={analyzeMutation.isPending}
              data-ocid="analysis.run.primary_button"
              className="gap-2"
            >
              {analyzeMutation.isPending ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Run Analysis
                </>
              )}
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : !hasRealData && !analyses ? (
            // True empty state (no data at all, not even sample)
            <EmptyState
              onAnalyze={handleAnalyze}
              isPending={analyzeMutation.isPending}
            />
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-[220px_1fr] gap-6">
              {/* ── Left: History Sidebar ─────────────────────────────── */}
              <div
                data-ocid="analysis.history.section"
                className="flex flex-col gap-3"
              >
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> History
                </p>
                <ScrollArea className="max-h-[600px] pr-2">
                  <div className="space-y-1.5">
                    {allAnalyses.map((a, i) => (
                      <HistoryItem
                        key={`${a.resumeId.toString()}-${a.analyzedAt.toString()}`}
                        analysis={a}
                        index={i}
                        isSelected={selectedIdx === i}
                        onClick={() => setSelectedIdx(i)}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* ── Right: Analysis Detail ────────────────────────────── */}
              <div className="space-y-6">
                {/* AI Banner */}
                <div
                  className="rounded-lg border border-accent/30 bg-accent/5 p-4 flex items-start gap-3"
                  data-ocid="analysis.ai_banner.section"
                >
                  <Brain className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      AI-Powered Analysis
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {selectedAnalysis.summary}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="shrink-0 text-accent border-accent/40 font-mono text-xs"
                  >
                    {selectedAnalysis.overallScore}%
                  </Badge>
                </div>

                {/* ── Row 1: ATS Score + Skill Details + Recommendations */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* ATS Score Gauge */}
                  <Card
                    className="bg-card border-border"
                    data-ocid="analysis.score.card"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        ATS Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4 pb-4">
                      <AtsGauge score={selectedAnalysis.overallScore} />
                      <div className="w-full space-y-2">
                        {[
                          {
                            label: "Skills Match",
                            value: Math.min(
                              100,
                              selectedAnalysis.overallScore + 5,
                            ),
                          },
                          {
                            label: "Experience",
                            value: Math.min(
                              100,
                              selectedAnalysis.overallScore - 2,
                            ),
                          },
                          {
                            label: "Presentation",
                            value: Math.max(
                              0,
                              selectedAnalysis.overallScore - 10,
                            ),
                          },
                        ].map(({ label, value }) => (
                          <div key={label} className="flex items-center gap-2">
                            <span className="text-[11px] text-muted-foreground w-24 shrink-0">
                              {label}
                            </span>
                            <Progress value={value} className="flex-1 h-1.5" />
                            <span className="text-[11px] font-mono text-foreground w-8 text-right">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Detected Skills */}
                  <Card
                    className="bg-card border-border"
                    data-ocid="analysis.skills.card"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Zap className="h-3.5 w-3.5 text-accent" />
                        Detected Skills
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1.5">
                        {selectedAnalysis.skills.map((skill, i) => {
                          const levelStyles: Record<string, string> = {
                            Expert: "bg-accent/15 text-accent border-accent/30",
                            Advanced:
                              "bg-primary/15 text-primary border-primary/30",
                            Intermediate:
                              "bg-chart-3/15 text-chart-3 border-chart-3/30",
                            Beginner:
                              "bg-muted text-muted-foreground border-border",
                          };
                          const cls =
                            levelStyles[skill.level] ??
                            "bg-muted text-muted-foreground border-border";
                          return (
                            <div
                              key={skill.name}
                              data-ocid={`analysis.skill.item.${i + 1}`}
                              className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0"
                            >
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">
                                  {skill.name}
                                </p>
                                <p className="text-[11px] text-muted-foreground">
                                  {skill.yearsOfExperience}y exp
                                </p>
                              </div>
                              <Badge
                                variant="outline"
                                className={`text-[10px] shrink-0 ${cls}`}
                              >
                                {skill.level}
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI Recommendations */}
                  <Card
                    className="bg-card border-border"
                    data-ocid="analysis.recommendations.card"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Lightbulb className="h-3.5 w-3.5 text-accent" />
                        AI Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedAnalysis.recommendations.map((rec, i) => (
                          <div
                            key={rec}
                            data-ocid={`analysis.recommendation.item.${i + 1}`}
                            className="flex items-start gap-2 py-1.5 border-b border-border/50 last:border-0"
                          >
                            <Sparkles className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {rec}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* ── Row 2: Strengths + Weaknesses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card
                    className="bg-card border-border"
                    data-ocid="analysis.strengths.card"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <TrendingUp className="h-3.5 w-3.5 text-chart-3" />
                        Strengths
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedAnalysis.strengths.map((s, i) => (
                          <div
                            key={s}
                            data-ocid={`analysis.strength.item.${i + 1}`}
                            className="flex items-start gap-2"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-chart-3 mt-0.5 shrink-0" />
                            <p className="text-sm text-foreground">{s}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className="bg-card border-border"
                    data-ocid="analysis.weaknesses.card"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <TrendingDown className="h-3.5 w-3.5 text-destructive" />
                        Areas to Improve
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedAnalysis.weaknesses.map((w, i) => (
                          <div
                            key={w}
                            data-ocid={`analysis.weakness.item.${i + 1}`}
                            className="flex items-start gap-2"
                          >
                            <AlertCircle className="h-3.5 w-3.5 text-destructive mt-0.5 shrink-0" />
                            <p className="text-sm text-foreground">{w}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* ── Row 3: Skills Gap */}
                <SkillsGapSection />

                {/* ── Row 4: Improvement Suggestions */}
                <Card
                  className="bg-card border-border"
                  data-ocid="analysis.suggestions.card"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Brain className="h-3.5 w-3.5 text-accent" />
                      Improvement Suggestions
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {SUGGESTIONS.length} items
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {SUGGESTIONS.map((s, i) => (
                        <SuggestionCard key={s.id} s={s} index={i} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
