import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const post = await prisma.post.findUnique({
        where: { slug },
        include: { User: true }
      });
      if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
      
      const transformed = {
        id: post.id,
        slug: post.slug,
        title: post.title,
        category: post.category,
        image: post.imageUrl || "",
        author: {
          name: post.User?.name || "Admin",
          role: "Author",
          initials: (post.User?.name || "A").split(" ").map(n => n[0]).join("").slice(0, 2),
        },
        date: post.createdAt.toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" }),
        readTime: post.readTime,
        excerpt: post.excerpt || "",
        content: post.content,
        featured: post.published,
        tags: post.tags || [],
      };
      return NextResponse.json(transformed);
    }

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
      category: p.category,
      image: p.imageUrl || "",
      author: {
        name: p.User?.name || "Admin",
        role: "Author",
        initials: (p.User?.name || "A").split(" ").map(n => n[0]).join("").slice(0, 2),
      },
      date: p.createdAt.toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" }),
      readTime: p.readTime,
      excerpt: p.excerpt || "",
      content: p.content,
      featured: p.published,
      tags: p.tags || [],
    }));

    return NextResponse.json(transformed);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const data = await request.json();
    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug: data.slug || data.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
        content: data.content || data.excerpt || "",
        excerpt: data.excerpt || "",
        category: data.category || "General",
        readTime: data.readTime || "5 min read",
        tags: data.tags || [],
        imageUrl: data.image || "",
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
    const session = await auth();
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const data = await request.json();
    const post = await prisma.post.update({
      where: { id: data.id },
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content || data.excerpt || "",
        excerpt: data.excerpt || "",
        category: data.category || "General",
        readTime: data.readTime || "5 min read",
        tags: data.tags || [],
        imageUrl: data.image || "",
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
    const session = await auth();
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
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
