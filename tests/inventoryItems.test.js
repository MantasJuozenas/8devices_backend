import request from 'supertest';
import express from 'express';
import inventoryItemsRouter from '../express/routes/inventoryRoutes.js';
import { models } from '../sequelize/models/index.js';

const app = express();
app.use(express.json());
app.use('/api', inventoryItemsRouter);

describe('Inventory Items Routes', () => {
  let shelf;

  beforeAll(async () => {
    shelf = await models.Shelf.create({ name: 'Test_Shelf' });
  });

  afterAll(async () => {
    await models.InventoryItem.destroy({ where: {} });
    await models.Shelf.destroy({ where: {} });
  });

  test('should create a new inventory item', async () => {
    const response = await request(app).post('/api/items').send({
      ShelfId: shelf.id,
      name: 'Test_Item',
      manufacturer: 'Test_Manufacturer',
      count: 10,
      itemCode: 'ITEM123',
      weight: 1.5,
      size: 'M',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('test_item');
  });

  test('should return an error if the ShelfId is invalid', async () => {
    const response = await request(app).post('/api/items').send({
      ShelfId: 9999,
      name: 'Test_Item',
      manufacturer: 'Test_Manufacturer',
      count: 10,
      itemCode: 'ITEM123',
      weight: 1.5,
      size: 'M',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid ShelfId: Shelf does not exist');
  });

  test('should get all inventory items', async () => {
    const response = await request(app).get('/api/items');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('should get a single inventory item by name', async () => {
    const item = await models.InventoryItem.create({
      ShelfId: shelf.id,
      name: 'Test_Item',
      manufacturer: 'Test_Manufacturer',
      count: 7,
      itemCode: 'FIND123',
      weight: 2.0,
      size: 'L',
    });

    const response = await request(app).get(`/api/items/${item.name}`);
    expect(response.status).toBe(200);
    expect(response.body.item).toHaveProperty('name', 'test_item');
  });

  test('should return an error if the inventory item by name does not exist', async () => {
    const response = await request(app).get('/api/items/nonexistent');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('InventoryItem not found');
  });

  test('should update an inventory item', async () => {
    const item = await models.InventoryItem.create({
      ShelfId: shelf.id,
      name: 'Test_Item',
      manufacturer: 'Test_Manufacturer',
      count: 5,
      itemCode: 'OLD123',
      weight: 1.0,
      size: 'S',
    });

    const response = await request(app).put(`/api/items/${item.id}`).send({ name: 'Updated Item' });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Item');
  });

  test('should return an error if updating a non-existent inventory item', async () => {
    const response = await request(app).put('/api/items/9999').send({ name: 'Updated Item' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Item not found');
  });

  test('should delete an inventory item', async () => {
    const item = await models.InventoryItem.create({
      ShelfId: shelf.id,
      name: 'Item_To_Delete',
      manufacturer: 'Test_Manufacturer',
      count: 3,
      itemCode: 'DELETE123',
      weight: 0.5,
      size: 'L',
    });

    const response = await request(app).delete(`/api/items/${item.id}`);
    expect(response.status).toBe(204);

    const deletedItem = await models.InventoryItem.findByPk(item.id);
    expect(deletedItem).toBeNull();
  });

  test('should return an error if deleting a non-existent inventory item', async () => {
    const response = await request(app).delete('/api/items/9999');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Item not found');
  });

  test('should get a specific inventory item by ID along with its associated types', async () => {
    try {
      const item = await models.InventoryItem.create({
        ShelfId: shelf.id,
        name: 'Test_Item_With_Type',
        manufacturer: 'Test_Manufacturer',
        count: 2,
        itemCode: 'TYPE123',
        weight: 1.2,
        size: 'M',
      });

      const [type1] = await models.InventoryType.findOrCreate({ where: { name: 'Type1' } });
      const [type2] = await models.InventoryType.findOrCreate({ where: { name: 'Type2' } });

      await models.InventoryItemTypes.create({ InventoryItemId: item.id, InventoryTypeId: type1.id });
      await models.InventoryItemTypes.create({ InventoryItemId: item.id, InventoryTypeId: type2.id });

      const response = await request(app).get(`/api/items/${item.id}/types`);

      expect(response.status).toBe(200);

      expect(response.body).toBeDefined();
      expect(response.body.name).toBe('test_item_with_type');

      expect(response.body.InventoryTypes).toHaveLength(2);
      expect(response.body.InventoryTypes.some((type) => type.name === 'Type1')).toBe(true);
      expect(response.body.InventoryTypes.some((type) => type.name === 'Type2')).toBe(true);
    } catch (error) {
      console.error('Test Error:', error);
      throw error;
    }
  });
});
