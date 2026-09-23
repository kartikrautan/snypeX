import { EmailUsageRecord } from './types';
import { getSupabaseServerClient } from '../supabaseServer';

const MAX_FREE_SEARCHES_PER_EMAIL = 2;

// In-memory persistent cache for server lifecycle
const localUsageMap = new Map<string, { count: number; isUnlimited?: boolean; searches: Array<{ query: string; timestamp: string }> }>();

function normalizeEmail(email: string): string {
  return (email || '').trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(normalizeEmail(email));
}

// Check if email is an admin/dev or designated unlimited tester
export function isUnlimitedEmail(rawEmail: string): boolean {
  const email = normalizeEmail(rawEmail);
  if (!email) return false;
  
  // Auto-grant unlimited to developer keywords or test accounts
  const devKeywords = ['admin', 'dev', 'test', 'kartik', 'surendra', 'founder', 'demo'];
  const [localPart, domain] = email.split('@');
  
  if (devKeywords.some(k => localPart.includes(k) || (domain && domain.includes(k)))) {
    return true;
  }

  const record = localUsageMap.get(email);
  return Boolean(record?.isUnlimited);
}

export async function checkEmailUsage(rawEmail: string, isDevUnlimited: boolean = false): Promise<EmailUsageRecord> {
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

  // Developer Unlimited Mode bypass
  if (isDevUnlimited || isUnlimitedEmail(email)) {
    const record = localUsageMap.get(email) || { count: 0, searches: [] };
    return {
      email,
      searchCount: record.count,
      maxSearches: 9999,
      remainingSearches: 9999,
      allowed: true,
      searches: record.searches
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

export async function recordEmailSearch(rawEmail: string, query: string, isDevUnlimited: boolean = false): Promise<EmailUsageRecord> {
  const email = normalizeEmail(rawEmail);
  const timestamp = new Date().toISOString();

  const currentUsage = await checkEmailUsage(email, isDevUnlimited);
  if (!currentUsage.allowed) {
    return currentUsage;
  }

  const supabase = getSupabaseServerClient();
  if (supabase && !isDevUnlimited) {
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

  if (isDevUnlimited || isUnlimitedEmail(email)) {
    return {
      email,
      searchCount: local.count,
      maxSearches: 9999,
      remainingSearches: 9999,
      allowed: true,
      searches: local.searches
    };
  }

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

// Toggle unlimited for a specific email
export function setUnlimitedEmailForDev(rawEmail: string, unlimited: boolean): void {
  const email = normalizeEmail(rawEmail);
  const record = localUsageMap.get(email) || { count: 0, searches: [] };
  record.isUnlimited = unlimited;
  localUsageMap.set(email, record);
}
