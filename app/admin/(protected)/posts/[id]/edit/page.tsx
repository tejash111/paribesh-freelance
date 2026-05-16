import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

import { connectDB } from "@/lib/db";
import {
  buildPostPayload,
  findPostByIdentifier,
  parsePostFormData,
  validatePostInput,
} from "@/lib/posts";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
};

function toDateTimeLocal(value?: Date | string) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 16);
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  await connectDB();
  const { id } = await params;
  const post = await findPostByIdentifier(id);

  if (!post) {
    notFound();
  }

  async function updatePost(formData: FormData) {
    "use server";

    await connectDB();
    const targetId = String(formData.get("id") || "");
    const existingPost = await findPostByIdentifier(targetId);

    if (!existingPost) {
      redirect("/admin");
    }

    const input = parsePostFormData(formData);
    validatePostInput(input);

    Object.assign(existingPost, buildPostPayload(input, existingPost.slug));
    await existingPost.save();

    revalidatePath("/admin");
    redirect("/admin");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <form action={updatePost} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <input type="hidden" name="id" value={post._id.toString()} />

        <div className="md:col-span-2 space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Title</label>
            <input
              defaultValue={post.title}
              name="title"
              required
              className="w-full p-2 border-[1.5px] border-[#5b6b62] bg-[#eef1ec] rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Body (Markdown/Rich Text)</label>
            <textarea
              defaultValue={post.body}
              name="body"
              required
              className="w-full p-2 border-[1.5px] border-[#5b6b62] bg-[#eef1ec] rounded h-64"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="border border-[#5b6b62] bg-[#eef1ec] p-4 rounded">
            <h3 className="font-bold mb-3 border-b border-gray-300 pb-2">Post settings</h3>

            <label className="block text-sm font-bold mt-2">Type</label>
            <select
              name="type"
              defaultValue={post.type}
              className="w-full p-2 border-[1.5px] border-[#5b6b62] bg-white rounded mt-1"
            >
              <option value="EDITORIAL">Editorial</option>
              <option value="NEWS">In the News</option>
            </select>

            <label className="block text-sm font-bold mt-4">Language</label>
            <select
              name="language"
              defaultValue={post.language}
              className="w-full p-2 border-[1.5px] border-[#5b6b62] bg-white rounded mt-1"
            >
              <option value="EN">English</option>
              <option value="OR">Odia</option>
            </select>

            <label className="block text-sm font-bold mt-4">Status</label>
            <select
              name="status"
              defaultValue={post.status}
              className="w-full p-2 border-[1.5px] border-[#5b6b62] bg-white rounded mt-1"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>

            <label className="block text-sm font-bold mt-4">Author</label>
            <input
              name="author"
              defaultValue={post.author || ""}
              className="w-full p-2 border-[1.5px] border-[#5b6b62] bg-white rounded mt-1"
            />

            <label className="block text-sm font-bold mt-4">Source Name</label>
            <input
              name="sourceName"
              defaultValue={post.sourceName || ""}
              className="w-full p-2 border-[1.5px] border-[#5b6b62] bg-white rounded mt-1"
            />

            <label className="block text-sm font-bold mt-4">Source URL</label>
            <input
              name="sourceUrl"
              defaultValue={post.sourceUrl || ""}
              className="w-full p-2 border-[1.5px] border-[#5b6b62] bg-white rounded mt-1"
            />

            <label className="block text-sm font-bold mt-4">Cover Image URL</label>
            <input
              name="coverImage"
              defaultValue={post.coverImage || ""}
              className="w-full p-2 border-[1.5px] border-[#5b6b62] bg-white rounded mt-1"
            />

            <label className="block text-sm font-bold mt-4">Published At</label>
            <input
              type="datetime-local"
              name="publishedAt"
              defaultValue={toDateTimeLocal(post.publishedAt)}
              className="w-full p-2 border-[1.5px] border-[#5b6b62] bg-white rounded mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#e6efe6] border-[1.5px] border-[#2f6b3b] text-[#2f6b3b] font-bold py-2 rounded hover:bg-[#2f6b3b] hover:text-white transition"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
}
