import { IXSignalProvider, NicheAnalysis } from '../types';
import { TweetOpportunity, OpportunityBadge } from '@/types';

export class ApifyTwitterProvider implements IXSignalProvider {
  name = 'Apify Twitter Scraper (Live Real Tweets)';

  private apiToken = process.env.APIFY_API_TOKEN || process.env.APIFY_TOKEN || '';

  isAvailable(): boolean {
    return Boolean(this.apiToken && this.apiToken.trim().length > 5);
  }

  async search(analysis: NicheAnalysis, maxResults: number = 8): Promise<TweetOpportunity[]> {
    if (!this.isAvailable()) {
      return [];
    }

    try {
      const query = analysis.xSearchQuery || analysis.originalQuery;

      // Runs Apify Tweet Scraper actor synchronously and returns dataset items
      const url = `https://api.apify.com/v2/acts/apidojo~tweet-scraper/run-sync-get-dataset-items?token=${this.apiToken}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          searchTerms: [query],
          maxItems: maxResults || 8,
          sort: 'Latest',
          tweetLanguage: 'en'
        }),
        next: { revalidate: 30 }
      });

      if (!response.ok) {
        console.warn('Apify Twitter request returned status:', response.status);
        return [];
      }

      const rawTweets = await response.json();
      if (!Array.isArray(rawTweets) || rawTweets.length === 0) {
        return [];
      }

      const signals: TweetOpportunity[] = [];
      const now = Date.now();

      for (const item of rawTweets.slice(0, maxResults)) {
        const tweetText = item.text || item.full_text || '';
        if (!tweetText) continue;

        const rawCreatedAt = item.createdAt || item.created_at;
        const createdAt = rawCreatedAt ? new Date(rawCreatedAt).getTime() : now - Math.floor(Math.random() * 5400000);
        const minutesAgo = Math.max(1, Math.min(120, Math.floor((now - createdAt) / 60000)));

        const likes = item.likeCount || item.favorite_count || 0;
        const retweets = item.retweetCount || item.retweet_count || 0;
        const repliesCount = item.replyCount || item.reply_count || 0;
        const velocity = Math.round((likes + retweets * 2 + repliesCount * 3) / Math.max(0.2, minutesAgo / 60));

        let badge: OpportunityBadge = 'hot';
        let badgeLabel = 'Viral Velocity';
        let opportunityInsight = 'Fast-rising conversation in your niche under 2 hours old.';

        const lower = tweetText.toLowerCase();
        if (lower.includes('?') || lower.includes('how') || lower.includes('recommend') || lower.includes('looking for')) {
          badge = 'lead';
          badgeLabel = 'Buyer Intent Lead';
          opportunityInsight = 'Author is actively asking for solutions or recommendations.';
        } else if (lower.includes('vs') || lower.includes('unpopular') || lower.includes('mistake') || lower.includes('agree')) {
          badge = 'debate';
          badgeLabel = 'Debate Hotspot';
          opportunityInsight = 'Polarizing topic with high engagement multiplier.';
        }

        const handle = item.author?.userName || item.author?.screen_name || item.user?.screen_name || 'x_user';
        const name = item.author?.name || item.user?.name || 'X User';
        const avatar = item.author?.profilePicture || item.author?.profile_image_url_https || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
        const isVerified = Boolean(item.author?.isBlueVerified || item.user?.is_blue_verified);
        const followersCount = item.author?.followers || item.user?.followers_count;
        const followersStr = followersCount ? `${(followersCount / 1000).toFixed(1)}k` : undefined;
        const tweetId = item.id || item.id_str || String(Date.now());

        signals.push({
          id: `tweet-apify-${tweetId}`,
          author: {
            name,
            handle: handle.replace(/^@/, ''),
            avatar,
            verified: isVerified,
            followers: followersStr
          },
          text: tweetText,
          createdAtFormatted: minutesAgo < 60 ? `${minutesAgo}m ago` : `${Math.floor(minutesAgo / 60)}h ${minutesAgo % 60}m ago`,
          minutesAgo,
          likes,
          retweets,
          repliesCount,
          velocityLikesPerHour: velocity,
          badge,
          badgeLabel,
          opportunityInsight,
          niche: analysis.nicheCategory,
          tweetUrl: `https://x.com/${handle}/status/${tweetId}`
        });
      }

      return signals;
    } catch (err) {
      console.error('Error in ApifyTwitterProvider:', err);
      return [];
    }
  }
}
