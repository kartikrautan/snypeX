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
  Target, 
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
  Cpu
} from 'lucide-react';

export default function CommandCenterPage() {
  const [products, setProducts] = useState<ProductDNA[]>(SAMPLE_PRODUCTS);
  const [activeProduct, setActiveProduct] = useState<ProductDNA>(SAMPLE_PRODUCTS[0]);
  const [selectedTweet, setSelectedTweet] = useState<TweetOpportunity>(MOCK_TWEET_OPPORTUNITIES[0]);
  const [filterBadge, setFilterBadge] = useState<OpportunityBadge | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDnaModalOpen, setIsDnaModalOpen] = useState(false);
  const [activeAngleKey, setActiveAngleKey] = useState<'dataDrop' | 'conversationHook' | 'stealthPlug'>('dataDrop');
  const [editedText, setEditedText] = useState('');
  const [copied, setCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Generate angles
  const angles = generateReplyAngles(selectedTweet, activeProduct);

  // Sync editedText when tweet, product, or angle tab changes
  React.useEffect(() => {
    setEditedText(angles[activeAngleKey].text);
  }, [selectedTweet.id, activeProduct.id, activeAngleKey]);

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
    navigator.clipboard.writeText(editedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePostOnX = () => {
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
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-slate-100 flex flex-col font-sans">
      {/* Top Application Bar */}
      <header className="h-16 border-b border-[#1c2230] bg-[#0c1017]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-30 shrink-0">
        {/* Brand & Mode */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="relative grid size-8 place-items-center rounded-full border-2 border-slate-200 bg-[#0e121b] transition-transform group-hover:scale-105">
              <Crosshair className="size-4 text-[#00f5a0]" strokeWidth={2.5} />
              <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-[#00f5a0] shadow-[0_0_8px_#00f5a0]" />
            </span>
            <span className="font-mono text-lg font-bold tracking-tight text-white">
              snype<span className="text-[#00f5a0]">X</span>
            </span>
          </Link>

          {/* Active Product Switcher */}
          <div className="hidden sm:flex items-center gap-2 rounded-lg border border-[#222a3a] bg-[#121622] px-3 py-1.5 text-xs">
            <span className="text-slate-400">Target Product:</span>
            <select
              value={activeProduct.id}
              onChange={(e) => {
                const found = products.find((p) => p.id === e.target.value);
                if (found) setActiveProduct(found);
              }}
              className="bg-transparent font-bold text-white focus:outline-none cursor-pointer"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#121622] text-white">
                  {p.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setIsDnaModalOpen(true)}
              className="ml-1 text-[#00f5a0] hover:text-[#00d2ff] transition-colors p-1"
              title="Edit Product DNA"
            >
              <Sliders className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Right Status / Links */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsDnaModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-[#222a3a] bg-[#141924] px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-[#1a2130] transition-colors"
          >
            <Sliders className="h-3.5 w-3.5 text-[#00f5a0]" />
            <span>Product DNA</span>
          </button>

          <Link
            href="/#pricing"
            className="hidden sm:flex items-center gap-1.5 rounded-lg bg-[#00f5a0]/15 border border-[#00f5a0]/30 px-3 py-1.5 text-xs font-bold text-[#00f5a0] hover:bg-[#00f5a0]/25 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Upgrade to Pro</span>
          </Link>
        </div>
      </header>

      {/* Main Split Body: Left Feed (5 Cols) + Right Studio (7 Cols) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Column: Opportunity Feed (5 Cols) */}
        <div className="lg:col-span-5 border-r border-[#1a2130] bg-[#090b10] flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
          {/* Top Search & Filter Bar */}
          <div className="p-4 border-b border-[#1a2130] space-y-3 shrink-0">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Filter by creator handle or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#202738] bg-[#121622] pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-[#00f5a0] focus:outline-none"
              />
            </div>

            {/* Filter Badges */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                type="button"
                onClick={() => setFilterBadge('all')}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  filterBadge === 'all'
                    ? 'bg-slate-200 text-[#07080c] font-bold'
                    : 'bg-[#141924] text-slate-400 hover:text-white'
                }`}
              >
                All ({MOCK_TWEET_OPPORTUNITIES.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterBadge('hot')}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  filterBadge === 'hot'
                    ? 'bg-red-500 text-white font-bold'
                    : 'bg-[#141924] text-slate-400 hover:text-red-400'
                }`}
              >
                <Flame className="h-3 w-3" />
                <span>Hot</span>
              </button>
              <button
                type="button"
                onClick={() => setFilterBadge('lead')}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  filterBadge === 'lead'
                    ? 'bg-purple-500 text-white font-bold'
                    : 'bg-[#141924] text-slate-400 hover:text-purple-400'
                }`}
              >
                <HelpCircle className="h-3 w-3" />
                <span>Leads</span>
              </button>
              <button
                type="button"
                onClick={() => setFilterBadge('debate')}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  filterBadge === 'debate'
                    ? 'bg-amber-500 text-[#07080c] font-bold'
                    : 'bg-[#141924] text-slate-400 hover:text-amber-400'
                }`}
              >
                <MessageSquare className="h-3 w-3" />
                <span>Debates</span>
              </button>
            </div>
          </div>

          {/* Scrollable Opportunity Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredTweets.map((tweet) => {
              const isSelected = selectedTweet.id === tweet.id;
              return (
                <div
                  key={tweet.id}
                  onClick={() => setSelectedTweet(tweet)}
                  className={`cursor-pointer rounded-xl p-4 transition-all duration-150 border ${
                    isSelected
                      ? 'border-[#00f5a0] bg-[#131926] shadow-[0_0_15px_rgba(0,245,160,0.15)] ring-1 ring-[#00f5a0]/40'
                      : 'border-[#1b2230] bg-[#0e121a] hover:border-slate-700 hover:bg-[#121622]'
                  }`}
                >
                  {/* Author Row */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={tweet.author.avatar}
                        alt={tweet.author.name}
                        className="h-8 w-8 rounded-full object-cover border border-slate-700"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-white">{tweet.author.name}</span>
                          {tweet.author.verified && (
                            <span className="text-[#00d2ff] text-[10px]">✓</span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400">@{tweet.author.handle}</span>
                      </div>
                    </div>

                    {/* Badge */}
                    {tweet.badge === 'hot' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-400 border border-red-500/20">
                        <Flame className="h-3 w-3" /> {tweet.minutesAgo}m ago
                      </span>
                    )}
                    {tweet.badge === 'lead' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] font-semibold text-purple-400 border border-purple-500/20">
                        <HelpCircle className="h-3 w-3" /> Buying Intent
                      </span>
                    )}
                    {tweet.badge === 'debate' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400 border border-amber-500/20">
                        <MessageSquare className="h-3 w-3" /> High Debate
                      </span>
                    )}
                  </div>

                  {/* Tweet Content */}
                  <p className="text-xs text-slate-200 line-clamp-3 leading-relaxed">
                    &ldquo;{tweet.text}&rdquo;
                  </p>

                  {/* Velocity Footer */}
                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#1a2130] text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 text-[#00f5a0] font-mono font-medium">
                      <TrendingUp className="h-3 w-3" /> {tweet.velocityLikesPerHour} likes/hr
                    </span>
                    <span className="flex items-center gap-3">
                      <span>{tweet.likes} likes</span>
                      <span>{tweet.repliesCount} replies</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: The Reply Studio (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0b0e15] flex flex-col h-[calc(100vh-4rem)] overflow-y-auto p-4 sm:p-6 justify-between">
          <div className="space-y-5">
            {/* Selected Tweet Card */}
            <div className="rounded-xl border border-[#1f2638] bg-[#111622] p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <img
                    src={selectedTweet.author.avatar}
                    alt={selectedTweet.author.name}
                    className="h-10 w-10 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-white">{selectedTweet.author.name}</span>
                      {selectedTweet.author.verified && (
                        <span className="text-[#00d2ff] text-xs">✓</span>
                      )}
                      <span className="text-xs text-slate-400">@{selectedTweet.author.handle}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {selectedTweet.author.followers} followers • {selectedTweet.createdAtFormatted}
                    </div>
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
            <div className="rounded-xl border border-[#232c40] bg-[#141926] p-3.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00f5a0] mb-1">
                <Cpu className="h-4 w-4" />
                <span>Strategy Insight: Why this tweet is high value</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedTweet.opportunityInsight}
              </p>
            </div>

            {/* The 3 Angle Cards */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
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
                  <span className="text-xs font-bold text-white flex items-center gap-1">
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
                  <span className="text-xs font-bold text-white flex items-center gap-1">
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
                  <span className="text-xs font-bold text-white flex items-center gap-1">
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
