'use client';

import { useState, useCallback } from 'react';
import { TweetOpportunity, ProductDNA } from '@/types';
import { NicheAnalysis, SearchSignalResponse } from './types';

export interface UseSearchSignalsReturn {
  search: (query: string, email: string, productDna?: ProductDNA) => Promise<SearchSignalResponse | null>;
  loading: boolean;
  error: string | null;
  limitReached: boolean;
  signals: TweetOpportunity[];
  parsedNiche: NicheAnalysis | null;
  remainingSearches: number;
  totalFound: number;
}

export function useSearchSignals(initialEmail?: string): UseSearchSignalsReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limitReached, setLimitReached] = useState(false);
  const [signals, setSignals] = useState<TweetOpportunity[]>([]);
  const [parsedNiche, setParsedNiche] = useState<NicheAnalysis | null>(null);
  const [remainingSearches, setRemainingSearches] = useState<number>(2);

  const search = useCallback(async (query: string, email: string, productDna?: ProductDNA): Promise<SearchSignalResponse | null> => {
    if (!query.trim()) {
      setError('Please enter a niche or product keyword.');
      return null;
    }

    if (!email || !email.includes('@')) {
      setError('A valid email address is required.');
      return null;
    }

    setLoading(true);
    setError(null);
    setLimitReached(false);

    try {
      const res = await fetch('/api/search-signals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, email, productDna })
      });

      const data: SearchSignalResponse = await res.json();

      if (res.status === 403 || data.code === 'LIMIT_REACHED') {
        setLimitReached(true);
        setError(data.error || 'Trial limit reached (2/2 searches used). Upgrade to Pro.');
        setRemainingSearches(0);
        return data;
      }

      if (!res.ok || !data.success) {
        setError(data.error || 'Search failed. Please try again.');
        return data;
      }

      setSignals(data.signals || []);
      setParsedNiche(data.parsedNiche || null);
      setRemainingSearches(data.remainingSearches);
      return data;
    } catch (err: any) {
      setError(err.message || 'Network error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    search,
    loading,
    error,
    limitReached,
    signals,
    parsedNiche,
    remainingSearches,
    totalFound: signals.length
  };
}
