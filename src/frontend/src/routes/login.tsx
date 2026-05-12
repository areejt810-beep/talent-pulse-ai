import { PageLoader } from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Navigate } from "@tanstack/react-router";
import {
  BarChart3,
  BrainCircuit,
  Lock,
  Shield,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const STATS = [
  { value: "94%", label: "Match accuracy" },
  { value: "3.2×", label: "Faster hiring" },
  { value: "10K+", label: "Roles matched" },
];

const FEATURES = [
  {
    icon: BrainCircuit,
    title: "AI Resume Analysis",
    desc: "Deep skill-gap insights powered by on-chain intelligence",
    color: "text-primary",
    bg: "bg-primary/10 ring-primary/20",
  },
  {
    icon: Zap,
    title: "Smart Job Matching",
    desc: "Precision roles matched to your full career potential",
    color: "text-accent",
    bg: "bg-accent/10 ring-accent/20",
  },
  {
    icon: TrendingUp,
    title: "Career Analytics",
    desc: "Track your market value and salary trends over time",
    color: "text-primary",
    bg: "bg-primary/10 ring-primary/20",
  },
  {
    icon: BarChart3,
    title: "Competitive Benchmarks",
    desc: "See how you stack up against candidates for each role",
    color: "text-accent",
    bg: "bg-accent/10 ring-accent/20",
  },
];

export default function LoginPage() {
  const { isAuthenticated, loginStatus, login, isLoggingIn, isInitializing } =
    useInternetIdentity();

  if (loginStatus === "initializing") {
    return <PageLoader label="Initializing..." />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-background flex" data-ocid="login.page">
      {/* ─── Left panel ─── */}
      <div className="hidden lg:flex flex-col w-[55%] relative overflow-hidden">
        {/* Hero image */}
        <img
          src="/assets/generated/login-hero.dim_800x900.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-12">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/15 ring-1 ring-primary/40 shadow-[0_0_16px_oklch(0.72_0.16_270/0.3)]">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-display font-bold text-lg text-foreground leading-none">
                Talent Pulse
              </p>
              <p className="text-xs font-mono text-accent tracking-widest uppercase">
                AI
              </p>
            </div>
          </motion.div>

          {/* Hero copy */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Badge
                variant="outline"
                className="mb-4 border-accent/40 text-accent text-xs font-mono tracking-wider"
              >
                <Sparkles className="h-3 w-3 mr-1.5" />
                Powered by On-Chain AI
              </Badge>
              <h1 className="font-display text-4xl xl:text-5xl font-bold text-foreground leading-[1.15] mb-4">
                Land your next role
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  10× faster
                </span>{" "}
                with AI
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed max-w-sm">
                AI-powered resume analysis and intelligent job matching that
                understands your full career trajectory.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex gap-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-display text-2xl font-bold text-foreground">
                    {s.value}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Features */}
            <motion.div
              className="grid grid-cols-2 gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              {FEATURES.map(({ icon: Icon, title, desc, color, bg }, i) => (
                <motion.div
                  key={title}
                  className="flex items-start gap-3 p-3 rounded-xl bg-card/40 border border-border/40 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                >
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-lg ring-1 ${bg} shrink-0 mt-0.5`}
                  >
                    <Icon className={`h-4 w-4 ${color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-xs text-foreground leading-snug">
                      {title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <p className="text-xs text-muted-foreground/50 font-mono">
            © {new Date().getFullYear()} Talent Pulse AI · Internet Computer
          </p>
        </div>
      </div>

      {/* ─── Right panel ─── */}
      <div className="flex flex-1 items-center justify-center p-8 bg-background relative">
        {/* Subtle bg glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <motion.div
          className="relative w-full max-w-sm"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/15 ring-1 ring-primary/40">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <span className="font-display font-bold text-xl">
              Talent Pulse <span className="text-accent">AI</span>
            </span>
          </div>

          {/* Card */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 ring-1 ring-primary/30 mb-4 shadow-[0_0_24px_oklch(0.72_0.16_270/0.2)]">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Welcome back
              </h2>
              <p className="text-muted-foreground text-sm mt-1.5">
                Sign in to access your AI career hub
              </p>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="wait">
                <Button
                  key={isLoggingIn ? "loading" : "idle"}
                  type="button"
                  onClick={login}
                  disabled={isInitializing || isLoggingIn}
                  data-ocid="login.submit_button"
                  className="w-full h-12 font-medium text-sm transition-smooth"
                  size="lg"
                >
                  {isLoggingIn ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Connecting to Internet Identity...
                    </span>
                  ) : isInitializing ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Initializing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Sign in with Internet Identity
                    </span>
                  )}
                </Button>
              </AnimatePresence>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/60" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-card text-xs text-muted-foreground">
                    New to Talent Pulse AI?
                  </span>
                </div>
              </div>

              <p className="text-center text-xs text-muted-foreground">
                A new account is created automatically on first sign-in. No
                email or password required.
              </p>
            </div>

            {/* Privacy note */}
            <div className="mt-6 flex items-start gap-3 p-3.5 rounded-xl bg-accent/5 border border-accent/20">
              <Sparkles className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-accent mb-0.5">
                  Decentralized & Private
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your identity lives on the Internet Computer — fully
                  self-sovereign with no third-party tracking.
                </p>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 mt-6">
            {["On-Chain AI", "Zero-Knowledge", "GDPR Ready"].map((label) => (
              <div
                key={label}
                className="flex items-center gap-1.5 text-xs text-muted-foreground/70"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/60" />
                {label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <Toaster richColors position="top-right" />
    </div>
  );
}
