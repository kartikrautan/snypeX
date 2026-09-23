import { ProductDNA, TweetOpportunity, GeneratedReplyAngles } from '@/types';

export function generateReplyAngles(
  tweet: TweetOpportunity,
  product: ProductDNA
): GeneratedReplyAngles {
  const handle = tweet.author.handle;
  const tweetText = tweet.text.toLowerCase();
  const shortPitch = product.tagline.replace(/\.$/, '');

  // Specific bespoke replies for demo tweets if matched by ID
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
        title: '🎣 The Conversation Hook',
        description: 'A sharp, thought-provoking question to get the author to reply back.',
        text: `@${handle} The wild part is how many $10k MRR tools copy Salesforce workflows thinking it makes them look 'enterprise'. At what MRR threshold do you think gating pricing actually starts making mathematical sense?`,
        goal: 'Prompt original author engagement',
      },
      stealthPlug: {
        title: '🥷 The Stealth Plug',
        description: 'Addresses the problem first, then smoothly introduces your product.',
        text: `We ran a 2-week split test removing the demo form on our landing page: bounce rate fell 44% and checkout velocity tripled. Kept everything transparent while building ${product.name} and never looked back.`,
        plugAngle: 'Real split-test proof',
      },
    };
  }

  // Dynamic context-aware generator based on tweet badge, niche, and text
  if (tweet.badge === 'lead' || tweetText.includes('recommend') || tweetText.includes('looking for') || tweetText.includes('tool')) {
    return {
      dataDrop: {
        title: '📊 The Data Drop',
        description: 'Hard data benchmark to position as the domain authority.',
        text: `Data across 250+ indie builders showed that 78% of switching friction comes from bloated legacy features nobody uses. Teams switching to lightweight specialized tools save an avg of 14 hours/month.`,
        estimatedLikesRank: 'Top Authority',
        statsCited: 'SaaS Efficiency Index',
      },
      conversationHook: {
        title: '🎣 The Conversation Hook',
        description: 'Clarifying question to stand out from generic pitch bots.',
        text: `@${handle} What is the #1 dealbreaker in your current workflow? Most tools overcomplicate the setup instead of solving the core bottleneck.`,
        goal: 'Prompt author reply',
      },
      stealthPlug: {
        title: '🥷 The Stealth Plug',
        description: 'Value-first answer leading into your product.',
        text: `We ran into this exact headache repeatedly, which is why we built ${product.name} (${shortPitch}). Zero fluff, takes 60 seconds to set up, and built specifically for teams facing this problem.`,
        plugAngle: 'Direct solution recommendation',
      },
    };
  }

  if (tweet.badge === 'debate' || tweetText.includes('vs') || tweetText.includes('unpopular') || tweetText.includes('agree')) {
    return {
      dataDrop: {
        title: '📊 The Data Drop',
        description: 'Objective numbers to anchor the debate.',
        text: `Distribution speed beats audience size every single time. Founders who engage on high-signal conversations in their first 90m convert profile visits at 4.2x higher rate than standalone scheduled posts.`,
        estimatedLikesRank: 'Top 3 Comment',
        statsCited: 'Growth Velocity Benchmark',
      },
      conversationHook: {
        title: '🎣 The Conversation Hook',
        description: 'Nuanced counter-perspective to trigger thread engagement.',
        text: `@${handle} 100% agreed on the core premise. Do you think this dynamic shifted because distribution channels got more fragmented, or because customer attention spans halved?`,
        goal: 'Validate author & expand nuance',
      },
      stealthPlug: {
        title: '🥷 The Stealth Plug',
        description: 'Founder perspective with real proof.',
        text: `We tested both approaches while building ${product.name}. Early on we had zero followers, but focusing purely on high-velocity conversations drove our first 50 paying customers in under a month.`,
        plugAngle: 'Founder case study',
      },
    };
  }

  // Default Viral Velocity / High Signal Angle
  return {
    dataDrop: {
      title: '📊 The Data Drop',
      description: 'Authority statistics focused on the niche.',
      text: `Across high-growth tech sectors, organic comments that add real data points generate 4x higher CTR than sponsored ads. High signal always beats generic noise.`,
      estimatedLikesRank: 'High Authority',
      statsCited: 'Social Inbound Index 2025',
    },
    conversationHook: {
      title: '🎣 The Conversation Hook',
      description: 'Engaging premise to prompt conversation.',
      text: `@${handle} Underrated take. Most people look at the surface outcome, but the real leverage is execution cadence. What has been the biggest bottleneck you encountered here?`,
      goal: 'Author response',
    },
    stealthPlug: {
      title: '🥷 The Stealth Plug',
      description: 'Adds immediate value and introduces product organically.',
      text: `Spot on. We run into this dynamic every single day while building ${product.name} (${shortPitch}). Founders who act early on live signals always win the distribution game.`,
      plugAngle: 'Contextual founder perspective',
    },
  };
}
