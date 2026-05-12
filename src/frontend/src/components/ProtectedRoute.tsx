import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageLoader } from "./LoadingSpinner";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loginStatus } = useInternetIdentity();

  if (loginStatus === "initializing") {
    return <PageLoader label="Authenticating..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
