import prisma from "./lib/prisma.js";
import bcrypt from "bcrypt";

const createAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash("adminpassword", 10);

    const existingAdmin = await prisma.user.findFirst({ where: { role: "ADMIN" } });

    if (existingAdmin) {
      console.log("✅ Un admin existe déjà :", existingAdmin);
      return;
    }

    const admin = await prisma.user.create({
      data: {
        username: "admin",
        email: "admin@admin.com",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log(" Admin créé avec succès :", admin);
  } catch (err) {
    console.error(" Erreur lors de la création de l'admin :", err);
  } finally {
    await prisma.$disconnect();
  }
};

const checkAdmin =  async () => {
  try {
    const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
    if (admin) {
      console.log("✅ Admin trouvé :", admin);
    } else {
      console.log("❌ Aucun admin trouvé !");
    }
  } catch (err) {
    console.error("❌ Erreur lors de la vérification de l'admin :", err);
  } finally {
    await prisma.$disconnect();
  }
};

const main = async () => {
  await createAdmin();
  await checkAdmin(); // Vérifie si l'admin a bien été créé
  process.exit();
};

main();
