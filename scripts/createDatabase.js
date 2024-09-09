import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const baseDatabaseURL = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432`;

const sequelize = new Sequelize(baseDatabaseURL, {
  dialect: 'postgres',
  logging: false,
});

// Function to check if database exists
const databaseExists = async (databaseName) => {
  const checkDB = new Sequelize(`${baseDatabaseURL}/${databaseName}`, {
    dialect: 'postgres',
    logging: false,
  });

  try {
    await checkDB.authenticate();
    await checkDB.close();
    return true;
  } catch (error) {
    return false;
  }
};

// Function to create database
const createDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const dbName = process.env.DB_NAME;

    if (await databaseExists(dbName)) {
      console.log(`Database "${dbName}" already exists.`);
    } else {
      await sequelize.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database "${dbName}" created successfully.`);
    }
  } catch (error) {
    console.error('Unable to create the database:', error);
  } finally {
    await sequelize.close();
  }
};

createDatabase();
