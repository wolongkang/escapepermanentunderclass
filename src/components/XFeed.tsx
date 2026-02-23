"use client";

import { useState, useEffect } from "react";

interface XPost {
  id: string;
  text: string;
  author: string;
  handle: string;
  timestamp: string;
  topic: string;
}

const TOPIC_COLORS: Record<string, string> = {
  AI: "bg-accent/20 text-accent",
  AGI: "bg-red-500/20 text-red-400",
  Compute: "bg-blue-500/20 text-blue-400",
  Jobs: "bg-yellow-500/20 text-yellow-400",
  Automation: "bg-purple-500/20 text-purple-400",
};

export default function XFeed() {
  const [posts, setPosts] = useState<XPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeed() {
      try {
        const res = await fetch("/api/x-feed");
        const data = await res.json();
        if (data.posts) setPosts(data.posts);
      } catch {
        // Fallback handled by API
      }
      setLoading(false);
    }
    fetchFeed();
    // Refresh every 5 minutes
    const interval = setInterval(fetchFeed, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card rounded-lg p-3 animate-pulse">
            <div className="h-3 bg-border rounded w-3/4 mb-2" />
            <div className="h-3 bg-border rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-4 h-4 text-muted" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span className="text-xs font-medium text-muted uppercase tracking-wider">Live AI Feed</span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
      </div>
      <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin">
        {posts.map((post, i) => (
          <div
            key={post.id || i}
            className="bg-card/60 border border-border/50 rounded-lg p-3 hover:bg-card-hover transition-colors"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-xs font-medium text-foreground truncate">
                  {post.author}
                </span>
                <span className="text-xs text-muted truncate">
                  {post.handle}
                </span>
              </div>
              <span
                className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0 ${
                  TOPIC_COLORS[post.topic] || "bg-card text-muted"
                }`}
              >
                {post.topic}
              </span>
            </div>
            <p className="text-xs text-muted leading-relaxed line-clamp-3">
              {post.text}
            </p>
            <span className="text-[10px] text-muted/60 mt-1 block">
              {post.timestamp}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
