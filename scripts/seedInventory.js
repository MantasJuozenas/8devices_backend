import sequelize from '../config/dbConfig.js';
// @ts-ignore
import InventoryItem from '../models/InventoryItem.js';

const seedInventory = async () => {
  try {
    await sequelize.sync({ force: true }); // This will drop and recreate the tables
    console.log('Database synced.');

    const items = [
      {
        name: 'Laptop',
        manufacturer: 'Dell',
        count: 10,
        shelf: 'A1',
        itemCode: 'LPT-001',
        weight: 2.5,
        size: '15.6 inches',
      },
      {
        name: 'Mouse',
        manufacturer: 'Logitech',
        count: 50,
        shelf: 'B2',
        itemCode: 'MS-002',
        weight: 0.1,
        size: 'Standard',
      },
      {
        name: 'Keyboard',
        manufacturer: 'Corsair',
        count: 20,
        shelf: 'C3',
        itemCode: 'KB-003',
        weight: 0.8,
        size: 'Full Size',
      },
    ];

    await InventoryItem.bulkCreate(items);
    console.log('Sample data added.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await sequelize.close();
  }
};

seedInventory();
