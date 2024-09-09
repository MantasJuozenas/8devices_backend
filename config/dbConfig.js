import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const environment = process.env.NODE_ENV || 'development';

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
  },
};

const sequelize = new Sequelize(config[environment]);

export default sequelize;
