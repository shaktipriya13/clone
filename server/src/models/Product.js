import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
  },
  section: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "Home page section tag (e.g., top_deals, summer_decor)",
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "Primary product image URL",
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

export default Product;
