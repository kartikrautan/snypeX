'use client';

import React from 'react';
import Link from 'next/link';
import { Target, ArrowUpRight } from 'lucide-react';

function XLogo({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GitHubLogo({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const FOOTER_LINKS = {
  Product: [
    { label: 'Launch App', href: '/app', external: false },
    { label: 'Pricing', href: '#pricing', external: false },
    { label: 'Reply Studio', href: '#studio', external: false },
    { label: 'Opportunity Radar', href: '#radar', external: false },
  ],
  Resources: [
    { label: 'How It Works', href: '#radar', external: false },
    { label: 'Comparison', href: '#compare', external: false },
    { label: 'FAQ', href: '#faq', external: false },
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
    { label: 'Responsible Use', href: '#', external: false },
  ],
};

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-white/[0.08] bg-[#07090e] overflow-hidden">
      {/* Background Watermark Branding */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-mono font-extrabold leading-none tracking-tighter text-white/[0.02]"
        style={{ fontSize: 'clamp(80px, 18vw, 220px)', bottom: '-0.1em' }}
      >
        snypeX
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top bar with Branding & CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-12 border-b border-white/[0.08]">
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <span className="relative grid size-9 place-items-center rounded-full border-2 border-slate-200 bg-[#0e121b] transition-transform group-hover:scale-105">
                <Target className="size-4.5 text-[#00f5a0]" />
              </span>
              <span className="font-mono text-xl font-bold tracking-tight text-white">
                snype<span className="text-[#00f5a0]">X</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              The X inbound growth engine for founders who want to spot high-intent conversations and convert attention into paying customers.
            </p>
            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on X"
                className="flex size-8 items-center justify-center rounded-lg border border-white/[0.1] bg-[#10141f] text-slate-400 hover:text-white hover:border-[#00f5a0]/40 transition-all"
              >
                <XLogo />
              </a>
              <a
                href="https://github.com/kartikrautan/snypeX"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View on GitHub"
                className="flex size-8 items-center justify-center rounded-lg border border-white/[0.1] bg-[#10141f] text-slate-400 hover:text-white hover:border-[#00f5a0]/40 transition-all"
              >
                <GitHubLogo />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-3">
            <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">
              Start spotting signals today
            </p>
            <Link
              href="/app"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] px-5 py-2.5 text-xs font-bold text-[#080a0f] shadow-[0_0_20px_rgba(0,245,160,0.3)] hover:opacity-95 transition-all"
            >
              <span>Launch App Free</span>
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* 4-Column Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/[0.08]">
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[11px] font-mono font-semibold uppercase tracking-widest text-slate-400 mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        className="text-xs text-slate-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar with status indicator */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6 text-[11px] text-slate-500 font-mono">
          <span>&copy; {new Date().getFullYear()} snypeX Labs. Built to make timing your unfair advantage.</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#00f5a0] animate-pulse" />
              <span>All systems watching</span>
            </span>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
