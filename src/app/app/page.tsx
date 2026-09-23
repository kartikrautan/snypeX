'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  TrendingUp,
  Sparkles,
  RefreshCw,
  Search,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  Mail,
  Zap,
  ArrowRight,
  Clock,
  Send,
  AlertCircle,
  LogIn,
  LogOut,
  User
} from 'lucide-react';

// Helper to get real working X URLs that never 404
function getLiveXSearchUrl(tweet: TweetOpportunity): string {
  if (tweet.tweetUrl && !tweet.tweetUrl.includes('178901234567890') && !tweet.tweetUrl.includes('189000000000000')) {
    return tweet.tweetUrl;
  }
  const snippet = tweet.text.replace(/["\n\r]/g, ' ').slice(0, 70).trim();
  return `https://x.com/search?q=${encodeURIComponent(snippet)}&f=live`;
}

function getAuthorProfileUrl(handle: string): string {
  const clean = handle.replace(/^@/, '');
  return `https://x.com/${clean}`;
}

export default function UnifiedAppPage() {
  // Product DNA State
  const [products, setProducts] = useState<ProductDNA[]>(SAMPLE_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<ProductDNA>(SAMPLE_PRODUCTS[0]);
  const [isDnaModalOpen, setIsDnaModalOpen] = useState(false);

  const [twitterApiIoKeyInput, setTwitterApiIoKeyInput] = useState('');

  // Email & Auth State
  const [userEmail, setUserEmail] = useState<string>('');
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailInputVal, setEmailInputVal] = useState('');
  const [emailInputError, setEmailInputError] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Search Quota State (2 searches per email limit)
  const [remainingSearches, setRemainingSearches] = useState<number>(9999);
  const [isUnlimitedMode, setIsUnlimitedMode] = useState<boolean>(true);
  const [isProGateOpen, setIsProGateOpen] = useState(false);

  // Search Engine State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchPhase, setSearchPhase] = useState<'parsing' | 'scanning' | 'ranking' | 'done'>('done');
  const [activeNicheLabel, setActiveNicheLabel] = useState('B2B SaaS & Growth');

  // Tweets & Studio State
  const [tweets, setTweets] = useState<TweetOpportunity[]>(MOCK_TWEET_OPPORTUNITIES);
  const [selectedTweet, setSelectedTweet] = useState<TweetOpportunity>(MOCK_TWEET_OPPORTUNITIES[0]);
  const [filterBadge, setFilterBadge] = useState<'all' | OpportunityBadge>('all');
  const [activeAngleKey, setActiveAngleKey] = useState<'dataDrop' | 'conversationHook' | 'stealthPlug'>('dataDrop');
  const [customReplyText, setCustomReplyText] = useState('');
  const [copiedAngle, setCopiedAngle] = useState<string | null>(null);

  // Initialize Email & Quota from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUnlimited = localStorage.getItem('snypex_unlimited_mode');
      if (savedUnlimited !== null) {
        setIsUnlimitedMode(savedUnlimited === 'true');
      }

      const savedEmail = localStorage.getItem('snypex_user_email');
      if (savedEmail) {
        setUserEmail(savedEmail);
        fetch(`/api/search-signals?email=${encodeURIComponent(savedEmail)}`)
          .then(res => res.json())
          .then(data => {
            if (data.success && typeof data.remainingSearches === 'number') {
              setRemainingSearches(data.remainingSearches);
            }
          })
          .catch(() => { });
      }
    }
  }, []);

  // Update reply text when selected tweet, product, or angle changes
  useEffect(() => {
    if (selectedTweet && selectedProduct) {
      const angles = generateReplyAngles(selectedTweet, selectedProduct);
      setCustomReplyText(angles[activeAngleKey].text);
    }
  }, [selectedTweet, selectedProduct, activeAngleKey]);

  // Execute Search Engine on Enter
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      triggerSearch();
    }
  };

  const triggerSearch = async (overrideQuery?: string, overrideEmail?: string) => {
    const queryToUse = (overrideQuery || searchQuery).trim();
    if (!queryToUse) return;

    const emailToUse = (overrideEmail || userEmail).trim();

    // Auto-assign demo user session if not signed in yet
    let effectiveEmail = emailToUse;
    if (!effectiveEmail) {
      effectiveEmail = 'founder_tester@snypex.dev';
      setUserEmail(effectiveEmail);
      localStorage.setItem('snypex_user_email', effectiveEmail);
    }

    // Check if quota is already 0 (unless in Unlimited Dev Mode)
    if (!isUnlimitedMode && remainingSearches <= 0) {
      setIsProGateOpen(true);
      return;
    }

    setIsSearching(true);
    setSearchPhase('parsing');

    try {
      await new Promise(r => setTimeout(r, 600));
      setSearchPhase('scanning');

      const res = await fetch('/api/search-signals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryToUse,
          email: effectiveEmail || 'founder_tester@snypex.dev',
          productDna: selectedProduct,
          maxResults: 6,
          devUnlimited: isUnlimitedMode,
          apifyToken: localStorage.getItem('snypex_apify_token') || undefined,
          twitterApiIoKey: localStorage.getItem('snypex_twitterapi_io_key') || undefined
        })
      });

      const data = await res.json();

      setSearchPhase('ranking');
      await new Promise(r => setTimeout(r, 400));

      if (!isUnlimitedMode && (res.status === 403 || data.code === 'LIMIT_REACHED')) {
        setRemainingSearches(0);
        setIsProGateOpen(true);
        setIsSearching(false);
        setSearchPhase('done');
        return;
      }

      if (data.success && data.signals && data.signals.length > 0) {
        setTweets(data.signals);
        setSelectedTweet(data.signals[0]);
        setActiveNicheLabel(data.parsedNiche?.nicheCategory || queryToUse);
        setRemainingSearches(data.remainingSearches);
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
      setSearchPhase('done');
    }
  };

  // Sign In / Submit Email
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = emailInputVal.trim().toLowerCase();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean);
    if (!valid) {
      setEmailInputError('Please enter a valid email address.');
      return;
    }

    setEmailInputError('');
    setUserEmail(clean);
    localStorage.setItem('snypex_user_email', clean);
    setIsEmailModalOpen(false);

    // Fetch quota for this email
    fetch(`/api/search-signals?email=${encodeURIComponent(clean)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && typeof data.remainingSearches === 'number') {
          setRemainingSearches(data.remainingSearches);
        }
      })
      .catch(() => { });

    // If there was a search query typed, trigger search immediately
    if (searchQuery.trim()) {
      triggerSearch(searchQuery, clean);
    }
  };

  // Sign Out Handler
  const handleSignOut = () => {
    setUserEmail('');
    localStorage.removeItem('snypex_user_email');
    setRemainingSearches(2);
    setShowUserDropdown(false);
  };


  // Toggle Unlimited Dev Mode
  const toggleUnlimitedMode = () => {
    const next = !isUnlimitedMode;
    setIsUnlimitedMode(next);
    localStorage.setItem('snypex_unlimited_mode', String(next));
    if (next) {
      setRemainingSearches(9999);
    } else {
      setRemainingSearches(2);
    }
  };

  // Reset Quota for testing
  const handleResetQuota = async () => {
    if (userEmail) {
      try {
        await fetch('/api/auth-usage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail, action: 'reset' })
        });
      } catch (e) { }
    }
    setRemainingSearches(2);
    setIsUnlimitedMode(false);
    localStorage.setItem('snypex_unlimited_mode', 'false');
    setShowUserDropdown(false);
  };

  // Switch Active Angle
  const handleSelectAngle = (key: 'dataDrop' | 'conversationHook' | 'stealthPlug') => {
    setActiveAngleKey(key);
    const angles = generateReplyAngles(selectedTweet, selectedProduct);
    setCustomReplyText(angles[key].text);
  };

  // Copy to Clipboard
  const handleCopy = (text: string, angleName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAngle(angleName);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00f5a0', '#00d2ff', '#ffffff']
    });
    setTimeout(() => setCopiedAngle(null), 2000);
  };

  // Save Product DNA from modal
  const handleSaveProduct = (updatedProduct: ProductDNA) => {
    const nextList = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    setProducts(nextList);
    setSelectedProduct(updatedProduct);
  };

  const filteredTweets = tweets.filter(t => filterBadge === 'all' || t.badge === filterBadge);
  const replyAngles = generateReplyAngles(selectedTweet, selectedProduct);

  return (
    <div className="h-screen bg-[#07080c] text-slate-100 flex flex-col font-sans selection:bg-[#00f5a0]/30 selection:text-[#00f5a0] overflow-hidden">
      {/* =========================================================
          TOP NAVBAR
      ========================================================= */}
      <header className="flex-shrink-0 z-40 w-full border-b border-[#1a1f2c] bg-[#0c1017]/95 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Logo & Version */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="relative grid size-9 place-items-center rounded-full border-2 border-slate-200 bg-[#0e121b] transition-transform group-hover:scale-105">
                <Crosshair className="size-4.5 text-[#00f5a0]" strokeWidth={2.5} />
                <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-[#00f5a0] shadow-[0_0_8px_#00f5a0]" />
              </span>
              <span className="text-xl font-bold tracking-tight text-white font-mono">
                snype<span className="text-[#00f5a0]">X</span>
              </span>
            </Link>

            <div className="hidden sm:block h-5 w-px bg-slate-800" />

            {/* Product DNA Selector Dropdown */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">PRODUCT DNA:</span>
              <div className="relative inline-block">
                <select
                  value={selectedProduct.id}
                  onChange={(e) => {
                    const found = products.find(p => p.id === e.target.value);
                    if (found) setSelectedProduct(found);
                  }}
                  aria-label="Select Product DNA"
                  className="appearance-none bg-[#131926] border border-[#232c3f] rounded-lg py-1.5 pl-3 pr-8 text-xs font-semibold text-white hover:border-[#00f5a0]/40 focus:outline-none focus:border-[#00f5a0] cursor-pointer"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.tone})</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3 text-slate-400 pointer-events-none" />
              </div>
              <button
                onClick={() => setIsDnaModalOpen(true)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-[#1a2233] rounded-lg transition-colors"
                title="Configure Product DNA"
              >
                <Sliders className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            {/* If NOT logged in: Show single clean "Sign In" button */}
            {!userEmail ? (
              <button
                onClick={() => setIsEmailModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] text-xs font-bold text-[#07080c] hover:opacity-95 shadow-[0_0_18px_rgba(0,245,160,0.25)] transition-all cursor-pointer"
              >
                <LogIn className="size-3.5" />
                <span>Sign In</span>
              </button>
            ) : (
              /* If logged in: Show remaining quota, user email badge, and upgrade button */
              <>
                {/* Search Quota / Unlimited Dev Badge */}
                <div
                  onClick={toggleUnlimitedMode}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono cursor-pointer transition-all ${isUnlimitedMode
                    ? 'border-[#00f5a0]/50 bg-[#00f5a0]/15 text-[#00f5a0] hover:bg-[#00f5a0]/25 shadow-[0_0_12px_rgba(0,245,160,0.2)]'
                    : remainingSearches > 0
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                      : 'border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20'
                    }`}
                  title="Click to toggle Unlimited Dev Mode vs 2-Search Trial Gate"
                >
                  <span className={`size-2 rounded-full animate-pulse ${isUnlimitedMode ? 'bg-[#00f5a0]' : remainingSearches > 0 ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  <span>
                    {isUnlimitedMode
                      ? '⚡ Unlimited Dev Access (♾️)'
                      : remainingSearches > 0
                        ? `${remainingSearches} of 2 Searches Left`
                        : '0/2 Searches (Limit Reached)'}
                  </span>
                </div>

                {/* User Email Pill with Sign Out Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1a2233] bg-[#0e1420] text-xs text-slate-300 hover:border-slate-700 transition-colors"
                  >
                    <Mail className="size-3.5 text-[#00f5a0]" />
                    <span className="truncate max-w-[130px] font-mono">{userEmail}</span>
                    <ChevronDown className="size-3 text-slate-400" />
                  </button>

                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[#232f45] bg-[#0c1017] p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-1.5 border-b border-[#1a2233] mb-1">
                        <p className="text-[10px] text-slate-400 font-mono">SIGNED IN AS</p>
                        <p className="text-xs font-bold text-white truncate">{userEmail}</p>
                      </div>
                      <button
                        onClick={toggleUnlimitedMode}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#00f5a0] hover:bg-[#00f5a0]/10 rounded-lg transition-colors text-left"
                      >
                        <Zap className="size-3.5" />
                        <span>{isUnlimitedMode ? 'Switch to 2-Trial Gate' : 'Enable Unlimited Mode ♾️'}</span>
                      </button>
                      <button
                        onClick={handleResetQuota}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-amber-300 hover:bg-amber-500/10 rounded-lg transition-colors text-left"
                      >
                        <RefreshCw className="size-3.5" />
                        <span>Reset Quota (2/2 Searches)</span>
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors text-left"
                      >
                        <LogOut className="size-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Upgrade to Pro Button */}
                <button
                  onClick={() => setIsProGateOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] text-xs font-bold text-[#07080c] hover:opacity-95 shadow-[0_0_15px_rgba(0,245,160,0.25)] transition-all"
                >
                  <Zap className="size-3.5" />
                  <span>Upgrade to Pro</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* =========================================================
          RADAR SEARCH BAR (Enter Key Trigger - No Reset)
      ========================================================= */}
      <section className="flex-shrink-0 border-b border-[#1a1f2c] bg-[#0a0d14] px-4 py-3.5 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-2">
          <div className="relative flex items-center">
            <Search className="absolute left-4 size-5 text-[#00f5a0]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder={userEmail
                ? "Type your niche (e.g. AI cold outreach, Next.js SaaS, crypto bot) and press Enter ↵..."
                : "Sign in and type your niche to search live X signals under 2 hours..."
              }
              disabled={isSearching}
              className="w-full rounded-xl border border-[#1e2638] bg-[#0e131d] py-3.5 pl-12 pr-28 text-sm text-white placeholder-slate-500 shadow-inner transition-all focus:border-[#00f5a0] focus:outline-none focus:ring-1 focus:ring-[#00f5a0]/50 disabled:opacity-60 font-medium"
            />
            <div className="absolute right-3 flex items-center gap-2">
              <kbd className="hidden sm:inline-flex items-center gap-1 rounded bg-[#172030] px-2 py-1 text-[11px] font-mono text-slate-300 border border-[#2b374e]">
                <span>Enter</span>
                <span className="text-[#00f5a0]">↵</span>
              </kbd>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 px-1 gap-2">
            <div className="flex items-center gap-2 font-mono">
              <span className="text-[#00f5a0]">●</span>
              <span>Active Niche: <strong className="text-slate-200">{activeNicheLabel}</strong></span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">Scans live tweets &lt; 2h old</span>
            </div>
            <div className="text-[11px] text-slate-500">
              Press <kbd className="text-slate-300 font-mono">Enter ↵</kbd> to search.
            </div>
          </div>

          {/* Live Scanning Step Progression */}
          {isSearching && (
            <div className="mt-2 rounded-xl border border-[#00f5a0]/30 bg-[#00f5a0]/5 p-3 text-xs text-white flex items-center gap-3 animate-pulse">
              <RefreshCw className="size-4 text-[#00f5a0] animate-spin" />
              <div className="flex-1 font-mono">
                {searchPhase === 'parsing' && <span>🔍 Understanding niche & extracting buyer intent keywords...</span>}
                {searchPhase === 'scanning' && <span>⚡ Scanning X for live breakout conversations (&lt;2h old)...</span>}
                {searchPhase === 'ranking' && <span>🎯 Calculating engagement velocity and ranking reply opportunities...</span>}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          MAIN UNIFIED WORKSPACE (SPLIT LAYOUT WITH CONTAINED SCROLL)
      ========================================================= */}
      <main className="flex-1 min-h-0 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        {/* =====================================================
            LEFT PANEL: SIGNAL RADAR (Scrollable Tweet List)
        ===================================================== */}
        <section className="lg:col-span-5 flex flex-col h-full min-h-0 space-y-3">
          <div className="flex-shrink-0 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-[#00f5a0] animate-ping" />
              <h2 className="text-sm font-bold font-mono tracking-wider text-slate-200 uppercase">
                Signal Radar
              </h2>
              <span className="rounded-full bg-[#162030] px-2 py-0.5 text-[11px] font-mono text-slate-400 border border-[#232f45]">
                {filteredTweets.length} live
              </span>
            </div>

            {/* Filter Badges */}
            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={() => setFilterBadge('all')}
                className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${filterBadge === 'all'
                  ? 'bg-[#00f5a0]/15 text-[#00f5a0] border border-[#00f5a0]/30'
                  : 'text-slate-400 hover:text-white bg-[#0e131d]'
                  }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterBadge('hot')}
                className={`px-2.5 py-1 rounded-lg transition-colors font-medium flex items-center gap-1 ${filterBadge === 'hot'
                  ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                  : 'text-slate-400 hover:text-white bg-[#0e131d]'
                  }`}
              >
                <Flame className="size-3" />
                <span>Viral</span>
              </button>
              <button
                onClick={() => setFilterBadge('lead')}
                className={`px-2.5 py-1 rounded-lg transition-colors font-medium flex items-center gap-1 ${filterBadge === 'lead'
                  ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-white bg-[#0e131d]'
                  }`}
              >
                <HelpCircle className="size-3" />
                <span>Leads</span>
              </button>
              <button
                onClick={() => setFilterBadge('debate')}
                className={`px-2.5 py-1 rounded-lg transition-colors font-medium flex items-center gap-1 ${filterBadge === 'debate'
                  ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                  : 'text-slate-400 hover:text-white bg-[#0e131d]'
                  }`}
              >
                <MessageSquare className="size-3" />
                <span>Debate</span>
              </button>
            </div>
          </div>

          {/* Scrollable Tweet Opportunities List */}
          <div className="flex-1 min-h-0 overflow-y-auto pr-1.5 space-y-3">
            {filteredTweets.map((tweet) => {
              const isSelected = selectedTweet?.id === tweet.id;
              return (
                <div
                  key={tweet.id}
                  onClick={() => setSelectedTweet(tweet)}
                  className={`group relative rounded-xl border p-4 transition-all cursor-pointer ${isSelected
                    ? 'border-[#00f5a0] bg-[#0e1622] shadow-[0_0_20px_rgba(0,245,160,0.15)] ring-1 ring-[#00f5a0]/40'
                    : 'border-[#1a2233] bg-[#0c1017] hover:border-slate-700 hover:bg-[#0f141e]'
                    }`}
                >
                  {/* Badge & Time Ago (<2h) */}
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${tweet.badge === 'hot'
                      ? 'border-rose-500/30 bg-rose-500/10 text-rose-400'
                      : tweet.badge === 'lead'
                        ? 'border-blue-500/30 bg-blue-500/10 text-blue-400'
                        : 'border-purple-500/30 bg-purple-500/10 text-purple-400'
                      }`}>
                      {tweet.badge === 'hot' && <Flame className="size-3" />}
                      {tweet.badge === 'lead' && <HelpCircle className="size-3" />}
                      {tweet.badge === 'debate' && <MessageSquare className="size-3" />}
                      <span>{tweet.badgeLabel}</span>
                    </span>

                    <span className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
                      <Clock className="size-3 text-emerald-400" />
                      <span>{tweet.createdAtFormatted}</span>
                    </span>
                  </div>

                  {/* Author Header */}
                  <div className="flex items-center gap-2.5 mb-2.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tweet.author.avatar}
                      alt={tweet.author.name}
                      className="size-8 rounded-full object-cover border border-[#232f45]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white truncate">{tweet.author.name}</span>
                        {tweet.author.verified && (
                          <span className="size-3.5 rounded-full bg-[#00d2ff] grid place-items-center text-[#07080c] text-[9px] font-bold">
                            ✓
                          </span>
                        )}
                      </div>
                      <a
                        href={getAuthorProfileUrl(tweet.author.handle)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[11px] text-slate-400 font-mono hover:text-[#00f5a0] transition-colors"
                      >
                        @{tweet.author.handle.replace(/^@/, '')}
                      </a>
                    </div>
                    {tweet.author.followers && (
                      <span className="text-[10px] text-slate-400 bg-[#162030] px-2 py-0.5 rounded border border-[#243045] font-mono">
                        {tweet.author.followers} flwrs
                      </span>
                    )}
                  </div>

                  {/* Tweet Text */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-3 line-clamp-3">
                    {tweet.text}
                  </p>

                  {/* Velocity & Opportunity Insight */}
                  <div className="rounded-lg bg-[#070a0f] p-2.5 border border-[#172030] space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <div className="flex items-center gap-3 text-slate-400">
                        <span>❤️ {tweet.likes}</span>
                        <span>🔁 {tweet.retweets}</span>
                        <span>💬 {tweet.repliesCount}</span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-400 font-bold">
                        <TrendingUp className="size-3" />
                        <span>{tweet.velocityLikesPerHour} likes/hr</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 italic">
                      💡 {tweet.opportunityInsight}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            RIGHT PANEL: REPLY STUDIO & GENERATOR
        ===================================================== */}
        <section className="lg:col-span-7 flex flex-col h-full min-h-0 overflow-y-auto pr-1.5 space-y-4">
          <div className="rounded-2xl border border-[#1e2638] bg-[#0c1017] p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1a2233] pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-[#00f5a0]" />
                <h3 className="text-sm font-bold font-mono tracking-wider text-white uppercase">
                  Reply Studio Workspace
                </h3>
              </div>

              {/* Working X Links (Never 404) */}
              <div className="flex items-center gap-2">
                <a
                  href={getAuthorProfileUrl(selectedTweet.author.handle)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white bg-[#121824] px-2.5 py-1 rounded-lg border border-[#1f293d] transition-colors"
                >
                  <User className="size-3" />
                  <span>@{selectedTweet.author.handle.replace(/^@/, '')}</span>
                </a>
                <a
                  href={getLiveXSearchUrl(selectedTweet)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] text-[#00f5a0] hover:underline bg-[#00f5a0]/10 px-2.5 py-1 rounded-lg border border-[#00f5a0]/30 transition-colors"
                  title="Search live matching tweets directly on X"
                >
                  <span>Search Topic on X</span>
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </div>

            {/* Original Tweet Box */}
            <div className="rounded-xl border border-[#1f293d] bg-[#0a0e16] p-4 space-y-2">
              <div className="flex items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedTweet.author.avatar}
                  alt={selectedTweet.author.name}
                  className="size-7 rounded-full object-cover"
                />
                <span className="text-xs font-bold text-white">{selectedTweet.author.name}</span>
                <span className="text-xs text-slate-400 font-mono">@{selectedTweet.author.handle.replace(/^@/, '')}</span>
                <span className="ml-auto text-[11px] text-emerald-400 font-mono">
                  {selectedTweet.createdAtFormatted}
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-normal">
                {selectedTweet.text}
              </p>
            </div>

            {/* Generated Reply Angles (3 Strategic Options) */}
            <div className="space-y-2.5">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Select Strategic Reply Angle
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Angle 1: Data Drop */}
                <div
                  onClick={() => handleSelectAngle('dataDrop')}
                  className={`rounded-xl border p-3 cursor-pointer transition-all ${activeAngleKey === 'dataDrop'
                    ? 'border-[#00f5a0] bg-[#00f5a0]/10 text-white shadow-[0_0_15px_rgba(0,245,160,0.1)]'
                    : 'border-[#1a2233] bg-[#0e131d] text-slate-300 hover:border-slate-700'
                    }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span>{replyAngles.dataDrop.title}</span>
                    {activeAngleKey === 'dataDrop' && <Check className="size-3 text-[#00f5a0]" />}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {replyAngles.dataDrop.description}
                  </p>
                </div>

                {/* Angle 2: Hook */}
                <div
                  onClick={() => handleSelectAngle('conversationHook')}
                  className={`rounded-xl border p-3 cursor-pointer transition-all ${activeAngleKey === 'conversationHook'
                    ? 'border-[#00f5a0] bg-[#00f5a0]/10 text-white shadow-[0_0_15px_rgba(0,245,160,0.1)]'
                    : 'border-[#1a2233] bg-[#0e131d] text-slate-300 hover:border-slate-700'
                    }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span>{replyAngles.conversationHook.title}</span>
                    {activeAngleKey === 'conversationHook' && <Check className="size-3 text-[#00f5a0]" />}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {replyAngles.conversationHook.description}
                  </p>
                </div>

                {/* Angle 3: Stealth Plug */}
                <div
                  onClick={() => handleSelectAngle('stealthPlug')}
                  className={`rounded-xl border p-3 cursor-pointer transition-all ${activeAngleKey === 'stealthPlug'
                    ? 'border-[#00f5a0] bg-[#00f5a0]/10 text-white shadow-[0_0_15px_rgba(0,245,160,0.1)]'
                    : 'border-[#1a2233] bg-[#0e131d] text-slate-300 hover:border-slate-700'
                    }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span>{replyAngles.stealthPlug.title}</span>
                    {activeAngleKey === 'stealthPlug' && <Check className="size-3 text-[#00f5a0]" />}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {replyAngles.stealthPlug.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Reply Editor & Actions */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Active Angle: <strong className="text-[#00f5a0]">{replyAngles[activeAngleKey].title}</strong></span>
                <span className={customReplyText.length > 280 ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                  {customReplyText.length} / 280 chars
                </span>
              </div>

              <textarea
                value={customReplyText}
                onChange={(e) => setCustomReplyText(e.target.value)}
                rows={4}
                aria-label="Edit generated reply before posting"
                className="w-full rounded-xl border border-[#232f45] bg-[#080c14] p-3.5 text-xs text-white leading-relaxed focus:border-[#00f5a0] focus:outline-none focus:ring-1 focus:ring-[#00f5a0]/40 font-mono"
              />

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-mono">Product:</span>
                  <span className="text-[11px] font-bold text-slate-200 bg-[#162030] px-2 py-1 rounded border border-[#232f45]">
                    {selectedProduct.name} ({selectedProduct.tone})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(customReplyText, activeAngleKey)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#24324c] bg-[#111827] text-xs font-semibold text-slate-200 hover:text-white hover:border-[#00f5a0]/50 transition-all cursor-pointer"
                  >
                    {copiedAngle === activeAngleKey ? (
                      <>
                        <Check className="size-3.5 text-[#00f5a0]" />
                        <span className="text-[#00f5a0]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        <span>Copy Reply</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`https://x.com/intent/tweet?text=${encodeURIComponent(customReplyText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] text-xs font-bold text-[#07080c] hover:opacity-95 shadow-[0_0_20px_rgba(0,245,160,0.3)] transition-all cursor-pointer"
                  >
                    <Send className="size-3.5" />
                    <span>Post on X</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================
          SIGN IN / EMAIL AUTH MODAL
      ========================================================= */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl border border-[#1f2a3d] bg-[#0c1017] p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#1a2233] pb-3">
              <div className="flex items-center gap-2">
                <LogIn className="size-5 text-[#00f5a0]" />
                <h3 className="text-base font-bold text-white font-mono">Sign In to snypeX</h3>
              </div>
              <button
                onClick={() => setIsEmailModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Enter your email address to sign in and activate your <strong>2 free real-time Signal Radar searches</strong>.
            </p>

            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <div>
                <input
                  type="email"
                  value={emailInputVal}
                  onChange={(e) => setEmailInputVal(e.target.value)}
                  placeholder="founder@yourcompany.com"
                  autoFocus
                  className="w-full rounded-xl border border-[#243048] bg-[#080c14] py-3 px-4 text-sm text-white placeholder-slate-500 focus:border-[#00f5a0] focus:outline-none focus:ring-1 focus:ring-[#00f5a0]"
                />
                {emailInputError && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    <span>{emailInputError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] font-bold text-xs text-[#07080c] hover:opacity-95 shadow-[0_0_20px_rgba(0,245,160,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Sign In & Activate Radar</span>
                <ArrowRight className="size-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          PRO GATE MODAL (Limit Reached)
      ========================================================= */}
      {isProGateOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full rounded-2xl border border-[#2a364f] bg-[#0b0f17] p-7 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#1c2436] pb-3">
              <div className="flex items-center gap-2 text-[#00f5a0]">
                <Zap className="size-5" />
                <h3 className="text-base font-bold text-white font-mono">Upgrade to Pro</h3>
              </div>
              <button
                onClick={() => setIsProGateOpen(false)}
                className="text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
                <span>Free Trial Limit Reached (2/2 Searches Used)</span>
              </div>
              <h2 className="text-xl font-bold text-white font-mono">
                Unlock Unlimited Real-Time Radar Searches
              </h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Monitor break-out conversations 24/7 across your exact customer ICP and generate high-authority replies before anyone else.
              </p>
            </div>

            {/* Pricing Card */}
            <div className="rounded-xl border border-[#00f5a0]/40 bg-[#00f5a0]/5 p-4 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white font-mono">Pro Founder Tier</h4>
                  <p className="text-[11px] text-slate-400">Unlimited searches + 24/7 Signal Radar</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-white font-mono">$29</span>
                  <span className="text-xs text-slate-400">/mo</span>
                </div>
              </div>

              <ul className="text-xs text-slate-300 space-y-1.5 font-sans">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-[#00f5a0]" />
                  <span>Unlimited live X signal searches for any niche</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-[#00f5a0]" />
                  <span>Full 3-angle AI reply generation engine</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-[#00f5a0]" />
                  <span>Custom Product DNA & Tone Profiles</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                alert('Stripe Checkout will be connected in next step!');
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] font-bold text-xs text-[#07080c] hover:opacity-95 shadow-[0_0_25px_rgba(0,245,160,0.4)] transition-all flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
            >
              <span>Upgrade Now — Instant Access</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}


      {/* =========================================================
          PRODUCT DNA MODAL
      ========================================================= */}
      <ProductDnaModal
        isOpen={isDnaModalOpen}
        onClose={() => setIsDnaModalOpen(false)}
        product={selectedProduct}
        onSave={handleSaveProduct}
      />
    </div>
  );
}
