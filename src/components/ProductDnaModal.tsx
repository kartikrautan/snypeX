'use client';

import React, { useState } from 'react';
import { ProductDNA } from '@/types';
import { X, Save, Sparkles, Check } from 'lucide-react';

interface ProductDnaModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductDNA;
  onSave: (updated: ProductDNA) => void;
}

export default function ProductDnaModal({
  isOpen,
  onClose,
  product,
  onSave,
}: ProductDnaModalProps) {
  const [formData, setFormData] = useState<ProductDNA>(product);
  const [savedAlert, setSavedAlert] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedAlert(true);
    setTimeout(() => {
      setSavedAlert(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg rounded-2xl border border-[#222938] bg-[#0d1017] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1b2230]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00f5a0]/10 border border-[#00f5a0]/30 text-[#00f5a0]">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Product DNA Calibration</h3>
              <p className="text-xs text-slate-400">Configure how snypeX injects your product context</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-[#1a2130] hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-5">
          {/* Product Name & URL */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Product Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-[#222a3a] bg-[#141924] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#00f5a0] focus:outline-none"
                placeholder="e.g. snypeX"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Website URL
              </label>
              <input
                type="text"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full rounded-lg border border-[#222a3a] bg-[#141924] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#00f5a0] focus:outline-none"
                placeholder="https://snypex.com"
                required
              />
            </div>
          </div>

          {/* Tagline / 1-Sentence Pitch */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              One-Line Elevator Pitch
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full rounded-lg border border-[#222a3a] bg-[#141924] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#00f5a0] focus:outline-none"
              placeholder="e.g. Turn viral tweets into your customer acquisition pipeline."
              required
            />
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Target Audience
            </label>
            <input
              type="text"
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              className="w-full rounded-lg border border-[#222a3a] bg-[#141924] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#00f5a0] focus:outline-none"
              placeholder="e.g. Indie hackers, SaaS founders, and creators wanting inbound leads"
              required
            />
          </div>

          {/* Key Advantage */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Key Advantage / Proof Point
            </label>
            <textarea
              rows={2}
              value={formData.differentiator}
              onChange={(e) => setFormData({ ...formData, differentiator: e.target.value })}
              className="w-full rounded-lg border border-[#222a3a] bg-[#141924] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#00f5a0] focus:outline-none"
              placeholder="e.g. Spots breakout tweets in first 90 mins and generates non-bot data-backed replies."
              required
            />
          </div>

          {/* Tone Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Default Reply Tone
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['founder', 'analytical', 'punchy', 'casual'] as const).map((toneKey) => (
                <button
                  key={toneKey}
                  type="button"
                  onClick={() => setFormData({ ...formData, tone: toneKey })}
                  className={`rounded-lg border py-1.5 text-center text-xs font-medium capitalize transition-all ${
                    formData.tone === toneKey
                      ? 'border-[#00f5a0] bg-[#00f5a0]/15 text-white shadow-sm'
                      : 'border-[#222a3a] bg-[#141924] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {toneKey}
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#1b2230]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] px-4 py-2 text-xs font-bold text-[#07080c] shadow-[0_0_15px_rgba(0,245,160,0.3)] hover:opacity-95"
            >
              {savedAlert ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="h-3.5 w-3.5" />
                  <span>Save DNA</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
