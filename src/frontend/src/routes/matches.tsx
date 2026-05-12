import {
  useFindJobMatches,
  useGetJobMatches,
  useListResumes,
  useRemoveJobMatch,
  useSaveJobMatch,
} from "@/api";
import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type JobMatch, getMatchBg, getMatchColor } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  Bookmark,
  BookmarkCheck,
  Briefcase,
  CalendarDays,
  ChevronDown,
  MapPin,
  Search,
  Sparkles,
  Target,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SAMPLE_MATCHES: JobMatch[] = [
  {
    id: BigInt(1),
    jobTitle: "Senior Frontend Engineer",
    company: "Stripe",
    location: "Remote",
    relevanceScore: 94,
    description:
      "Join Stripe's payments infrastructure team. Build world-class React applications powering global commerce. Strong TypeScript and GraphQL experience required.",
    skillBreakdown: [],
    isSaved: true,
    matchedAt: BigInt(Date.now() - 86400000 * 2),
    coverLetterDraft: "",
    redFlags: [],
    resumeId: BigInt(0),
  },
  {
    id: BigInt(2),
    jobTitle: "React Engineer",
    company: "Vercel",
    location: "Remote",
    relevanceScore: 91,
    description:
      "Shape the future of the web at Vercel. Work on Next.js, our Edge Network, and developer experience tools used by millions.",
    skillBreakdown: [],
    isSaved: false,
    matchedAt: BigInt(Date.now() - 86400000),
    coverLetterDraft: "",
    redFlags: [],
    resumeId: BigInt(0),
  },
  {
    id: BigInt(3),
    jobTitle: "Full Stack Developer",
    company: "Linear",
    location: "San Francisco, CA",
    relevanceScore: 88,
    description:
      "Build the software development tools that engineers love. Work across the full stack in a high-performance team known for exceptional UX.",
    skillBreakdown: [],
    isSaved: false,
    matchedAt: BigInt(Date.now() - 86400000 * 3),
    coverLetterDraft: "",
    redFlags: [],
    resumeId: BigInt(0),
  },
  {
    id: BigInt(4),
    jobTitle: "Software Engineer II",
    company: "Figma",
    location: "New York, NY",
    relevanceScore: 76,
    description:
      "Build collaborative design tools that millions of designers rely on. Focus on performance and real-time collaboration features.",
    skillBreakdown: [],
    isSaved: true,
    matchedAt: BigInt(Date.now() - 86400000 * 4),
    coverLetterDraft: "",
    redFlags: [],
    resumeId: BigInt(0),
  },
  {
    id: BigInt(5),
    jobTitle: "Frontend Lead",
    company: "Notion",
    location: "Remote",
    relevanceScore: 85,
    description:
      "Lead frontend architecture of Notion's editor and database products. Drive technical vision for a global team building productivity tools.",
    skillBreakdown: [],
    isSaved: false,
    matchedAt: BigInt(Date.now() - 86400000 * 5),
    coverLetterDraft: "",
    redFlags: [],
    resumeId: BigInt(0),
  },
  {
    id: BigInt(6),
    jobTitle: "Staff Engineer, Platform",
    company: "Shopify",
    location: "Remote",
    relevanceScore: 62,
    description:
      "Define the technical direction of Shopify's storefront platform. Partner with product and design to build the next generation of commerce infrastructure.",
    skillBreakdown: [],
    isSaved: false,
    matchedAt: BigInt(Date.now() - 86400000 * 7),
    coverLetterDraft: "",
    redFlags: [],
    resumeId: BigInt(0),
  },
];

type ScoreFilter = "all" | "80" | "70" | "50";
type SortBy = "relevance" | "newest" | "salary";

