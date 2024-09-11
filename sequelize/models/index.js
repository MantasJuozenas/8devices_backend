import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import Shelf from './Shelf.js';
import InventoryItem from './InventoryItem.js';
import InventoryType from './inventoryType.js';
import InventoryItemTypes from './inventoryItemTypes.js';

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
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TEST_NAME,
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
  },
};

const dbConfig = config[environment];

if (!dbConfig) {
  throw new Error(`Configuration for environment "${environment}" not found.`);
}

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
});

const models = {
  Shelf: Shelf(sequelize),
  InventoryItem: InventoryItem(sequelize),
  InventoryType: InventoryType(sequelize),
  InventoryItemTypes: InventoryItemTypes(sequelize),
};

// Define associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export { models };

export default sequelize;
