import { PageLoader } from "@/components/LoadingSpinner";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Navigate } from "@tanstack/react-router";

export default function IndexPage() {
  const { isAuthenticated, loginStatus } = useInternetIdentity();

  if (loginStatus === "initializing") {
    return <PageLoader label="Loading Talent Pulse AI..." />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return <Navigate to="/login" />;
}
