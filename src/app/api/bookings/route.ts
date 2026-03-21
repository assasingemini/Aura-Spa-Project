import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { parse, format, isValid } from "date-fns";

// Validation schema for a new booking
const bookingSchema = z.object({
  guestName: z.string().min(2, "Name is too short"),
  guestEmail: z.string().email("Invalid email"),
  guestPhone: z.string().optional(),
  serviceId: z.string().min(1, "Service is required"),
  specialistId: z.string().optional(),
  specialistName: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  time: z.string().min(1, "Time is required"),
  notes: z.string().optional(),
});

export async function GET() {
  try {
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
      service: b.service.name,
      specialist: b.specialistName || "Assigned",
      date: format(b.appointmentDate, "PPP"),
      time: format(b.appointmentDate, "p"),
      status: b.status.toLowerCase(),
      amount: b.service.price,
    }));

    return NextResponse.json(transformed);
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json({ error: "Could not retrieve bookings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const rawData = await request.json();
    
    // Validate input data
    const validation = bookingSchema.safeParse(rawData);
    if (!validation.success) {
      return NextResponse.json({ 
        error: "Validation failed", 
        details: validation.error.flatten().fieldErrors 
      }, { status: 400 });
    }

    const { date, time, ...rest } = validation.data;

    // Robust Date Construction using date-fns
    // Input format: date="2026-03-21", time="09:00 AM"
    const dateTimeStr = `${date} ${time}`;
    const appointmentDate = parse(dateTimeStr, "yyyy-MM-dd hh:mm a", new Date());

    if (!isValid(appointmentDate)) {
      return NextResponse.json({ error: "Invalid date or time format" }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        ...rest,
        guestPhone: rest.guestPhone || "",
        appointmentDate,
        status: "PENDING",
      },
      include: { service: true }
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json({ error: "An unexpected error occurred during booking" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

    const booking = await prisma.booking.update({
      where: { id },
      data: { status: status.toUpperCase() },
    });
    return NextResponse.json(booking);
  } catch (error) {
    console.error("Update booking error:", error);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
