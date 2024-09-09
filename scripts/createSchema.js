import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const databaseURL = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`;

const sequelize = new Sequelize(databaseURL, {
  dialect: 'postgres',
  logging: false,
});

const createSchema = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Query to create schema
    await sequelize.query(`CREATE SCHEMA IF NOT EXISTS "INV"`);
    console.log('Schema "INV" created successfully.');
  } catch (error) {
    console.error('Unable to create the schema:', error);
  } finally {
    await sequelize.close();
  }
};

createSchema();
