import { Op } from "sequelize";
import Product from "../models/Product.js";
import ProductImage from "../models/ProductImage.js";

export const getAllProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, minRating, minDiscount, isAssured, availability, sort } = req.query;

    const where = {};

    if (search) {
      where.title = { [Op.like]: `%${search}%` };
    }

    if (category) {
      where.category = category;
    }

    if (minPrice) {
      where.price = { ...where.price, [Op.gte]: parseInt(minPrice) };
    }
    
    if (maxPrice) {
      where.price = { ...where.price, [Op.lte]: parseInt(maxPrice) };
    }

    if (minRating) {
      where.rating = { [Op.gte]: parseFloat(minRating) };
    }

    if (minDiscount) {
        where.discount = { [Op.gte]: parseInt(minDiscount) };
    }

    if (isAssured === 'true') {
        where.isAssured = true;
    }

    if (availability === 'In Stock') {
        where.stock = { [Op.gt]: 0 };
    }

    if (req.query.section) {
      where.section = req.query.section;
    }

    if (req.query.ids) {
      const ids = req.query.ids.split(",").map((id) => parseInt(id));
      where.id = { [Op.in]: ids };
    }

    let order = [['id', 'ASC']];
    if (sort === 'price_asc') order = [['price', 'ASC']];
    if (sort === 'price_desc') order = [['price', 'DESC']];
    if (sort === 'newest') order = [['createdAt', 'DESC']]; // Assuming createdAt exists, explicitly logical
    if (sort === 'relevance') order = [['id', 'ASC']]; // Relevance fallback

    const products = await Product.findAll({
      where,
      include: ProductImage,
      order
    });

    res.json(products);
  } catch (error) {
    console.error("Filter error:", error);
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
