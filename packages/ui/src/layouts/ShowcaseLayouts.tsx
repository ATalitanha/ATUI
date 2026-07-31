import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@aurora-ui/utils";
import {
  HomeIcon,
  SettingsIcon,
  UserIcon,
  CalendarIcon,
  TerminalIcon,
  MenuIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@aurora-ui/icons";
import { Button } from "../primitives/Button/Button";
import { Card } from "../primitives/Layout/Layout";

// ============================================================================
// --- DASHBOARD LAYOUT ---
// ============================================================================
export const DashboardLayout: React.FC<{
  sidebarContent?: React.ReactNode;
  headerContent?: React.ReactNode;
  children: React.ReactNode;
}> = ({ sidebarContent, headerContent, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-[var(--aurora-bg-app)] overflow-hidden text-[var(--aurora-fg-base)]">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 260 : 0 }}
        className={cn(
          "h-full bg-[var(--aurora-bg-surface)] border-r border-[var(--aurora-border-base)] flex flex-col overflow-hidden relative shrink-0",
          !sidebarOpen && "border-r-0"
        )}
      >
        <div className="p-5 border-b border-[var(--aurora-border-subtle)] flex items-center gap-2">
          <div className="h-6.5 w-6.5 rounded bg-[var(--aurora-primary)]" />
          <span className="font-extrabold tracking-wider text-sm uppercase">Aurora UI</span>
        </div>
        <div className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {sidebarContent || (
            <div className="space-y-1">
              <Button variant="soft" className="w-full justify-start text-xs font-bold uppercase tracking-wider" leadingIcon={<HomeIcon size={16} />}>
                Overview
              </Button>
              <Button variant="ghost" className="w-full justify-start text-xs font-bold uppercase tracking-wider" leadingIcon={<UserIcon size={16} />}>
                Workspace
              </Button>
              <Button variant="ghost" className="w-full justify-start text-xs font-bold uppercase tracking-wider" leadingIcon={<CalendarIcon size={16} />}>
                Calendar
              </Button>
              <Button variant="ghost" className="w-full justify-start text-xs font-bold uppercase tracking-wider" leadingIcon={<TerminalIcon size={16} />}>
                Terminal
              </Button>
              <Button variant="ghost" className="w-full justify-start text-xs font-bold uppercase tracking-wider" leadingIcon={<SettingsIcon size={16} />}>
                Settings
              </Button>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-[var(--aurora-border-base)] bg-[var(--aurora-bg-surface)] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 h-8 w-8">
              <MenuIcon size={18} />
            </Button>
            {headerContent || <span className="font-bold text-sm">Dashboard Overview</span>}
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[var(--aurora-primary-subtle)] border border-[var(--aurora-primary-border)] flex items-center justify-center font-bold text-xs text-[var(--aurora-fg-primary)]">
              AU
            </div>
          </div>
        </header>

        {/* Workspace Body */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
};

// ============================================================================
// --- HERO SECTION ---
// ============================================================================
export const HeroSection: React.FC<{
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}> = ({
  title = "Intelligent Architecture for Breathtaking Interfaces",
  subtitle = "Aurora UI is a timeless design system, crafted geometrically to unlock creative momentum with zero configuration overhead.",
  ctaText = "Initiate Experience",
  onCtaClick,
}) => {
  return (
    <section className="relative py-24 px-6 md:px-12 text-center max-w-4xl mx-auto space-y-8 flex flex-col items-center justify-center overflow-hidden">
      {/* Dynamic light backdrop blur */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-[var(--aurora-primary)] opacity-10 blur-[100px] pointer-events-none" />

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl md:text-6xl font-black text-[var(--aurora-fg-base)] tracking-tight leading-tight"
      >
        {title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-base md:text-xl text-[var(--aurora-fg-muted)] leading-relaxed max-w-2xl"
      >
        {subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex gap-4"
      >
        <Button onClick={onCtaClick} size="lg" trailingIcon={<ArrowRightIcon size={18} />}>
          {ctaText}
        </Button>
        <Button size="lg" variant="glass">
          Review Specifications
        </Button>
      </motion.div>
    </section>
  );
};

// ============================================================================
// --- FEATURES GRID SECTION ---
// ============================================================================
export const FeaturesSection: React.FC = () => {
  const items = [
    {
      title: "Modular Spacing",
      desc: "Perfect pixel grids utilizing absolute mathematical progressions to create unmatched visual balance."
    },
    {
      title: "Intelligent Theming",
      desc: "Dynamic, runtime, light, dark, and high contrast modes utilizing highly performant CSS variables."
    },
    {
      title: "Futuristic Motion",
      desc: "Micro-interactions engineered around spring physics for a fluid tactile feeling."
    }
  ];

  return (
    <section className="py-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
      {items.map((item, i) => (
        <Card key={i} hoverable className="p-6 space-y-3">
          <div className="h-10 w-10 rounded-lg bg-[var(--aurora-primary-subtle)] border border-[var(--aurora-primary-border)] flex items-center justify-center text-[var(--aurora-fg-primary)] font-bold">
            0{i + 1}
          </div>
          <h3 className="text-lg font-bold text-[var(--aurora-fg-base)]">{item.title}</h3>
          <p className="text-sm text-[var(--aurora-fg-muted)] leading-relaxed">{item.desc}</p>
        </Card>
      ))}
    </section>
  );
};

// ============================================================================
// --- PRICING CARD SECTION ---
// ============================================================================
export const PricingSection: React.FC = () => {
  const tiers = [
    {
      name: "Starter",
      price: "$0",
      desc: "Unleash foundational architectural prototypes.",
      features: ["Foundational primitives", "Light & Dark themes", "Basic animations"]
    },
    {
      name: "Pro",
      price: "$29",
      desc: "Perfect for production-grade scale ecosystems.",
      features: ["All primitives & advanced inputs", "DataGrid, Kanban, and Split Pane", "Premium Spring animations", "High-contrast themes"],
      popular: true
    }
  ];

  return (
    <section className="py-16 max-w-4xl mx-auto px-6 space-y-12">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-[var(--aurora-fg-base)]">Decentralized Value Tiers</h2>
        <p className="text-sm text-[var(--aurora-fg-muted)] max-w-md mx-auto">Select the tier designed precisely for your system requirements.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tiers.map((tier, i) => (
          <Card
            key={i}
            className={cn(
              "p-8 flex flex-col justify-between relative overflow-hidden",
              tier.popular && "border-2 border-[var(--aurora-primary)] shadow-[var(--aurora-shadow-lg)]"
            )}
          >
            {tier.popular && (
              <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-[var(--aurora-primary)] text-[var(--aurora-fg-inverse)] px-2 py-0.5 rounded">
                Selected
              </span>
            )}
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold uppercase text-[var(--aurora-fg-muted)] tracking-wider">{tier.name}</h4>
                <div className="text-4xl font-extrabold mt-2 text-[var(--aurora-fg-base)]">{tier.price} <span className="text-xs font-normal text-[var(--aurora-fg-muted)]">/mo</span></div>
                <p className="text-sm text-[var(--aurora-fg-muted)] mt-2">{tier.desc}</p>
              </div>

              <div className="space-y-3 pt-6 border-t border-[var(--aurora-border-subtle)]">
                {tier.features.map((f, fi) => (
                  <div key={fi} className="flex items-center gap-2.5 text-sm text-[var(--aurora-fg-base)]">
                    <CheckIcon size={14} className="text-[var(--aurora-primary)] shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full mt-8" variant={tier.popular ? "solid" : "outline"}>
              Commence Tier
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
};