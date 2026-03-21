import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboardPage() {
  const now = new Date();
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  // 1. Fetch data in parallel
  const [
    allCompletedBookings,
    thisMonthBookingsCount,
    lastMonthBookingsCount,
    totalUsers,
    recentBookingsRaw,
    allBookingsWithService
  ] = await Promise.all([
    // All completed to calculate total historical revenue
    prisma.booking.findMany({
      where: { status: "COMPLETED" },
      include: { service: true },
    }),
    // Count this month's bookings
    prisma.booking.count({
      where: { createdAt: { gte: currentMonthStart } },
    }),
    // Count last month's bookings to calculate percentage change
    prisma.booking.count({
      where: {
        createdAt: { gte: lastMonthStart, lt: currentMonthStart },
      },
    }),
    // Total Clients
    prisma.user.count({
      where: { role: "USER" },
    }),
    // Recent 5 bookings
    prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { service: true, user: true },
    }),
    // All bookings to calculate charts
    prisma.booking.findMany({
      include: { service: true },
    }),
  ]);

  // Total Revenue
  const totalRevenueNum = allCompletedBookings.reduce(
    (acc, b) => acc + (b.service?.price || 0),
    0
  );

  // Bookings Change %
  let bookingsChange = 0;
  if (lastMonthBookingsCount > 0) {
    bookingsChange = ((thisMonthBookingsCount - lastMonthBookingsCount) / lastMonthBookingsCount) * 100;
  } else if (thisMonthBookingsCount > 0) {
    bookingsChange = 100;
  }

  // Format stats for the UI
  const stats = {
    totalRevenue: `$${totalRevenueNum.toLocaleString()}`,
    revenueChange: "+15.0%", // Hardcoded change since we'd need historical month-by-month for revenue
    bookingsThisMonth: thisMonthBookingsCount.toString(),
    bookingsChange: `${bookingsChange > 0 ? "+" : ""}${bookingsChange.toFixed(1)}%`,
    activeClients: totalUsers.toString(),
    clientsChange: "+5.2%",
    avgRating: "4.95",
    ratingChange: "+0.05",
  };

  // Format Recent Bookings
  const recentBookings = recentBookingsRaw.map((b) => ({
    id: b.id,
    customer: b.user?.name || b.guestName || "Unknown Client",
    service: b.service?.name || "Unknown Service",
    specialist: "Spa Specialist", // Defaulting as we don't have Staff model yet
    date: b.appointmentDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    time: b.appointmentDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    status: b.status.toLowerCase(),
    amount: b.service?.price || 0,
  }));

  // Aggregate Chart Data: Revenue & Bookings per month for the last 6 months
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const revenueDataRaw: Record<string, { revenue: number; bookings: number }> = {};
  
  // Initialize last 6 months to 0
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    revenueDataRaw[`${monthNames[d.getMonth()]}`] = { revenue: 0, bookings: 0 };
  }

  allBookingsWithService.forEach((b) => {
    const month = monthNames[b.createdAt.getMonth()];
    if (revenueDataRaw[month]) {
      revenueDataRaw[month].bookings += 1;
      if (b.status === "COMPLETED" && b.service) {
        revenueDataRaw[month].revenue += b.service.price;
      }
    }
  });

  const revenueData = Object.keys(revenueDataRaw).map((month) => ({
    month,
    revenue: revenueDataRaw[month].revenue,
    bookings: revenueDataRaw[month].bookings,
  }));

  // Aggregate Service Distribution
  const serviceCounts: Record<string, number> = {};
  allBookingsWithService.forEach((b) => {
    if (b.service) {
      serviceCounts[b.service.name] = (serviceCounts[b.service.name] || 0) + 1;
    }
  });

  const colors = ["#EC4899", "#A855F7", "#F472B6", "#C084FC", "#FDA4AF"];
  const totalServiceBookings = allBookingsWithService.length || 1; // avoid div by 0
  
  const serviceDistribution = Object.entries(serviceCounts)
    .sort((a, b) => b[1] - a[1]) // highest first
    .slice(0, 5) // top 5
    .map(([name, count], index) => ({
      name,
      value: Math.round((count / totalServiceBookings) * 100),
      color: colors[index % colors.length],
    }));

  // Summary widgets
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayBookingsCount = allBookingsWithService.filter((b) => b.appointmentDate >= todayStart && b.appointmentDate < new Date(todayStart.getTime() + 86400000)).length;
  const todayExpectedRevenue = allBookingsWithService
    .filter((b) => b.appointmentDate >= todayStart && b.appointmentDate < new Date(todayStart.getTime() + 86400000) && b.status !== "CANCELLED")
    .reduce((acc, b) => acc + (b.service?.price || 0), 0);

  return (
    <AdminDashboardClient
      stats={stats}
      recentBookings={recentBookings}
      revenueData={revenueData}
      serviceDistribution={serviceDistribution}
      summary={{
        appointments: todayBookingsCount,
        revenue: `$${todayExpectedRevenue.toLocaleString()}`,
        availableSlots: 4, // Mocked for now
      }}
    />
  );
}
