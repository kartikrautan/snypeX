import { NicheAnalysis } from './types';

interface NichePattern {
  category: string;
  keywords: string[];
  painPoints: string[];
  intentPhrases: string[];
  competitors: string[];
  hashtags: string[];
}

const NICHE_DICTIONARIES: Record<string, NichePattern> = {
  crypto_trading: {
    category: 'Crypto & Automated Trading',
    keywords: ['crypto', 'trading', 'bot', 'arbitrage', 'solana', 'defi', 'dex', 'mempool', 'sniper', 'bitcoin', 'eth'],
    painPoints: [
      'slippage eating 15% of trade margin',
      'delayed execution triggers during volume spikes',
      'MEV bot frontrunning on DEX swaps',
      'unreliable WebSocket node connections',
      'complicated liquidation risk settings'
    ],
    intentPhrases: [
      'what is the fastest trading bot for',
      'recommend a reliable arbitrage tool for',
      'alternative to 3Commas for',
      'anyone running automated grid bots on',
      'how do you solve slippage on'
    ],
    competitors: ['3Commas', 'DexScreener', 'Birdeye', 'Pionex', 'Trojan Bot', 'BananaGun'],
    hashtags: ['#CryptoTrading', '#Solana', '#DeFi', '#AlgoTrading']
  },
  video_creator: {
    category: 'AI Video & Creator Tools',
    keywords: ['video', 'editor', 'tiktok', 'reels', 'shorts', 'youtube', 'clip', 'captions', 'b-roll', 'subtitles', 'podcast'],
    painPoints: [
      'manual subtitle syncing takes 3+ hours per video',
      'generic AI captions feel robotic and get zero retention',
      'clunky timeline rendering crashes on 4K exports',
      'spending hours clipping 60-min podcast episodes',
      'watermarked exports with overpriced credits'
    ],
    intentPhrases: [
      'best AI tool to repurpose long podcasts into',
      'recommend a fast auto-caption tool for',
      'alternative to OpusClip that actually works for',
      'how do you automate short-form editing for',
      'what editing stack are creator agencies using for'
    ],
    competitors: ['OpusClip', 'CapCut', 'Descript', 'Submagic', 'Vids', 'Premiere Pro'],
    hashtags: ['#CreatorEconomy', '#AIVideo', '#Shorts', '#ContentCreation']
  },
  cold_outreach: {
    category: 'Sales & Cold Outreach',
    keywords: ['cold email', 'outreach', 'deliverability', 'spam', 'leads', 'prospecting', 'inbox', 'domain', 'reply rate', 'b2b sales'],
    painPoints: [
      'emails landing in spam folders despite warming up',
      'burning secondary domains in under 3 weeks',
      'low open rates below 20% on cold campaigns',
      'stale LinkedIn prospect data with bouncing emails',
      'robotic personalization templates that prospects ignore'
    ],
    intentPhrases: [
      'best cold outreach platform with built-in warmup for',
      'how to fix domain deliverability issues for',
      'looking for an alternative to Instantly for',
      'how do you scrape verified founder emails for',
      'what tool gives the highest reply rates for'
    ],
    competitors: ['Instantly', 'Smartlead', 'Lemlist', 'Apollo', 'Clay', 'Hunter.io'],
    hashtags: ['#ColdEmail', '#LeadGen', '#B2BSales', '#Outreach']
  },
  dev_saas: {
    category: 'DevTools, Code & Infrastructure',
    keywords: ['code', 'developer', 'nextjs', 'react', 'api', 'database', 'supabase', 'vercel', 'agent', 'github', 'boilerplate', 'backend'],
    painPoints: [
      'cold-start database connection timeouts on serverless',
      'spending 3 days setting up Stripe and auth boilerplates',
      'unclear API documentation with outdated SDK examples',
      'expensive cloud compute bills for simple background queues',
      'breaking schema migrations during production deployments'
    ],
    intentPhrases: [
      'what is the cleanest Next.js boilerplate for',
      'recommend a lightweight database alternative for',
      'how are you guys handling background jobs in',
      'anyone built an AI agent architecture using',
      'best developer tool to speed up shipping'
    ],
    competitors: ['Vercel', 'Supabase', 'Cursor', 'Prisma', 'Postman', 'Render', 'Neon'],
    hashtags: ['#BuildInPublic', '#DevTools', '#Nextjs', '#IndieHacker']
  },
  growth_marketing: {
    category: 'Growth & Organic Distribution',
    keywords: ['growth', 'distribution', 'audience', 'traffic', 'seo', 'newsletter', 'marketing', 'launch', 'traction', 'conversion'],
    painPoints: [
      'zero organic traction despite posting 5x a day',
      'X algorithm throttling external link reach',
      'high bounce rates on paid landing page traffic',
      'spending 40 hours creating content that gets 20 views',
      'struggling to convert social followers into paying customers'
    ],
    intentPhrases: [
      'how to get first 100 paying customers for',
      'best organic distribution playbook for',
      'alternative to paid ads for early stage',
      'how do you turn tweet engagement into sales for',
      'what distribution habit helped you hit $10k MRR with'
    ],
    competitors: ['TweetHunter', 'Hypefury', 'Typefully', 'Taplio', 'Buffer', 'Beehiiv'],
    hashtags: ['#GrowthHacking', '#BuildInPublic', '#IndieHackers', '#SaaS']
  }
};

export function understandNiche(rawInput: string): NicheAnalysis {
  const cleanInput = (rawInput || '').trim();
  const lower = cleanInput.toLowerCase();

  let bestMatchKey = 'dev_saas';
  let highestScore = 0;

  for (const [key, pattern] of Object.entries(NICHE_DICTIONARIES)) {
    let score = 0;
    for (const kw of pattern.keywords) {
      if (lower.includes(kw)) score += 4;
    }
    for (const phrase of pattern.intentPhrases) {
      if (lower.includes(phrase.toLowerCase())) score += 6;
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatchKey = key;
    }
  }

  const selectedPattern = NICHE_DICTIONARIES[bestMatchKey];

  // Tokenize user's exact keywords
  const words = cleanInput
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !['and', 'the', 'for', 'with', 'what', 'how', 'this', 'that', 'from', 'tool', 'best'].includes(w.toLowerCase()));

  const customKeywords = Array.from(new Set([...words, ...selectedPattern.keywords.slice(0, 3)]));

  const coreTerms = words.slice(0, 3).join(' OR ') || cleanInput;
  const intentMod = '("recommend" OR "alternative" OR "how do" OR "struggling" OR "anyone know")';
  const xSearchQuery = `(${coreTerms}) ${intentMod} -is:retweet lang:en`;

  return {
    originalQuery: cleanInput,
    nicheCategory: selectedPattern.category,
    keywords: customKeywords,
    painPoints: selectedPattern.painPoints,
    buyerIntentQueries: selectedPattern.intentPhrases.map(p => `${p} ${cleanInput}`),
    competitors: selectedPattern.competitors,
    hashtags: selectedPattern.hashtags,
    xSearchQuery
  };
}
