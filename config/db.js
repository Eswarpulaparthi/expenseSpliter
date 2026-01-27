import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();

if (!process.env.DATABASE_URI) {
  throw new Error(
    "DATABASE_URI environment variable is not defined. Please check your .env file."
  );
}

const sequelize = new Sequelize(process.env.DATABASE_URI, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
