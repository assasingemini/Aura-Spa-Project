import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
    const hashedPassword = await bcrypt.hash("admin123", 12);

    const admin = await prisma.user.upsert({
        where: { email: "admin@auraspa.vn" },
        update: {},
        create: {
            email: "admin@auraspa.vn",
            name: "Admin",
            password: hashedPassword,
            role: "ADMIN",
        },
    });

    console.log("Admin user created:", admin);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
