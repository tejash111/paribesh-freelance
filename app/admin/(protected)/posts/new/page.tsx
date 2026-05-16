import { redirect } from "next/navigation";

import { connectDB } from "@/lib/db";
import { Post } from "@/lib/models/Post";
import { buildPostPayload, parsePostFormData, validatePostInput } from "@/lib/posts";

export default function NewPostPage() {
  async function createPost(formData: FormData) {
    "use server";

    await connectDB();
    const input = parsePostFormData(formData);

    validatePostInput(input);
    await Post.create(buildPostPayload(input));

    redirect("/admin");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New Post</h1>
      <form action={createPost} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Title</label>
            <input name="title" required className="w-full p-2 border-[1.5px] border-[#5b6b62] bg-[#eef1ec] rounded" placeholder="Post title..." />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Body (Markdown/Rich Text)</label>
            <textarea name="body" required className="w-full p-2 border-[1.5px] border-[#5b6b62] bg-[#eef1ec] rounded h-64" placeholder="Write the article body here..."></textarea>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border border-[#5b6b62] bg-[#eef1ec] p-4 rounded">
            <h3 className="font-bold mb-3 border-b border-gray-300 pb-2">Post settings</h3>

            <label className="block text-sm font-bold mt-2">Type</label>
            <select name="type" className="w-full p-2 border-[1.5px] border-[#5b6b62] bg-white rounded mt-1">
              <option value="EDITORIAL">Editorial</option>
              <option value="NEWS">In the News</option>
            </select>

            <label className="block text-sm font-bold mt-4">Language</label>
            <select name="language" className="w-full p-2 border-[1.5px] border-[#5b6b62] bg-white rounded mt-1">
              <option value="EN">English</option>
              <option value="OR">Odia</option>
            </select>

            <label className="block text-sm font-bold mt-4">Status</label>
            <select name="status" className="w-full p-2 border-[1.5px] border-[#5b6b62] bg-white rounded mt-1">
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>

            <label className="block text-sm font-bold mt-4">Author</label>
            <input name="author" className="w-full p-2 border-[1.5px] border-[#5b6b62] bg-white rounded mt-1" placeholder="Author name..." />

            <label className="block text-sm font-bold mt-4">Source Name</label>
            <input name="sourceName" className="w-full p-2 border-[1.5px] border-[#5b6b62] bg-white rounded mt-1" placeholder="Source publication..." />

            <label className="block text-sm font-bold mt-4">Source URL</label>
            <input name="sourceUrl" className="w-full p-2 border-[1.5px] border-[#5b6b62] bg-white rounded mt-1" placeholder="https://example.com/story" />

            <label className="block text-sm font-bold mt-4">Cover Image URL</label>
            <input name="coverImage" className="w-full p-2 border-[1.5px] border-[#5b6b62] bg-white rounded mt-1" placeholder="https://example.com/image.jpg" />

            <label className="block text-sm font-bold mt-4">Published At</label>
            <input type="datetime-local" name="publishedAt" className="w-full p-2 border-[1.5px] border-[#5b6b62] bg-white rounded mt-1" />
          </div>

          <button type="submit" className="w-full bg-[#e6efe6] border-[1.5px] border-[#2f6b3b] text-[#2f6b3b] font-bold py-2 rounded hover:bg-[#2f6b3b] hover:text-white transition">
            Save & Publish
          </button>
        </div>
      </form>
    </div>
  );
}