function formatPostedDate(postedAt: bigint): string {
  const diffMs = Date.now() - Number(postedAt) / 1_000_000;
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

function MatchCard({
  match,
  onSave,
  onRemove,
  index,
  onClick,
}: {
  match: JobMatch;
  onSave: (id: bigint) => void;
  onRemove: (id: bigint) => void;
  index: number;
  onClick: (id: bigint) => void;
}) {
  return (
    <Card
      data-ocid={`matches.item.${index}`}
      className="bg-card border-border transition-smooth cursor-pointer hover:border-accent/50 hover:shadow-md group"
      onClick={() => onClick(match.id)}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                {match.jobTitle}
              </h3>
              <div
                className={`flex items-center gap-1 px-2 py-0.5 rounded border text-xs font-mono font-bold ${getMatchBg(match.relevanceScore)} ${getMatchColor(match.relevanceScore)}`}
              >
                <Sparkles className="h-2.5 w-2.5" />
                {match.relevanceScore}%
              </div>
            </div>
            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Briefcase className="h-3 w-3" />
                <span className="text-xs">{match.company}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span className="text-xs">{match.location}</span>
              </div>
              {true && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <CalendarDays className="h-3 w-3" />
                  <span className="text-xs">
                    {formatPostedDate(match.matchedAt)}
                  </span>
                </div>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              match.isSaved ? onRemove(match.id) : onSave(match.id);
            }}
            data-ocid={
              match.isSaved
                ? `matches.unsave.button.${index}`
                : `matches.save.button.${index}`
            }
            aria-label={match.isSaved ? "Remove bookmark" : "Save job"}
            className={`p-1.5 rounded-md transition-smooth shrink-0 ${
              match.isSaved
                ? "text-accent hover:text-accent/70"
                : "text-muted-foreground hover:text-accent"
            }`}
          >
            {match.isSaved ? (
              <BookmarkCheck className="h-4 w-4" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </button>
        </div>

        <p className="text-xs text-muted-foreground mt-3 line-clamp-2">
          {match.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {match.skillBreakdown.slice(0, 4).map((sm) => (
            <Badge key={sm.skill} variant="secondary" className="text-xs">
              {sm.skill}
            </Badge>
          ))}
          {match.skillBreakdown.length > 4 && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              +{match.skillBreakdown.length - 4}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function MatchesPage() {
  const { data: matches, isLoading } = useGetJobMatches();
  const { data: resumes } = useListResumes();
  const saveMutation = useSaveJobMatch();
  const removeMutation = useRemoveJobMatch();
  const findMutation = useFindJobMatches();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "saved">("all");
  const [scoreFilter, setScoreFilter] = useState<ScoreFilter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("relevance");

  const activeResume = resumes?.find((r) => r.isActive);
  const displayMatches =
    matches && matches.length > 0 ? matches : SAMPLE_MATCHES;

  const handleSave = (id: bigint) => {
    saveMutation.mutate(id, {
      onSuccess: () => toast.success("Job saved to your list"),
      onError: () => toast.error("Failed to save job"),
    });
  };

  const handleRemove = (id: bigint) => {
    removeMutation.mutate(id, {
      onSuccess: () => toast.success("Job removed from saved list"),
      onError: () => toast.error("Failed to remove job"),
    });
  };

  const handleFindMatches = () => {
    if (!activeResume) {
      toast.error("Please set an active resume first");
      return;
    }
    findMutation.mutate(activeResume.id, {
      onSuccess: () => toast.success("Job matches updated!"),
      onError: () => toast.error("Failed to find matches"),
    });
  };

  const handleCardClick = (id: bigint) => {
    navigate({ to: "/matches/$matchId", params: { matchId: id.toString() } });
  };

  const scoreThreshold: Record<ScoreFilter, number> = {
    all: 0,
    "80": 80,
    "70": 70,
    "50": 50,
  };

  let filtered = displayMatches
    .filter((m) => (activeTab === "saved" ? m.isSaved : true))
    .filter((m) => m.relevanceScore >= scoreThreshold[scoreFilter])
    .filter(
      (m) =>
        m.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
        m.company.toLowerCase().includes(search.toLowerCase()),
    );

  if (sortBy === "newest") {
    filtered = [...filtered].sort(
      (a, b) => Number(b.matchedAt) - Number(a.matchedAt),
    );
  } else if (sortBy === "salary") {
    filtered = [...filtered].sort(
      (a, b) => b.relevanceScore - a.relevanceScore,
    );
  } else {
    filtered = [...filtered].sort(
      (a, b) => b.relevanceScore - a.relevanceScore,
    );
  }

  const savedCount = displayMatches.filter((m) => m.isSaved).length;
  const avgScore =
    displayMatches.length > 0
      ? Math.round(
          displayMatches.reduce((acc, m) => acc + m.relevanceScore, 0) /
            displayMatches.length,
        )
      : 0;

  const scoreFilterOptions: { value: ScoreFilter; label: string }[] = [
    { value: "all", label: "All Scores" },
    { value: "80", label: "80%+" },
    { value: "70", label: "70%+" },
    { value: "50", label: "50%+" },
  ];

  const sortOptions: { value: SortBy; label: string }[] = [
    { value: "relevance", label: "Relevance" },
    { value: "newest", label: "Newest" },
    { value: "salary", label: "Salary" },
  ];

  return (
    <ProtectedRoute>
      <Layout>
        <div className="p-6 space-y-5" data-ocid="matches.page">
          {/* Header */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Job Matches
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                AI-curated roles matching your profile
              </p>
            </div>
            <Button
              type="button"
              onClick={handleFindMatches}
              disabled={findMutation.isPending}
              data-ocid="matches.find.primary_button"
              className="gap-2 shrink-0"
            >
              {findMutation.isPending ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Finding...
                </>
              ) : (
                <>
                  <Target className="h-4 w-4" />
                  Find Matches
                </>
              )}
            </Button>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-card border border-border">
              <span className="text-xs text-muted-foreground">Total</span>
              <span className="font-mono text-sm font-bold text-foreground">
                {displayMatches.length}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-accent/10 border border-accent/30">
              <span className="text-xs text-muted-foreground">Saved</span>
              <span className="font-mono text-sm font-bold text-accent">
                {savedCount}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-card border border-border">
              <span className="text-xs text-muted-foreground">Avg Score</span>
              <span className="font-mono text-sm font-bold text-foreground">
                {avgScore}%
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-card border border-border">
              <span className="text-xs text-muted-foreground">Filtered</span>
              <span className="font-mono text-sm font-bold text-foreground">
                {filtered.length}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as "all" | "saved")}
            data-ocid="matches.tabs"
          >
            <TabsList className="bg-card border border-border h-9">
              <TabsTrigger
                value="all"
                data-ocid="matches.all.tab"
                className="text-xs px-4"
              >
                All Matches
                <span className="ml-1.5 px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono text-[10px]">
                  {displayMatches.length}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="saved"
                data-ocid="matches.saved.tab"
                className="text-xs px-4"
              >
                Saved
                <span className="ml-1.5 px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono text-[10px]">
                  {savedCount}
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Filter bar */}
          <div
            className="flex items-center gap-3 flex-wrap"
            data-ocid="matches.filter.section"
          >
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title or company..."
                data-ocid="matches.search_input"
                className="pl-9 bg-card border-border text-sm h-9"
              />
            </div>

            {/* Score filter */}
            <div className="relative" data-ocid="matches.score_filter.select">
              <select
                value={scoreFilter}
                onChange={(e) => setScoreFilter(e.target.value as ScoreFilter)}
                className="appearance-none pl-3 pr-8 h-9 rounded-md bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer"
              >
                {scoreFilterOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative" data-ocid="matches.sort.select">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="appearance-none pl-3 pr-8 h-9 rounded-md bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    Sort: {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-center"
              data-ocid="matches.empty_state"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                {activeTab === "saved"
                  ? "No saved matches yet"
                  : "No matches found"}
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs mb-6">
                {activeTab === "saved"
                  ? "Bookmark jobs from the All Matches tab to see them here."
                  : 'Click "Find Matches" above to run AI-powered job matching against your active resume.'}
              </p>
              {activeTab === "all" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleFindMatches}
                  disabled={findMutation.isPending}
                  data-ocid="matches.empty.find_button"
                  className="gap-2"
                >
                  <Target className="h-4 w-4" />
                  Run AI Matching
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-3" data-ocid="matches.list">
              {filtered.map((match, i) => (
                <MatchCard
                  key={match.id.toString()}
                  match={match}
                  onSave={handleSave}
                  onRemove={handleRemove}
                  index={i + 1}
                  onClick={handleCardClick}
                />
              ))}
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
