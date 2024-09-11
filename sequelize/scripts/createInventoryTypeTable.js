import sequelize from '../models/index.js';

const createInventoryTypeTable = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync({ alter: true });
    console.log('Table "InventoryType" created successfully.');
  } catch (error) {
    console.error('Unable to create the table:', error);
  } finally {
    await sequelize.close();
  }
};

createInventoryTypeTable();
