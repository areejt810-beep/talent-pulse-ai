import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  Brain,
  ChevronRight,
  FileText,
  Gauge,
  LogOut,
  Settings,
  Sparkles,
  Target,
  User,
} from "lucide-react";
import type { ReactNode } from "react";

const NAV_ITEMS = [
  { path: "/dashboard", label: "Dashboard", icon: Gauge },
  { path: "/resumes", label: "Resumes", icon: FileText },
  { path: "/analysis", label: "AI Analysis", icon: Brain, badge: "AI" },
  { path: "/matches", label: "Job Matches", icon: Target },
  { path: "/profile", label: "Profile", icon: User },
];

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated, identity, clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const handleLogout = () => {
    clear();
    queryClient.clear();
  };

  const principalShort = identity
    ? `${identity.getPrincipal().toString().slice(0, 8)}...`
    : "Guest";

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 bg-sidebar border-r border-sidebar-border">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-sidebar-border">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/15 ring-1 ring-primary/30">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-display font-semibold text-sm text-sidebar-foreground leading-tight truncate">
              Talent Pulse
            </p>
            <p className="text-[10px] font-mono text-accent font-medium uppercase tracking-wider">
              AI
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav
          className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map(({ path, label, icon: Icon, badge }) => {
            const isActive =
              currentPath === path || currentPath.startsWith(`${path}/`);
            return (
              <Link
                key={path}
                to={path}
                data-ocid={`nav.${label.toLowerCase().replace(/\s/g, "_")}.link`}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-smooth",
                  isActive
                    ? "bg-sidebar-primary/15 text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    isActive
                      ? "text-sidebar-primary"
                      : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground",
                  )}
                />
                <span className="flex-1 truncate">{label}</span>
                {badge && (
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 h-4 font-mono text-accent border-accent/40"
                  >
                    {badge}
                  </Badge>
                )}
                {isActive && (
                  <ChevronRight className="h-3 w-3 text-sidebar-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        <Separator className="bg-sidebar-border" />

        {/* Analytics quick link */}
        <div className="px-3 py-2">
          <Link
            to="/analysis"
            data-ocid="nav.analytics.link"
            className="group flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-smooth"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </Link>
          <Link
            to="/profile"
            data-ocid="nav.settings.link"
            className="group flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-smooth"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </div>

        <Separator className="bg-sidebar-border" />

        {/* User section */}
        {isAuthenticated && (
          <div className="px-3 py-3">
            <div className="flex items-center gap-3 px-2 py-2 rounded-md">
              <Avatar className="h-8 w-8 ring-1 ring-sidebar-border">
                <AvatarFallback className="bg-primary/15 text-primary text-xs font-mono">
                  {principalShort.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-sidebar-foreground truncate">
                  My Account
                </p>
                <p className="text-[10px] font-mono text-sidebar-foreground/40 truncate">
                  {principalShort}
                </p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                data-ocid="nav.logout.button"
                aria-label="Logout"
                className="p-1.5 rounded text-sidebar-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-smooth"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top bar (mobile) */}
        <header className="flex md:hidden items-center justify-between px-4 h-14 bg-card border-b border-border">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-display font-semibold text-sm">
              Talent Pulse <span className="text-accent">AI</span>
            </span>
          </div>
          {isAuthenticated && (
            <button
              type="button"
              onClick={handleLogout}
              data-ocid="mobile.logout.button"
              className="text-xs text-muted-foreground hover:text-foreground transition-smooth"
            >
              Logout
            </button>
          )}
        </header>

        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">{children}</main>

        {/* Mobile bottom navigation */}
        <nav
          aria-label="Mobile navigation"
          className="fixed bottom-0 left-0 right-0 flex md:hidden items-center justify-around h-16 bg-card border-t border-border z-50"
        >
          {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
            const isActive =
              currentPath === path || currentPath.startsWith(`${path}/`);
            return (
              <Link
                key={path}
                to={path}
                data-ocid={`mobile.nav.${label.toLowerCase().replace(/\s/g, "_")}.link`}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-[10px] font-medium transition-smooth",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 shrink-0",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <Toaster richColors position="top-right" />
    </div>
  );
}
