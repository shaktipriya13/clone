import express from "express";
import morgan from "morgan";
import sequelize from "./src/models/index.js";
import seedUser from "./src/seeders/seedUser.js";
import seedProducts from "./src/seeders/productSeeder.js";

// routes
import productRoutes from "./src/routes/productRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";

const app = express();

// =====================
// Middlewares
// =====================
app.use(express.json());
app.use(morgan("dev"));

// =====================
// Routes
// =====================
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// =====================
// Server Start
// =====================
const startServer = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Tables created / updated successfully");

    await seedUser();
    await seedProducts();

    app.listen(5000, () => {
      console.log("🚀 Server running on port 5000");
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
  }
};

startServer();
