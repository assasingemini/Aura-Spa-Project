import { prisma } from "@/lib/prisma";
import { AdminBlogClient } from "./AdminBlogClient";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const postsRaw = await prisma.post.findMany({
    include: { User: true },
    orderBy: { createdAt: "desc" },
  });

  const posts = postsRaw.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || "",
    content: p.content || "",
    imageUrl: p.imageUrl || "",
    published: p.published,
    authorName: p.User?.name || "Unknown Author",
    createdAt: p.createdAt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  }));

  return <AdminBlogClient initialPosts={posts} />;
}
