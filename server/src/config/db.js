import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "flipkart_clone",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "Shakti@12",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  }
);

export default sequelize;
