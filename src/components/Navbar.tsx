'use client';

import React from 'react';
import Link from 'next/link';
import { Target, Zap, ArrowRight, Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1a1f2c] bg-[#07080c]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#00f5a0] to-[#00d2ff] p-0.5 shadow-[0_0_15px_rgba(0,245,160,0.3)]">
            <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-[#07080c]">
              <Target className="h-5 w-5 text-[#00f5a0] transition-transform group-hover:rotate-45 duration-300" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold tracking-tight text-white font-mono">snype<span className="text-[#00f5a0]">X</span></span>
            <span className="rounded-full bg-[#00f5a0]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[#00f5a0] border border-[#00f5a0]/30">
              v1.0
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#demo" className="hover:text-white transition-colors">
            Interactive Demo
          </a>
          <a href="#features" className="hover:text-white transition-colors">
            Features
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
