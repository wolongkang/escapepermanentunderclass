import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 300; // Cache for 5 minutes

interface XPost {
  id: string;
  text: string;
  author: string;
  handle: string;
  timestamp: string;
  topic: string;
}

const TOPICS = ["AI replacing jobs", "AGI timeline", "AI compute scaling", "AI and employment", "AI automation workforce"];

export async function GET() {
  const apiKey = process.env.XAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ posts: getFallbackPosts() });
  }

  try {
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-3-mini",
        messages: [
          {
            role: "system",
            content: `You are a real-time X/Twitter feed curator. Search X for the most recent trending posts about AI, AGI, compute, AI replacing jobs, and workforce automation. Return exactly 8 posts as a JSON array. Each post must have: text (the post content, max 200 chars), author (display name), handle (twitter handle with @), timestamp (relative like "2h ago"), topic (one of: AI, AGI, Compute, Jobs, Automation). Only return the JSON array, nothing else. Make these reflect real current discourse and trending topics on X right now.`,
          },
          {
            role: "user",
            content: `Find the 8 most engaging recent X posts about: ${TOPICS.join(", ")}. Return as JSON array only.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      console.error("xAI API error:", response.status);
      return NextResponse.json({ posts: getFallbackPosts() });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Parse JSON from response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const posts = JSON.parse(jsonMatch[0]) as XPost[];
      return NextResponse.json({ posts: posts.slice(0, 8) });
    }

    return NextResponse.json({ posts: getFallbackPosts() });
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
    },
    {
      id: "2",
      text: "McKinsey estimates 30% of work hours could be automated by 2030. That's 12 million occupational transitions in the US alone.",
      author: "Future of Work",
      handle: "@futureofwork",
      timestamp: "2h ago",
      topic: "Jobs",
    },
    {
      id: "3",
      text: "The compute scaling laws are holding. H200 clusters are hitting 10x performance on reasoning tasks vs last year.",
      author: "Compute Tracker",
      handle: "@computetracker",
      timestamp: "3h ago",
      topic: "Compute",
    },
    {
      id: "4",
      text: "Klarna replaced 700 customer service agents with AI. Their CEO says it does the work of 700 people. This is just the beginning.",
      author: "Tech Disruption",
      handle: "@techdisrupt",
      timestamp: "4h ago",
      topic: "Automation",
    },
    {
      id: "5",
      text: "If AGI arrives by 2028, the labor market implications are staggering. Most white-collar knowledge work gets compressed.",
      author: "AGI Watch",
      handle: "@agiwatch",
      timestamp: "5h ago",
      topic: "AGI",
    },
    {
      id: "6",
      text: "Just saw a demo where AI completed a full financial audit in 4 hours. Usually takes a team of 5 accountants two weeks.",
      author: "Finance AI",
      handle: "@financeai",
      timestamp: "6h ago",
      topic: "Jobs",
    },
    {
      id: "7",
      text: "Google DeepMind's latest: AI systems are now better than humans at 60% of cognitive benchmarks. Up from 10% in 2020.",
      author: "DeepTech",
      handle: "@deeptech_daily",
      timestamp: "7h ago",
      topic: "AI",
    },
    {
      id: "8",
      text: "The new paradigm: companies hiring 1 AI-augmented worker instead of 5. Productivity per employee is the new metric.",
      author: "Labor Economics",
      handle: "@laborecon",
      timestamp: "8h ago",
      topic: "Automation",
    },
  ];
}
