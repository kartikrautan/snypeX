import { TweetOpportunity, ProductDNA } from '@/types';

export interface NicheAnalysis {
  originalQuery: string;
  nicheCategory: string;
  keywords: string[];
  painPoints: string[];
  buyerIntentQueries: string[];
  competitors: string[];
  hashtags: string[];
  xSearchQuery: string;
}

export interface SearchSignalRequest {
  query: string;
  email: string;
  productDna?: ProductDNA;
  maxResults?: number;
}

export interface SearchSignalResponse {
  success: boolean;
  query: string;
  parsedNiche: NicheAnalysis;
  signals: TweetOpportunity[];
  totalFound: number;
  remainingSearches: number;
  providerUsed: string;
  executionTimeMs: number;
  error?: string;
  code?: 'SUCCESS' | 'LIMIT_REACHED' | 'INVALID_EMAIL' | 'EMPTY_QUERY' | 'API_ERROR';
}

export interface EmailUsageRecord {
  email: string;
  searchCount: number;
  maxSearches: number;
  remainingSearches: number;
  allowed: boolean;
  searches: Array<{
    query: string;
    timestamp: string;
  }>;
}

export interface IXSignalProvider {
  name: string;
  isAvailable(): boolean;
  search(analysis: NicheAnalysis, maxResults?: number): Promise<TweetOpportunity[]>;
}
