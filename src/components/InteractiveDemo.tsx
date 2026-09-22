'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_TWEET_OPPORTUNITIES, SAMPLE_PRODUCTS } from '@/lib/mockData';
import { generateReplyAngles } from '@/lib/generator';
import { ProductDNA, TweetOpportunity } from '@/types';
import { 
  Flame, 
  HelpCircle, 
  MessageSquare, 
  Copy, 
  Check, 
  ArrowUpRight, 
  TrendingUp, 
  Cpu,
  Sparkles,
  Zap
} from 'lucide-react';

export default function InteractiveDemo() {
  const [selectedProduct, setSelectedProduct] = useState<ProductDNA>(SAMPLE_PRODUCTS[0]);
  const [selectedTweet, setSelectedTweet] = useState<TweetOpportunity>(MOCK_TWEET_OPPORTUNITIES[0]);
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
    <div className="w-full max-w-6xl mx-auto rounded-2xl border border-white/[0.1] bg-[#0c1018]/95 backdrop-blur-xl shadow-2xl p-4 sm:p-6">
      {/* Header & Product Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-white/[0.08] gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex size-2.5">
              <span className="signal-pulse absolute size-2.5 rounded-full bg-[#00f5a0]" />
              <span className="relative size-2.5 rounded-full bg-[#00f5a0]" />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#00f5a0] font-semibold">
              Live Golden Window Simulator
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 font-mono">
            Test the Anti-Clich&eacute; Reply Studio
          </h3>
        </div>

        {/* Sample Product DNA Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Testing as persona:</span>
          {SAMPLE_PRODUCTS.map((prod) => (
            <button
              key={prod.id}
              type="button"
              onClick={() => setSelectedProduct(prod)}
              className={`rounded-lg px-3 py-1.5 text-xs font-mono transition-all ${
                selectedProduct.id === prod.id
                  ? 'border border-[#00f5a0] bg-[#00f5a0]/15 text-[#00f5a0] font-bold shadow-[0_0_10px_rgba(0,245,160,0.2)]'
                  : 'border border-white/[0.08] bg-[#121622] text-slate-400 hover:text-white hover:border-slate-600'
              }`}
            >
              {prod.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Simulator Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">
        {/* Left Column: Detected Breakout Opportunities */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between font-mono">
            <span>Detected Breakout Posts</span>
            <span className="text-[#00f5a0] text-[11px]">3 Golden Window Leads</span>
          </div>

          {MOCK_TWEET_OPPORTUNITIES.slice(0, 3).map((tweet) => {
            const isSelected = selectedTweet.id === tweet.id;
            return (
              <div
                key={tweet.id}
                onClick={() => setSelectedTweet(tweet)}
                className={`cursor-pointer rounded-xl p-4 transition-all duration-200 border ${
                  isSelected
                    ? 'border-[#00f5a0] bg-[#141b27] shadow-[0_0_20px_rgba(0,245,160,0.15)]'
                    : 'border-white/[0.08] bg-[#0f131d]/80 hover:border-slate-700 hover:bg-[#121723]'
                }`}
              >
                {/* Author Info & Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={tweet.author.avatar}
                      alt={tweet.author.name}
                      className="size-7 rounded-full object-cover border border-slate-700"
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
                      <Flame className="size-3" /> {tweet.minutesAgo}m ago
                    </span>
                  )}
                  {tweet.badge === 'lead' && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/15 px-2 py-0.5 text-[10px] font-semibold text-purple-400 border border-purple-500/25 font-mono">
                      <HelpCircle className="size-3" /> Buying Intent
                    </span>
                  )}
                  {tweet.badge === 'debate' && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-400 border border-amber-500/25 font-mono">
                      <MessageSquare className="size-3" /> High Debate
                    </span>
                  )}
                </div>

                {/* Tweet Text Snippet */}
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  &ldquo;{tweet.text}&rdquo;
                </p>

                {/* Velocity Indicator */}
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/[0.06] text-[11px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1 text-[#00f5a0]">
                    <TrendingUp className="size-3" /> {tweet.velocityLikesPerHour} likes/hr
                  </span>
                  <span>{tweet.repliesCount} replies</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: snypeX Reply Studio */}
        <div className="lg:col-span-7 rounded-2xl border border-white/[0.1] bg-[#0f131d] p-5 flex flex-col justify-between relative">
          <div>
            {/* Radar Insight Banner */}
            <div className="rounded-xl bg-[#141a27] border border-white/[0.08] p-3 mb-3">
              <div className="flex items-center justify-between text-xs font-semibold text-[#00d2ff] mb-1">
                <span className="flex items-center gap-1.5 font-mono">
                  <Cpu className="size-3.5 text-[#00f5a0]" /> Opportunity Radar Analysis
                </span>
                <span className="text-[10px] font-mono text-[#00f5a0] bg-[#00f5a0]/10 px-2 py-0.5 rounded-full border border-[#00f5a0]/30">
                  Golden 30–90m Window
                </span>
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
                className={`flex flex-col text-left p-2.5 rounded-xl border text-xs transition-all ${
                  activeAngleKey === 'dataDrop'
                    ? 'border-[#00f5a0] bg-[#00f5a0]/10 text-white shadow-sm'
                    : 'border-white/[0.08] bg-[#121622] text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="font-bold font-mono">📊 The Data Drop</span>
                <span className="text-[10px] text-slate-400 truncate mt-0.5">Proof-backed facts</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveAngleKey('conversationHook')}
                className={`flex flex-col text-left p-2.5 rounded-xl border text-xs transition-all ${
                  activeAngleKey === 'conversationHook'
                    ? 'border-[#00d2ff] bg-[#00d2ff]/10 text-white shadow-sm'
                    : 'border-white/[0.08] bg-[#121622] text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="font-bold font-mono">💬 The Hook</span>
                <span className="text-[10px] text-slate-400 truncate mt-0.5">Author dialogue</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveAngleKey('stealthPlug')}
                className={`flex flex-col text-left p-2.5 rounded-xl border text-xs transition-all ${
                  activeAngleKey === 'stealthPlug'
                    ? 'border-purple-400 bg-purple-500/10 text-white shadow-sm'
                    : 'border-white/[0.08] bg-[#121622] text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="font-bold font-mono">🎯 Soft Plug</span>
                <span className="text-[10px] text-slate-400 truncate mt-0.5">High-intent lead</span>
              </button>
            </div>

            {/* Generated Reply Box */}
            <div className="relative rounded-xl border border-white/[0.08] bg-[#090c12] p-4 min-h-[160px] flex flex-col justify-between">
              {/* Header inside box */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-white/[0.06] mb-2 font-mono">
                <span className="text-[#00f5a0]">Calibrated for: @{selectedTweet.author.handle} &bull; {selectedProduct.name}</span>
                <span>{charCount} / 280 chars</span>
              </div>

              {/* Reply Content */}
              <p className="text-sm text-slate-100 font-normal leading-relaxed whitespace-pre-line py-1">
                {currentReplyText}
              </p>
            </div>
          </div>

          {/* Action Bar (1-Click Post & Copy) */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-white/[0.08]">
            <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
              <Zap className="size-3.5 text-[#00f5a0]" />
              <span>Zero AI clichés. Calibrated with Product DNA.</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-xl border border-white/[0.1] bg-[#141a27] px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-[#1c2333] transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-[#00f5a0]" />
                    <span className="text-[#00f5a0]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePostOnX}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] px-4 py-2 text-xs font-bold text-[#080a0f] shadow-[0_0_15px_rgba(0,245,160,0.3)] hover:opacity-95 transition-all"
              >
                <span>Post on X</span>
                <ArrowUpRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
