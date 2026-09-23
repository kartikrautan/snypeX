import { EmailUsageRecord } from './types';
import { getSupabaseServerClient } from '../supabaseServer';

const MAX_FREE_SEARCHES_PER_EMAIL = 2;

// In-memory persistent cache for server lifecycle
const localUsageMap = new Map<string, { count: number; searches: Array<{ query: string; timestamp: string }> }>();

function normalizeEmail(email: string): string {
  return (email || '').trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(normalizeEmail(email));
}

export async function checkEmailUsage(rawEmail: string): Promise<EmailUsageRecord> {
  const email = normalizeEmail(rawEmail);
  if (!isValidEmail(email)) {
    return {
      email,
      searchCount: 0,
      maxSearches: MAX_FREE_SEARCHES_PER_EMAIL,
      remainingSearches: 0,
      allowed: false,
      searches: []
    };
  }

  const supabase = getSupabaseServerClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('user_searches')
        .select('search_query, created_at')
        .eq('email', email);

      if (!error && data) {
        const count = data.length;
        const remaining = Math.max(0, MAX_FREE_SEARCHES_PER_EMAIL - count);
        return {
          email,
          searchCount: count,
          maxSearches: MAX_FREE_SEARCHES_PER_EMAIL,
          remainingSearches: remaining,
          allowed: remaining > 0,
          searches: data.map(d => ({ query: d.search_query, timestamp: d.created_at }))
        };
      }
    } catch (err) {
      console.warn('Supabase lookup failed, using local usage cache:', err);
    }
  }

  // Fallback to local persistent cache
  const record = localUsageMap.get(email) || { count: 0, searches: [] };
  const remaining = Math.max(0, MAX_FREE_SEARCHES_PER_EMAIL - record.count);

  return {
    email,
    searchCount: record.count,
    maxSearches: MAX_FREE_SEARCHES_PER_EMAIL,
    remainingSearches: remaining,
    allowed: remaining > 0,
    searches: record.searches
  };
}

export async function recordEmailSearch(rawEmail: string, query: string): Promise<EmailUsageRecord> {
  const email = normalizeEmail(rawEmail);
  const timestamp = new Date().toISOString();

  const currentUsage = await checkEmailUsage(email);
  if (!currentUsage.allowed) {
    return currentUsage;
  }

  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      await supabase.from('user_searches').insert({
        email,
        search_query: query,
        created_at: timestamp
      });
    } catch (err) {
      console.warn('Supabase insert failed, recording in local cache:', err);
    }
  }

  // Record in local cache
  const local = localUsageMap.get(email) || { count: 0, searches: [] };
  local.count += 1;
  local.searches.push({ query, timestamp });
  localUsageMap.set(email, local);

  const newCount = local.count;
  const remaining = Math.max(0, MAX_FREE_SEARCHES_PER_EMAIL - newCount);

  return {
    email,
    searchCount: newCount,
    maxSearches: MAX_FREE_SEARCHES_PER_EMAIL,
    remainingSearches: remaining,
    allowed: remaining > 0,
    searches: local.searches
  };
}

// Dev utility to reset limit for an email
export function resetEmailUsageForDev(rawEmail: string): void {
  const email = normalizeEmail(rawEmail);
  localUsageMap.delete(email);
}
