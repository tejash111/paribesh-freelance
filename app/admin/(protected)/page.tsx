import type { Types } from "mongoose";
import { revalidatePath } from "next/cache";

import { connectDB } from "@/lib/db";
import { Post } from "@/lib/models/Post";
import { findPostByIdentifier } from "@/lib/posts";
import { PostsClient } from "./posts-client";

export const revalidate = 0; // Disable caching

type AdminPostRow = {
  _id: string;
  title: string;
  type: "EDITORIAL" | "NEWS";
  language: "EN" | "OR";
  status: "DRAFT" | "PUBLISHED";
  createdAt?: string;
  linkedPostId?: string;
};

export default async function AdminDashboard() {
  async function deletePost(formData: FormData) {
    "use server";

    await connectDB();
    const id = String(formData.get("id") || "");
    const post = await findPostByIdentifier(id);

    if (!post) {
      return;
    }

    await post.deleteOne();
    revalidatePath("/admin");
  }

  await connectDB();
  const rawPosts = await Post.find().sort({ createdAt: -1 }).lean();
  const posts: AdminPostRow[] = rawPosts.map((p: any) => ({
    _id: p._id.toString(),
    title: p.title,
    type: p.type,
    language: p.language,
    status: p.status,
    createdAt: p.createdAt?.toISOString(),
    linkedPostId: p.linkedPostId?.toString(),
  }));

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-sans font-bold text-black mb-8">Posts</h1>
      <PostsClient initialPosts={posts} deleteAction={deletePost} />
    </div>
  );
}
