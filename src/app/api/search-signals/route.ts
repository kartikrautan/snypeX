import { NextRequest, NextResponse } from 'next/server';
import { executeSignalSearch, checkEmailUsage, isValidEmail } from '@/lib/searchEngine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, email, productDna, maxResults } = body;

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please provide a valid email address.',
          code: 'INVALID_EMAIL',
          remainingSearches: 0
        },
        { status: 400 }
      );
    }

    if (!query || typeof query !== 'string' || !query.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please enter a niche or product keyword.',
          code: 'EMPTY_QUERY',
          remainingSearches: 0
        },
        { status: 400 }
      );
    }

    const result = await executeSignalSearch({
      query,
      email,
      productDna,
      maxResults: maxResults || 6
    });

    if (!result.success && result.code === 'LIMIT_REACHED') {
      return NextResponse.json(result, { status: 403 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    console.error('Error in /api/search-signals:', err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Internal search engine error',
        code: 'API_ERROR',
        remainingSearches: 0
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Valid email query parameter is required (e.g. /api/search-signals?email=user@example.com)',
        code: 'INVALID_EMAIL'
      },
      { status: 400 }
    );
  }

  const usage = await checkEmailUsage(email);
  return NextResponse.json({
    success: true,
    email: usage.email,
    searchCount: usage.searchCount,
    maxSearches: usage.maxSearches,
    remainingSearches: usage.remainingSearches,
    allowed: usage.allowed,
    searches: usage.searches
  });
}
