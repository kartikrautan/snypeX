'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  SAMPLE_PRODUCTS, 
  MOCK_TWEET_OPPORTUNITIES 
} from '@/lib/mockData';
import { generateReplyAngles } from '@/lib/generator';
import { ProductDNA, TweetOpportunity, OpportunityBadge } from '@/types';
import ProductDnaModal from '@/components/ProductDnaModal';
import confetti from 'canvas-confetti';
import { 
  Crosshair,
  Flame, 
  HelpCircle, 
  MessageSquare, 
  Sliders, 
  Copy, 
  Check, 
  ArrowUpRight, 
  TrendingUp, 
  Sparkles, 
  RefreshCw, 
  Search, 
  ExternalLink,
  ChevronDown,
  Layers,
  CheckCircle2,
  Cpu,
  Lock,
  ArrowRight,
  Zap,
  Plus
} from 'lucide-react';

export default function CommandCenterPage() {
  const [products, setProducts] = useState<ProductDNA[]>(SAMPLE_PRODUCTS);
  const [activeProduct, setActiveProduct] = useState<ProductDNA>(SAMPLE_PRODUCTS[0]);
  const [customNiche, setCustomNiche] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [selectedTweet, setSelectedTweet] = useState<TweetOpportunity>(MOCK_TWEET_OPPORTUNITIES[0]);
  const [filterBadge, setFilterBadge] = useState<OpportunityBadge | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDnaModalOpen, setIsDnaModalOpen] = useState(false);
  const [activeAngleKey, setActiveAngleKey] = useState<'dataDrop' | 'conversationHook' | 'stealthPlug'>('dataDrop');
  const [editedText, setEditedText] = useState('');
  const [copied, setCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Active product context
  const currentContext: ProductDNA = isCustomMode && customNiche.trim()
    ? {
        id: 'custom-user-niche',
        name: customNiche.trim(),
        tagline: `The high-authority solution for ${customNiche.trim()}`,
        targetAudience: `Founders and teams looking for ${customNiche.trim()}`,
        differentiator: '3.4x faster turnaround, zero fluff, proprietary intelligence engine',
        url: `https://${customNiche.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
        tone: 'founder'
      }
    : activeProduct;

  // Generate angles
  const angles = generateReplyAngles(selectedTweet, currentContext);

  // Sync editedText when tweet, product, or angle tab changes
  React.useEffect(() => {
    setEditedText(angles[activeAngleKey].text);
  }, [selectedTweet.id, activeProduct.id, activeAngleKey, isCustomMode, customNiche]);

  // Filter tweets
  const filteredTweets = MOCK_TWEET_OPPORTUNITIES.filter((t) => {
    const matchesBadge = filterBadge === 'all' || t.badge === filterBadge;
    const matchesSearch = 
      t.author.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBadge && matchesSearch;
  });

  const charCount = editedText.length;
  const isOverLimit = charCount > 280;

  const handleCopy = () => {
    if (isCustomMode) return;
    navigator.clipboard.writeText(editedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePostOnX = () => {
    if (isCustomMode) return;
    // Trigger celebratory confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00f5a0', '#00d2ff', '#ffffff']
    });

    const encodedText = encodeURIComponent(editedText);
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
    window.open(intentUrl, '_blank', 'noopener,noreferrer');
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      setEditedText(angles[activeAngleKey].text);
    }, 400);
  };

  const handleSaveDna = (updated: ProductDNA) => {
    setActiveProduct(updated);
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setIsCustomMode(false);
  };

  const handleApplyCustomNiche = (e: React.FormEvent) => {
    e.preventDefault();
    if (customNiche.trim()) {
      setIsCustomMode(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-slate-100 flex flex-col font-sans">
      {/* Top Application Bar */}
      <header className="h-16 border-b border-[#1c2230] bg-[#0c1017]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-30 shrink-0">
        {/* Brand & Mode */}
        <div className="flex items-center gap-5">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="relative grid size-8 place-items-center rounded-full border-2 border-slate-200 bg-[#0e121b] transition-transform group-hover:scale-105">
              <Crosshair className="size-4 text-[#00f5a0]" strokeWidth={2.5} />
              <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-[#00f5a0] shadow-[0_0_8px_#00f5a0]" />
            </span>
            <span className="font-mono text-lg font-bold tracking-tight text-white">
              snype<span className="text-[#00f5a0]">X</span>
            </span>
          </Link>

          {/* Persona / Niche Switcher */}
          <div className="hidden sm:flex items-center gap-2 rounded-lg border border-[#222a3a] bg-[#121622] px-3 py-1.5 text-xs font-mono">
            <span className="text-slate-400">Persona:</span>
            <select
              value={isCustomMode ? 'custom' : activeProduct.id}
              onChange={(e) => {
                if (e.target.value === 'custom') {
                  setIsCustomMode(true);
                  if (!customNiche) setCustomNiche('AI Cold Outreach SaaS');
                } else {
                  setIsCustomMode(false);
                  const found = products.find((p) => p.id === e.target.value);
                  if (found) setActiveProduct(found);
                }
              }}
              className="bg-transparent font-bold text-white focus:outline-none cursor-pointer"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#121622] text-white">
                  {p.name}
                </option>
              ))}
              <option value="custom" className="bg-[#121622] text-[#00f5a0] font-bold">
                + Custom Niche (Pro)
              </option>
            </select>
            <button
              type="button"
              onClick={() => setIsDnaModalOpen(true)}
              className="ml-1 text-[#00f5a0] hover:text-[#00d2ff] transition-colors p-1"
              title="Calibrate Product DNA"
            >
              <Sliders className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Right Nav / Status */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 rounded-full bg-[#00f5a0]/10 border border-[#00f5a0]/30 px-3 py-1 text-xs font-mono text-[#00f5a0]">
            <span className="relative flex size-2">
              <span className="signal-pulse absolute size-2 rounded-full bg-[#00f5a0]" />
              <span className="relative size-2 rounded-full bg-[#00f5a0]" />
            </span>
            <span>Radar Active &bull; 30–90m Window</span>
          </div>

          <Link
            href="/#pricing"
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] px-3.5 py-1.5 text-xs font-bold text-[#07080c] shadow-[0_0_15px_rgba(0,245,160,0.3)] hover:opacity-95 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Upgrade to Pro</span>
          </Link>
        </div>
      </header>

      {/* Main Command Center Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* LEFT PANEL: Breakout Tweets Radar Feed (5 Cols) */}
        <div className="lg:col-span-5 border-r border-[#1a2130] bg-[#090c13] flex flex-col h-[calc(100vh-4rem)]">
          {/* Radar Controls & Custom Niche Bar */}
          <div className="p-4 border-b border-[#182030] space-y-3 shrink-0">
            {/* Custom Niche Bar */}
            <form onSubmit={handleApplyCustomNiche} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter your product/niche (e.g. AI Video Editor)..."
                  value={customNiche}
                  onChange={(e) => {
                    setCustomNiche(e.target.value);
                    setIsCustomMode(true);
                  }}
                  className="w-full rounded-xl border border-white/[0.1] bg-[#111622] pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00f5a0]"
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-1 rounded-xl bg-[#182132] border border-white/[0.1] px-3 py-2 text-xs font-semibold text-[#00f5a0] hover:bg-[#1e2a40] transition-colors"
              >
                <span>Track</span>
              </button>
            </form>

            {/* Opportunity Category Badges Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono">
              <button
                type="button"
                onClick={() => setFilterBadge('all')}
                className={`rounded-lg px-2.5 py-1 transition-all ${
                  filterBadge === 'all'
                    ? 'bg-[#1b2436] text-white border border-[#2b3952]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All (3)
              </button>
              <button
                type="button"
                onClick={() => setFilterBadge('hot')}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 transition-all ${
                  filterBadge === 'hot'
                    ? 'bg-red-500/15 text-red-400 border border-red-500/30 font-bold'
                    : 'text-slate-400 hover:text-red-400'
                }`}
              >
                <Flame className="h-3 w-3" />
                <span>Golden 30m</span>
              </button>
              <button
                type="button"
                onClick={() => setFilterBadge('lead')}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 transition-all ${
                  filterBadge === 'lead'
                    ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30 font-bold'
                    : 'text-slate-400 hover:text-purple-400'
                }`}
              >
                <HelpCircle className="h-3 w-3" />
                <span>Buying Intent</span>
              </button>
              <button
                type="button"
                onClick={() => setFilterBadge('debate')}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 transition-all ${
                  filterBadge === 'debate'
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold'
                    : 'text-slate-400 hover:text-amber-400'
                }`}
              >
                <MessageSquare className="h-3 w-3" />
                <span>Hot Debate</span>
              </button>
            </div>
          </div>

          {/* Scrollable Tweet Opportunities List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredTweets.map((tweet) => {
              const isSelected = selectedTweet.id === tweet.id;
              return (
                <div
                  key={tweet.id}
                  onClick={() => setSelectedTweet(tweet)}
                  className={`cursor-pointer rounded-2xl p-4 transition-all duration-200 border ${
                    isSelected
                      ? 'border-[#00f5a0] bg-[#111724] shadow-[0_0_20px_rgba(0,245,160,0.12)] ring-1 ring-[#00f5a0]/40'
                      : 'border-[#1b2230] bg-[#0c1017] hover:border-slate-700 hover:bg-[#10141f]'
                  }`}
                >
                  {/* Tweet Header */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={tweet.author.avatar}
                        alt={tweet.author.name}
                        className="h-7 w-7 rounded-full object-cover border border-slate-700"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-white">{tweet.author.name}</span>
                          {tweet.author.verified && (
                            <span className="text-[#00d2ff] text-[10px]">✓</span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">@{tweet.author.handle}</span>
                      </div>
                    </div>

                    {/* Badge */}
                    {tweet.badge === 'hot' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-semibold text-red-400 border border-red-500/25 font-mono">
                        <Flame className="h-3 w-3" /> {tweet.minutesAgo}m ago
                      </span>
                    )}
                    {tweet.badge === 'lead' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/15 px-2 py-0.5 text-[10px] font-semibold text-purple-400 border border-purple-500/25 font-mono">
                        <HelpCircle className="h-3 w-3" /> Buying Intent
                      </span>
                    )}
                    {tweet.badge === 'debate' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-400 border border-amber-500/25 font-mono">
                        <MessageSquare className="h-3 w-3" /> High Debate
                      </span>
                    )}
                  </div>

                  {/* Text Content */}
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    &ldquo;{tweet.text}&rdquo;
                  </p>

                  {/* Velocity Footer */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#182030] text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1 text-[#00f5a0]">
                      <TrendingUp className="h-3 w-3" /> {tweet.velocityLikesPerHour} likes/hr
                    </span>
                    <span>{tweet.repliesCount} replies &bull; {tweet.likes} likes</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL: Reply Studio & Pro Lock Box (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0b0e15] p-5 lg:p-6 flex flex-col justify-between h-[calc(100vh-4rem)] overflow-y-auto relative">
          {/* IF CUSTOM NICHE IS ACTIVE: SHOW PRO LOCK BOX */}
          {isCustomMode ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 my-auto">
              <div className="size-16 rounded-3xl bg-gradient-to-br from-[#00f5a0]/20 to-[#00d2ff]/20 border border-[#00f5a0]/40 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(0,245,160,0.3)]">
                <Lock className="size-8 text-[#00f5a0]" />
              </div>

              <span className="rounded-full bg-[#00f5a0]/10 border border-[#00f5a0]/30 px-3 py-1 text-xs font-mono font-bold text-[#00f5a0] uppercase tracking-wider">
                Pro Feature &bull; Custom Radar Calibration
              </span>

              <h3 className="font-mono text-2xl sm:text-3xl font-extrabold text-white mt-3 max-w-md">
                Upgrade to Pro for Custom Signals
              </h3>

              <p className="text-sm text-slate-400 max-w-lg mt-3 leading-relaxed">
                You are tracking <span className="text-[#00f5a0] font-semibold">&ldquo;{customNiche || 'Custom Niche'}&rdquo;</span>. Custom niche keyword tracking, real-time 30–90m breakout detection, and automated founder-voice replies require snypeX Pro.
              </p>

              {/* 3 Pro Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg mt-6 text-left">
                <div className="rounded-xl border border-white/[0.08] bg-[#121622] p-3.5">
                  <div className="size-2 rounded-full bg-[#00f5a0] mb-2" />
                  <p className="font-mono text-xs font-bold text-white">3 Niche Radars</p>
                  <p className="text-[11px] text-slate-400 mt-1">Track 3 custom product niches simultaneously.</p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-[#121622] p-3.5">
                  <div className="size-2 rounded-full bg-[#00d2ff] mb-2" />
                  <p className="font-mono text-xs font-bold text-white">Unlimited Replies</p>
                  <p className="text-[11px] text-slate-400 mt-1">Generate unlimited anti-cliché founder replies.</p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-[#121622] p-3.5">
                  <div className="size-2 rounded-full bg-purple-400 mb-2" />
                  <p className="font-mono text-xs font-bold text-white">Product DNA Engine</p>
                  <p className="text-[11px] text-slate-400 mt-1">Inject case studies &amp; proof points automatically.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
                <Link
                  href="/#pricing"
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] px-6 py-3 text-xs font-bold text-[#080a0f] shadow-[0_0_25px_rgba(0,245,160,0.35)] hover:opacity-95 transition-all"
                >
                  <Sparkles className="size-4" />
                  <span>Unlock Signals with Pro ($39/mo)</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setIsCustomMode(false);
                    setCustomNiche('');
                  }}
                  className="rounded-xl border border-white/[0.1] bg-[#121723] px-4 py-3 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Switch Back to Sample Mode
                </button>
              </div>
            </div>
          ) : (
            /* UNLOCKED SAMPLE MODE VIEW */
            <div>
              {/* Selected Tweet Full View */}
              <div className="rounded-2xl border border-[#1e2535] bg-[#10141f] p-4 sm:p-5 mb-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={selectedTweet.author.avatar}
                      alt={selectedTweet.author.name}
                      className="h-9 w-9 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-white">{selectedTweet.author.name}</span>
                        {selectedTweet.author.verified && (
                          <span className="text-[#00d2ff] text-xs">✓</span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 font-mono">@{selectedTweet.author.handle} &bull; {selectedTweet.createdAtFormatted}</span>
                    </div>
                  </div>

                  <a
                    href={selectedTweet.tweetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-[#00d2ff] transition-colors"
                  >
                    <span>Open on X</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                <p className="text-sm text-slate-100 leading-relaxed whitespace-pre-line py-1">
                  {selectedTweet.text}
                </p>

                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#1a2230] text-xs text-slate-400 font-mono">
                  <span>{selectedTweet.likes} Likes</span>
                  <span>{selectedTweet.retweets} Retweets</span>
                  <span>{selectedTweet.repliesCount} Comments</span>
                </div>
              </div>

              {/* Strategic Radar Context Box */}
              <div className="rounded-xl border border-[#232c40] bg-[#141926] p-3.5 mb-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00f5a0] mb-1">
                  <Cpu className="h-4 w-4" />
                  <span>Strategy Insight: Why this tweet is high value</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedTweet.opportunityInsight}
                </p>
              </div>

              {/* The 3 Angle Cards */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                    Select Reply Angle:
                  </span>
                  <button
                    type="button"
                    onClick={handleRegenerate}
                    className="flex items-center gap-1 text-xs text-[#00d2ff] hover:underline"
                  >
                    <RefreshCw className={`h-3 w-3 ${isRegenerating ? 'animate-spin' : ''}`} />
                    <span>Regenerate</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  {/* 1. Data Drop */}
                  <button
                    type="button"
                    onClick={() => setActiveAngleKey('dataDrop')}
                    className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
                      activeAngleKey === 'dataDrop'
                        ? 'border-[#00f5a0] bg-[#00f5a0]/10 shadow-[0_0_15px_rgba(0,245,160,0.15)] ring-1 ring-[#00f5a0]'
                        : 'border-[#202738] bg-[#121622] hover:border-slate-600'
                    }`}
                  >
                    <span className="text-xs font-bold text-white flex items-center gap-1 font-mono">
                      📊 The Data Drop
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 leading-snug">
                      Benchmark facts to rank as #1 top comment.
                    </span>
                    <span className="mt-2 text-[10px] font-mono text-[#00f5a0]">
                      {angles.dataDrop.estimatedLikesRank}
                    </span>
                  </button>

                  {/* 2. Conversation Hook */}
                  <button
                    type="button"
                    onClick={() => setActiveAngleKey('conversationHook')}
                    className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
                      activeAngleKey === 'conversationHook'
                        ? 'border-[#00d2ff] bg-[#00d2ff]/10 shadow-[0_0_15px_rgba(0,210,255,0.15)] ring-1 ring-[#00d2ff]'
                        : 'border-[#202738] bg-[#121622] hover:border-slate-600'
                    }`}
                  >
                    <span className="text-xs font-bold text-white flex items-center gap-1 font-mono">
                      💬 The Hook
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 leading-snug">
                      Thought-provoking dialogue with author.
                    </span>
                    <span className="mt-2 text-[10px] font-mono text-[#00d2ff]">
                      Engagement Magnet
                    </span>
                  </button>

                  {/* 3. Stealth Plug */}
                  <button
                    type="button"
                    onClick={() => setActiveAngleKey('stealthPlug')}
                    className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
                      activeAngleKey === 'stealthPlug'
                        ? 'border-purple-400 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.15)] ring-1 ring-purple-400'
                        : 'border-[#202738] bg-[#121622] hover:border-slate-600'
                    }`}
                  >
                    <span className="text-xs font-bold text-white flex items-center gap-1 font-mono">
                      🎯 Stealth Plug
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 leading-snug">
                      Organic mention of {activeProduct.name}.
                    </span>
                    <span className="mt-2 text-[10px] font-mono text-purple-400">
                      Direct Inbound Lead
                    </span>
                  </button>
                </div>
              </div>

              {/* Live Reply Editor */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-mono">
                  <span className="text-slate-300 font-semibold">Reply Composer (Editable)</span>
                  <span className={isOverLimit ? 'text-red-400 font-bold' : 'text-slate-400'}>
                    {charCount} / 280 characters
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className={`w-full rounded-xl border bg-[#0d1017] p-3.5 text-sm text-white focus:outline-none leading-relaxed resize-none ${
                    isOverLimit
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[#252f42] focus:border-[#00f5a0]'
                  }`}
                  placeholder="Write or adjust your reply..."
                />
              </div>

              {/* Action Bar (1-Click Post & Copy) */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#1a2130] mt-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="h-4 w-4 text-[#00f5a0]" />
                  <span>Calibrated to {activeProduct.name} ({activeProduct.tone} tone)</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 rounded-xl border border-[#263044] bg-[#141926] px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-[#1b2233] transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#00f5a0]" />
                        <span className="text-[#00f5a0]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Text</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handlePostOnX}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] px-5 py-2.5 text-xs font-extrabold text-[#07080c] shadow-[0_0_20px_rgba(0,245,160,0.35)] hover:opacity-95 hover:scale-[1.02] transition-all"
                  >
                    <span>Post on X</span>
                    <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product DNA Modal */}
      <ProductDnaModal
        isOpen={isDnaModalOpen}
        onClose={() => setIsDnaModalOpen(false)}
        product={activeProduct}
        onSave={handleSaveDna}
      />
    </div>
  );
}
