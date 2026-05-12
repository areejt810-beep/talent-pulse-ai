import { j as jsxRuntimeExports, c as cn, L as Link } from "./index-DauUnvke.js";
import { u as useGetProfile, a as useGetDashboardStats, b as useListResumes, c as useGetJobMatches, P as ProtectedRoute, L as Layout, B as Brain, F as FileText, T as Target } from "./ProtectedRoute-ZnmF4YYk.js";
import { c as createLucideIcon, S as Sparkles, a as Button, B as Badge } from "./sparkles-CUW_-72z.js";
import { C as Card, a as CardContent } from "./card-CaVkMHAg.js";
import { M as MapPin, g as getMatchBg, a as getMatchColor } from "./types-Di94XbtX.js";
import { B as Briefcase } from "./briefcase-CSyaap7y.js";
import { T as TrendingUp } from "./trending-up-CrO9Xe6C.js";
import { C as CircleCheck } from "./circle-check-CAXEPSz5.js";
import { Z as Zap } from "./zap-ANKCZ_f_.js";
import { U as Upload, S as Star } from "./upload-BnBw4tj3.js";
import { S as Search } from "./search-kXbX4np7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode);
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
function StatCard({
  label,
  value,
  icon: Icon,
  color,
  bg,
  loading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1.5 truncate", children: label }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-16" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-foreground leading-none", children: value })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `flex items-center justify-center w-9 h-9 rounded-lg shrink-0 ${bg}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-4 w-4 ${color}` })
      }
    )
  ] }) }) });
}
function ScorePill({ score }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-bold border ${getMatchBg(score)} ${getMatchColor(score)}`,
      children: [
        score,
        "%"
      ]
    }
  );
}
function DashboardPage() {
  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const { data: stats, isLoading: statsLoading } = useGetDashboardStats();
  const { data: resumes, isLoading: resumesLoading } = useListResumes();
  const { data: matches, isLoading: matchesLoading } = useGetJobMatches();
  const activeResume = (resumes == null ? void 0 : resumes.find((r) => r.isActive)) ?? (resumes == null ? void 0 : resumes[0]) ?? null;
  const topMatches = matches ? [...matches].sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 5) : [];
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
      bg: "bg-primary/10"
    },
    {
      label: "Analyses Run",
      value: analysisCount,
      icon: Brain,
      color: "text-chart-5",
      bg: "bg-chart-5/10"
    },
    {
      label: "Avg Match Score",
      value: avgScore > 0 ? `${avgScore}%` : "—",
      icon: TrendingUp,
      color: "text-accent",
      bg: "bg-accent/10"
    },
    {
      label: "Job Matches",
      value: totalMatches,
      icon: Target,
      color: "text-chart-3",
      bg: "bg-chart-3/10"
    }
  ];
  const quickActions = [
    {
      to: "/resumes",
      icon: Upload,
      label: "Upload Resume",
      desc: "Add a new resume to your profile",
      color: "text-primary",
      bg: "bg-primary/10",
      ocid: "dashboard.upload_resume.button"
    },
    {
      to: "/resumes",
      icon: FileText,
      label: "View Resumes",
      desc: "Manage your uploaded resumes",
      color: "text-chart-5",
      bg: "bg-chart-5/10",
      ocid: "dashboard.view_resumes.button"
    },
    {
      to: "/matches",
      icon: Search,
      label: "Find Job Matches",
      desc: "Discover AI-powered job recommendations",
      color: "text-chart-3",
      bg: "bg-chart-3/10",
      ocid: "dashboard.find_matches.button"
    },
    {
      to: "/analysis",
      icon: Zap,
      label: "Run Analysis",
      desc: "Get deep AI resume insights",
      color: "text-accent",
      bg: "bg-accent/10",
      ocid: "dashboard.run_analysis.button"
    }
  ];
  const displayName = (profile == null ? void 0 : profile.name) || (profileLoading ? null : "Career Seeker");
  const careerFocus = (profile == null ? void 0 : profile.careerFocus) || (profileLoading ? null : "Software Engineering");
  const lastAnalyzedDate = null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6 max-w-7xl", "data-ocid": "dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-accent/5 p-5",
        "data-ocid": "dashboard.welcome.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-accent uppercase tracking-widest", children: "AI Career Intelligence" })
              ] }),
              profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-56 mb-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold text-foreground", children: [
                "Welcome back, ",
                displayName
              ] }),
              careerFocus && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-3.5 w-3.5" }),
                "Focused on",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: careerFocus })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/analysis", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": "dashboard.analyze.primary_button",
                size: "sm",
                className: "gap-2 shrink-0",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-4 w-4" }),
                  "Run Analysis"
                ]
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
        "data-ocid": "dashboard.stats.section",
        children: statCards.map(({ label, value, icon, color, bg }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label,
            value,
            icon,
            color,
            bg,
            loading: statsLoading
          },
          label
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "lg:col-span-2",
          "data-ocid": "dashboard.active_resume.section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3", children: "Active Resume" }),
            resumesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-28" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full" })
            ] }) }) : activeResume ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm font-medium text-foreground truncate",
                      title: activeResume.filename,
                      children: activeResume.filename
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                    activeResume.tag && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-[10px] h-4 px-1.5 border-primary/30 text-primary",
                        children: activeResume.tag
                      }
                    ),
                    lastAnalyzedDate
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-chart-3 shrink-0 mt-0.5" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/analysis", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "w-full gap-2",
                  "data-ocid": "dashboard.quick_analyze.button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3.5 w-3.5" }),
                    "Quick Analyze"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/resumes", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "w-full mt-2 text-muted-foreground hover:text-foreground",
                  "data-ocid": "dashboard.manage_resumes.button",
                  children: "Manage Resumes"
                }
              ) })
            ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Card,
              {
                className: "bg-card border-border border-dashed",
                "data-ocid": "dashboard.active_resume.empty_state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex flex-col items-center text-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-12 h-12 rounded-xl bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5 text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "No Resume Yet" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Upload your first resume to get started" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/resumes", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      className: "gap-2",
                      "data-ocid": "dashboard.upload_first_resume.button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5" }),
                        "Upload Resume"
                      ]
                    }
                  ) })
                ] })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "lg:col-span-3",
          "data-ocid": "dashboard.recent_matches.section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider", children: "Top Job Matches" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/matches", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  "data-ocid": "dashboard.view_all_matches.button",
                  className: "text-muted-foreground hover:text-foreground text-xs h-7",
                  children: [
                    "View all ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3 ml-1" })
                  ]
                }
              ) })
            ] }),
            matchesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: [0, 1, 2, 3].map((skIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3 px-4 py-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-40" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-28" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-12" })
                ]
              },
              skIdx
            )) }) }) : topMatches.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Card,
              {
                className: "bg-card border-border border-dashed",
                "data-ocid": "dashboard.matches.empty_state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex flex-col items-center text-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-12 h-12 rounded-xl bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-5 w-5 text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "No Matches Found" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Analyze your resume to unlock AI job matches" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/analysis", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      className: "gap-2",
                      "data-ocid": "dashboard.find_matches_cta.button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-3.5 w-3.5" }),
                        "Run Analysis"
                      ]
                    }
                  ) })
                ] })
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: topMatches.map((match, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/matches/$matchId",
                params: { matchId: match.id.toString() },
                "data-ocid": `dashboard.match.item.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-smooth cursor-pointer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground/50 w-4 shrink-0 text-center", children: i + 1 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: match.jobTitle }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate", children: match.company }),
                      match.location && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/30", children: "·" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-0.5 truncate", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-2.5 w-2.5 shrink-0" }),
                          match.location
                        ] })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                    match.isSaved && /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 text-accent fill-accent" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ScorePill, { score: match.relevanceScore })
                  ] })
                ] })
              },
              match.id.toString()
            )) }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "dashboard.quick_actions.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3", children: "Quick Actions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: quickActions.map(
        ({ to, icon: Icon, label, desc, color, bg }, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to,
            "data-ocid": `dashboard.quick_action.item.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border hover:border-primary/30 hover:bg-muted/20 transition-smooth cursor-pointer h-full group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `flex items-center justify-center w-9 h-9 rounded-lg ${bg} mb-3`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-4 w-4 ${color}` })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground group-hover:text-primary transition-smooth", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-snug", children: desc })
            ] }) })
          },
          to + label
        )
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl border border-accent/20 bg-accent/5 p-4 flex items-start gap-3",
        "data-ocid": "dashboard.ai_insight.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-8 h-8 rounded-lg bg-accent/15 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "AI-Powered Matching" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: "Every analysis runs through our AI engine to surface the best opportunities. Your match score improves as you refine your resume and profile." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/analysis", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              "data-ocid": "dashboard.ai_insight_cta.button",
              className: "shrink-0 text-accent hover:text-accent hover:bg-accent/10",
              children: [
                "Analyze Now ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 ml-1" })
              ]
            }
          ) })
        ]
      }
    )
  ] }) }) });
}
export {
  DashboardPage as default
};
