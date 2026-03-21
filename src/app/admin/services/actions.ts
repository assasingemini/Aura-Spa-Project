"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

export async function createServiceAction(data: { name: string; description: string; price: number; duration: number; imageUrl: string; isActive: boolean }) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") throw new Error("Unauthorized");

  await prisma.service.create({ data });
  revalidatePath("/admin/services");
  return { success: true };
}

export async function updateServiceAction(id: string, data: { name: string; description: string; price: number; duration: number; imageUrl: string; isActive: boolean }) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") throw new Error("Unauthorized");

  await prisma.service.update({ where: { id }, data });
  revalidatePath("/admin/services");
  return { success: true };
}

export async function deleteServiceAction(id: string) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") throw new Error("Unauthorized");

  try {
    await prisma.service.delete({ where: { id } });
    revalidatePath("/admin/services");
    return { success: true };
  } catch (error: any) {
    // If there is a foreign key constraint failure (e.g. Booking depends on Service)
    if (error.code === 'P2003') {
      return { success: false, error: "Cannot delete this service because there are existing bookings for it. Consider setting it to inactive instead." };
    }
    return { success: false, error: "Failed to delete service." };
  }
}
