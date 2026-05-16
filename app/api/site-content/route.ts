import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { SiteContent } from "@/lib/models/SiteContent";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const language = searchParams.get("language");
  const section = searchParams.get("section");

  if (!page) {
    return NextResponse.json({ error: "page is required" }, { status: 400 });
  }

  const query: Record<string, string> = { page };
  if (language) query.language = language;
  if (section) query.section = section;

  const items = await SiteContent.find(query).lean();
  return NextResponse.json({ items });
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { page, section, language, content } = await req.json();

    if (!page || !section || !language || !content) {
      return NextResponse.json(
        { error: "page, section, language, and content are required" },
        { status: 400 },
      );
    }

    const item = await SiteContent.findOneAndUpdate(
      { page, section, language },
      { page, section, language, content },
      { upsert: true, new: true },
    );

    return NextResponse.json({ item });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to save content.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
