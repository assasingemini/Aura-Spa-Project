import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        service: true,
        user: true,
      },
      orderBy: { appointmentDate: "desc" },
    });
    
    // Transform to match UI expectation if needed
    const transformed = bookings.map(b => ({
      id: b.id,
      customer: b.guestName || b.user?.name || "Unknown",
      service: b.service.name,
      specialist: "Assigned", // Placeholder
      date: b.appointmentDate.toLocaleDateString(),
      time: b.appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: b.status.toLowerCase(),
      amount: b.service.price,
    }));

    return NextResponse.json(transformed);
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    const booking = await prisma.booking.update({
      where: { id: data.id },
      data: {
        status: data.status.toUpperCase(),
      },
    });
    return NextResponse.json(booking);
  } catch (error) {
    console.error("Failed to update booking:", error);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
