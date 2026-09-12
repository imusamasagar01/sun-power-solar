"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { uploadMediaAction } from "@/app/admin/actions";

/** Uploads files to Supabase Storage and hands the public URLs back to the form. */
export function MediaUploader({
  accept,
  label = "Upload files",
  onUploaded,
}: {
  accept: string;
  label?: string;
  onUploaded: (urls: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;

    setBusy(true);
    setError("");

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));

    const result = await uploadMediaAction(formData);
    if (result.error) setError(result.error);
    if (result.urls.length > 0) onUploaded(result.urls);

    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="mt-2">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        className="hidden"
        onChange={(event) => handleFiles(event.target.files)}
      />
      <button
        type="button"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-2 rounded-lg border border-line-strong bg-card px-4 py-2 text-sm font-medium text-body transition-colors hover:border-brand-300 hover:text-brand disabled:opacity-60"
      >
        <Upload className="h-4 w-4" />
        {busy ? "Uploading..." : label}
      </button>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
