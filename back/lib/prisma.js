import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function connectDB() {
  try {
    console.log("🔗 Trying to connect to:", process.env.DATABASE_URL);
    await prisma.$connect();
    console.log("✅ Connected to MongoDB");

    // Test de requête
    const users = await prisma.user.findMany();
    console.log("👤 Users:", users);
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
  }
}
connectDB(); // Appel de la fonction ici

export default prisma;
