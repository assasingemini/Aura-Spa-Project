"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

export async function createPostAction(data: { title: string; slug: string; excerpt: string; content: string; imageUrl: string; published: boolean }) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") throw new Error("Unauthorized");

  // Validate slug uniqueness
  const existing = await prisma.post.findUnique({ where: { slug: data.slug } });
  if (existing) throw new Error("Slug already exists");

  await prisma.post.create({
    data: {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      imageUrl: data.imageUrl,
      published: data.published,
      authorId: session.user.id as string,
    }
  });

  revalidatePath("/admin/blog");
  return { success: true };
}

export async function updatePostAction(id: string, data: { title: string; slug: string; excerpt: string; content: string; imageUrl: string; published: boolean }) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") throw new Error("Unauthorized");

  // Check slug uniqueness excluding self
  const existing = await prisma.post.findUnique({ where: { slug: data.slug } });
  if (existing && existing.id !== id) throw new Error("Slug already exists");

  await prisma.post.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      imageUrl: data.imageUrl,
      published: data.published,
    }
  });

  revalidatePath("/admin/blog");
  return { success: true };
}

export async function deletePostAction(id: string) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") throw new Error("Unauthorized");

  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/blog");
  return { success: true };
}
