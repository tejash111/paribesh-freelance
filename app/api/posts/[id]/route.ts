import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { buildPostPayload, findPostByIdentifier, validatePostInput } from "@/lib/posts";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: Request, context: RouteContext) {
  await connectDB();
  const { id } = await context.params;
  const post = await findPostByIdentifier(id);

  if (!post) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }

  return NextResponse.json({ post });
}

export async function PATCH(req: Request, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;
    const existingPost = await findPostByIdentifier(id);

    if (!existingPost) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    const payload = await req.json();
    validatePostInput(payload);

    Object.assign(existingPost, buildPostPayload(payload, existingPost.slug));
    await existingPost.save();

    return NextResponse.json({ post: existingPost });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update post.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_req: Request, context: RouteContext) {
  await connectDB();
  const { id } = await context.params;
  const post = await findPostByIdentifier(id);

  if (!post) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }

  await post.deleteOne();
  return NextResponse.json({ success: true });
}
