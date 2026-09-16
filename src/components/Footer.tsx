'use client';

import React from 'react';
import Link from 'next/link';
import { Target, Github, Twitter, ArrowUpRight } from 'lucide-react';

const FOOTER_LINKS = {
  Product: [
    { label: 'Launch App', href: '/app', external: false },
    { label: 'Pricing', href: '#pricing', external: false },
    { label: 'Interactive Demo', href: '#demo', external: false },
    { label: 'Command Center', href: '/app', external: false },
  ],
  Resources: [
    { label: 'How It Works', href: '#features', external: false },
    { label: 'FAQ', href: '#faq', external: false },
    { label: 'Comparison', href: '#features', external: false },
    { label: 'Changelog', href: '#', external: false },
  ],
  Company: [
    { label: 'About', href: '#', external: false },
    { label: 'Blog', href: '#', external: false },
    { label: 'Twitter / X', href: 'https://x.com', external: true },
    { label: 'GitHub', href: 'https://github.com/kartikrautan/snypeX', external: true },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#', external: false },
    { label: 'Terms of Service', href: '#', external: false },
    { label: 'Cookie Policy', href: '#', external: false },
    { label: 'Refund Policy', href: '#', external: false },
  ],
};

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-[#151b27] bg-[#07080c] overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-extrabold leading-none tracking-tighter text-white/[0.025] font-mono"
        style={{ fontSize: 'clamp(80px, 18vw, 220px)', bottom: '-0.1em' }}
      >
        snypeX
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-12 border-b border-[#151b27]">
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#00f5a0] to-[#00d2ff] p-0.5 shadow-[0_0_15px_rgba(0,245,160,0.3)]">
                <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-[#07080c]">
                  <Target className="h-5 w-5 text-[#00f5a0] transition-transform group-hover:rotate-45 duration-300" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-mono">snype<span className="text-[#00f5a0]">X</span></span>
            </Link>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">Turn other creators&apos; viral reach into your customer pipeline. The X inbound engine for modern founders.</p>
            <div className="flex items-center gap-3 mt-1">
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1e2535] bg-[#111622] text-slate-400 hover:text-white hover:border-slate-600 transition-all">
                <Twitter className="h-3.5 w-3.5" />
              </a>
              <a href="https://github.com/kartikrautan/snypeX" target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1e2535] bg-[#111622] text-slate-400 hover:text-white hover:border-slate-600 transition-all">
                <Github className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-3">
            <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Start for free, upgrade anytime</p>
            <Link href="/app" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] px-5 py-2.5 text-xs font-bold text-[#07080c] shadow-[0_0_20px_rgba(0,245,160,0.3)] hover:opacity-95 transition-all">
              <span>Launch snypeX Free</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#151b27]">
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 font-mono mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors">
                        {link.label}<ArrowUpRight className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <a href={link.href} className="text-xs text-slate-400 hover:text-white transition-colors">{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6 text-[11px] text-slate-500 font-mono">
          <span>© {new Date().getFullYear()} snypeX. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#00f5a0] animate-pulse"></span>All systems operational</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
