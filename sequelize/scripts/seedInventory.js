import sequelize, { models } from '../models/index.js';

const seedData = async () => {
  try {
    await sequelize.sync({ force: true });

    const shelf1 = await models.Shelf.create({ name: 'A1' });
    const shelf2 = await models.Shelf.create({ name: 'A2' });
    const shelf3 = await models.Shelf.create({ name: 'A3' });

    const inventoryType1 = await models.InventoryType.create({ name: 'lauko_prekes' });
    const inventoryType2 = await models.InventoryType.create({ name: 'elektronika' });
    const inventoryType3 = await models.InventoryType.create({ name: 'buitine_technika' });

    const inventoryItem1 = await models.InventoryItem.create({
      name: 'laptop',
      manufacturer: 'dell',
      count: 10,
      itemCode: 'LPT-001',
      weight: 2.5,
      size: '15.6 inches',
      ShelfId: shelf1.id,
    });
    const inventoryItem2 = await models.InventoryItem.create({
      name: 'mouse',
      manufacturer: 'logitech',
      count: 50,
      itemCode: 'MS-002',
      weight: 0.1,
      size: 'Standard',
      ShelfId: shelf2.id,
    });
    const inventoryItem3 = await models.InventoryItem.create({
      name: 'keyboard',
      manufacturer: 'corsair',
      count: 20,
      itemCode: 'KB-003',
      weight: 0.8,
      size: 'Full Size',
      ShelfId: shelf3.id,
    });

    await models.InventoryItemTypes.bulkCreate([
      { InventoryItemId: inventoryItem1.id, InventoryTypeId: inventoryType1.id },
      { InventoryItemId: inventoryItem1.id, InventoryTypeId: inventoryType2.id },
      { InventoryItemId: inventoryItem2.id, InventoryTypeId: inventoryType2.id },
      { InventoryItemId: inventoryItem2.id, InventoryTypeId: inventoryType3.id },
      { InventoryItemId: inventoryItem3.id, InventoryTypeId: inventoryType3.id },
    ]);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedData();
