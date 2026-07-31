import React, { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@aurora-ui/utils";
import { CloseIcon, InfoIcon, AlertCircleIcon, CheckIcon } from "@aurora-ui/icons";

// ============================================================================
// --- TOAST SERVICE & PROVIDER ---
// ============================================================================
export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  type?: "info" | "success" | "error";
}

interface ToastContextProps {
  toast: (item: Omit<ToastItem, "id">) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = (item: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...item, id }]);
  };

  const remove = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[var(--aurora-zIndex-toast)] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              className="pointer-events-auto bg-[var(--aurora-bg-surface)] border border-[var(--aurora-border-base)] rounded-[var(--aurora-radius-lg)] p-4 shadow-[var(--aurora-shadow-lg)] flex gap-3 items-start justify-between backdrop-blur-md"
            >
              <div className="flex gap-2.5 items-start">
                <span className={cn("mt-0.5", {
                  "text-[var(--aurora-primary)]": t.type === "info" || !t.type,
                  "text-emerald-500": t.type === "success",
                  "text-red-500": t.type === "error"
                })}>
                  {t.type === "success" ? <CheckIcon size={18} /> : t.type === "error" ? <AlertCircleIcon size={18} /> : <InfoIcon size={18} />}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-[var(--aurora-fg-base)]">{t.title}</h4>
                  {t.description && <p className="text-xs text-[var(--aurora-fg-muted)] mt-0.5">{t.description}</p>}
                </div>
              </div>
              <button
                onClick={() => remove(t.id)}
                className="text-[var(--aurora-fg-subtle)] hover:text-[var(--aurora-fg-base)] transition-colors p-0.5"
              >
                <CloseIcon size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// ============================================================================
// --- DIALOG / MODAL ---
// ============================================================================
export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[var(--aurora-zIndex-dialog)] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-lg bg-[var(--aurora-bg-surface)] border border-[var(--aurora-border-base)] rounded-[var(--aurora-radius-xl)] p-6 shadow-[var(--aurora-shadow-lg)] text-[var(--aurora-fg-base)] z-[10]"
          >
            <div className="flex items-center justify-between border-b border-[var(--aurora-border-subtle)] pb-4 mb-4">
              {title && <h3 className="text-lg font-bold">{title}</h3>}
              <button
                onClick={onClose}
                className="text-[var(--aurora-fg-subtle)] hover:text-[var(--aurora-fg-base)] transition-colors p-1 rounded-full hover:bg-[var(--aurora-bg-surface-hover)]"
              >
                <CloseIcon size={18} />
              </button>
            </div>
            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// --- TOOLTIP ---
// ============================================================================
export interface TooltipProps {
  content: string;
  children: React.ReactElement;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, className }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 4 }}
            className={cn(
              "absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-[var(--aurora-zIndex-tooltip)] px-2 py-1 text-xs font-medium text-[var(--aurora-fg-inverse)] bg-[var(--aurora-fg-base)] rounded-[var(--aurora-radius-sm)] shadow-[var(--aurora-shadow-sm)] whitespace-nowrap pointer-events-none",
              className
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// --- POPOVER ---
// ============================================================================
export interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Popover: React.FC<PopoverProps> = ({ trigger, children, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Click-away overlay */}
            <div className="fixed inset-0 z-[var(--aurora-zIndex-popover)]" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              className={cn(
                "absolute left-0 mt-2 z-[var(--aurora-zIndex-popover)] min-w-[200px] p-3 bg-[var(--aurora-bg-surface)] border border-[var(--aurora-border-base)] rounded-[var(--aurora-radius-lg)] shadow-[var(--aurora-shadow-lg)] text-[var(--aurora-fg-base)]",
                className
              )}
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};