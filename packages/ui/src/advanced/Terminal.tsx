import React, { useState, useEffect, useRef } from "react";
import { cn } from "@aurora-ui/utils";

export interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "success";
}

export interface TerminalProps {
  welcomeMessage?: string;
  prompt?: string;
  onCommand?: (command: string) => string | Promise<string>;
  autocompleteCommands?: string[];
  className?: string;
}

export const Terminal: React.FC<TerminalProps> = ({
  welcomeMessage = "Welcome to Aurora Terminal v1.0. Ready.",
  prompt = "aurora-user@host:~$",
  onCommand,
  autocompleteCommands = ["help", "clear", "themes", "about", "tokens"],
  className,
}) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { text: welcomeMessage, type: "output" }
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    const newLines = [...lines, { text: `${prompt} ${cmd}`, type: "input" as const }];
    setLines(newLines);
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setInput("");

    if (cmd.toLowerCase() === "clear") {
      setLines([]);
      return;
    }

    if (onCommand) {
      try {
        const response = await onCommand(cmd);
        setLines((prev) => [...prev, { text: response, type: "output" }]);
      } catch (err: any) {
        setLines((prev) => [...prev, { text: `Error: ${err?.message || err}`, type: "error" }]);
      }
    } else {
      if (cmd.toLowerCase() === "help") {
        setLines((prev) => [
          ...prev,
          { text: "Available commands: help, clear, themes, about", type: "output" }
        ]);
      } else if (cmd.toLowerCase() === "themes") {
        setLines((prev) => [
          ...prev,
          { text: "Aurora UI supports Light, Dark, and High Contrast runtime themes.", type: "success" }
        ]);
      } else if (cmd.toLowerCase() === "about") {
        setLines((prev) => [
          ...prev,
          { text: "Aurora UI - A premium architectural design system ecosystem built with React 19.", type: "output" }
        ]);
      } else {
        setLines((prev) => [
          ...prev,
          { text: `Command not found: ${cmd}. Type 'help' for options.`, type: "error" }
        ]);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      if (historyIndex === history.length - 1) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex] || "");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = autocompleteCommands.find((c) => c.startsWith(input));
      if (match) {
        setInput(match);
      }
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col h-[320px] w-full rounded-[var(--aurora-radius-xl)] bg-[#050505] border border-[var(--aurora-border-base)] p-4 font-mono text-sm leading-relaxed overflow-hidden text-[#FAFAFA] shadow-[var(--aurora-shadow-lg)] cursor-text",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={containerRef} className="flex-1 overflow-y-auto space-y-1.5 scrollbar-thin">
        {lines.map((line, i) => (
          <div
            key={i}
            className={cn({
              "text-[var(--aurora-primary)]": line.type === "input",
              "text-emerald-400": line.type === "success",
              "text-red-400": line.type === "error",
              "text-[#FAFAFA]/90": line.type === "output",
            })}
          >
            {line.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-2 border-t border-[var(--aurora-border-subtle)] mt-2 shrink-0">
        <span className="text-[var(--aurora-primary)] font-bold">{prompt}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-[#FAFAFA] border-0 focus:outline-none focus:ring-0 p-0 font-mono text-sm"
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
};
export default Terminal;