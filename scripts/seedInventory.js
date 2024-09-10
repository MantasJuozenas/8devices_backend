import { Shelf, InventoryItem } from '../models/shelfInventoryAssertion.js';
import sequelize from '../config/dbConfig.js';

const seedData = async () => {
  try {
    await sequelize.sync({ force: true });

    const shelf1 = await Shelf.create({ name: 'A1' });
    const shelf2 = await Shelf.create({ name: 'A2' });
    const shelf3 = await Shelf.create({ name: 'A3' });

    await InventoryItem.create({
      name: 'Laptop',
      manufacturer: 'Dell',
      count: 10,
      itemCode: 'LPT-001',
      weight: 2.5,
      size: '15.6 inches',
      ShelfId: shelf1.id,
    });
    await InventoryItem.create({
      name: 'Mouse',
      manufacturer: 'Logitech',
      count: 50,
      itemCode: 'MS-002',
      weight: 0.1,
      size: 'Standard',
      ShelfId: shelf2.id,
    });
    await InventoryItem.create({
      name: 'Keyboard',
      manufacturer: 'Corsair',
      count: 20,
      itemCode: 'KB-003',
      weight: 0.8,
      size: 'Full Size',
      ShelfId: shelf3.id,
    });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedData();
