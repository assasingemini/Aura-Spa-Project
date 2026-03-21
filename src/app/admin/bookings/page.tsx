import { prisma } from "@/lib/prisma";
import { AdminBookingsClient } from "./AdminBookingsClient";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  const bookingsRaw = await prisma.booking.findMany({
    include: { service: true, user: true },
    orderBy: { createdAt: "desc" },
  });

  const bookings = bookingsRaw.map((b) => ({
    id: b.id,
    customer: b.user?.name || b.guestName || "Unknown",
    service: b.service?.name || "Unknown",
    specialist: "Spa Specialist",
    date: b.appointmentDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    time: b.appointmentDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    status: b.status.toLowerCase(), // UI uses lowercase for styling logic
    amount: b.service?.price || 0,
    rawStatus: b.status, // Prisma enum: PENDING, CONFIRMED, COMPLETED, CANCELLED
  }));

  return <AdminBookingsClient initialBookings={bookings} />;
}
