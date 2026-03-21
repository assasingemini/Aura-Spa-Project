import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const bookings = await prisma.booking.findMany({
      include: {
        service: true,
        user: true,
      },
      orderBy: { appointmentDate: "desc" },
    });

    const transformed = bookings.map(b => ({
      id: b.id,
      customer: b.guestName || b.user?.name || "Unknown",
      service: b.service?.name || "Unknown Service",
      specialist: "Assigned",
      date: b.appointmentDate.toLocaleDateString(),
      time: b.appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: b.status.toLowerCase(),
      amount: b.service?.price || 0,
    }));

    return NextResponse.json(transformed);
  } catch (error) {
    console.error("[API/Bookings] Error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const appointmentDate = new Date(`${data.date}T${data.time}:00`);

    const booking = await prisma.booking.create({
      data: {
        guestName: data.name,
        guestEmail: data.email,
        guestPhone: data.phone,
        notes: data.notes,
        serviceId: data.serviceId,
        appointmentDate,
        status: "PENDING",
      },
      include: {
        service: true,
      }
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Failed to create booking:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
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
