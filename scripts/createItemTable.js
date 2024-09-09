import sequelize from '../config/dbConfig.js';
// @ts-ignore
import InventoryItem from '../models/InventoryItem.js';

const createTable = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync({ alter: true });
    console.log('Table "InventoryItem" created successfully in schema "INV".');
  } catch (error) {
    console.error('Unable to create the table:', error);
  } finally {
    await sequelize.close();
  }
};

createTable();
