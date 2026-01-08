import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "flipkart_clone",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "Shakti@12",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

export default sequelize;
