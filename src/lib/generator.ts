import { ProductDNA, TweetOpportunity, GeneratedReplyAngles } from '@/types';

export function generateReplyAngles(
  tweet: TweetOpportunity,
  product: ProductDNA
): GeneratedReplyAngles {
  const handle = tweet.author.handle;

  // Tailored responses for the mock tweets to feel incredibly smart & realistic
  if (tweet.id === 'tweet-1') {
    return {
      dataDrop: {
        title: '📊 The Data Drop',
        description: 'Hard benchmark statistics to claim the #1 upvoted comment.',
        text: `OpenView's benchmark across 400+ SaaS tools showed self-serve pricing converts at 3.2x compared to 'book demo' gates for ACVs under $5k. Gating only makes sense once deal size crosses $20k+ where procurement teams expect custom contracts.`,
        estimatedLikesRank: 'Top 3 Comment',
        statsCited: 'OpenView SaaS Benchmark 2024',
      },
      conversationHook: {
        title: '💬 The Conversation Hook',
        description: 'A sharp, thought-provoking question to get the author to reply back.',
        text: `@${handle} The wild part is how many $10k MRR tools copy Salesforce workflows thinking it makes them look 'enterprise'. At what MRR threshold do you think gating pricing actually starts making mathematical sense?`,
        goal: 'Prompt original author engagement',
      },
      stealthPlug: {
        title: '🎯 The Stealth Plug',
        description: 'Addresses the problem first, then smoothly introduces your product.',
        text: `We ran a 2-week split test removing the demo form on our landing page: bounce rate fell 44% and checkout velocity tripled. Kept everything transparent while building ${product.name} and never looked back.`,
        plugAngle: 'Real split-test proof',
      },
    };
  }

  if (tweet.id === 'tweet-2') {
    return {
      dataDrop: {
        title: '📊 The Data Drop',
        description: 'Hard benchmark statistics to claim the #1 upvoted comment.',
        text: `Top 1% creator accounts on X get 60-70% of their total profile visits from replies under other viral posts, not their own standalone tweets. The key is never dropping plain links—lead with insight, let bio do the selling.`,
        estimatedLikesRank: 'Top 3 Comment',
        statsCited: 'Audience Lab Analysis',
      },
      conversationHook: {
        title: '💬 The Conversation Hook',
        description: 'A sharp, thought-provoking question to get the author to reply back.',
        text: `@${handle} The biggest mistake most founders make is treating X like an RSS feed. Have you noticed higher conversions from in-thread opt-in lead magnets vs bio link clicks lately?`,
        goal: 'Spark founder debate',
      },
      stealthPlug: {
        title: '🎯 The Stealth Plug',
        description: 'Addresses the problem first, then smoothly introduces your product.',
        text: `Our whole stack is: 1) Monitor niche breakout tweets in their first 90m, 2) Drop a data point that adds real context (zero bot links), 3) Pinned post in bio handles conversion. Built ${product.name} specifically to automate the timing radar.`,
        plugAngle: 'Direct workflow breakdown',
      },
    };
  }

  if (tweet.id === 'tweet-3') {
    return {
      dataDrop: {
        title: '📊 The Data Drop',
        description: 'Hard benchmark statistics to claim the #1 upvoted comment.',
        text: `Audience-first founders spend an average of 9 months before monetizing. Product-first micro-SaaS builders with a sharp distribution habit hit first revenue in 18 days. Distribution speed beats audience size every time.`,
        estimatedLikesRank: 'Top 5 Comment',
        statsCited: 'Micro-SaaS State of the Union',
      },
      conversationHook: {
        title: '💬 The Conversation Hook',
        description: 'A sharp, thought-provoking question to get the author to reply back.',
        text: `@${handle} Strong agree. Building an audience without a specific tool creates a community of cheerleaders, not buyers. Do you think this shifted because distribution channels got more fragmented?`,
        goal: 'Validate author & expand nuance',
      },
      stealthPlug: {
        title: '🎯 The Stealth Plug',
        description: 'Addresses the problem first, then smoothly introduces your product.',
        text: `100%. We had zero followers when launching. Instead of trying to become full-time content creators, we just monitored live conversations around our exact problem using ${product.name} and found our first 50 customers in 3 weeks.`,
        plugAngle: 'Zero-to-one traction case study',
      },
    };
  }

  // Generic fallback generator based on tweet and product
  const shortPitch = product.tagline.replace(/\.$/, '');
  return {
    dataDrop: {
      title: '📊 The Data Drop',
      description: 'Authority and facts focused on the tweet theme.',
      text: `Across high-growth tech sectors, organic comment sections on X generate 4x higher CTR than sponsored banner ads when backed by real data points. High signal always beats noise.`,
      estimatedLikesRank: 'High Authority',
      statsCited: 'Social Inbound Index',
    },
    conversationHook: {
      title: '💬 The Conversation Hook',
      description: 'Engaging premise to prompt conversation.',
      text: `@${handle} This is an underrated angle. Most people look at the surface outcome, but the real leverage is in the execution cadence. What has been the biggest bottleneck you observed here?`,
      goal: 'Author response',
    },
    stealthPlug: {
      title: '🎯 The Stealth Plug',
      description: 'Adds immediate value and introduces product organically.',
      text: `Spot on. We run into this exact dynamic every day while building ${product.name} (${shortPitch}). The founders who execute early on live signals always win the distribution game.`,
      plugAngle: 'Contextual founder perspective',
    },
  };
}
