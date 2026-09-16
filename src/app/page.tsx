'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import InteractiveDemo from '@/components/InteractiveDemo';
import PricingSection from '@/components/PricingSection';
import { 
  Target, 
  Flame, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Zap, 
  Sparkles,
  BarChart3,
  Users,
  Compass
} from 'lucide-react';

export default function LandingPage() {
  const scrollToDemo = () => {
    const demoElement = document.getElementById('demo');
    if (demoElement) {
      demoElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-slate-100 selection:bg-[#00f5a0] selection:text-[#07080c]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-12 md:pt-16 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#00f5a0]/15 to-[#00d2ff]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#00f5a0]/30 bg-[#00f5a0]/10 px-3.5 py-1 text-xs font-semibold text-[#00f5a0] font-mono mb-6 shadow-[0_0_15px_rgba(0,245,160,0.2)]">
          <Zap className="h-3.5 w-3.5" />
          <span>The #1 Organic Inbound Engine on X</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] sm:leading-[1.1]">
          Turn Other Creators&apos; Viral Reach Into Your{' '}
          <span className="gradient-text-neon">Customer Pipeline.</span>
        </h1>

        {/* Subhead */}
        <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Posting original tweets with zero followers is like screaming into an empty room. 
          <strong className="text-white font-semibold"> snypeX</strong> spots breakout posts in your niche within their first 90 minutes and crafts 3 high-authority, data-backed replies that win the top comment spot.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/app"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] px-7 py-3.5 text-sm font-bold text-[#07080c] shadow-[0_0_25px_rgba(0,245,160,0.35)] hover:opacity-95 hover:scale-[1.02] transition-all"
          >
            <span>Start Snyping Free</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={scrollToDemo}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-[#222a3a] bg-[#111622]/80 px-7 py-3.5 text-sm font-semibold text-slate-200 hover:bg-[#182030] hover:border-slate-600 transition-all cursor-pointer"
          >
            <span>Live Interactive Demo</span>
          </button>
        </div>

        {/* Metrics Banner */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-[#1a2130]">
          <div className="text-left">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">60K+</div>
            <div className="text-xs text-slate-400 mt-0.5">Free monthly impressions</div>
          </div>
          <div className="text-left">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#00f5a0] font-mono">&lt; 90m</div>
            <div className="text-xs text-slate-400 mt-0.5">Viral breakout detection</div>
          </div>
          <div className="text-left">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">0% Slop</div>
            <div className="text-xs text-slate-400 mt-0.5">Banned bot clichÃ©s</div>
          </div>
          <div className="text-left">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#00d2ff] font-mono">1-Click</div>
            <div className="text-xs text-slate-400 mt-0.5">Instant post to X</div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="scroll-mt-16 pt-4 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <span className="rounded-full bg-[#00d2ff]/10 px-3 py-1 text-xs font-semibold text-[#00d2ff] border border-[#00d2ff]/30 font-mono uppercase tracking-wider">
            Hands-on Experience
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3">
            See the 3-Angle Strategy in Action
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
            Switch between sample products or pick different breakout tweets to see how snypeX calibrates authority.
          </p>
        </div>

        <InteractiveDemo />
      </section>

      {/* Feature Pillars */}
      <section id="features" className="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="rounded-full bg-[#00f5a0]/10 px-3 py-1 text-xs font-semibold text-[#00f5a0] border border-[#00f5a0]/30 font-mono uppercase tracking-wider">
            Why snypeX Wins
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            Built for Founders Who Hate Sounding Like Bots.
          </h2>
          <p className="text-slate-400 mt-3 text-base">
            Every feature is engineered to protect your personal brand while turning the comments section into an inbound lead machine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="rounded-2xl border border-[#1d2434] bg-[#0f131c]/70 p-7 hover:border-[#00f5a0]/40 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00f5a0]/10 border border-[#00f5a0]/30 text-[#00f5a0] mb-5">
              <Flame className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Breakout Velocity Radar</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              Timing is 90% of the game on X. snypeX flags posts scoring 100+ likes/hr in their first 90 minutes, allowing you to comment before the thread saturates.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-[#1d2434] bg-[#0f131c]/70 p-7 hover:border-[#00d2ff]/40 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-[#00d2ff] mb-5">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Strict Anti-Slop Filter</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              We strictly forbid phrases like &quot;Great post!&quot; or &quot;Couldn&apos;t agree more!&quot;. Replies cite real benchmark data and studies so you establish domain authority.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-[#1d2434] bg-[#0f131c]/70 p-7 hover:border-purple-400/40 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 mb-5">
              <HelpCircle className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Lead Question Hunter</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              Our radar scans for buying intentâ€”detecting founders asking &quot;What software do you guys use for X?&quot; so you can provide helpful solutions and win customers.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison: Manual vs Generic Bot vs snypeX */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-2xl border border-[#202738] bg-[#0d1017] p-6 sm:p-10 shadow-xl">
          <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-4">
            How snypeX Compares
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#1b2230] text-slate-400">
                  <th className="pb-3 font-medium">Metric / Feature</th>
                  <th className="pb-3 font-medium">Manual Replying</th>
                  <th className="pb-3 font-medium">Generic AI Bots</th>
                  <th className="pb-3 font-bold text-[#00f5a0]">snypeX</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#171d29] text-slate-300">
                <tr>
                  <td className="py-4 font-semibold text-white">Time per 10 replies</td>
                  <td className="py-4 text-slate-400">90 minutes</td>
                  <td className="py-4 text-slate-400">1 minute (auto-spam)</td>
                  <td className="py-4 font-bold text-[#00f5a0]">4 minutes (reviewed)</td>
                </tr>
                <tr>
                  <td className="py-4 font-semibold text-white">Reply Quality</td>
                  <td className="py-4 text-slate-400">High (if energetic)</td>
                  <td className="py-4 text-red-400">Obvious ChatGPT slop</td>
                  <td className="py-4 font-bold text-[#00f5a0]">Data & study backed</td>
                </tr>
                <tr>
                  <td className="py-4 font-semibold text-white">Risk of Account Ban</td>
                  <td className="py-4 text-slate-400">Zero</td>
                  <td className="py-4 text-red-400">Very High (Automated)</td>
                  <td className="py-4 font-bold text-[#00f5a0]">Zero (Human in loop)</td>
                </tr>
                <tr>
                  <td className="py-4 font-semibold text-white">Timing Optimization</td>
                  <td className="py-4 text-slate-400">Random luck</td>
                  <td className="py-4 text-slate-400">No velocity checks</td>
                  <td className="py-4 font-bold text-[#00f5a0]">Sub-90m Velocity Radar</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* FAQ Section */}
      <section id="faq" className="scroll-mt-24 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#1b2230]">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-[#1c2230] bg-[#0c1017] p-5">
            <h4 className="text-sm font-bold text-white">
              Can my Twitter/X account get banned using snypeX?
            </h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              No. snypeX is <strong>not</strong> an auto-posting headless bot. It operates as your research copilot. You choose the angle, review or edit the copy, and launch via native X Intent with one click.
            </p>
          </div>

          <div className="rounded-xl border border-[#1c2230] bg-[#0c1017] p-5">
            <h4 className="text-sm font-bold text-white">
              How does the 1-click Post to X button work?
            </h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              It uses Twitter&apos;s native web intent URL (`x.com/intent/tweet`). When you click it, X opens on your screen with the exact rebuttal and citation pre-loaded in the composer.
            </p>
          </div>

          <div className="rounded-xl border border-[#1c2230] bg-[#0c1017] p-5">
            <h4 className="text-sm font-bold text-white">
              Can I monitor custom creators or competitor accounts?
            </h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Yes! In the Command Center, you can add any X handle or keyword in your niche. snypeX will monitor their tweets and notify you when a post gains breakout traction.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1a2130] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-[#00f5a0]" />
          <span className="font-bold text-white font-mono">snypeX</span>
          <span>Â© {new Date().getFullYear()} â€” Inbound distribution for modern founders.</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/app" className="hover:text-slate-300">Launch App</Link>
          <a href="#pricing" className="hover:text-slate-300">Pricing</a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">Twitter / X</a>
        </div>
      </footer>
    </div>
  );
}


