"use client";

import React, { useState } from "react";
import {
  useAuroraTheme,
  Button,
  IconButton,
  Text,
  Heading,
  Badge,
  Avatar,
  Chip,
  Card,
  Input,
  Checkbox,
  Switch,
  Slider,
  Rating,
  Tabs,
  ToastProvider,
  useToast,
  Dialog,
  Calendar,
  DateRangePicker,
  Terminal,
  SplitPane,
  KanbanBoard,
  DataGrid,
  DashboardLayout,
  HeroSection,
  FeaturesSection,
  PricingSection,
} from "@atui/ui";
import {
  HomeIcon,
  SettingsIcon,
  UserIcon,
  CalendarIcon,
  TerminalIcon,
} from "@atui/icons";

export default function DocsPage() {
  return (
    <ToastProvider>
      <DocsPageContent />
    </ToastProvider>
  );
}

function DocsPageContent() {
  const { theme, setTheme } = useAuroraTheme();
  const { toast } = useToast();

  // Dialog Control
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Playground state parameters
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnSize, setBtnSize] = useState<"sm" | "md" | "lg">("md");
  const [btnVariant, setBtnVariant] = useState<"solid" | "soft" | "outline" | "ghost" | "glass">("solid");

  // Input Controls
  const [textVal, setTextVal] = useState("");
  const [checked, setChecked] = useState(false);
  const [switchOn, setSwitchOn] = useState(true);
  const [sliderVal, setSliderVal] = useState(50);
  const [ratingVal, setRatingVal] = useState(4);

  // Date Range state
  const [startD, setStartD] = useState<Date | undefined>(new Date());
  const [endD, setEndD] = useState<Date | undefined>(new Date(Date.now() + 86400000 * 3));

  // DataGrid Dummy data
  const gridColumns = [
    { header: "ID", accessorKey: "id", size: 60 },
    { header: "Component Name", accessorKey: "name" },
    { header: "Status", accessorKey: "status" },
    { header: "Quality Tier", accessorKey: "tier" },
  ];
  const gridData = [
    { id: "1", name: "DataGrid", status: "Ready", tier: "Flagship" },
    { id: "2", name: "Kanban Board", status: "Ready", tier: "High Fidelity" },
    { id: "3", name: "Terminal System", status: "Ready", tier: "Advanced" },
    { id: "4", name: "Calendar Picker", status: "Ready", tier: "Flagship" },
    { id: "5", name: "Split Resizer", status: "Ready", tier: "Advanced" },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--aurora-bg-app)] text-[var(--aurora-fg-base)] font-sans antialiased">

      {/* 1. STICKY LEFT SIDEBAR (TailwindCSS / Radix Style) */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-[var(--aurora-border-base)] bg-[var(--aurora-bg-surface)] overflow-y-auto lg:block">
        <div className="sticky top-0 p-6 border-b border-[var(--aurora-border-subtle)] bg-[var(--aurora-bg-surface)]/80 backdrop-blur-md flex items-center gap-3">
          <div className="h-7 w-7 rounded bg-[var(--aurora-primary)] flex items-center justify-center text-[var(--aurora-fg-inverse)] font-black text-xs">
            AT
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-lg block leading-none">ATUI</span>
            <span className="text-[10px] text-[var(--aurora-fg-muted)] font-mono">v1.0.0-beta</span>
          </div>
        </div>

        <nav className="p-6 space-y-8">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--aurora-fg-muted)] block">Getting Started</span>
            <div className="space-y-1">
              <a href="#introduction" className="flex items-center px-3 py-1.5 rounded text-sm text-[var(--aurora-fg-muted)] hover:text-[var(--aurora-fg-base)] transition-colors">Introduction</a>
              <a href="#theming" className="flex items-center px-3 py-1.5 rounded text-sm text-[var(--aurora-fg-muted)] hover:text-[var(--aurora-fg-base)] transition-colors">Theme Switcher</a>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--aurora-fg-muted)] block">1. Foundations</span>
            <div className="space-y-1">
              <a href="#buttons" className="flex items-center px-3 py-1.5 rounded text-sm text-[var(--aurora-fg-muted)] hover:text-[var(--aurora-fg-base)] transition-colors">Buttons & Badges</a>
              <a href="#chips" className="flex items-center px-3 py-1.5 rounded text-sm text-[var(--aurora-fg-muted)] hover:text-[var(--aurora-fg-base)] transition-colors">Identity Chips</a>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--aurora-fg-muted)] block">2. Input Fields</span>
            <div className="space-y-1">
              <a href="#inputs" className="flex items-center px-3 py-1.5 rounded text-sm text-[var(--aurora-fg-muted)] hover:text-[var(--aurora-fg-base)] transition-colors">Inputs & Controls</a>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--aurora-fg-muted)] block">3. Overlays</span>
            <div className="space-y-1">
              <a href="#overlays" className="flex items-center px-3 py-1.5 rounded text-sm text-[var(--aurora-fg-muted)] hover:text-[var(--aurora-fg-base)] transition-colors">Toasts & Dialogs</a>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--aurora-fg-muted)] block">4. Advanced Modules</span>
            <div className="space-y-1">
              <a href="#splitpane" className="flex items-center px-3 py-1.5 rounded text-sm text-[var(--aurora-fg-muted)] hover:text-[var(--aurora-fg-base)] transition-colors">Split Pane</a>
              <a href="#kanban" className="flex items-center px-3 py-1.5 rounded text-sm text-[var(--aurora-fg-muted)] hover:text-[var(--aurora-fg-base)] transition-colors">Kanban Board</a>
              <a href="#datagrid" className="flex items-center px-3 py-1.5 rounded text-sm text-[var(--aurora-fg-muted)] hover:text-[var(--aurora-fg-base)] transition-colors">Flagship DataGrid</a>
              <a href="#terminal" className="flex items-center px-3 py-1.5 rounded text-sm text-[var(--aurora-fg-muted)] hover:text-[var(--aurora-fg-base)] transition-colors">Terminal Emulator</a>
              <a href="#calendar" className="flex items-center px-3 py-1.5 rounded text-sm text-[var(--aurora-fg-muted)] hover:text-[var(--aurora-fg-base)] transition-colors">Calendar Suite</a>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--aurora-fg-muted)] block">5. Layouts</span>
            <div className="space-y-1">
              <a href="#marketing" className="flex items-center px-3 py-1.5 rounded text-sm text-[var(--aurora-fg-muted)] hover:text-[var(--aurora-fg-base)] transition-colors">Marketing Section</a>
            </div>
          </div>
        </nav>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 lg:pl-64">
        <div className="max-w-4xl px-6 py-12 mx-auto space-y-20 lg:px-12">

          {/* HEADER TOP BAR */}
          <header className="flex items-center justify-between border-b border-[var(--aurora-border-subtle)] pb-6">
            <div className="flex items-center gap-2">
              <Badge variant="solid" tone="primary" className="font-mono text-[9px] uppercase tracking-widest">
                SPEC-1.0
              </Badge>
              <Text size="xs" className="text-[var(--aurora-fg-muted)]">Timeless React Architecture Manual</Text>
            </div>

            {/* Theme Runtime Switcher */}
            <div className="flex items-center gap-1.5 border border-[var(--aurora-border-base)] rounded-lg p-1 bg-[var(--aurora-bg-surface-hover)]">
              <button
                onClick={() => setTheme("light")}
                className={`px-2.5 py-1 text-xs rounded font-semibold transition-all ${theme === "light" ? "bg-[var(--aurora-primary)] text-[var(--aurora-fg-inverse)] shadow" : "text-[var(--aurora-fg-muted)] hover:text-[var(--aurora-fg-base)]"}`}
              >
                Light
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`px-2.5 py-1 text-xs rounded font-semibold transition-all ${theme === "dark" ? "bg-[var(--aurora-primary)] text-[var(--aurora-fg-inverse)] shadow" : "text-[var(--aurora-fg-muted)] hover:text-[var(--aurora-fg-base)]"}`}
              >
                Dark
              </button>
              <button
                onClick={() => setTheme("high-contrast")}
                className={`px-2.5 py-1 text-xs rounded font-semibold transition-all ${theme === "high-contrast" ? "bg-[var(--aurora-primary)] text-[var(--aurora-fg-inverse)] shadow" : "text-[var(--aurora-fg-muted)] hover:text-[var(--aurora-fg-base)]"}`}
              >
                Contrast
              </button>
            </div>
          </header>

          {/* INTRODUCTION */}
          <section id="introduction" className="space-y-4 scroll-mt-24">
            <Heading size="3xl" weight="black" className="tracking-tighter">
              Introduction
            </Heading>
            <p className="text-base text-[var(--aurora-fg-muted)] leading-relaxed">
              ATUI is a production-ready, futuristic, and architectural React design system ecosystem designed for developers who value visual uniqueness and elite performance. Written from scratch with zero boilerplate Tailwind component duplication, ATUI provides modular mathematical primitives and ultra-responsive flagship modules that align precisely with WCAG AA accessibility guides.
            </p>
          </section>

          {/* BUTTONS & BADGES */}
          <section id="buttons" className="space-y-6 scroll-mt-24">
            <div className="border-b border-[var(--aurora-border-subtle)] pb-2">
              <Heading size="2xl" weight="bold">Buttons & Badges</Heading>
              <Text className="text-[var(--aurora-fg-muted)] block">Foundational primitives supporting dynamic sizing, variant overlays, and loading indicators.</Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="space-y-4">
                <Heading size="sm" weight="semibold">Interactive Buttons</Heading>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button variant={btnVariant} size={btnSize} loading={btnLoading}>
                    Dynamic Button
                  </Button>
                  <IconButton aria-label="Settings" variant="outline">
                    <SettingsIcon size={16} />
                  </IconButton>
                </div>

                <div className="pt-3 border-t border-[var(--aurora-border-subtle)] space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--aurora-fg-subtle)] block">Playground Controls</span>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setBtnLoading(!btnLoading)}>
                      Toggle Loading
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setBtnSize(btnSize === "sm" ? "md" : btnSize === "md" ? "lg" : "sm")}>
                      Size: {btnSize.toUpperCase()}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setBtnVariant(btnVariant === "solid" ? "soft" : btnVariant === "soft" ? "outline" : btnVariant === "outline" ? "ghost" : btnVariant === "ghost" ? "glass" : "solid")}>
                      Variant: {btnVariant.toUpperCase()}
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="space-y-4">
                <Heading size="sm" weight="semibold">Status Badges</Heading>
                <div className="flex flex-wrap gap-2.5 items-center">
                  <Badge variant="solid" tone="primary">Primary Solid</Badge>
                  <Badge variant="soft" tone="accent">Accent Soft</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
                <Text size="xs" className="text-[var(--aurora-fg-muted)] leading-relaxed">
                  Badges reflect critical statuses dynamically, deriving exact contrasts mathematically based on the active variable theme.
                </Text>
              </Card>
            </div>

            {/* PROP TABLE */}
            <div className="pt-4 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[var(--aurora-border-base)] text-[var(--aurora-fg-muted)]">
                    <th className="pb-2 font-bold uppercase">Prop</th>
                    <th className="pb-2 font-bold uppercase">Type</th>
                    <th className="pb-2 font-bold uppercase">Default</th>
                    <th className="pb-2 font-bold uppercase">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--aurora-border-subtle)] text-[var(--aurora-fg-base)]">
                  <tr>
                    <td className="py-2.5 font-mono font-bold text-[var(--aurora-primary)]">variant</td>
                    <td className="py-2.5 font-mono">"solid" | "soft" | "outline" | "ghost" | "glass"</td>
                    <td className="py-2.5 font-mono">"solid"</td>
                    <td className="py-2.5">The visual rendering overlay template.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-mono font-bold text-[var(--aurora-primary)]">size</td>
                    <td className="py-2.5 font-mono">"sm" | "md" | "lg"</td>
                    <td className="py-2.5 font-mono">"md"</td>
                    <td className="py-2.5">Component padding and typography heights.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* IDENTITY CHIPS */}
          <section id="chips" className="space-y-6 scroll-mt-24">
            <div className="border-b border-[var(--aurora-border-subtle)] pb-2">
              <Heading size="2xl" weight="bold">Identity Chips & Avatars</Heading>
              <Text className="text-[var(--aurora-fg-muted)] block">Dynamic labels, profiles, and state-tag indicators.</Text>
            </div>

            <Card className="flex flex-wrap gap-4 items-center p-6">
              <Avatar fallback="AT" size="sm" />
              <Avatar fallback="JD" size="md" />
              <Avatar fallback="SA" size="lg" />
              <Chip onClose={() => toast({ title: "Removed Tag", type: "info" })}>Timeless</Chip>
              <Chip>Architectural</Chip>
            </Card>
          </section>

          {/* INPUT CONTROLS */}
          <section id="inputs" className="space-y-6 scroll-mt-24">
            <div className="border-b border-[var(--aurora-border-subtle)] pb-2">
              <Heading size="2xl" weight="bold">Inputs & Controls</Heading>
              <Text className="text-[var(--aurora-fg-muted)] block">Complete suite of fully controllable form actuators, switches, and parameters.</Text>
            </div>

            <Card className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--aurora-fg-muted)] uppercase tracking-wider block">Base Text Input</label>
                  <Input
                    placeholder="Enter text..."
                    value={textVal}
                    onChange={(e) => setTextVal(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                  <Checkbox
                    label="Accept Terms"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                  <Switch
                    label="Actuator Switched"
                    checked={switchOn}
                    onChange={(e) => setSwitchOn(e.target.checked)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--aurora-fg-muted)] uppercase tracking-wider block">Slider Control ({sliderVal}%)</label>
                  <Slider min={0} max={100} value={sliderVal} onChange={setSliderVal} />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--aurora-fg-muted)] uppercase tracking-wider block">Rating Node</label>
                  <Rating value={ratingVal} onChange={setRatingVal} />
                </div>
              </div>
            </Card>
          </section>

          {/* TOASTS & DIALOGS */}
          <section id="overlays" className="space-y-6 scroll-mt-24">
            <div className="border-b border-[var(--aurora-border-subtle)] pb-2">
              <Heading size="2xl" weight="bold">Toasts & Dialog Portals</Heading>
              <Text className="text-[var(--aurora-fg-muted)] block">Interactive triggered boxes and backdrops utilizing spring motion.</Text>
            </div>

            <Card className="flex flex-wrap gap-4 items-center p-6">
              <Button onClick={() => toast({ title: "ATUI Toast Notification", description: "Breathtaking premium spring layout.", type: "success" })}>
                Actuate Toast Notification
              </Button>
              <Button onClick={() => setIsDialogOpen(true)} variant="outline">
                Actuate Dialog Portal
              </Button>

              <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title="ATUI Specifications">
                <div className="space-y-4">
                  <Text>
                    This dialog portal has focus trapping, lockable scroll background layers, and beautiful spring-physics bounce.
                  </Text>
                  <div className="flex justify-end gap-2.5">
                    <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Close</Button>
                    <Button onClick={() => { setIsDialogOpen(false); toast({ title: "Authorized", type: "success" }); }}>Authorize</Button>
                  </div>
                </div>
              </Dialog>
            </Card>
          </section>

          {/* SPLIT PANE */}
          <section id="splitpane" className="space-y-6 scroll-mt-24">
            <div className="border-b border-[var(--aurora-border-subtle)] pb-2">
              <Heading size="2xl" weight="bold">Split Pane Resizer</Heading>
              <Text className="text-[var(--aurora-fg-muted)] block">An advanced draggable layout separator bar.</Text>
            </div>

            <SplitPane
              direction="horizontal"
              leftPane={
                <div className="p-4 bg-[var(--aurora-bg-surface-hover)] h-full flex flex-col justify-center items-center">
                  <Heading size="sm">Workspace Left</Heading>
                  <Text size="xs" className="text-[var(--aurora-fg-muted)] mt-1">Drag resizer bar</Text>
                </div>
              }
              rightPane={
                <div className="p-4 bg-[var(--aurora-bg-surface)] h-full flex flex-col justify-center items-center">
                  <Heading size="sm">Workspace Right</Heading>
                  <Text size="xs" className="text-[var(--aurora-fg-muted)] mt-1">Directly persistent sizing</Text>
                </div>
              }
            />
          </section>

          {/* KANBAN BOARD */}
          <section id="kanban" className="space-y-6 scroll-mt-24">
            <div className="border-b border-[var(--aurora-border-subtle)] pb-2">
              <Heading size="2xl" weight="bold">Kanban Board</Heading>
              <Text className="text-[var(--aurora-fg-muted)] block">Pointer-events and Framer Motion based task planner workspace.</Text>
            </div>

            <KanbanBoard />
          </section>

          {/* FLAGSHIP DATAGRID */}
          <section id="datagrid" className="space-y-6 scroll-mt-24">
            <div className="border-b border-[var(--aurora-border-subtle)] pb-2">
              <Heading size="2xl" weight="bold">Flagship DataGrid</Heading>
              <Text className="text-[var(--aurora-fg-muted)] block">High-performance grid utilizing TanStack Table, sorting, filtering, and pagination.</Text>
            </div>

            <DataGrid columns={gridColumns} data={gridData} pageSize={5} />
          </section>

          {/* TERMINAL EMULATOR */}
          <section id="terminal" className="space-y-6 scroll-mt-24">
            <div className="border-b border-[var(--aurora-border-subtle)] pb-2">
              <Heading size="2xl" weight="bold">Terminal Prompt</Heading>
              <Text className="text-[var(--aurora-fg-muted)] block">A fully interactive command prompt terminal supporting command history and Tab autocomplete.</Text>
            </div>

            <Terminal />
          </section>

          {/* CALENDAR SUITE */}
          <section id="calendar" className="space-y-6 scroll-mt-24">
            <div className="border-b border-[var(--aurora-border-subtle)] pb-2">
              <Heading size="2xl" weight="bold">Calendar Picker & DateRangePicker</Heading>
              <Text className="text-[var(--aurora-fg-muted)] block">Robust scratch-built calendar suite supporting month offsets and trigger popovers.</Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="flex flex-col items-center justify-center p-6 bg-[var(--aurora-bg-surface)]">
                <span className="text-xs font-bold text-[var(--aurora-fg-muted)] uppercase tracking-wider mb-2">Absolute Inline Calendar</span>
                <Calendar value={new Date()} />
              </Card>
              <Card className="flex flex-col items-center justify-center p-6 space-y-4 bg-[var(--aurora-bg-surface)]">
                <span className="text-xs font-bold text-[var(--aurora-fg-muted)] uppercase tracking-wider mb-2">Composite DateRangePicker Trigger</span>
                <DateRangePicker startDate={startD} endDate={endD} onChange={(s, e) => { setStartD(s); setEndD(e); }} />
              </Card>
            </div>
          </section>

          {/* MARKETING SECTION */}
          <section id="marketing" className="space-y-6 scroll-mt-24">
            <div className="border-b border-[var(--aurora-border-subtle)] pb-2">
              <Heading size="2xl" weight="bold">Timeless Marketing Section Layouts</Heading>
              <Text className="text-[var(--aurora-fg-muted)] block">Section structures allowing visitors to deploy high-converting pages immediately.</Text>
            </div>

            <div className="border border-[var(--aurora-border-base)] rounded-[var(--aurora-radius-xl)] bg-[var(--aurora-bg-surface)] overflow-hidden">
              <HeroSection onCtaClick={() => toast({ title: "Experience Initiated", type: "info" })} />
              <FeaturesSection />
              <PricingSection />
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}