import Link from "next/link";
import type { Types } from "mongoose";
import { revalidatePath } from "next/cache";

import { connectDB } from "@/lib/db";
import { Post } from "@/lib/models/Post";
import { findPostByIdentifier } from "@/lib/posts";

export const revalidate = 0; // Disable caching

type AdminPostRow = {
  _id: Types.ObjectId;
  title: string;
  type: "EDITORIAL" | "NEWS";
  language: "EN" | "OR";
  status: "DRAFT" | "PUBLISHED";
  createdAt?: Date;
  linkedPostId?: Types.ObjectId;
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
  const posts = (await Post.find().sort({ createdAt: -1 }).lean()) as AdminPostRow[];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="space-x-2 text-sm">
          <span className="bg-[#e6efe6] text-[#2f6b3b] rounded-full px-3 py-1 font-semibold">All</span>
          <span className="bg-[#ecebe5] text-[#1f2a24] rounded-full px-3 py-1 font-semibold">Editorial</span>
          <span className="bg-[#ecebe5] text-[#1f2a24] rounded-full px-3 py-1 font-semibold">In the News</span>
        </div>
        <Link href="/admin/posts/new" className="bg-[#e6efe6] border-[1.5px] border-[#2f6b3b] text-[#2f6b3b] px-4 py-2 text-sm font-semibold rounded hover:bg-[#2f6b3b] hover:text-white transition">
          + New post
        </Link>
      </div>

      <table className="w-full text-sm text-left border-collapse border border-[#c9d2cc]">
        <thead>
          <tr className="bg-[#e6efe6] text-[#2f6b3b]">
            <th className="border border-[#c9d2cc] p-2">Title</th>
            <th className="border border-[#c9d2cc] p-2">Type</th>
            <th className="border border-[#c9d2cc] p-2">Language</th>
            <th className="border border-[#c9d2cc] p-2">Date</th>
            <th className="border border-[#c9d2cc] p-2">Status</th>
            <th className="border border-[#c9d2cc] p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id.toString()}>
              <td className="border border-[#c9d2cc] p-2">{post.title}</td>
              <td className="border border-[#c9d2cc] p-2">{post.type}</td>
              <td className="border border-[#c9d2cc] p-2">{post.language}</td>
              <td className="border border-[#c9d2cc] p-2">
                {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "-"}
              </td>
              <td className="border border-[#c9d2cc] p-2">{post.status}</td>
              <td className="border border-[#c9d2cc] p-2 space-x-2">
                <Link href={`/admin/posts/${post._id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
                <span className="text-gray-400">·</span>
                <form action={deletePost} className="inline">
                  <input type="hidden" name="id" value={post._id.toString()} />
                  <button type="submit" className="text-red-600 hover:underline">Delete</button>
                </form>
              </td>
            </tr>
          ))}
          {posts.length === 0 && (
            <tr>
              <td colSpan={6} className="border border-[#c9d2cc] p-4 text-center text-gray-500">
                No posts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
