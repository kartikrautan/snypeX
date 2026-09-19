'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Crosshair, 
  Sparkles, 
  Target, 
  Radio, 
  ArrowRight, 
  Check, 
  Menu, 
  X, 
  ChevronDown
} from 'lucide-react';
import InteractiveDemo from '@/components/InteractiveDemo';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';

const FAQS = [
  {
    q: "Does snypeX post automatically on my X account?",
    a: "No. snypeX is built on a high-IQ, human-in-the-loop philosophy. We spot the highest-intent opportunities in the 30–90 minute window and draft 3 tailored founder-voice angles. You review, edit in 5 seconds, and 1-click post. This completely eliminates shadowban risks and prevents generic AI slop."
  },
  {
    q: "Will the replies sound like generic AI fluff?",
    a: "Zero canned phrases like 'Great post!' or 'Couldn't agree more!'. snypeX uses your calibrated Product DNA (your unique value proposition, niche expertise, and case study data) along with anti-cliché heuristics to produce replies that sound like a veteran founder chiming in with real substance."
  },
  {
    q: "How fast does the opportunity radar detect breakout tweets?",
    a: "Our radar monitors niche velocity curves in real time. We flag posts when they are 30 to 90 minutes old—the golden window where engagement velocity is exponential, but the reply section isn't yet saturated with 500 competing comments."
  },
  {
    q: "What is Product DNA?",
    a: "Product DNA is your brand's secret weapon in snypeX. You provide your product name, one-sentence value proposition, target customer pain points, and optional proof points. snypeX weaves this context naturally into soft plugs and data-driven replies without ever sounding salesy."
  },
  {
    q: "Can I track more than one niche or product?",
    a: "Yes! The Pro plan lets you track up to 3 separate niches simultaneously, while the Agency/Studio tier supports unlimited niches and multiple Product DNA profiles for managing several products or client accounts."
  }
];

