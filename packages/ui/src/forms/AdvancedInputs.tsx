import React, { useRef, useState } from "react";
import { cn } from "@aurora-ui/utils";
import { FileIcon } from "@aurora-ui/icons";

// --- FILE UPLOADER ---
export interface FileUploaderProps {
  onFilesSelected?: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  className?: string;
}
export const FileUploader: React.FC<FileUploaderProps> = ({
  onFilesSelected,
  multiple = false,
  accept,
  className,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      const filtered = multiple ? droppedFiles : [droppedFiles[0]!];
      setFiles((prev) => [...prev, ...filtered]);
      onFilesSelected?.(filtered);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFiles = Array.from(e.target.files);
      const filtered = multiple ? selectedFiles : [selectedFiles[0]!];
      setFiles((prev) => [...prev, ...filtered]);
      onFilesSelected?.(filtered);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={cn("w-full space-y-3", className)}>
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative border-2 border-dashed border-[var(--aurora-border-base)] hover:border-[var(--aurora-primary)] rounded-[var(--aurora-radius-lg)] p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2",
          dragActive && "border-[var(--aurora-primary)] bg-[var(--aurora-primary-subtle)]"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept}
          onChange={handleFileInput}
        />
        <div className="p-3 bg-[var(--aurora-bg-surface-hover)] border border-[var(--aurora-border-subtle)] rounded-full text-[var(--aurora-fg-muted)]">
          <FileIcon size={24} />
        </div>
        <p className="text-sm font-medium text-[var(--aurora-fg-base)]">
          Drag & drop your files here, or <span className="text-[var(--aurora-primary)] underline">browse</span>
        </p>
        <p className="text-xs text-[var(--aurora-fg-subtle)]">
          Supports any secure formats
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2 border border-[var(--aurora-border-subtle)] rounded-[var(--aurora-radius-md)] p-2 bg-[var(--aurora-bg-surface)] max-h-48 overflow-y-auto">
          {files.map((file, i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded bg-[var(--aurora-bg-surface-hover)] text-sm">
              <div className="flex items-center gap-2 overflow-hidden">
                <FileIcon size={16} className="text-[var(--aurora-fg-muted)] shrink-0" />
                <span className="truncate text-[var(--aurora-fg-base)]">{file.name}</span>
                <span className="text-xs text-[var(--aurora-fg-subtle)]">({(file.size / 1024).toFixed(1)} KB)</span>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                className="text-[var(--aurora-fg-subtle)] hover:text-red-500 p-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- COLOR PICKER ---
export interface ColorPickerProps {
  value: string;
  onChange: (val: string) => void;
  className?: string;
}
export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, className }) => {
  const swatchList = ["#8b5cf6", "#14b8a6", "#3b82f6", "#ef4444", "#eab308", "#10b981", "#050505", "#FAFAFA"];

  return (
    <div className={cn("flex flex-col gap-2.5 p-3 border border-[var(--aurora-border-base)] rounded-[var(--aurora-radius-lg)] bg-[var(--aurora-bg-surface)] w-full max-w-[240px]", className)}>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 border border-[var(--aurora-border-base)] rounded cursor-pointer p-0 bg-transparent"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 h-10 border border-[var(--aurora-border-base)] rounded px-2.5 text-sm uppercase bg-[var(--aurora-bg-surface-hover)] text-[var(--aurora-fg-base)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--aurora-primary)]"
        />
      </div>
      <div className="grid grid-cols-4 gap-1.5 pt-1.5 border-t border-[var(--aurora-border-subtle)]">
        {swatchList.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={cn(
              "h-8 rounded border border-[var(--aurora-border-subtle)] hover:scale-105 transition-all",
              value.toLowerCase() === color.toLowerCase() && "ring-1 ring-[var(--aurora-primary)] border-[var(--aurora-primary)]"
            )}
            style={{ backgroundColor: color }}
            aria-label={color}
          />
        ))}
      </div>
    </div>
  );
};