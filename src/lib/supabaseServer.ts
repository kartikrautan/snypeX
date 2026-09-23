import { createClient, SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;

export function getSupabaseServerClient(): SupabaseClient | null {
  if (cachedClient) return cachedClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !serviceKey || url.includes('placeholder') || serviceKey.includes('placeholder')) {
    return null;
  }

  try {
    cachedClient = createClient(url, serviceKey, {
      auth: {
        persistSession: false
      }
    });
    return cachedClient;
  } catch (err) {
    console.warn('Failed to initialize Supabase server client:', err);
    return null;
  }
}
