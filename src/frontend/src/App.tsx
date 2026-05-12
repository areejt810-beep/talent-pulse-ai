import { PageLoader } from "@/components/LoadingSpinner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy } from "react";

const IndexPage = lazy(() => import("./routes/index"));
const LoginPage = lazy(() => import("./routes/login"));
const DashboardPage = lazy(() => import("./routes/dashboard"));
const ResumesPage = lazy(() => import("./routes/resumes"));
const AnalysisPage = lazy(() => import("./routes/analysis"));
const MatchesPage = lazy(() => import("./routes/matches"));
const ProfilePage = lazy(() => import("./routes/profile"));
const MatchDetailPage = lazy(() => import("./routes/match-detail"));

const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexPage,
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
});
const resumesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/resumes",
  component: ResumesPage,
});
const analysisRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analysis",
  component: AnalysisPage,
});
const matchesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/matches",
  component: MatchesPage,
});
const matchDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/matches/$matchId",
  component: MatchDetailPage,
});
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  dashboardRoute,
  resumesRoute,
  analysisRoute,
  matchesRoute,
  matchDetailRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
