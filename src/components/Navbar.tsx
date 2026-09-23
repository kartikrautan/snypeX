'use client';

import React from 'react';
import Link from 'next/link';
import { Crosshair, Target, Zap, ArrowRight, Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1a1f2c] bg-[#07080c]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="relative grid size-9 place-items-center rounded-full border-2 border-slate-200 bg-[#0e121b] transition-transform group-hover:scale-105">
            <Crosshair className="size-4.5 text-[#00f5a0]" strokeWidth={2.5} />
            <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-[#00f5a0] shadow-[0_0_8px_#00f5a0]" />
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold tracking-tight text-white font-mono">snype<span className="text-[#00f5a0]">X</span></span>
            <span className="rounded-full bg-[#00f5a0]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[#00f5a0] border border-[#00f5a0]/30">
              v1.0
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#studio" className="hover:text-white transition-colors">
            Reply Studio
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            FAQ
          </a>
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/app"
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] px-4 py-2 text-sm font-semibold text-[#07080c] shadow-[0_0_20px_rgba(0,245,160,0.3)] hover:opacity-95 hover:shadow-[0_0_25px_rgba(0,245,160,0.5)] transition-all"
          >
            <span>Launch App</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}

