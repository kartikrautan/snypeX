import { understandNiche } from './queryParser';
import { RapidApiTwitterProvider } from './providers/rapidApiProvider';
import { TwitterApiIoProvider } from './providers/twitterApiIoProvider';
import { DynamicSyntheticEngine } from './providers/syntheticEngine';
import { IXSignalProvider, SearchSignalRequest, SearchSignalResponse } from './types';
import { checkEmailUsage, recordEmailSearch, isValidEmail } from './usageTracker';

const providers: IXSignalProvider[] = [
  new RapidApiTwitterProvider(),
  new TwitterApiIoProvider(),
  new DynamicSyntheticEngine()
];

export async function executeSignalSearch(request: SearchSignalRequest): Promise<SearchSignalResponse> {
  const startTime = Date.now();
  const rawQuery = (request.query || '').trim();
  const email = (request.email || '').trim();

  // 1. Validate query
  if (!rawQuery) {
    return {
      success: false,
      query: '',
      parsedNiche: understandNiche(''),
      signals: [],
      totalFound: 0,
      remainingSearches: 0,
      providerUsed: 'none',
      executionTimeMs: 0,
      error: 'Search query cannot be empty. Please enter your niche or product.',
      code: 'EMPTY_QUERY'
    };
  }

  // 2. Validate email
  if (!isValidEmail(email)) {
    return {
      success: false,
      query: rawQuery,
      parsedNiche: understandNiche(rawQuery),
      signals: [],
      totalFound: 0,
      remainingSearches: 0,
      providerUsed: 'none',
      executionTimeMs: 0,
      error: 'A valid email address is required to use the Signal Radar.',
      code: 'INVALID_EMAIL'
    };
  }

  // 3. Check email search quota (Max 2 free searches per email ID)
  const usage = await checkEmailUsage(email);
  if (!usage.allowed) {
    return {
      success: false,
      query: rawQuery,
      parsedNiche: understandNiche(rawQuery),
      signals: [],
      totalFound: 0,
      remainingSearches: 0,
      providerUsed: 'quota_gate',
      executionTimeMs: Date.now() - startTime,
      error: 'Trial search limit reached (2 of 2 searches used for this email). Upgrade to Pro for unlimited real-time signals.',
      code: 'LIMIT_REACHED'
    };
  }

  // 4. Understand niche and build query
  const parsedNiche = understandNiche(rawQuery);

  // 5. Try providers in priority order
  let signals: any[] = [];
  let providerUsed = 'none';

  for (const provider of providers) {
    if (provider.isAvailable()) {
      try {
        const results = await provider.search(parsedNiche, request.maxResults || 6);
        if (results && results.length > 0) {
          signals = results;
          providerUsed = provider.name;
          break;
        }
      } catch (err) {
        console.warn(`Provider ${provider.name} failed:`, err);
      }
    }
  }

  // 6. Record search usage against this email
  const updatedUsage = await recordEmailSearch(email, rawQuery);

  return {
    success: true,
    query: rawQuery,
    parsedNiche,
    signals,
    totalFound: signals.length,
    remainingSearches: updatedUsage.remainingSearches,
    providerUsed,
    executionTimeMs: Date.now() - startTime,
    code: 'SUCCESS'
  };
}

export { understandNiche } from './queryParser';
export { checkEmailUsage, recordEmailSearch, isValidEmail, resetEmailUsageForDev } from './usageTracker';
export * from './types';
