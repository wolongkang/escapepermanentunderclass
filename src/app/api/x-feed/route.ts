import { NextResponse } from "next/server";

export const revalidate = 300; // Cache for 5 minutes

interface XPost {
  id: string;
  text: string;
  author: string;
  handle: string;
  timestamp: string;
  topic: string;
  url: string;
}

// Search queries for trending AI/AGI/jobs content
const SEARCH_QUERIES = [
  "(AGI OR artificial general intelligence) -is:retweet lang:en",
  "(AI replacing jobs OR AI automation jobs OR AI unemployment) -is:retweet lang:en",
  "(AI compute OR AI scaling OR GPU cluster) -is:retweet lang:en",
  "(future of work AI OR AI workforce) -is:retweet lang:en",
];

function classifyTopic(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("agi") || lower.includes("artificial general intelligence")) return "AGI";
  if (lower.includes("compute") || lower.includes("gpu") || lower.includes("scaling") || lower.includes("chip")) return "Compute";
  if (lower.includes("job") || lower.includes("employ") || lower.includes("workforce") || lower.includes("labor") || lower.includes("hiring") || lower.includes("layoff")) return "Jobs";
  if (lower.includes("automat") || lower.includes("replac") || lower.includes("displace")) return "Automation";
  return "AI";
}

function getRelativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDays = Math.floor(diffHr / 24);
  return `${diffDays}d ago`;
}

export async function GET() {
  const bearerToken = process.env.X_BEARER_TOKEN;

  if (!bearerToken) {
    return NextResponse.json({ posts: getFallbackPosts() });
  }

  try {
    // Pick 2 random queries to diversify results
    const shuffled = [...SEARCH_QUERIES].sort(() => Math.random() - 0.5);
    const queries = shuffled.slice(0, 2);

    const allPosts: XPost[] = [];

    for (const query of queries) {
      const params = new URLSearchParams({
        query,
        max_results: "10",
        "tweet.fields": "created_at,public_metrics,author_id",
        expansions: "author_id",
        "user.fields": "name,username",
        sort_order: "relevancy",
      });

      const response = await fetch(
        `https://api.twitter.com/2/tweets/search/recent?${params}`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
          next: { revalidate: 300 },
        }
      );

      if (!response.ok) {
        console.error("Twitter API error:", response.status, await response.text());
        continue;
      }

      const data = await response.json();
      const tweets = data.data || [];
      const users = data.includes?.users || [];

      // Build user lookup
      const userMap = new Map<string, { name: string; username: string }>();
      for (const user of users) {
        userMap.set(user.id, { name: user.name, username: user.username });
      }

      for (const tweet of tweets) {
        const user = userMap.get(tweet.author_id);
        if (!user) continue;

        // Skip very short tweets
        if (tweet.text.length < 40) continue;

        allPosts.push({
          id: tweet.id,
          text: tweet.text.replace(/https:\/\/t\.co\/\w+/g, "").trim(),
          author: user.name,
          handle: `@${user.username}`,
          timestamp: getRelativeTime(tweet.created_at),
          topic: classifyTopic(tweet.text),
          url: `https://x.com/${user.username}/status/${tweet.id}`,
        });
      }
    }

    if (allPosts.length === 0) {
      return NextResponse.json({ posts: getFallbackPosts() });
    }

    // Deduplicate by id, take top 8
    const seen = new Set<string>();
    const unique = allPosts.filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });

    // Try to get variety of topics
    const byTopic = new Map<string, XPost[]>();
    for (const post of unique) {
      if (!byTopic.has(post.topic)) byTopic.set(post.topic, []);
      byTopic.get(post.topic)!.push(post);
    }

    // Round-robin pick from topics to get diversity
    const selected: XPost[] = [];
    let round = 0;
    const topics = [...byTopic.keys()];
    while (selected.length < 8 && round < 10) {
      for (const topic of topics) {
        const pool = byTopic.get(topic)!;
        if (pool[round]) {
          selected.push(pool[round]);
          if (selected.length >= 8) break;
        }
      }
      round++;
    }

    return NextResponse.json({ posts: selected });
  } catch (error) {
    console.error("X feed error:", error);
    return NextResponse.json({ posts: getFallbackPosts() });
  }
}

function getFallbackPosts(): XPost[] {
  return [
    {
      id: "1",
      text: "OpenAI just dropped GPT-5 and it can write entire codebases. Junior dev roles are about to get very competitive.",
      author: "AI Insider",
      handle: "@ai_insider",
      timestamp: "1h ago",
      topic: "AI",
      url: "https://x.com/search?q=AI+automation+jobs&f=live",
    },
    {
      id: "2",
      text: "McKinsey estimates 30% of work hours could be automated by 2030. That's 12 million occupational transitions in the US alone.",
      author: "Future of Work",
      handle: "@futureofwork",
      timestamp: "2h ago",
      topic: "Jobs",
      url: "https://x.com/search?q=AI+automation+jobs&f=live",
    },
    {
      id: "3",
      text: "The compute scaling laws are holding. H200 clusters are hitting 10x performance on reasoning tasks vs last year.",
      author: "Compute Tracker",
      handle: "@computetracker",
      timestamp: "3h ago",
      topic: "Compute",
      url: "https://x.com/search?q=AI+automation+jobs&f=live",
    },
    {
      id: "4",
      text: "Klarna replaced 700 customer service agents with AI. Their CEO says it does the work of 700 people. This is just the beginning.",
      author: "Tech Disruption",
      handle: "@techdisrupt",
      timestamp: "4h ago",
      topic: "Automation",
      url: "https://x.com/search?q=AI+automation+jobs&f=live",
    },
    {
      id: "5",
      text: "If AGI arrives by 2028, the labor market implications are staggering. Most white-collar knowledge work gets compressed.",
      author: "AGI Watch",
      handle: "@agiwatch",
      timestamp: "5h ago",
      topic: "AGI",
      url: "https://x.com/search?q=AI+automation+jobs&f=live",
    },
    {
      id: "6",
      text: "Just saw a demo where AI completed a full financial audit in 4 hours. Usually takes a team of 5 accountants two weeks.",
      author: "Finance AI",
      handle: "@financeai",
      timestamp: "6h ago",
      topic: "Jobs",
      url: "https://x.com/search?q=AI+automation+jobs&f=live",
    },
    {
      id: "7",
      text: "Google DeepMind's latest: AI systems are now better than humans at 60% of cognitive benchmarks. Up from 10% in 2020.",
      author: "DeepTech",
      handle: "@deeptech_daily",
      timestamp: "7h ago",
      topic: "AI",
      url: "https://x.com/search?q=AI+automation+jobs&f=live",
    },
    {
      id: "8",
      text: "The new paradigm: companies hiring 1 AI-augmented worker instead of 5. Productivity per employee is the new metric.",
      author: "Labor Economics",
      handle: "@laborecon",
      timestamp: "8h ago",
      topic: "Automation",
      url: "https://x.com/search?q=AI+automation+jobs&f=live",
    },
  ];
}
