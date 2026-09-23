import { NicheAnalysis } from './types';

interface NichePattern {
  category: string;
  keywords: string[];
  painPoints: string[];
  intentPhrases: string[];
  competitors: string[];
  hashtags: string[];
}

const NICHE_PATTERNS: Record<string, NichePattern> = {
  saas: {
    category: 'B2B SaaS & Micro-SaaS',
    keywords: ['saas', 'mrr', 'churn', 'onboarding', 'pricing page', 'b2b', 'product-led growth', 'plg', 'stripe'],
    painPoints: [
      'high churn rate',
      'pricing table confusion',
      'demo request drops',
      'onboarding drop-off',
      'CAC is too high'
    ],
    intentPhrases: [
      'recommend a tool for',
      'alternative to salesforce',
      'how do you reduce churn',
      'best onboarding tool',
      'struggling with mrr'
    ],
    competitors: ['Intercom', 'Hubspot', 'Segment', 'Mixpanel', 'ChartMogul'],
    hashtags: ['#buildinpublic', '#indiehackers', '#saas', '#b2b']
  },
  ai_tools: {
    category: 'AI & Developer Tools',
    keywords: ['ai tool', 'llm', 'prompt engineering', 'openai', 'claude', 'agent', 'automation', 'chatgpt'],
    painPoints: [
      'token limits',
      'hallucinations',
      'latency in responses',
      'expensive api costs',
      'rate limits'
    ],
    intentPhrases: [
      'best AI tool for',
      'looking for AI alternative to',
      'anyone built an agent for',
      'how do you optimize prompts',
      'what AI stack are you using'
    ],
    competitors: ['OpenAI', 'Anthropic', 'Cursor', 'v0', 'Perplexity'],
    hashtags: ['#AI', '#BuildInPublic', '#DevTools', '#LLM']
  },
  cold_outreach: {
    category: 'Sales & Cold Outreach',
    keywords: ['cold email', 'deliverability', 'spam filter', 'outreach', 'leads', 'prospecting', 'open rate', 'reply rate'],
    painPoints: [
      'emails landing in spam',
      'low open rates',
      'domain reputation damage',
      'bad prospect data',
      'burner domains burning fast'
    ],
    intentPhrases: [
      'best cold email tool',
      'how to fix deliverability',
      'alternative to instantly',
      'how do you find founder emails',
      'struggling with reply rates'
    ],
    competitors: ['Instantly', 'Lemlist', 'Smartlead', 'Apollo', 'Hunter'],
    hashtags: ['#ColdEmail', '#SalesTech', '#B2BSales', '#LeadGen']
  },
  marketing_growth: {
    category: 'Growth & Social Distribution',
    keywords: ['distribution', 'x audience', 'organic growth', 'traction', 'newsletter', 'content strategy', 'launch'],
    painPoints: [
      'zero traction on launch',
      'x algorithm reach down',
      'hard to convert followers to buyers',
      'content burnout',
      'wasted ad spend'
    ],
    intentPhrases: [
      'how to get first 100 users',
      'how do you distribute content',
      'alternative to paid ads',
      'anyone cracked X growth',
      'how to monetize twitter'
    ],
    competitors: ['TweetHunter', 'Hypefury', 'Buffer', 'Typefully', 'Taplio'],
    hashtags: ['#GrowthHacking', '#BuildInPublic', '#Marketing', '#IndieHacker']
  },
  ecommerce_creator: {
    category: 'E-commerce & Creators',
    keywords: ['shopify', 'ecommerce', 'dropshipping', 'conversion rate', 'tiktok shop', 'creator economy', 'digital products'],
    painPoints: [
      'high cart abandonment',
      'ad costs eating margin',
      'slow fulfillment',
      'low checkout conversion',
      'chargebacks'
    ],
    intentPhrases: [
      'best shopify app for',
      'how to increase checkout conversion',
      'looking for supplier',
      'how do you sell digital products',
      'cart recovery recommendations'
    ],
    competitors: ['Shopify', 'Klaviyo', 'Gumroad', 'Stripe', 'Printful'],
    hashtags: ['#Ecommerce', '#Shopify', '#CreatorEconomy', '#DTC']
  }
};

export function understandNiche(rawInput: string): NicheAnalysis {
  const cleanInput = (rawInput || '').trim();
  const lower = cleanInput.toLowerCase();

  // Match best category
  let bestMatchKey = 'saas';
  let highestScore = 0;

  for (const [key, pattern] of Object.entries(NICHE_PATTERNS)) {
    let score = 0;
    for (const kw of pattern.keywords) {
      if (lower.includes(kw)) score += 3;
    }
    for (const phrase of pattern.intentPhrases) {
      if (lower.includes(phrase.toLowerCase())) score += 5;
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatchKey = key;
    }
  }

  const selectedPattern = NICHE_PATTERNS[bestMatchKey];

  // Extract custom keywords from raw input
  const words = cleanInput
    .replace(/[^a-zA-Z0-9s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !['and', 'the', 'for', 'with', 'what', 'how', 'this', 'that', 'from'].includes(w.toLowerCase()));

  const customKeywords = Array.from(new Set([...words, ...selectedPattern.keywords.slice(0, 4)]));

  // Synthesize targeted X search query designed to capture recent traction conversations
  // Form: (keyword1 OR keyword2) (pain_point OR "looking for" OR "anyone know") -is:retweet lang:en
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
