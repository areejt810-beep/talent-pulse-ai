import {
  useCreateProfile,
  useGetDashboardStats,
  useGetProfile,
  useUpdateProfile,
} from "@/api";
import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  BarChart3,
  Briefcase,
  Edit3,
  FileText,
  LogOut,
  Save,
  Shield,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CAREER_FOCUS_OPTIONS = [
  "Frontend",
  "Backend",
  "Full Stack",
  "Data Science",
  "DevOps",
  "Product Management",
  "UX/UI Design",
  "Other",
] as const;

export default function ProfilePage() {
  const { data: profile, isLoading } = useGetProfile();
  const { data: stats, isLoading: statsLoading } = useGetDashboardStats();
  const { identity, clear } = useInternetIdentity();
  const updateMutation = useUpdateProfile();
  const createMutation = useCreateProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [careerFocus, setCareerFocus] = useState("");

  // biome-ignore lint/correctness/useExhaustiveDependencies: createMutation.mutate is stable ref
  useEffect(() => {
    if (!isLoading && profile === null && identity) {
      createMutation.mutate(undefined, {
        onSuccess: () => toast.success("Profile initialized"),
      });
    }
  }, [isLoading, profile, identity]);

  const principalId = identity?.getPrincipal().toString() ?? "—";
  const principalShort =
    principalId.length > 24
      ? `${principalId.slice(0, 12)}...${principalId.slice(-8)}`
      : principalId;

  const handleEdit = () => {
    setName(profile?.name ?? "");
    setCareerFocus(profile?.careerFocus ?? "");
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (profile) {
      updateMutation.mutate(
        { name: name.trim(), careerFocus },
        {
          onSuccess: () => {
            toast.success("Profile updated");
            setIsEditing(false);
          },
          onError: () => toast.error("Failed to update profile"),
        },
      );
    } else {
      createMutation.mutate(undefined, {
        onSuccess: () => {
          toast.success("Profile created");
          setIsEditing(false);
        },
        onError: () => toast.error("Failed to create profile"),
      });
    }
  };

  const handleLogout = () => {
    clear();
    toast.success("Logged out successfully");
  };

  const displayName =
    profile?.name && profile.name !== "New User"
      ? profile.name
      : "Anonymous User";
  const displayCareerFocus = profile?.careerFocus ?? "Not set";

  const totalResumes = stats ? Number(stats.totalResumes) : 0;
  const totalMatches = stats ? Number(stats.totalMatches) : 0;
  const analysesRun = stats ? Number(stats.totalAnalyses) : 0;

  return (
    <ProtectedRoute>
      <Layout>
        <div className="p-6 space-y-6" data-ocid="profile.page">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Profile
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Manage your identity and career preferences
              </p>
            </div>
            {!isEditing && (
              <Button
                type="button"
                variant="outline"
                onClick={handleEdit}
                data-ocid="profile.edit_button"
                className="gap-2"
              >
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column: avatar card + stats */}
              <div className="lg:col-span-1 space-y-4" data-ocid="profile.card">
                <Card className="bg-card border-border">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 ring-2 ring-primary/30 mb-4">
                      <AvatarFallback className="bg-primary/15 text-primary text-2xl font-display font-bold">
                        {displayName.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="font-display text-lg font-bold text-foreground">
                      {displayName}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {displayCareerFocus}
                    </p>
                    <Badge
                      variant="outline"
                      className="mt-3 font-mono text-xs text-accent border-accent/40"
                    >
                      On-chain Identity
                    </Badge>
                  </CardContent>
                </Card>

                {/* Stats Summary */}
                <Card
                  className="bg-card border-border"
                  data-ocid="profile.stats.card"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Activity Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {statsLoading ? (
                      <div
                        className="flex justify-center py-4"
                        data-ocid="profile.stats.loading_state"
                      >
                        <LoadingSpinner size="sm" />
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between py-2 border-b border-border/40">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <FileText className="h-3.5 w-3.5" />
                            Total Resumes
                          </div>
                          <span className="text-sm font-semibold font-mono text-foreground">
                            {totalResumes}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-border/40">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <BarChart3 className="h-3.5 w-3.5" />
                            Analyses Run
                          </div>
                          <span className="text-sm font-semibold font-mono text-foreground">
                            {analysesRun}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Briefcase className="h-3.5 w-3.5" />
                            Matches Found
                          </div>
                          <span className="text-sm font-semibold font-mono text-primary">
                            {totalMatches}
                          </span>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right column: personal info + account */}
              <div className="lg:col-span-2 space-y-4">
                <Card className="bg-card border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <>
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="name"
                            className="text-xs text-muted-foreground"
                          >
                            Display Name
                          </Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your full name"
                            data-ocid="profile.name.input"
                            className="bg-background border-input"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="careerFocus"
                            className="text-xs text-muted-foreground"
                          >
                            Career Focus
                          </Label>
                          <Select
                            value={careerFocus}
                            onValueChange={(v) => setCareerFocus(v)}
                          >
                            <SelectTrigger
                              id="careerFocus"
                              data-ocid="profile.career_focus.select"
                              className="bg-background border-input"
                            >
                              <SelectValue placeholder="Select your career focus" />
                            </SelectTrigger>
                            <SelectContent>
                              {CAREER_FOCUS_OPTIONS.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2 pt-1">
                          <Button
                            type="button"
                            onClick={handleSave}
                            disabled={
                              updateMutation.isPending ||
                              createMutation.isPending
                            }
                            data-ocid="profile.save.submit_button"
                            className="gap-2"
                          >
                            {updateMutation.isPending ||
                            createMutation.isPending ? (
                              <>
                                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save className="h-3.5 w-3.5" />
                                Save Changes
                              </>
                            )}
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setIsEditing(false)}
                            data-ocid="profile.cancel.cancel_button"
                            className="gap-2"
                          >
                            <X className="h-3.5 w-3.5" />
                            Cancel
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between py-2 border-b border-border/50">
                          <span className="text-xs text-muted-foreground">
                            Display Name
                          </span>
                          <span className="text-sm text-foreground font-medium">
                            {displayName}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-xs text-muted-foreground">
                            Career Focus
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {displayCareerFocus}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      Account & Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-border/50">
                        <span className="text-xs text-muted-foreground">
                          Principal ID
                        </span>
                        <span
                          className="text-xs font-mono text-foreground bg-muted px-2 py-1 rounded cursor-help select-all"
                          title={principalId}
                          data-ocid="profile.principal_id"
                        >
                          {principalShort}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border/50">
                        <span className="text-xs text-muted-foreground">
                          Auth Method
                        </span>
                        <Badge
                          variant="outline"
                          className="text-xs font-mono text-primary border-primary/40"
                        >
                          Internet Identity
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 mb-4 leading-relaxed">
                      Your identity is secured by the Internet Computer. No
                      passwords, no central server — you have full ownership.
                    </p>
                    <Separator className="mb-4 bg-border/50" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={handleLogout}
                      data-ocid="profile.logout.button"
                      className="gap-2 w-full sm:w-auto"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Sign Out
                    </Button>
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
