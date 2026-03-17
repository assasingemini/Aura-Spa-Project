import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        User: true,
      },
      orderBy: { createdAt: "desc" },
    });
    
    // Transform to match UI expectation
    const transformed = posts.map(p => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: "General", // Placeholder
      image: p.imageUrl || "",
      author: {
        name: p.User?.name || "Admin",
        role: "Author",
        initials: (p.User?.name || "A").split(" ").map(n => n[0]).join("").slice(0, 2),
      },
      date: p.createdAt.toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" }),
      readTime: "5 min read",
      excerpt: p.excerpt || "",
      featured: p.published,
      tags: [],
    }));

    return NextResponse.json(transformed);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug: data.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
        content: data.content || data.excerpt,
        excerpt: data.excerpt,
        imageUrl: data.image,
        published: data.featured || false,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.error("Failed to create post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const post = await prisma.post.update({
      where: { id: data.id },
      data: {
        title: data.title,
        content: data.content || data.excerpt,
        excerpt: data.excerpt,
        imageUrl: data.image,
        published: data.featured || false,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.error("Failed to update post:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.post.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete post:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
