import React, { useState, useRef, useCallback } from "react";
import { cn } from "@aurora-ui/utils";

export interface SplitPaneProps {
  direction?: "horizontal" | "vertical";
  defaultSize?: number; // percentage (0 to 100)
  minSize?: number; // percentage
  maxSize?: number; // percentage
  leftPane: React.ReactNode;
  rightPane: React.ReactNode;
  className?: string;
}

export const SplitPane: React.FC<SplitPaneProps> = ({
  direction = "horizontal",
  defaultSize = 50,
  minSize = 15,
  maxSize = 85,
  leftPane,
  rightPane,
  className,
}) => {
  const [size, setSize] = useState(defaultSize);
  const containerRef = useRef<HTMLDivElement>(null);
  const isResizingRef = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    isResizingRef.current = true;
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
  };

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!isResizingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    let percentage = 50;
    if (direction === "horizontal") {
      const offset = e.clientX - rect.left;
      percentage = (offset / rect.width) * 100;
    } else {
      const offset = e.clientY - rect.top;
      percentage = (offset / rect.height) * 100;
    }

    if (percentage >= minSize && percentage <= maxSize) {
      setSize(percentage);
    }
  }, [direction, minSize, maxSize]);

  const onPointerUp = useCallback(() => {
    isResizingRef.current = false;
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);
  }, [onPointerMove]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex w-full h-[400px] border border-[var(--aurora-border-base)] rounded-[var(--aurora-radius-xl)] overflow-hidden bg-[var(--aurora-bg-app)]",
        direction === "horizontal" ? "flex-row" : "flex-col",
        className
      )}
    >
      {/* Left / Top Pane */}
      <div
        style={{
          flexBasis: `${size}%`,
          width: direction === "horizontal" ? `${size}%` : "100%",
          height: direction === "vertical" ? `${size}%` : "100%",
        }}
        className="overflow-auto"
      >
        {leftPane}
      </div>

      {/* Resizer bar */}
      <div
        onPointerDown={onPointerDown}
        className={cn(
          "bg-[var(--aurora-border-base)] hover:bg-[var(--aurora-primary)] active:bg-[var(--aurora-primary)] transition-colors shrink-0 select-none",
          direction === "horizontal"
            ? "w-1.5 h-full cursor-col-resize"
            : "h-1.5 w-full cursor-row-resize"
        )}
      />

      {/* Right / Bottom Pane */}
      <div
        style={{
          flexBasis: `${100 - size}%`,
          width: direction === "horizontal" ? `${100 - size}%` : "100%",
          height: direction === "vertical" ? `${100 - size}%` : "100%",
        }}
        className="overflow-auto"
      >
        {rightPane}
      </div>
    </div>
  );
};
export default SplitPane;