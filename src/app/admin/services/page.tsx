import { prisma } from "@/lib/prisma";
import { AdminServicesClient } from "./AdminServicesClient";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const servicesRaw = await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
  });

  const services = servicesRaw.map((s) => ({
    id: s.id,
    name: s.name,
    description: s.description,
    price: s.price,
    duration: s.duration,
    imageUrl: s.imageUrl || "",
    isActive: s.isActive,
  }));

  return <AdminServicesClient initialServices={services} />;
}
