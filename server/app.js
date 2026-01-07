import express from "express";
import sequelize from "./src/models/index.js";
import seedUser from "./src/seeders/seedUser.js";
import seedProducts from "./src/seeders/productSeeder.js";

const app = express();

app.use(express.json());

const startServer = async () => {
  try {
    // 1️⃣ Sync database & create tables
    await sequelize.sync({ alter: true });
    console.log("✅ Tables created / updated successfully");

    // 2️⃣ Seed default data
    await seedUser();
    await seedProducts();

    // 3️⃣ Start server ONLY after DB is ready
    app.listen(5000, () => {
      console.log("🚀 Server running on port 5000");
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
  }
};

startServer();
