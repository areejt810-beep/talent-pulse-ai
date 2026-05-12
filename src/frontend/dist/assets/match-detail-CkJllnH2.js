import { g as useParams, d as useNavigate, r as reactExports, j as jsxRuntimeExports, a as LoadingSpinner } from "./index-DauUnvke.js";
import { c as useGetJobMatches, n as useSaveJobMatch, o as useRemoveJobMatch, P as ProtectedRoute, L as Layout, T as Target, C as ChevronRight } from "./ProtectedRoute-ZnmF4YYk.js";
import { c as createLucideIcon, a as Button, S as Sparkles, B as Badge, b as ue } from "./sparkles-CUW_-72z.js";
import { C as Card, b as CardHeader, a as CardContent } from "./card-CaVkMHAg.js";
import { T as TriangleAlert, C as Collapsible, a as CollapsibleTrigger, b as CollapsibleContent } from "./collapsible-l78gczC9.js";
import { M as MapPin, g as getMatchBg, a as getMatchColor } from "./types-Di94XbtX.js";
import { B as Briefcase } from "./briefcase-CSyaap7y.js";
import { C as CalendarDays, B as BookmarkCheck, a as Bookmark } from "./calendar-days-Tz7rVi3X.js";
import { T as TrendingUp } from "./trending-up-CrO9Xe6C.js";
import { C as ChevronDown } from "./chevron-down-CrIo2e2W.js";
import "./index-Di3XlykX.js";
import "./index-Bk2FDhxj.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode);
function formatPostedDate(matchedAt) {
  const diffMs = Date.now() - Number(matchedAt) / 1e6;
  const diffDays = Math.floor(diffMs / 864e5);
  if (diffDays === 0) return "Matched today";
  if (diffDays === 1) return "Matched yesterday";
  if (diffDays < 7) return `Matched ${diffDays} days ago`;
  if (diffDays < 30) return `Matched ${Math.floor(diffDays / 7)} weeks ago`;
  return `Matched ${Math.floor(diffDays / 30)} months ago`;
}
function MatchDetailPage() {
  const { matchId } = useParams({ strict: false });
  const navigate = useNavigate();
  const { data: matches, isLoading } = useGetJobMatches();
  const saveMutation = useSaveJobMatch();
  const removeMutation = useRemoveJobMatch();
  const match = matches == null ? void 0 : matches.find((m) => m.id.toString() === matchId);
  const [coverLetterOpen, setCoverLetterOpen] = reactExports.useState(false);
  const handleSave = () => {
    if (!match) return;
    saveMutation.mutate(match.id, {
      onSuccess: () => ue.success("Job saved to your list"),
      onError: () => ue.error("Failed to save job")
    });
  };
  const handleRemove = () => {
    if (!match) return;
    removeMutation.mutate(match.id, {
      onSuccess: () => ue.success("Job removed from saved list"),
      onError: () => ue.error("Failed to remove job")
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-5 max-w-3xl", "data-ocid": "match-detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => navigate({ to: "/matches" }),
        "data-ocid": "match-detail.back_button",
        className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          "Back to Job Matches"
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) }) : !match ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center",
        "data-ocid": "match-detail.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-8 w-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-2", children: "Match not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs mb-6", children: "This job match may have been removed or the link is invalid." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => navigate({ to: "/matches" }),
              "data-ocid": "match-detail.back.button",
              className: "gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
                "View All Matches"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "bg-card border-border",
          "data-ocid": "match-detail.card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: match.jobTitle }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-3.5 w-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: match.company })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: match.location })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3.5 w-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: formatPostedDate(match.matchedAt) })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-mono font-bold ${getMatchBg(
                      match.relevanceScore
                    )} ${getMatchColor(match.relevanceScore)}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
                      match.relevanceScore,
                      "% Match"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: match.isSaved ? handleRemove : handleSave,
                    "data-ocid": match.isSaved ? "match-detail.unsave.button" : "match-detail.save.button",
                    "aria-label": match.isSaved ? "Remove bookmark" : "Save job",
                    className: `p-2 rounded-lg border transition-smooth ${match.isSaved ? "text-accent border-accent/30 bg-accent/10 hover:bg-accent/20" : "text-muted-foreground border-border hover:text-accent hover:border-accent/30"}`,
                    children: match.isSaved ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-4 w-4" })
                  }
                )
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5 pt-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2", children: "Role Overview" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: match.description })
              ] }),
              match.skillBreakdown && match.skillBreakdown.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2", children: "Required Skills" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: match.skillBreakdown.map((sm) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "text-xs px-2.5 py-1",
                    children: sm.skill
                  },
                  sm.skill
                )) })
              ] }),
              match.skillBreakdown && match.skillBreakdown.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3", children: "Skill Match Breakdown" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: match.skillBreakdown.map((sm) => {
                  const pct = Number(sm.relevance);
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-3",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground w-28 truncate shrink-0", children: sm.skill }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: `h-full rounded-full transition-all ${getMatchColor(pct).replace("text-", "bg-")}`,
                            style: { width: `${pct}%` }
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: `text-xs font-mono font-bold w-10 text-right ${getMatchColor(pct)}`,
                            children: [
                              pct,
                              "%"
                            ]
                          }
                        )
                      ]
                    },
                    sm.skill
                  );
                }) })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "bg-accent/5 border-accent/20",
          "data-ocid": "match-detail.insight.card",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-accent/15 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mb-1", children: "AI Match Insight" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
                "Your profile aligns",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `font-semibold ${getMatchColor(match.relevanceScore)}`,
                    children: match.relevanceScore >= 85 ? "exceptionally well" : match.relevanceScore >= 70 ? "well" : "moderately"
                  }
                ),
                " ",
                "with this role.",
                match.relevanceScore < 80 && " Consider upskilling in the requirements to improve your match."
              ] })
            ] })
          ] }) })
        }
      ),
      match.redFlags && match.redFlags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "bg-destructive/5 border-destructive/20",
          "data-ocid": "match-detail.red_flags.card",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-destructive/10 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-destructive" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-destructive pt-2", children: "Red Flags" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: match.redFlags.map((flag, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": `match-detail.red_flag.item.${i + 1}`,
                className: "flex items-start gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3 text-destructive mt-0.5 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground", children: flag })
                ]
              },
              flag
            )) })
          ] })
        }
      ),
      match.coverLetterDraft && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Collapsible,
        {
          open: coverLetterOpen,
          onOpenChange: setCoverLetterOpen,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "bg-card border-border",
              "data-ocid": "match-detail.cover_letter.card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "w-full flex items-center gap-3 p-4 text-left hover:bg-muted/30 transition-smooth rounded-t-lg",
                    "data-ocid": "match-detail.cover_letter.toggle",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 text-primary" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: "AI Cover Letter Draft" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Personalized for this role" })
                      ] }),
                      coverLetterOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-muted-foreground shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground shrink-0" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4 pt-0 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground leading-relaxed whitespace-pre-wrap font-mono bg-muted/30 rounded-lg p-3 mt-3", children: match.coverLetterDraft }) }) })
              ] })
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-3",
          "data-ocid": "match-detail.actions",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                onClick: match.isSaved ? handleRemove : handleSave,
                disabled: saveMutation.isPending || removeMutation.isPending,
                "data-ocid": "match-detail.save.primary_button",
                variant: match.isSaved ? "outline" : "default",
                className: "gap-2",
                children: match.isSaved ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "h-4 w-4" }),
                  "Saved"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-4 w-4" }),
                  "Save Job"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => navigate({ to: "/matches" }),
                "data-ocid": "match-detail.all_matches.button",
                className: "gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
                  "All Matches"
                ]
              }
            )
          ]
        }
      )
    ] })
  ] }) }) });
}
export {
  MatchDetailPage as default
};
