'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PRICING_TIERS } from '@/lib/mockData';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section id="pricing" className="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="rounded-full bg-[#00f5a0]/10 px-3 py-1 text-xs font-semibold text-[#00f5a0] border border-[#00f5a0]/30 font-mono uppercase tracking-wider">
          Transparent Pricing
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
          Invest in High-IQ Distribution.
        </h2>
        <p className="text-slate-400 mt-3 text-base sm:text-lg">
          One smart reply under a viral post can drive 50+ qualified visitors to your landing page. Pick the tier that matches your growth velocity.
        </p>

        {/* Monthly vs Yearly Toggle */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white font-semibold' : 'text-slate-400'}`}>
            Monthly Billing
          </span>
          <button
            type="button"
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="relative h-7 w-12 rounded-full bg-[#1b2230] border border-[#273248] p-0.5 transition-colors focus:outline-none"
          >
            <div
              className={`h-5 w-5 rounded-full bg-[#00f5a0] transition-transform duration-200 ${
                billingCycle === 'yearly' ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
          <div className="flex items-center gap-1.5">
            <span className={`text-sm ${billingCycle === 'yearly' ? 'text-white font-semibold' : 'text-slate-400'}`}>
              Annual Billing
            </span>
            <span className="rounded-full bg-[#00f5a0]/20 px-2 py-0.5 text-[10px] font-bold text-[#00f5a0] border border-[#00f5a0]/40">
              Save 20%
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {PRICING_TIERS.map((tier) => {
          const price = billingCycle === 'yearly' ? tier.priceYearly : tier.priceMonthly;
          return (
            <div
              key={tier.id}
              className={`relative flex flex-col justify-between rounded-2xl p-8 border transition-all duration-200 ${
                tier.popular
                  ? 'border-[#00f5a0] bg-[#0e131d] shadow-[0_0_30px_rgba(0,245,160,0.15)] ring-1 ring-[#00f5a0]'
                  : 'border-[#1e2535] bg-[#0c1017]/80 hover:border-slate-700'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] px-3 py-0.5 text-xs font-bold text-[#07080c] shadow-md flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  <span>{tier.badge}</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                  {!tier.popular && tier.badge && (
                    <span className="rounded-md bg-[#161c28] px-2 py-0.5 text-[11px] font-medium text-slate-400 border border-[#232c3d]">
                      {tier.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-2 min-h-[36px]">{tier.description}</p>

                {/* Price */}
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white font-mono">${price}</span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                {billingCycle === 'yearly' && (
                  <p className="text-[11px] text-[#00f5a0] mt-1 font-mono">Billed annually (${price * 12}/yr)</p>
                )}

                {/* Features List */}
                <div className="mt-8 space-y-3 border-t border-[#1b2230] pt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    What is included:
                  </p>
                  <ul className="space-y-2.5">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="h-4 w-4 text-[#00f5a0] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4">
                <Link
                  href="/app"
                  className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition-all ${
                    tier.popular
                      ? 'bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] text-[#07080c] shadow-[0_0_20px_rgba(0,245,160,0.3)] hover:opacity-95'
                      : 'border border-[#252f42] bg-[#141a26] text-white hover:bg-[#1a2233]'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
