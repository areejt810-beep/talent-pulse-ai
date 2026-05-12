import {
  useDeleteResume,
  useListResumes,
  useSetActiveResume,
  useUploadResume,
} from "@/api";
import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import type { Resume } from "@/types";
import { ExternalBlob } from "@caffeineai/object-storage";
import { Link } from "@tanstack/react-router";
import {
  Brain,
  CheckCircle2,
  Clock,
  FileText,
  Star,
  StarOff,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const SAMPLE_RESUMES: Resume[] = [
  {
    id: BigInt(1),
    filename: "senior-frontend-engineer.pdf",
    fileKey: "key_001",
    tag: "Engineering",
    isActive: true,
    uploadedAt: BigInt(Date.now() - 86400000 * 3),
  },
  {
    id: BigInt(2),
    filename: "fullstack-developer-2024.pdf",
    fileKey: "key_002",
    tag: "Full Stack",
    isActive: false,
    uploadedAt: BigInt(Date.now() - 86400000 * 7),
  },
];

function formatDate(ts: bigint) {
  return new Date(Number(ts)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Upload Dialog ────────────────────────────────────────────────────────────
function UploadDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const uploadMutation = useUploadResume();
  const [file, setFile] = useState<File | null>(null);
  const [tag, setTag] = useState("");
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setFile(null);
    setTag("");
    setProgress(0);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const acceptFile = (f: File) => {
    if (!f.name.toLowerCase().endsWith(".pdf")) {
      toast.error("Only PDF files are supported");
      return;
    }
    setFile(f);
  };

  const handleDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) acceptFile(dropped);
  };

  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (picked) acceptFile(picked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const bytes = new Uint8Array(await file.arrayBuffer());
    const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
      setProgress(pct);
    });
    uploadMutation.mutate(
      {
        filename: file.name,
        fileKey: blob as unknown as string,
        tag: tag || "General",
      },
      {
        onSuccess: () => {
          toast.success("Resume uploaded successfully");
          handleClose();
        },
        onError: () => toast.error("Upload failed — please try again"),
      },
    );
  };

  const isPending = uploadMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        className="sm:max-w-md bg-card border-border"
        data-ocid="resumes.upload_dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-foreground">
            Upload Resume
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Upload a PDF resume. Add a version tag to stay organized.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Drop zone */}
          <button
            type="button"
            aria-label="Drop PDF here or click to browse"
            data-ocid="resumes.dropzone"
            className={`relative w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-smooth ${
              isDragging
                ? "border-primary bg-primary/10"
                : file
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-primary/60 hover:bg-muted/30"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => !file && fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
              data-ocid="resumes.file_input"
            />

            {file ? (
              <div className="flex items-center gap-3 justify-center">
                <FileText className="h-8 w-8 text-accent shrink-0" />
                <div className="text-left min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Remove file"
                  data-ocid="resumes.remove_file_button"
                  className="ml-auto text-muted-foreground hover:text-destructive transition-colors p-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    setProgress(0);
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-foreground font-medium">
                  Drag &amp; drop your PDF here
                </p>
                <p className="text-xs text-muted-foreground">
                  or{" "}
                  <span className="text-primary underline underline-offset-2">
                    browse files
                  </span>
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Supports: PDF only
                </p>
              </div>
            )}
          </button>

          {/* Upload progress */}
          {isPending && progress > 0 && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Uploading…</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          )}

          {/* Tag input */}
          <div className="space-y-1.5">
            <Label htmlFor="version-tag" className="text-sm text-foreground">
              Version Tag
            </Label>
            <Input
              id="version-tag"
              placeholder="e.g. Engineering, SWE-2024, General"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              data-ocid="resumes.tag_input"
              className="bg-background border-input text-foreground placeholder:text-muted-foreground/60"
            />
            <p className="text-xs text-muted-foreground">
              Label this version to tell resumes apart.
            </p>
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
              data-ocid="resumes.upload.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!file || isPending}
              data-ocid="resumes.upload.submit_button"
              className="gap-2"
            >
              {isPending ? (
                <>
                  <LoadingSpinner className="h-3.5 w-3.5" />
                  Uploading…
                </>
              ) : (
                <>
                  <Upload className="h-3.5 w-3.5" />
                  Upload Resume
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Delete Confirm Dialog ────────────────────────────────────────────────────
function DeleteDialog({
  resumeId,
  filename,
  onClose,
  onConfirm,
  isPending,
}: {
  resumeId: bigint | null;
  filename: string;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
}) {
  return (
    <Dialog open={!!resumeId} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="sm:max-w-sm bg-card border-border"
        data-ocid="resumes.delete_dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-foreground">
            Delete Resume
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">{filename}</span>?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isPending}
            data-ocid="resumes.delete.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
            data-ocid="resumes.delete.confirm_button"
            className="gap-2"
          >
            {isPending ? (
              <LoadingSpinner className="h-3.5 w-3.5" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Resume Row ───────────────────────────────────────────────────────────────
function ResumeRow({
  resume,
  index,
  onDeleteRequest,
  onSetActive,
}: {
  resume: Resume;
  index: number;
  onDeleteRequest: (id: bigint, filename: string) => void;
  onSetActive: (id: bigint) => void;
}) {
  return (
    <div
      data-ocid={`resumes.item.${index}`}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-smooth ${
        resume.isActive
          ? "border-accent/40 bg-accent/5 ring-1 ring-accent/20"
          : "border-border bg-card hover:bg-muted/20"
      }`}
    >
      {/* Icon */}
      <div
        className={`flex items-center justify-center w-9 h-9 rounded-md shrink-0 ${
          resume.isActive ? "bg-accent/15" : "bg-muted"
        }`}
      >
        <FileText
          className={`h-4.5 w-4.5 ${
            resume.isActive ? "text-accent" : "text-muted-foreground"
          }`}
        />
      </div>

      {/* Main info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-foreground truncate">
            {resume.filename}
          </span>
          {resume.isActive && (
            <Badge className="text-[10px] px-1.5 py-0 h-4 bg-accent/20 text-accent border border-accent/40 shrink-0">
              ★ Active
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2.5 mt-0.5 flex-wrap">
          <Badge variant="secondary" className="text-xs h-4 px-1.5 py-0">
            {resume.tag || "General"}
          </Badge>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span className="text-xs">{formatDate(resume.uploadedAt)}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          asChild
          data-ocid={`resumes.view.button.${index}`}
          className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
          aria-label="View resume details"
        >
          <Link to="/analysis">
            <FileText className="h-3.5 w-3.5" />
          </Link>
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          asChild
          data-ocid={`resumes.analyze.button.${index}`}
          className="h-8 w-8 p-0 text-muted-foreground hover:text-chart-1"
          aria-label="Analyze resume"
        >
          <Link to="/analysis">
            <Brain className="h-3.5 w-3.5" />
          </Link>
        </Button>

        {resume.isActive ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-accent"
            aria-label="Currently active resume"
            disabled
          >
            <Star className="h-3.5 w-3.5 fill-current" />
          </Button>
        ) : (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            data-ocid={`resumes.set_active.button.${index}`}
            onClick={() => onSetActive(resume.id)}
            aria-label="Set as active resume"
            className="h-8 w-8 p-0 text-muted-foreground hover:text-accent"
          >
            <StarOff className="h-3.5 w-3.5" />
          </Button>
        )}

        <Button
          type="button"
          variant="ghost"
          size="sm"
          data-ocid={`resumes.delete_button.${index}`}
          onClick={() => onDeleteRequest(resume.id, resume.filename)}
          aria-label="Delete resume"
          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ResumesPage() {
  const { data: resumes, isLoading } = useListResumes();
  const deleteMutation = useDeleteResume();
  const setActiveMutation = useSetActiveResume();

  const [showUpload, setShowUpload] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: bigint;
    filename: string;
  } | null>(null);

  const displayResumes =
    resumes && resumes.length > 0 ? resumes : SAMPLE_RESUMES;
  const activeResume = displayResumes.find((r) => r.isActive);

  const handleDeleteRequest = (id: bigint, filename: string) => {
    setDeleteTarget({ id, filename });
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => {
        toast.success("Resume deleted");
        setDeleteTarget(null);
      },
      onError: () => toast.error("Failed to delete resume"),
    });
  };

  const handleSetActive = (id: bigint) => {
    setActiveMutation.mutate(id, {
      onSuccess: () => toast.success("Active resume updated"),
      onError: () => toast.error("Failed to update active resume"),
    });
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="p-6 space-y-6 max-w-4xl" data-ocid="resumes.page">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                My Resumes
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Upload, manage, and analyze your resumes
              </p>
            </div>
            <Button
              type="button"
              data-ocid="resumes.upload_button"
              className="gap-2 shrink-0"
              onClick={() => setShowUpload(true)}
            >
              <Upload className="h-4 w-4" />
              Upload Resume
            </Button>
          </div>

          {/* Active resume banner */}
          {activeResume && (
            <div
              className="rounded-lg border border-accent/30 bg-accent/8 p-4 flex items-center gap-3"
              data-ocid="resumes.active_banner"
            >
              <Star className="h-4 w-4 text-accent shrink-0 fill-current" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-accent">Active Resume</p>
                <p className="text-sm text-foreground truncate font-medium">
                  {activeResume.filename}
                </p>
              </div>
              <Badge className="bg-accent/20 text-accent border border-accent/40 text-xs shrink-0">
                {activeResume.tag || "General"}
              </Badge>
            </div>
          )}

          {/* Info strip */}
          <div className="rounded-lg border border-border bg-muted/30 p-3 flex items-start gap-3">
            <CheckCircle2 className="h-4 w-4 text-chart-3 shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Mark one resume as{" "}
              <strong className="text-foreground">Active</strong> — it will be
              used for AI analysis and job matching. Only PDF files are
              supported.
            </p>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="flex justify-center py-16">
              <LoadingSpinner />
            </div>
          ) : displayResumes.length === 0 ? (
            <EmptyState onUpload={() => setShowUpload(true)} />
          ) : (
            <div className="space-y-2.5" data-ocid="resumes.list">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">
                  {displayResumes.length}{" "}
                  {displayResumes.length === 1 ? "resume" : "resumes"}
                </span>
              </div>
              {displayResumes.map((resume, i) => (
                <ResumeRow
                  key={resume.id.toString()}
                  resume={resume}
                  index={i + 1}
                  onDeleteRequest={handleDeleteRequest}
                  onSetActive={handleSetActive}
                />
              ))}
            </div>
          )}
        </div>

        {/* Dialogs */}
        <UploadDialog open={showUpload} onClose={() => setShowUpload(false)} />
        <DeleteDialog
          resumeId={deleteTarget?.id ?? null}
          filename={deleteTarget?.filename ?? ""}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDeleteConfirm}
          isPending={deleteMutation.isPending}
        />
      </Layout>
    </ProtectedRoute>
  );
}

function EmptyState({ onUpload }: { onUpload: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 text-center"
      data-ocid="resumes.empty_state"
    >
      <div className="w-16 h-16 rounded-2xl bg-muted/60 border border-border flex items-center justify-center mb-4">
        <FileText className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="font-display text-lg font-semibold text-foreground mb-2">
        No resumes yet
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs mb-6 leading-relaxed">
        Upload your first resume to start getting AI-powered analysis and
        personalized job matches.
      </p>
      <Button
        type="button"
        data-ocid="resumes.empty.upload_button"
        className="gap-2"
        onClick={onUpload}
      >
        <Upload className="h-4 w-4" />
        Upload your first resume
      </Button>
    </div>
  );
}