const COMPARISON_ROWS = [
  {
    dimension: "Discovery Speed",
    manual: "Hours of endless doomscrolling",
    bots: "Fast but spammy / 24h old threads",
    snypex: "Golden 30–90m Freshness Window",
    highlight: true
  },
  {
    dimension: "Reply Quality",
    manual: "Authentic, but exhausting to maintain",
    bots: "Generic AI slop ('Great insights!')",
    snypex: "Anti-Cliché Founder Voice + Product DNA",
    highlight: true
  },
  {
    dimension: "Intent Filtering",
    manual: "Pure guesswork and luck",
    bots: "Keyword matching without intent",
    snypex: "Purchase intent, debates & tool queries",
    highlight: true
  },
  {
    dimension: "Account Safety",
    manual: "100% Safe",
    bots: "High risk of X shadowbans/suspension",
    snypex: "100% Human-in-the-loop (1-Click Post)",
    highlight: true
  },
  {
    dimension: "Conversion to Traffic",
    manual: "Low volume due to time limits",
    bots: "Damages brand reputation",
    snypex: "Top-comment positioning drives qualified leads",
    highlight: true
  }
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#080a0f] text-slate-100 flex flex-col selection:bg-[#00f5a0]/30 selection:text-[#00f5a0]">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#080a0f]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="relative grid size-9 place-items-center rounded-full border-2 border-slate-200 bg-[#0e121b] transition-transform group-hover:scale-105">
              <Crosshair className="size-4.5 text-[#00f5a0]" strokeWidth={2.5} />
              <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-[#00f5a0] shadow-[0_0_8px_#00f5a0]" />
            </span>
            <span className="font-mono text-xl font-bold tracking-tight text-white">
              snype<span className="text-[#00f5a0]">X</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#studio" className="transition-colors hover:text-white">Reply Studio</a>
            <a href="#pricing" className="transition-colors hover:text-white">Pricing</a>
            <a href="#faq" className="transition-colors hover:text-white">FAQ</a>
          </nav>

          {/* CTA Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/app"
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/app"
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] px-4 py-2 text-xs font-bold text-[#080a0f] shadow-[0_0_20px_rgba(0,245,160,0.3)] hover:opacity-95 hover:shadow-[0_0_25px_rgba(0,245,160,0.5)] transition-all"
            >
              <span>Start Free</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="sm:hidden p-2 text-slate-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <nav className="grid gap-1 border-t border-white/[0.08] bg-[#0c1018] p-4 text-sm md:hidden">
            <a
              href="#studio"
              className="rounded-lg px-3 py-2.5 text-slate-300 hover:bg-white/[0.05] hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Reply Studio
            </a>
            <a
              href="#pricing"
              className="rounded-lg px-3 py-2.5 text-slate-300 hover:bg-white/[0.05] hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="rounded-lg px-3 py-2.5 text-slate-300 hover:bg-white/[0.05] hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <div className="pt-2 mt-2 border-t border-white/[0.08] flex gap-2">
              <Link
                href="/app"
                className="w-full text-center py-2.5 text-xs font-bold rounded-lg bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] text-[#080a0f]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Launch App Free
              </Link>
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section id="top" className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24">
          {/* Subtle Ambient Background Gradients */}
          <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-[#00f5a0]/10 blur-[120px]" />
          <div className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[500px] rounded-full bg-[#00d2ff]/5 blur-[100px]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            {/* Left Column: Hero Pitch */}
            <div>
              {/* Pulsing radar pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-[#10141f] px-3.5 py-1.5 text-xs font-medium text-slate-300 shadow-inner">
                <span className="relative flex size-2">
                  <span className="signal-pulse absolute size-2 rounded-full bg-[#00f5a0]" />
                  <span className="relative size-2 rounded-full bg-[#00f5a0]" />
                </span>
                <span>Live radar &bull; 3 high-intent signals in your niche now</span>
              </div>

              <h1 className="mt-6 font-mono text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white leading-[1.08]">
                Get into the conversation{' '}
                <span className="bg-gradient-to-r from-[#00f5a0] via-[#00d2ff] to-[#00f5a0] bg-clip-text text-transparent">
                  before it peaks.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-400">
                snypeX spots breakout posts in your niche within their first 90 minutes, then drafts high-IQ, founder-voice replies that claim the top comment spot and turn views into customers.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  href="#pricing"
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] px-6 py-3.5 text-sm font-bold text-[#080a0f] shadow-[0_0_25px_rgba(0,245,160,0.35)] hover:opacity-95 hover:shadow-[0_0_35px_rgba(0,245,160,0.5)] transition-all"
                >
                  <span>Start Spotting Signals</span>
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#studio"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-[#111622] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#182030] hover:border-slate-600 transition-all"
                >
                  <Sparkles className="size-4 text-[#00f5a0]" />
                  <span>Try Reply Studio</span>
                </a>
              </div>

              {/* Feature Value Pills */}
              <div className="mt-9 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#00f5a0]" /> 30–90 min Golden Window
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#00f5a0]" /> Intent-Tagged Buying Leads
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#00f5a0]" /> Zero Generic AI Slop
                </span>
              </div>
            </div>

            {/* Right Column: Floating Live Radar Mockup */}
            <div className="float-soft relative rounded-3xl border border-white/[0.12] bg-[#0d111a] p-5 shadow-2xl backdrop-blur-xl">
              {/* Radar Card Header */}
              <div className="mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-bold text-white font-mono uppercase tracking-wider">
                  <Radio className="size-4 text-[#00f5a0] animate-pulse" /> Opportunity Radar
                </span>
                <span className="rounded-full border border-white/[0.08] bg-[#141a27] px-3 py-1 text-[11px] font-mono text-[#00f5a0]">
                  SaaS & AI Devs
                </span>
              </div>

              {/* Radar Graphical Display */}
              <div className="relative h-48 overflow-hidden rounded-2xl bg-[#07090e] border border-white/[0.06]">
                {/* Concentric rings */}
                {['size-40', 'size-28', 'size-16'].map((s) => (
                  <span
                    key={s}
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/15 ${s}`}
                  />
                ))}
                {/* Crosshairs */}
                <span className="absolute inset-x-0 top-1/2 h-px bg-emerald-500/10" />
                <span className="absolute inset-y-0 left-1/2 w-px bg-emerald-500/10" />
                {/* Radar sweep */}
                <span className="radar-sweep absolute left-1/2 top-1/2 h-24 w-px bg-gradient-to-b from-[#00f5a0] via-[#00f5a0]/40 to-transparent" />
                {/* Detected target blip */}
                <span className="absolute left-[62%] top-[34%] size-3 rounded-full bg-[#00f5a0] shadow-[0_0_12px_#00f5a0]">
                  <span className="signal-pulse absolute inset-0 rounded-full bg-[#00f5a0]" />
                </span>
                <span className="absolute left-4 top-3 text-[10px] font-mono font-semibold uppercase tracking-widest text-[#00f5a0]">
                  TRACKING MOMENTUM
                </span>
                <span className="absolute bottom-3 right-4 font-mono text-[10px] text-slate-400">
                  48m ago &bull; 120 likes/hr
                </span>
              </div>

              {/* Live Signal Ticker List */}
              <div className="mt-4 space-y-2">
                {[
                  { handle: "@levelsio", text: "Most SaaS pricing pages are fundamentally broken.", tag: "Hot", tagBg: "bg-[#00f5a0]/15 text-[#00f5a0]", stats: "342 likes • 48m ago" },
                  { handle: "@tibo_maker", text: "What tool do you use to record crisp product demos?", tag: "Lead", tagBg: "bg-amber-400/20 text-amber-300", stats: "High buyer intent • 62m ago" },
                  { handle: "@shl", text: "Bootstrapping is dead in 2026. Change my mind.", tag: "Debate", tagBg: "bg-purple-400/20 text-purple-300", stats: "High virality • 75m ago" }
                ].map((item) => (
                  <div key={item.handle} className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-[#111622] p-3 transition-colors hover:border-[#00f5a0]/40">
                    <span className="grid size-8 place-items-center rounded-lg bg-[#182030] text-xs font-mono font-bold text-white">
                      {item.handle.slice(1, 4).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-slate-200">
                        <span className="text-[#00d2ff] mr-1">{item.handle}</span> &ldquo;{item.text}&rdquo;
                      </p>
                      <span className="text-[11px] text-slate-500 font-mono">{item.stats}</span>
                    </div>
                    <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold font-mono ${item.tagBg}`}>
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* RADAR VALUE PROPOSITIONS & STATS */}
        <section id="radar" className="relative border-y border-white/[0.08] bg-[#0c0f17] py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#00f5a0] font-semibold">
                Not another content scheduler
              </span>
              <h2 className="mt-2 font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                snypeX finds conversations already earning attention—and earns you a place in them.
              </h2>
            </div>

            {/* 3 Core Value Cards */}
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <article className="rounded-2xl border border-white/[0.08] bg-[#111622] p-6 transition-transform hover:-translate-y-1 hover:border-[#00f5a0]/40">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#00f5a0]/10 text-[#00f5a0] border border-[#00f5a0]/20">
                  <Crosshair className="size-5" />
                </div>
                <h3 className="mt-5 font-mono text-lg font-bold text-white">Never miss the window</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Freshness scoring catches posts between 30 and 90 minutes old, allowing you to secure the top-ranked comment before hundreds of replies flood the thread.
                </p>
              </article>

              <article className="rounded-2xl border border-white/[0.08] bg-[#111622] p-6 transition-transform hover:-translate-y-1 hover:border-[#00f5a0]/40">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/20">
                  <Sparkles className="size-5" />
                </div>
                <h3 className="mt-5 font-mono text-lg font-bold text-white">No generic AI slop</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Calibrated with your Product DNA, snypeX replaces empty praise (&ldquo;Great post!&rdquo;) with actionable data drops, constructive debate angles, and genuine insight.
                </p>
              </article>

              <article className="rounded-2xl border border-white/[0.08] bg-[#111622] p-6 transition-transform hover:-translate-y-1 hover:border-[#00f5a0]/40">
                <div className="flex size-10 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300 border border-amber-400/20">
                  <Target className="size-5" />
                </div>
                <h3 className="mt-5 font-mono text-lg font-bold text-white">Find buying intent</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  High-intent queries like &ldquo;what tool should I use?&rdquo; and &ldquo;how do founders solve X?&rdquo; are prioritized over broad, low-value industry chatter.
                </p>
              </article>
            </div>

            {/* 4-Metric Banner */}
            <div className="mt-14 grid gap-8 rounded-2xl border border-white/[0.08] bg-[#10141f] p-8 md:grid-cols-4 md:p-10">
              <div>
                <p className="font-mono text-lg font-bold text-white">Built for shipping founders, not growth gurus.</p>
              </div>
              <div>
                <strong className="font-mono text-4xl font-extrabold text-[#00f5a0]">42m</strong>
                <p className="mt-1 text-xs text-slate-400 font-mono">Average time to spot &amp; reply</p>
              </div>
              <div>
                <strong className="font-mono text-4xl font-extrabold text-[#00d2ff]">3.4x</strong>
                <p className="mt-1 text-xs text-slate-400 font-mono">Average impression multiple gained</p>
              </div>
              <div>
                <strong className="font-mono text-4xl font-extrabold text-white">1 click</strong>
                <p className="mt-1 text-xs text-slate-400 font-mono">From draft approval to live on X</p>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE DEMO / REPLY STUDIO */}
        <section id="studio" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="rounded-full bg-[#00f5a0]/10 px-3 py-1 text-xs font-semibold text-[#00f5a0] border border-[#00f5a0]/30 font-mono uppercase tracking-wider">
              Interactive Reply Studio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight font-mono">
              Experience the Anti-Clich&eacute; Engine.
            </h2>
            <p className="text-slate-400 mt-3 text-base sm:text-lg">
              Switch sample product personas, browse real breakout opportunities, and see how snypeX crafts high-authority replies designed to trigger profile visits.
            </p>
          </div>

          {/* Interactive Demo Component */}
          <InteractiveDemo />
        </section>

        {/* COMPARISON SECTION */}
        <section id="compare" className="relative border-y border-white/[0.08] bg-[#0c0f17] py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-[#00f5a0] font-semibold">
                The Unfair Timing Advantage
              </span>
              <h2 className="mt-2 font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Manual hustle is slow. Bots get banned. snypeX is precise.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-400">
                Why thousands of founders are moving from broad outbound ads to precision inbound comments.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#0e121b] shadow-xl">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-[#141924] font-mono text-xs uppercase tracking-wider text-slate-300">
                    <th className="p-5 font-bold">Approach Dimension</th>
                    <th className="p-5 font-bold text-slate-400">Manual Reply Hustle</th>
                    <th className="p-5 font-bold text-slate-400">Generic AI Bots</th>
                    <th className="p-5 font-bold text-[#00f5a0] bg-[#00f5a0]/10">snypeX Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.dimension} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-5 font-medium font-mono text-white text-xs">{row.dimension}</td>
                      <td className="p-5 text-slate-400 text-xs">{row.manual}</td>
                      <td className="p-5 text-slate-400 text-xs">{row.bots}</td>
                      <td className="p-5 font-semibold text-[#00f5a0] bg-[#00f5a0]/5 text-xs">
                        <div className="flex items-center gap-2">
                          <Check className="size-4 shrink-0 text-[#00f5a0]" />
                          <span>{row.snypex}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <PricingSection />

        {/* FAQ SECTION */}
        <section id="faq" className="relative border-t border-white/[0.08] bg-[#0c0f17] py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#00f5a0] font-semibold">
                Frequently Asked Questions
              </span>
              <h2 className="mt-2 font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Clear answers. No growth-speak.
              </h2>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Everything you need to know about the product, safety, radar speed, and how snypeX protects your reputation.
              </p>
              <div className="mt-8">
                <Link
                  href="/app"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] px-5 py-3 text-xs font-bold text-[#080a0f] shadow-[0_0_20px_rgba(0,245,160,0.3)] hover:opacity-95 transition-all"
                >
                  <span>Launch Free Trial</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>

            {/* Accordion List */}
            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className="rounded-xl border border-white/[0.08] bg-[#111622] overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-white hover:text-[#00f5a0] transition-colors"
                    >
                      <span className="font-mono">{faq.q}</span>
                      <ChevronDown
                        className={`size-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#00f5a0]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed text-slate-400 border-t border-white/[0.04]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* MASTRA.AI-STYLE PREMIUM FOOTER */}
      <Footer />
    </div>
  );
}
