import { Op } from "sequelize";
import Product from "../models/Product.js";
import ProductImage from "../models/ProductImage.js";

export const getAllProducts = async (req, res) => {
  try {
    const { search, category } = req.query;

    const where = {};

    if (search) {
      where.title = { [Op.like]: `%${search}%` };
    }

    if (category) {
      where.category = category;
    }

    const products = await Product.findAll({
      where,
      include: ProductImage,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: ProductImage,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};
