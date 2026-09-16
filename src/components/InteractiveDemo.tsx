'use client';

import React, { useState } from 'react';
import { MOCK_TWEET_OPPORTUNITIES, SAMPLE_PRODUCTS } from '@/lib/mockData';
import { generateReplyAngles } from '@/lib/generator';
import { 
  Flame, 
  HelpCircle, 
  MessageSquare, 
  CheckCircle2, 
  Copy, 
  Send, 
  Sparkles, 
  Check, 
  ArrowUpRight,
  TrendingUp,
  Cpu
} from 'lucide-react';

export default function InteractiveDemo() {
  const [selectedProduct, setSelectedProduct] = useState(SAMPLE_PRODUCTS[0]);
  const [selectedTweet, setSelectedTweet] = useState(MOCK_TWEET_OPPORTUNITIES[0]);
  const [activeAngleKey, setActiveAngleKey] = useState<'dataDrop' | 'conversationHook' | 'stealthPlug'>('dataDrop');
  const [copied, setCopied] = useState(false);

  const angles = generateReplyAngles(selectedTweet, selectedProduct);
  const currentReplyText = angles[activeAngleKey].text;
  const charCount = currentReplyText.length;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentReplyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePostOnX = () => {
    const encodedText = encodeURIComponent(currentReplyText);
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
    window.open(intentUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-6xl mx-auto rounded-2xl border border-[#222938] bg-[#0c0f17]/90 backdrop-blur-xl shadow-2xl p-4 sm:p-5">
      {/* Top Header & Product Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#1c2230] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#00f5a0] animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#00f5a0] font-semibold">
              Live Interactive Radar Simulator
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Test snypeX in real-time
          </h3>
        </div>

        {/* Product DNA Persona Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Testing as product:</span>
          <select
            value={selectedProduct.id}
            onChange={(e) => {
              const prod = SAMPLE_PRODUCTS.find((p) => p.id === e.target.value);
              if (prod) setSelectedProduct(prod);
            }}
            className="rounded-lg border border-[#252e40] bg-[#141924] px-3 py-1.5 text-xs font-semibold text-white focus:outline-none focus:border-[#00f5a0]"
          >
            {SAMPLE_PRODUCTS.map((prod) => (
              <option key={prod.id} value={prod.id}>
                {prod.name} ({prod.targetAudience.slice(0, 20)}...)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
        {/* Left Column: Viral Opportunity Selector (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
            <span>Detected Breakout Posts</span>
            <span className="text-[#00f5a0] text-[11px] font-mono">3 Hot Opportunities</span>
          </div>

          {MOCK_TWEET_OPPORTUNITIES.slice(0, 3).map((tweet) => {
            const isSelected = selectedTweet.id === tweet.id;
            return (
              <div
                key={tweet.id}
                onClick={() => setSelectedTweet(tweet)}
                className={`cursor-pointer rounded-xl p-4 transition-all duration-200 border ${
                  isSelected
                    ? 'border-[#00f5a0] bg-[#141b27] shadow-[0_0_15px_rgba(0,245,160,0.15)]'
                    : 'border-[#1b2230] bg-[#10141d]/70 hover:border-slate-700 hover:bg-[#131824]'
                }`}
              >
                {/* Author Info & Badge */}
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

                {/* Tweet Text Snippet */}
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  &ldquo;{tweet.text}&rdquo;
                </p>

                {/* Velocity Indicator */}
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#1a2130] text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-[#00f5a0] font-mono">
                    <TrendingUp className="h-3 w-3" /> {tweet.velocityLikesPerHour} likes/hr
                  </span>
                  <span>{tweet.repliesCount} replies</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: snypeX Reply Studio (7 Cols) */}
        <div className="lg:col-span-7 rounded-xl border border-[#1e2535] bg-[#111622] p-5 flex flex-col justify-between">
          <div>
            {/* Context & Why Reply */}
            <div className="rounded-lg bg-[#161c2b] border border-[#232c40] p-2.5 mb-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00d2ff] mb-1">
                <Cpu className="h-3.5 w-3.5" />
                <span>Opportunity Radar Analysis</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedTweet.opportunityInsight}
              </p>
            </div>

            {/* 3 Angle Tabs */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <button
                type="button"
                onClick={() => setActiveAngleKey('dataDrop')}
                className={`flex flex-col text-left p-2.5 rounded-lg border text-xs transition-all ${
                  activeAngleKey === 'dataDrop'
                    ? 'border-[#00f5a0] bg-[#00f5a0]/10 text-white shadow-sm'
                    : 'border-[#222a3a] bg-[#141924] text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="font-bold flex items-center gap-1">
                  📊 The Data Drop
                </span>
                <span className="text-[10px] text-slate-400 truncate mt-0.5">Top-voted facts</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveAngleKey('conversationHook')}
                className={`flex flex-col text-left p-2.5 rounded-lg border text-xs transition-all ${
                  activeAngleKey === 'conversationHook'
                    ? 'border-[#00d2ff] bg-[#00d2ff]/10 text-white shadow-sm'
                    : 'border-[#222a3a] bg-[#141924] text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="font-bold flex items-center gap-1">
                  💬 The Hook
                </span>
                <span className="text-[10px] text-slate-400 truncate mt-0.5">Author dialogue</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveAngleKey('stealthPlug')}
                className={`flex flex-col text-left p-2.5 rounded-lg border text-xs transition-all ${
                  activeAngleKey === 'stealthPlug'
                    ? 'border-purple-400 bg-purple-500/10 text-white shadow-sm'
                    : 'border-[#222a3a] bg-[#141924] text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="font-bold flex items-center gap-1">
                  🎯 Stealth Plug
                </span>
                <span className="text-[10px] text-slate-400 truncate mt-0.5">Subtle customer lead</span>
              </button>
            </div>

            {/* Generated Reply Box */}
            <div className="relative rounded-xl border border-[#232c40] bg-[#0b0e15] p-4">
              <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-[#1b2230] mb-2 font-mono">
                <span className="text-[#00f5a0]">Calibrated for: @{selectedTweet.author.handle}</span>
                <span className={charCount > 280 ? 'text-red-400 font-bold' : 'text-slate-400'}>
                  {charCount} / 280 chars
                </span>
              </div>
              <p className="text-sm text-slate-100 font-normal leading-relaxed whitespace-pre-line py-1">
                {currentReplyText}
              </p>
            </div>
          </div>

          {/* Action Bar (1-Click Post & Copy) */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-[#1b2230]">
            <div className="text-xs text-slate-400">
              ⚡ Zero bot phrases. Grounded in real data.
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg border border-[#252e40] bg-[#151a26] px-3 py-2 text-xs font-medium text-slate-200 hover:bg-[#1c2333] transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#00f5a0]" />
                    <span className="text-[#00f5a0]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePostOnX}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] px-4 py-2 text-xs font-bold text-[#07080c] shadow-[0_0_15px_rgba(0,245,160,0.3)] hover:opacity-95 transition-all"
              >
                <span>Post on X</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

