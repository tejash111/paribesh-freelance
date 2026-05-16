import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { Post, type IPost } from "@/lib/models/Post";
import { buildPostPayload, validatePostInput } from "@/lib/posts";

type PostQuery = {
  status?: IPost["status"];
  type?: IPost["type"];
  language?: IPost["language"];
  slug?: string;
};

function isPostType(value: string): value is IPost["type"] {
  return value === "EDITORIAL" || value === "NEWS";
}

function isPostStatus(value: string): value is IPost["status"] {
  return value === "DRAFT" || value === "PUBLISHED";
}

function isPostLanguage(value: string): value is IPost["language"] {
  return value === "EN" || value === "OR";
}

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const status = searchParams.get("status");
  const language = searchParams.get("language");
  const slug = searchParams.get("slug");
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const skip = (page - 1) * limit;

  const query: PostQuery = { status: "PUBLISHED" };
  if (type && isPostType(type)) query.type = type;
  if (status && isPostStatus(status)) query.status = status;
  if (language && isPostLanguage(language)) query.language = language;
  if (slug) query.slug = slug;

  const [posts, total] = await Promise.all([
    Post.find(query).sort({ publishedAt: -1 }).skip(skip).limit(limit).lean(),
    Post.countDocuments(query)
  ]);

  return NextResponse.json({ 
    posts, 
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  });
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const payload = await req.json();

    validatePostInput(payload);

    const post = await Post.create(buildPostPayload(payload));
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create post.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
