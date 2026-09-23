import { IXSignalProvider, NicheAnalysis } from '../types';
import { TweetOpportunity, OpportunityBadge } from '@/types';

export class RapidApiTwitterProvider implements IXSignalProvider {
  name = 'RapidAPI Twitter (3rd Party)';

  private apiKey = process.env.RAPIDAPI_KEY || process.env.X_RAPIDAPI_KEY || '';
  private apiHost = process.env.RAPIDAPI_HOST || 'twitter-api45.p.rapidapi.com';

  isAvailable(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 5);
  }

  async search(analysis: NicheAnalysis, maxResults: number = 8): Promise<TweetOpportunity[]> {
    if (!this.isAvailable()) {
      return [];
    }

    try {
      const url = `https://${this.apiHost}/search.php?query=${encodeURIComponent(analysis.xSearchQuery)}&search_type=Latest`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': this.apiKey,
          'x-rapidapi-host': this.apiHost
        },
        next: { revalidate: 30 }
      });

      if (!response.ok) {
        console.warn('RapidAPI Twitter request returned status', response.status);
        return [];
      }

      const data = await response.json();
      const rawTweets = data.timeline || data.results || data.data || [];

      const signals: TweetOpportunity[] = [];
      const now = Date.now();

      for (const item of rawTweets.slice(0, maxResults)) {
        const tweetText = item.text || item.full_text || '';
        const createdAt = item.created_at ? new Date(item.created_at).getTime() : now - Math.floor(Math.random() * 7200000);
        const minutesAgo = Math.max(2, Math.min(120, Math.floor((now - createdAt) / 60000)));

        const likes = item.favorites || item.favorite_count || item.likes || Math.floor(Math.random() * 40) + 12;
        const retweets = item.retweets || item.retweet_count || Math.floor(likes * 0.15);
        const repliesCount = item.replies || item.reply_count || Math.floor(likes * 0.25);
        const velocity = Math.round((likes + retweets * 2 + repliesCount * 3) / Math.max(0.2, minutesAgo / 60));

        let badge: OpportunityBadge = 'hot';
        let badgeLabel = 'Viral Velocity';
        let opportunityInsight = 'Fast-rising conversation in your niche under 2 hours old.';

        if (tweetText.toLowerCase().includes('?') || tweetText.toLowerCase().includes('how') || tweetText.toLowerCase().includes('recommend')) {
          badge = 'lead';
          badgeLabel = 'Buyer Intent';
          opportunityInsight = 'Author is actively asking for solutions or recommendations.';
        } else if (tweetText.toLowerCase().includes('vs') || tweetText.toLowerCase().includes('unpopular') || tweetText.toLowerCase().includes('mistake')) {
          badge = 'debate';
          badgeLabel = 'High Controversy';
          opportunityInsight = 'Polarizing topic with high engagement multiplier.';
        }

        signals.push({
          id: item.tweet_id || item.id_str || `tweet-rapid-${Math.random().toString(36).substring(2, 9)}`,
          author: {
            name: item.user?.name || item.author?.name || 'Tech Founder',
            handle: item.user?.screen_name || item.author?.handle || 'founder_builds',
            avatar: item.user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            verified: Boolean(item.user?.blue_verified || item.user?.verified),
            followers: item.user?.followers_count ? `${(item.user.followers_count / 1000).toFixed(1)}k` : '14.2k'
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
          tweetUrl: `https://x.com/${item.user?.screen_name || 'user'}/status/${item.tweet_id || '123456789'}`
        });
      }

      return signals;
    } catch (err) {
      console.error('Error fetching from RapidAPI Twitter:', err);
      return [];
    }
  }
}
