import sequelize from '../models/index.js';

const createShelfTable = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync({ alter: true });
    console.log('Table "Shelf" created successfully.');
  } catch (error) {
    console.error('Unable to create the table:', error);
  } finally {
    await sequelize.close();
  }
};

createShelfTable();
