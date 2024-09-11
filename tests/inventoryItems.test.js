import request from 'supertest';
import express from 'express';
import inventoryItemsRouter from '../routes/inventoryRoutes.js';
import { InventoryItem, Shelf } from '../models/shelfInventoryAssertion.js';

const app = express();
app.use(express.json());
app.use('/api', inventoryItemsRouter);

describe('Inventory Items Routes', () => {
  let shelf;

  beforeAll(async () => {
    shelf = await Shelf.create({ name: 'Test Shelf' });
  });

  afterAll(async () => {
    await InventoryItem.destroy({ where: {} });
    await Shelf.destroy({ where: {} });
  });

  test('should create a new inventory item', async () => {
    const response = await request(app).post('/api/items').send({
      ShelfId: shelf.id,
      name: 'Test Item',
      manufacturer: 'Test Manufacturer',
      count: 10,
      itemCode: 'ITEM123',
      weight: 1.5,
      size: 'M',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Test Item');
  });

  test('should return an error if the ShelfId is invalid', async () => {
    const response = await request(app).post('/api/items').send({
      ShelfId: 9999, // Non-existent ShelfId
      name: 'Test Item',
      manufacturer: 'Test Manufacturer',
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

  test('should update an inventory item', async () => {
    const item = await InventoryItem.create({
      ShelfId: shelf.id,
      name: 'Old Item',
      manufacturer: 'Old Manufacturer',
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
    const item = await InventoryItem.create({
      ShelfId: shelf.id,
      name: 'Item to Delete',
      manufacturer: 'Manufacturer',
      count: 3,
      itemCode: 'DELETE123',
      weight: 0.5,
      size: 'L',
    });

    const response = await request(app).delete(`/api/items/${item.id}`);
    expect(response.status).toBe(204);

    const deletedItem = await InventoryItem.findByPk(item.id);
    expect(deletedItem).toBeNull();
  });

  test('should return an error if deleting a non-existent inventory item', async () => {
    const response = await request(app).delete('/api/items/9999');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Item not found');
  });
});
