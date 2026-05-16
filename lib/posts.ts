import mongoose from "mongoose";

import { Post, type IPost } from "@/lib/models/Post";
import { createPostSlug } from "@/lib/slug";

type PostInput = {
  title: string;
  body: string;
  type: IPost["type"];
  language: IPost["language"];
  status: IPost["status"];
  author?: string;
  sourceName?: string;
  sourceUrl?: string;
  coverImage?: string;
  publishedAt?: Date;
};

export function parsePostFormData(formData: FormData): PostInput {
  return {
    title: String(formData.get("title") || "").trim(),
    body: String(formData.get("body") || "").trim(),
    type: String(formData.get("type") || "EDITORIAL") as IPost["type"],
    language: String(formData.get("language") || "EN") as IPost["language"],
    status: String(formData.get("status") || "DRAFT") as IPost["status"],
    author: String(formData.get("author") || "").trim() || undefined,
    sourceName: String(formData.get("sourceName") || "").trim() || undefined,
    sourceUrl: String(formData.get("sourceUrl") || "").trim() || undefined,
    coverImage: String(formData.get("coverImage") || "").trim() || undefined,
    publishedAt: parseOptionalDate(String(formData.get("publishedAt") || "")),
  };
}

export function buildPostPayload(input: PostInput, slug?: string) {
  return {
    ...input,
    slug: slug || createPostSlug(input.title),
    publishedAt:
      input.status === "PUBLISHED" ? input.publishedAt || new Date() : input.publishedAt,
  };
}

export function validatePostInput(input: PostInput) {
  if (!input.title || !input.body) {
    throw new Error("Title and body are required.");
  }

  if (!["EDITORIAL", "NEWS"].includes(input.type)) {
    throw new Error("Invalid post type.");
  }

  if (!["EN", "OR"].includes(input.language)) {
    throw new Error("Invalid post language.");
  }

  if (!["DRAFT", "PUBLISHED"].includes(input.status)) {
    throw new Error("Invalid post status.");
  }
}

export async function findPostByIdentifier(identifier: string) {
  if (mongoose.Types.ObjectId.isValid(identifier)) {
    const post = await Post.findById(identifier);
    if (post) {
      return post;
    }
  }

  return Post.findOne({ slug: identifier });
}

function parseOptionalDate(value: string) {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}
