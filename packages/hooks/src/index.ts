import { useState, useEffect, useCallback, useRef } from "react";

/**
 * useControllableState
 * Elegantly handles both controlled and uncontrolled component states.
 */
export function useControllableState<T>({
  prop,
  defaultProp,
  onChange,
}: {
  prop?: T;
  defaultProp?: T;
  onChange?: (state: T) => void;
}) {
  const [uncontrolledProp, setUncontrolledProp] = useState<T>(defaultProp as T);
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProp;

  const setValue = useCallback(
    (nextValue: T | ((prev: T) => T)) => {
      const resolvedValue =
        typeof nextValue === "function"
          ? (nextValue as (prev: T) => T)(value)
          : nextValue;

      if (!isControlled) {
        setUncontrolledProp(resolvedValue);
      }

      onChange?.(resolvedValue);
    },
    [isControlled, value, onChange]
  );

  return [value, setValue] as const;
}

/**
 * usePrefersReducedMotion
 * Detects whether the user prefers reduced motion.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return prefersReduced;
}

/**
 * useClipboard
 * Copy content to clipboard seamlessly with stateful feedback.
 */
export function useClipboard({ timeout = 2000 } = {}) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    (text: string) => {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
        });
      }
    },
    []
  );

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), timeout);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [copied, timeout]);

  return { copied, copy };
}

/**
 * usePointerDrag
 * Extremely clean, lightweight pointer drag tracker for widgets, kanban, or resize panes.
 */
interface DragOptions {
  onDragStart?: (event: PointerEvent) => void;
  onDragMove?: (event: PointerEvent, delta: { x: number; y: number }) => void;
  onDragEnd?: (event: PointerEvent) => void;
}

export function usePointerDrag() {
  const dragOptionsRef = useRef<DragOptions | null>(null);
  const startPosRef = useRef({ x: 0, y: 0 });

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!dragOptionsRef.current) return;
    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;
    dragOptionsRef.current.onDragMove?.(e, { x: deltaX, y: deltaY });
  }, []);

  const onPointerUp = useCallback((e: PointerEvent) => {
    if (!dragOptionsRef.current) return;
    dragOptionsRef.current.onDragEnd?.(e);
    dragOptionsRef.current = null;
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);
  }, [onPointerMove]);

  const startDrag = useCallback(
    (e: React.PointerEvent, options: DragOptions) => {
      dragOptionsRef.current = options;
      startPosRef.current = { x: e.clientX, y: e.clientY };
      options.onDragStart?.(e.nativeEvent);
      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
    },
    [onPointerMove, onPointerUp]
  );

  useEffect(() => {
    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    };
  }, [onPointerMove, onPointerUp]);

  return startDrag;
}