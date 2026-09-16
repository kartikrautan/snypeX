export interface ProductDNA {
  id: string;
  name: string;
  tagline: string;
  targetAudience: string;
  differentiator: string;
  url: string;
  tone: 'founder' | 'analytical' | 'punchy' | 'casual';
}

export type OpportunityBadge = 'hot' | 'lead' | 'debate';

export interface TweetAuthor {
  name: string;
  handle: string;
  avatar: string;
  verified: boolean;
  followers?: string;
}

export interface TweetOpportunity {
  id: string;
  author: TweetAuthor;
  text: string;
  createdAtFormatted: string;
  minutesAgo: number;
  likes: number;
  retweets: number;
  repliesCount: number;
  velocityLikesPerHour: number;
  badge: OpportunityBadge;
  badgeLabel: string;
  opportunityInsight: string;
  niche: string;
  tweetUrl: string;
}

export interface GeneratedReplyAngles {
  dataDrop: {
    title: string;
    description: string;
    text: string;
    estimatedLikesRank: string;
    statsCited: string;
  };
  conversationHook: {
    title: string;
    description: string;
    text: string;
    goal: string;
  };
  stealthPlug: {
    title: string;
    description: string;
    text: string;
    plugAngle: string;
  };
}

export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}
