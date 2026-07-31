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
} from "@aurora-ui/ui";
import {
  HomeIcon,
  SettingsIcon,
  UserIcon,
  CalendarIcon,
  TerminalIcon,
} from "@aurora-ui/icons";

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
    <DashboardLayout
      headerContent={
        <div className="flex items-center gap-2">
          <Badge variant="solid" tone="primary" className="font-mono tracking-widest text-[10px] uppercase">
            AURORA SPEC-1.0
          </Badge>
          <span className="text-xs font-semibold text-[var(--aurora-fg-muted)]">Design System & UI Manual</span>
        </div>
      }
    >
      <div className="max-w-5xl mx-auto space-y-16 pb-20">

        {/* HERO HEADER */}
        <section className="border-b border-[var(--aurora-border-base)] pb-10 space-y-4">
          <Heading size="4xl" weight="black" className="tracking-tighter">
            Aurora UI
          </Heading>
          <Text size="lg" className="text-[var(--aurora-fg-muted)] max-w-3xl block">
            A timeless, modular, and mathematically proportioned React design system.
            No visual duplication, no Tailwind boilerplate dependencies. Pure architectural precision.
          </Text>

          {/* Theme Runtime Switcher */}
          <div className="flex flex-wrap gap-2 pt-4">
            <Button
              variant={theme === "light" ? "solid" : "outline"}
              onClick={() => setTheme("light")}
              size="sm"
            >
              Light Theme
            </Button>
            <Button
              variant={theme === "dark" ? "solid" : "outline"}
              onClick={() => setTheme("dark")}
              size="sm"
            >
              Dark Theme
            </Button>
            <Button
              variant={theme === "high-contrast" ? "solid" : "outline"}
              onClick={() => setTheme("high-contrast")}
              size="sm"
            >
              High Contrast
            </Button>
          </div>
        </section>

        {/* 1. FOUNDATIONS */}
        <section className="space-y-6">
          <Heading size="2xl" weight="bold">1. Primitive Foundations</Heading>
          <Text className="text-[var(--aurora-fg-muted)] block">
            Base building blocks driven by strict token scales.
          </Text>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Buttons & Badges */}
            <Card className="space-y-4">
              <Heading size="sm" weight="semibold">Interactive Buttons & Badges</Heading>

              <div className="flex flex-wrap gap-3 items-center">
                <Button variant={btnVariant} size={btnSize} loading={btnLoading}>
                  Dynamic Button
                </Button>
                <IconButton aria-label="Settings" variant="outline">
                  <SettingsIcon size={16} />
                </IconButton>
              </div>

              {/* Playground Controls */}
              <div className="pt-3 border-t border-[var(--aurora-border-subtle)] space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--aurora-fg-subtle)] block">Playground Controls</span>
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

            {/* Badges, Avatars, Chips */}
            <Card className="space-y-4">
              <Heading size="sm" weight="semibold">Status Badges & Identity chips</Heading>

              <div className="flex flex-wrap gap-2.5 items-center">
                <Badge variant="solid" tone="primary">Primary Solid</Badge>
                <Badge variant="soft" tone="accent">Accent Soft</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>

              <div className="flex flex-wrap gap-3 items-center">
                <Avatar fallback="AU" size="sm" />
                <Avatar fallback="JD" size="md" />
                <Avatar fallback="SA" size="lg" />
                <Chip onClose={() => toast({ title: "Removed Tag", type: "info" })}>Timeless</Chip>
              </div>
            </Card>
          </div>
        </section>

        {/* 2. FORM INTERACTIVE WIDGETS */}
        <section className="space-y-6">
          <Heading size="2xl" weight="bold">2. Input Controls & Forms</Heading>
          <Text className="text-[var(--aurora-fg-muted)] block">
            Stateful, functional, and keyboard accessible inputs.
          </Text>

          <Card className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--aurora-fg-muted)] uppercase tracking-wider">Base Text Input</label>
                <Input
                  placeholder="Enter text..."
                  value={textVal}
                  onChange={(e) => setTextVal(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <Checkbox
                  label="Accept Specifications"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
                <Switch
                  label="System Actuator"
                  checked={switchOn}
                  onChange={(e) => setSwitchOn(e.target.checked)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--aurora-fg-muted)] uppercase tracking-wider block">Slider Range Control ({sliderVal}%)</label>
                <Slider min={0} max={100} value={sliderVal} onChange={setSliderVal} />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--aurora-fg-muted)] uppercase tracking-wider block">Rating Node</label>
                <Rating value={ratingVal} onChange={setRatingVal} />
              </div>
            </div>
          </Card>
        </section>

        {/* 3. ACCESSIBLE OVERLAYS */}
        <section className="space-y-6">
          <Heading size="2xl" weight="bold">3. Overlays & Toasts</Heading>
          <Text className="text-[var(--aurora-fg-muted)] block">
            Interactive triggers with tactile Framer Motion exits.
          </Text>

          <Card className="flex flex-wrap gap-4 items-center">
            <Button onClick={() => toast({ title: "Aurora Toast Actuated", description: "Breathtaking premium spring layout.", type: "success" })}>
              Actuate Toast Notification
            </Button>
            <Button onClick={() => setIsDialogOpen(true)} variant="outline">
              Actuate Dialog Portal
            </Button>

            <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title="Aurora Specifications">
              <div className="space-y-4">
                <Text>
                  This dialog portal has focus trapping, lockable scroll background layers, and beautiful spring-physics bounce.
                </Text>
                <div className="flex justify-end gap-2.5">
                  <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Close Specifications</Button>
                  <Button onClick={() => { setIsDialogOpen(false); toast({ title: "Authorized", type: "success" }); }}>Authorize Setup</Button>
                </div>
              </div>
            </Dialog>
          </Card>
        </section>

        {/* 4. HERO ADVANCED MODULES */}
        <section className="space-y-8">
          <div className="border-b border-[var(--aurora-border-subtle)] pb-4">
            <Heading size="2xl" weight="bold">4. High-Fidelity Advanced Modules</Heading>
            <Text className="text-[var(--aurora-fg-muted)] block">
              Flagship complex components built completely from scratch.
            </Text>
          </div>

          {/* SPLIT PANE */}
          <div className="space-y-3">
            <Heading size="md" weight="bold">Split Pane Resizer (Nested Pane persistent tracking)</Heading>
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
          </div>

          {/* KANBAN BOARD */}
          <div className="space-y-3 pt-4">
            <Heading size="md" weight="bold">Kanban Board (Zero dependency Pointer-drag and drop)</Heading>
            <KanbanBoard />
          </div>

          {/* DATAGRID */}
          <div className="space-y-3 pt-4">
            <Heading size="md" weight="bold">DataGrid flagship (TanStack Table sorting & search)</Heading>
            <DataGrid columns={gridColumns} data={gridData} pageSize={5} />
          </div>

          {/* TERMINAL */}
          <div className="space-y-3 pt-4">
            <Heading size="md" weight="bold">Terminal Prompt (History tracking & Autocomplete)</Heading>
            <Terminal />
          </div>

          {/* CALENDAR & RANGE PICKER */}
          <div className="space-y-3 pt-4">
            <Heading size="md" weight="bold">Calendar Suite & DateRangePicker</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="flex flex-col items-center justify-center p-6">
                <span className="text-xs font-bold text-[var(--aurora-fg-muted)] uppercase tracking-wider mb-2">Absolute Inline Calendar</span>
                <Calendar value={new Date()} />
              </Card>
              <Card className="flex flex-col items-center justify-center p-6 space-y-4">
                <span className="text-xs font-bold text-[var(--aurora-fg-muted)] uppercase tracking-wider mb-2">Composite DateRangePicker Trigger</span>
                <DateRangePicker startDate={startD} endDate={endD} onChange={(s, e) => { setStartD(s); setEndD(e); }} />
              </Card>
            </div>
          </div>
        </section>

        {/* 5. MARKETING & LANDING COMPONENTS */}
        <section className="space-y-8 pt-8 border-t border-[var(--aurora-border-base)]">
          <Heading size="2xl" weight="bold">5. Timeless Marketing Templates</Heading>
          <Text className="text-[var(--aurora-fg-muted)] block">
            Polished sections designed to build entire dashboards, landing views, or admin hubs without requiring external libraries.
          </Text>

          <div className="space-y-12">
            <div className="border border-[var(--aurora-border-base)] rounded-[var(--aurora-radius-xl)] bg-[var(--aurora-bg-surface)] overflow-hidden">
              <div className="p-3 bg-[var(--aurora-bg-surface-hover)] border-b border-[var(--aurora-border-subtle)] text-xs text-[var(--aurora-fg-muted)] font-mono">
                Component Showcase: HeroSection + FeaturesSection + PricingSection
              </div>
              <HeroSection onCtaClick={() => toast({ title: "Experience Initiated", type: "info" })} />
              <FeaturesSection />
              <PricingSection />
            </div>
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}
