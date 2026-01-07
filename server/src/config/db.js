import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "flipkart_clone", // DB name
  "root", // username
  "Shakti@12", // password
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

export default sequelize;
