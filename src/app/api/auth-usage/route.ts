import { NextRequest, NextResponse } from 'next/server';
import { checkEmailUsage, resetEmailUsageForDev, isValidEmail } from '@/lib/searchEngine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, action } = body;

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    if (action === 'reset') {
      resetEmailUsageForDev(email);
      const usage = await checkEmailUsage(email);
      return NextResponse.json({ success: true, message: `Reset quota for ${email}`, usage });
    }

    const usage = await checkEmailUsage(email);
    return NextResponse.json({ success: true, usage });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
