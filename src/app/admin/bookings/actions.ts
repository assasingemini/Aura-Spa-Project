"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { BookingStatus } from "@prisma/client";
import { auth } from "@/lib/auth";

export async function updateBookingStatusAction(id: string, newStatus: BookingStatus) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  await prisma.booking.update({
    where: { id },
    data: { status: newStatus },
  });

  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
}
