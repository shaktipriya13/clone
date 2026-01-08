import express from "express";
import cors from "cors";
import morgan from "morgan";
import sequelize from "./src/models/index.js";
import seedUser from "./src/seeders/seedUser.js";
import seedProducts from "./src/seeders/productSeeder.js";
import Product from "./src/models/Product.js"; // Ensure models are loaded
import Cart from "./src/models/Cart.js";
import CartItem from "./src/models/CartItem.js";
import Wishlist from "./src/models/Wishlist.js";

// routes
import productRoutes from "./src/routes/productRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import wishlistRoutes from "./src/routes/wishlistRoutes.js";

const app = express();

// =====================
// Middlewares
// =====================
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// =====================
// Routes
// =====================
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", (req, res) => res.json({ message: "Orders API" })); // PlaceholderRoutes);

// =====================
// Server Start
// =====================
const startServer = async () => {
  try {
    // FORCE reset to avoid deadlocks during development
    await sequelize.sync({ force: process.env.DB_SYNC_FORCE === 'true' });
    console.log("✅ Tables created / updated successfully");

    if (process.env.DB_SYNC_FORCE === 'true') {
        await seedUser();
        await seedProducts();
    }

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
  }
};

startServer();
