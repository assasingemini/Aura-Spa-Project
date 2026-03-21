import { prisma } from "@/lib/prisma";
import { AdminCustomersClient } from "./AdminCustomersClient";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const usersRaw = await prisma.user.findMany({
    where: { role: "USER" },
    include: {
      bookings: {
        where: { status: "COMPLETED" },
        include: { service: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  const customers = usersRaw.map((u) => {
    const totalVisits = u.bookings.length;
    const totalSpent = u.bookings.reduce((sum, b) => sum + (b.service?.price || 0), 0);
    
    let tier = "Silver";
    if (totalSpent >= 1000) tier = "Platinum";
    else if (totalSpent >= 500) tier = "Gold";

    let lastVisit = "Never";
    if (u.bookings.length > 0) {
      const dates = u.bookings.map(b => b.appointmentDate.getTime());
      const maxDate = new Date(Math.max(...dates));
      lastVisit = maxDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }

    return {
      id: u.id,
      name: u.name || "Unknown",
      email: u.email || "No email",
      phone: "N/A", // We don't store phone on User schema yet, though guests provide it on booking
      joined: u.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      totalVisits,
      totalSpent,
      tier,
      lastVisit,
    };
  });

  return <AdminCustomersClient initialCustomers={customers} />;
}
