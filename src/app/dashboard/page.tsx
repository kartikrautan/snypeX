'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Rocket } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#07080c] flex items-center justify-center p-6 text-white font-sans">
      <div className="max-w-md w-full text-center space-y-6 rounded-2xl border border-[#1a1f2c] bg-[#0c1017] p-8 shadow-2xl">
        <div className="mx-auto size-16 rounded-2xl bg-[#00f5a0]/10 border border-[#00f5a0]/30 grid place-items-center text-[#00f5a0]">
          <Rocket className="size-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold font-mono">Dashboard Coming Soon</h1>
          <p className="text-sm text-slate-400">
            The full unified engine and Reply Studio are live under <span className="text-[#00f5a0] font-mono">/app</span>.
          </p>
        </div>
        <Link
          href="/app"
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] font-semibold text-[#07080c] hover:opacity-95 shadow-[0_0_20px_rgba(0,245,160,0.3)] transition-all"
        >
          <ArrowLeft className="size-4" />
          <span>Go to Live App (/app)</span>
        </Link>
      </div>
    </div>
  );
}
