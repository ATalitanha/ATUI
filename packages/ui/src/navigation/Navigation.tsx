import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@aurora-ui/utils";
import { ChevronRightIcon } from "@aurora-ui/icons";

// ============================================================================
// --- BREADCRUMB ---
// ============================================================================
export interface BreadcrumbItem {
  label: string;
  href?: string;
}
export const Breadcrumb: React.FC<{ items: BreadcrumbItem[]; className?: string }> = ({ items, className }) => {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-2 text-sm", className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {index > 0 && <ChevronRightIcon size={14} className="text-[var(--aurora-fg-subtle)]" />}
            {isLast || !item.href ? (
              <span className="font-semibold text-[var(--aurora-fg-base)]">{item.label}</span>
            ) : (
              <a href={item.href} className="text-[var(--aurora-fg-muted)] hover:text-[var(--aurora-fg-base)] transition-colors">
                {item.label}
              </a>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

// ============================================================================
// --- PAGINATION ---
// ============================================================================
export interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
  className?: string;
}
export const Pagination: React.FC<PaginationProps> = ({ current, total, onChange, className }) => {
  return (
    <div className={cn("flex items-center gap-1.5 justify-center", className)}>
      <button
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
        className="h-9 px-3 rounded-[var(--aurora-radius-md)] border border-[var(--aurora-border-base)] disabled:opacity-40 text-sm font-medium text-[var(--aurora-fg-base)] hover:bg-[var(--aurora-bg-surface-hover)]"
      >
        Prev
      </button>
      {Array.from({ length: total }).map((_, i) => {
        const p = i + 1;
        const isActive = p === current;
        return (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={cn(
              "h-9 w-9 flex items-center justify-center rounded-[var(--aurora-radius-md)] text-sm font-semibold border transition-all",
              isActive
                ? "bg-[var(--aurora-primary)] text-[var(--aurora-fg-inverse)] border-[var(--aurora-primary)]"
                : "border-[var(--aurora-border-base)] text-[var(--aurora-fg-base)] hover:bg-[var(--aurora-bg-surface-hover)]"
            )}
          >
            {p}
          </button>
        );
      })}
      <button
        disabled={current === total}
        onClick={() => onChange(current + 1)}
        className="h-9 px-3 rounded-[var(--aurora-radius-md)] border border-[var(--aurora-border-base)] disabled:opacity-40 text-sm font-medium text-[var(--aurora-fg-base)] hover:bg-[var(--aurora-bg-surface-hover)]"
      >
        Next
      </button>
    </div>
  );
};

// ============================================================================
// --- TABS (with beautiful Framer Motion Shared Layout Indicator) ---
// ============================================================================
export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}
export const Tabs: React.FC<{ items: TabItem[]; className?: string }> = ({ items, className }) => {
  const [activeTab, setActiveTab] = useState(items[0]?.id || "");

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div className="flex border-b border-[var(--aurora-border-base)] relative overflow-x-auto whitespace-nowrap">
        {items.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative py-3 px-4 text-sm font-semibold transition-colors focus-visible:outline-none text-[var(--aurora-fg-muted)] hover:text-[var(--aurora-fg-base)]",
                isActive && "text-[var(--aurora-primary)]"
              )}
            >
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="active-tab-line"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--aurora-primary)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
      <div>
        {items.find((t) => t.id === activeTab)?.content}
      </div>
    </div>
  );
};

// ============================================================================
// --- STEPPER ---
// ============================================================================
export interface StepItem {
  title: string;
  description?: string;
}
export const Stepper: React.FC<{ steps: StepItem[]; activeStep: number; className?: string }> = ({
  steps,
  activeStep,
  className,
}) => {
  return (
    <div className={cn("flex items-start w-full justify-between gap-4", className)}>
      {steps.map((step, i) => {
        const isCompleted = i < activeStep;
        const isActive = i === activeStep;
        return (
          <div key={i} className="flex-1 flex flex-col items-center text-center relative group">
            {/* Connection Line */}
            {i > 0 && (
              <div
                className={cn(
                  "absolute top-5 left-[-50%] right-[50%] h-[2px] -translate-y-1/2 bg-[var(--aurora-border-base)] -z-10",
                  isCompleted && "bg-[var(--aurora-primary)]"
                )}
              />
            )}
            {/* Step Bubble */}
            <div
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all",
                isCompleted
                  ? "bg-[var(--aurora-primary)] border-[var(--aurora-primary)] text-[var(--aurora-fg-inverse)]"
                  : isActive
                  ? "border-[var(--aurora-primary)] text-[var(--aurora-primary)] bg-[var(--aurora-bg-surface)]"
                  : "border-[var(--aurora-border-base)] text-[var(--aurora-fg-muted)] bg-[var(--aurora-bg-surface-hover)]"
              )}
            >
              {isCompleted ? "✓" : i + 1}
            </div>
            {/* Titles */}
            <div className="mt-2">
              <p className={cn("text-xs font-bold", isActive ? "text-[var(--aurora-primary)]" : "text-[var(--aurora-fg-base)]")}>
                {step.title}
              </p>
              {step.description && <p className="text-[10px] text-[var(--aurora-fg-muted)] mt-0.5">{step.description}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};