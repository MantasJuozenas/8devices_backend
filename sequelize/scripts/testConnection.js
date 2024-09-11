import sequelize from '../models/index.js'; // Adjust the path to your config file
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    // Close the connection when done
    await sequelize.close();
  }
};

testConnection();
