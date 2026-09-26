import { NicheAnalysis } from './types';

export interface NichePattern {
  category: string;
  keywords: string[];
  synonyms: Record<string, string[]>;
  painPoints: string[];
  intentPhrases: string[];
  competitors: string[];
  hashtags: string[];
}

export const NICHE_DICTIONARIES: Record<string, NichePattern> = {
  crypto_trading: {
    category: 'Crypto & Automated Trading',
    keywords: ['crypto', 'trading', 'bot', 'arbitrage', 'solana', 'defi', 'dex', 'mempool', 'sniper', 'bitcoin', 'eth', 'memecoin', 'raydium', 'pumpfun'],
    synonyms: {
      bot: ['sniper bot', 'trading bot', 'arbitrage bot', 'telegram bot', 'algo bot', 'sniper'],
      crypto: ['crypto', 'solana', 'defi', 'web3', 'altcoin', 'memecoin'],
      trading: ['trading', 'swaps', 'dex trading', 'scalping', 'auto trade']
    },
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
    competitors: ['3Commas', 'DexScreener', 'Birdeye', 'Pionex', 'Trojan Bot', 'BananaGun', 'Photon', 'BullX'],
    hashtags: ['#CryptoTrading', '#Solana', '#DeFi', '#AlgoTrading', '#SolanaBot']
  },
  video_creator: {
    category: 'AI Video & Creator Tools',
    keywords: ['video', 'editor', 'tiktok', 'reels', 'shorts', 'youtube', 'clip', 'captions', 'b-roll', 'subtitles', 'podcast', 'avatar', 'faceless'],
    synonyms: {
      editor: ['video editor', 'video tool', 'clipping tool', 'auto editor', 'video generator'],
      video: ['short form video', 'reels', 'shorts', 'clips', 'ai video', 'tiktok video'],
      creator: ['content creator', 'video creator', 'ugc creator', 'youtube editor']
    },
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
    competitors: ['OpusClip', 'CapCut', 'Descript', 'Submagic', 'Vids', 'Premiere Pro', 'InVideo'],
    hashtags: ['#CreatorEconomy', '#AIVideo', '#Shorts', '#ContentCreation', '#VideoEditor']
  },
  cold_outreach: {
    category: 'Sales & Cold Outreach',
    keywords: ['cold email', 'outreach', 'deliverability', 'spam', 'leads', 'prospecting', 'inbox', 'domain', 'reply rate', 'b2b sales', 'apollo', 'b2b'],
    synonyms: {
      outreach: ['cold email', 'cold outreach', 'sales outreach', 'b2b prospecting', 'inbox warmup'],
      email: ['cold email', 'email sequence', 'email deliverability', 'inbox warmup'],
      leads: ['lead generation', 'prospects', 'b2b leads', 'client acquisition']
    },
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
    hashtags: ['#ColdEmail', '#LeadGen', '#B2BSales', '#Outreach', '#SalesAutomation']
  },
  dev_saas: {
    category: 'DevTools, Code & Infrastructure',
    keywords: ['code', 'developer', 'nextjs', 'react', 'api', 'database', 'supabase', 'vercel', 'agent', 'github', 'boilerplate', 'backend', 'ai agent', 'typescript'],
    synonyms: {
      code: ['developer tool', 'devtools', 'coding agent', 'ai coder', 'ide extension'],
      saas: ['micro saas', 'indie hacker', 'buildinpublic', 'boilerplate', 'starter kit'],
      database: ['postgres', 'supabase', 'neon database', 'vector db', 'orm']
    },
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
    hashtags: ['#BuildInPublic', '#DevTools', '#Nextjs', '#IndieHacker', '#TypeScript']
  },
  growth_marketing: {
    category: 'Growth & Organic Distribution',
    keywords: ['growth', 'distribution', 'audience', 'traffic', 'seo', 'newsletter', 'marketing', 'launch', 'traction', 'conversion', 'content', 'monetize'],
    synonyms: {
      marketing: ['growth marketing', 'organic distribution', 'b2b marketing', 'traffic acquisition'],
      growth: ['audience growth', 'twitter growth', 'x growth', 'newsletter growth', 'mrr growth'],
      distribution: ['organic reach', 'content distribution', 'launch strategy']
    },
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
    hashtags: ['#GrowthHacking', '#BuildInPublic', '#IndieHackers', '#SaaS', '#ContentMarketing']
  }
};

/**
 * Generates intelligent synonym variations and related search candidates
 */
export function generateSearchCandidates(cleanInput: string, pattern: NichePattern): string[] {
  const candidates: string[] = [];
  const words = cleanInput
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 1);

  // 1. Direct clean query
  if (cleanInput.length > 1) {
    candidates.push(cleanInput);
  }

  // 2. Synonym replacement variations
  if (pattern && pattern.synonyms) {
    for (const [key, synList] of Object.entries(pattern.synonyms)) {
      if (cleanInput.toLowerCase().includes(key)) {
        for (const syn of synList.slice(0, 2)) {
          const replaced = cleanInput.toLowerCase().replace(new RegExp(key, 'gi'), syn).trim();
          if (replaced !== cleanInput.toLowerCase() && !candidates.includes(replaced)) {
            candidates.push(replaced);
          }
        }
      }
    }
  }

  // 3. Keyword combinations from niche
  if (words.length > 0) {
    const topKeywords = pattern.keywords.filter(k => !cleanInput.toLowerCase().includes(k)).slice(0, 2);
    for (const kw of topKeywords) {
      const combo = `${words.slice(0, 2).join(' ')} ${kw}`.trim();
      if (!candidates.includes(combo)) {
        candidates.push(combo);
      }
    }
  }

  // 4. Fallback niche keywords
  const fallbackKw = pattern.keywords.slice(0, 3).join(' ');
  if (!candidates.includes(fallbackKw)) {
    candidates.push(fallbackKw);
  }

  return candidates.slice(0, 5);
}

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

  const customKeywords = Array.from(new Set([...words, ...selectedPattern.keywords.slice(0, 4)]));
  const candidateQueries = generateSearchCandidates(cleanInput, selectedPattern);

  return {
    originalQuery: cleanInput,
    nicheCategory: selectedPattern.category,
    keywords: customKeywords,
    painPoints: selectedPattern.painPoints,
    buyerIntentQueries: selectedPattern.intentPhrases.map(p => `${p} ${cleanInput}`),
    competitors: selectedPattern.competitors,
    hashtags: selectedPattern.hashtags,
    xSearchQuery: candidateQueries[0] || cleanInput
  };
}
