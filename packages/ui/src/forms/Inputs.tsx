import React, { forwardRef, useState } from "react";
import { cn } from "@aurora-ui/utils";

// --- BASE INPUT ---
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-10 w-full rounded-[var(--aurora-radius-md)] border border-[var(--aurora-border-base)] bg-[var(--aurora-bg-surface)] px-3 py-2 text-sm text-[var(--aurora-fg-base)] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--aurora-fg-subtle)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--aurora-primary)] focus-visible:border-[var(--aurora-primary)] disabled:cursor-not-allowed disabled:opacity-50 transition-all",
          error && "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

// --- TEXTAREA ---
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[80px] w-full rounded-[var(--aurora-radius-md)] border border-[var(--aurora-border-base)] bg-[var(--aurora-bg-surface)] px-3 py-2 text-sm text-[var(--aurora-fg-base)] placeholder:text-[var(--aurora-fg-subtle)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--aurora-primary)] focus-visible:border-[var(--aurora-primary)] disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-y",
          error && "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

// --- PASSWORD INPUT ---
export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className="relative w-full">
        <Input
          ref={ref}
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[var(--aurora-fg-muted)] hover:text-[var(--aurora-fg-base)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--aurora-primary)] rounded"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

// --- CHECKBOX ---
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex items-center gap-2.5 cursor-pointer select-none text-sm text-[var(--aurora-fg-base)]">
        <input
          ref={ref}
          type="checkbox"
          className={cn(
            "h-4.5 w-4.5 rounded-[var(--aurora-radius-xs)] border border-[var(--aurora-border-base)] bg-[var(--aurora-bg-surface)] text-[var(--aurora-primary)] focus:ring-[var(--aurora-primary)] focus:ring-offset-0 disabled:opacity-50 cursor-pointer transition-all accent-[var(--aurora-primary)]",
            className
          )}
          {...props}
        />
        {label && <span>{label}</span>}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";

// --- RADIO ---
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex items-center gap-2.5 cursor-pointer select-none text-sm text-[var(--aurora-fg-base)]">
        <input
          ref={ref}
          type="radio"
          className={cn(
            "h-4.5 w-4.5 rounded-full border border-[var(--aurora-border-base)] bg-[var(--aurora-bg-surface)] text-[var(--aurora-primary)] focus:ring-[var(--aurora-primary)] focus:ring-offset-0 disabled:opacity-50 cursor-pointer transition-all accent-[var(--aurora-primary)]",
            className
          )}
          {...props}
        />
        {label && <span>{label}</span>}
      </label>
    );
  }
);
Radio.displayName = "Radio";

// --- SWITCH ---
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, checked, onChange, ...props }, ref) => {
    return (
      <label className="flex items-center gap-3 cursor-pointer select-none text-sm text-[var(--aurora-fg-base)]">
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            className="sr-only peer"
            checked={checked}
            onChange={onChange}
            {...props}
          />
          <div className="w-9 h-5 bg-[var(--aurora-border-strong)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[var(--aurora-primary)]" />
        </div>
        {label && <span>{label}</span>}
      </label>
    );
  }
);
Switch.displayName = "Switch";

// --- SLIDER ---
export interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}
export const Slider: React.FC<SliderProps> = ({ min, max, value, onChange, className }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  return (
    <div className={cn("relative w-full flex items-center h-4 select-none touch-none", className)}>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-[var(--aurora-border-base)] rounded-lg appearance-none cursor-pointer accent-[var(--aurora-primary)]"
        style={{
          background: `linear-gradient(to right, var(--aurora-primary) ${percentage}%, var(--aurora-border-base) ${percentage}%)`,
        }}
      />
    </div>
  );
};

// --- RATING ---
export interface RatingProps {
  max?: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}
export const Rating: React.FC<RatingProps> = ({ max = 5, value, onChange, className }) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1;
        const isActive = hoverValue !== null ? starValue <= hoverValue : starValue <= value;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHoverValue(starValue)}
            onMouseLeave={() => setHoverValue(null)}
            className="text-[var(--aurora-fg-subtle)] hover:scale-110 transition-transform focus-visible:outline-none"
            style={{ color: isActive ? "gold" : "inherit" }}
          >
            ★
          </button>
        );
      })}
    </div>
  );
};

// --- OTP INPUT ---
export interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (val: string) => void;
  className?: string;
}
export const OTPInput: React.FC<OTPInputProps> = ({ length = 6, value, onChange, className }) => {
  const inputsRef = React.useRef<HTMLInputElement[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.substring(e.target.value.length - 1);
    const newValueArr = value.split("");
    newValueArr[index] = val;
    const nextVal = newValueArr.join("");
    onChange(nextVal);

    if (val && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            if (el) inputsRef.current[i] = el;
          }}
          type="text"
          value={value[i] || ""}
          onChange={(e) => handleInput(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="w-10 h-12 text-center text-lg font-semibold rounded-[var(--aurora-radius-md)] border border-[var(--aurora-border-base)] bg-[var(--aurora-bg-surface)] text-[var(--aurora-fg-base)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--aurora-primary)]"
        />
      ))}
    </div>
  );
};

// --- TAGS INPUT ---
export interface TagsInputProps {
  placeholder?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  className?: string;
}
export const TagsInput: React.FC<TagsInputProps> = ({ placeholder = "Add tag...", value, onChange, className }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()]);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, value.length - 1));
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div
      className={cn(
        "flex flex-wrap gap-1.5 p-1.5 w-full rounded-[var(--aurora-radius-md)] border border-[var(--aurora-border-base)] bg-[var(--aurora-bg-surface)] focus-within:ring-1 focus-within:ring-[var(--aurora-primary)] transition-all min-h-10",
        className
      )}
    >
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 bg-[var(--aurora-primary-subtle)] text-[var(--aurora-fg-primary)] border border-[var(--aurora-primary-border)] text-xs font-semibold px-2 py-0.5 rounded-full"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="hover:bg-[var(--aurora-border-base)] rounded-full p-0.5"
          >
            ×
          </button>
        </span>
      ))}
      <input
        type="text"
        placeholder={value.length === 0 ? placeholder : ""}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent text-sm text-[var(--aurora-fg-base)] focus-visible:outline-none placeholder:text-[var(--aurora-fg-subtle)] min-w-[120px] px-1.5"
      />
    </div>
  );
};