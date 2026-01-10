import express from "express";
import {
  addToCart,
  getCart,
  removeItem,
  updateQuantity,
} from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect); // Protect all cart routes

router.post("/add", addToCart);
router.get("/", getCart);
router.put("/update", updateQuantity);
router.delete("/remove/:id", removeItem);

export default router;
