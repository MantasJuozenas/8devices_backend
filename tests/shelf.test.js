import request from 'supertest';
import express from 'express';
import shelfRouter from '../routes/shelfRoutes.js';
import { Shelf, InventoryItem } from '../models/shelfInventoryAssertion.js';

const app = express();
app.use(express.json());
app.use('/api', shelfRouter);

describe('Shelf Routes', () => {
  afterAll(async () => {
    await InventoryItem.destroy({ where: {} });
    await Shelf.destroy({ where: {} });
  });

  test('should create a new shelf', async () => {
    const response = await request(app).post('/api/shelves').send({ name: 'Test Shelf' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Test Shelf');
  });

  test('should return an error if the shelf name is missing', async () => {
    const response = await request(app).post('/api/shelves').send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Shelf name is required');
  });

  test('should get all shelves', async () => {
    await Shelf.create({ name: 'Shelf 1' });
    await Shelf.create({ name: 'Shelf 2' });

    const response = await request(app).get('/api/shelves');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(2);
  });

  test('should get all items grouped by shelf name', async () => {
    const shelf1 = await Shelf.create({ name: 'Shelf A' });
    const shelf2 = await Shelf.create({ name: 'Shelf B' });

    await InventoryItem.create({
      ShelfId: shelf1.id,
      name: 'Item 1',
      manufacturer: 'Manufacturer A',
      count: 5,
      itemCode: 'ITEMA1',
      weight: 1.2,
      size: 'S',
    });

    await InventoryItem.create({
      ShelfId: shelf1.id,
      name: 'Item 2',
      manufacturer: 'Manufacturer B',
      count: 7,
      itemCode: 'ITEMA2',
      weight: 1.5,
      size: 'M',
    });

    await InventoryItem.create({
      ShelfId: shelf2.id,
      name: 'Item 3',
      manufacturer: 'Manufacturer C',
      count: 3,
      itemCode: 'ITEMB1',
      weight: 0.8,
      size: 'L',
    });

    const response = await request(app).get('/api/shelves/grouped-by-shelf');
    expect(response.status).toBe(200);

    const result = response.body;
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);

    const shelfA = result.find((group) => group.shelf === 'Shelf A');
    const shelfB = result.find((group) => group.shelf === 'Shelf B');

    expect(shelfA).toBeDefined();
    expect(shelfA.items.length).toBe(2);

    expect(shelfB).toBeDefined();
    expect(shelfB.items.length).toBe(1);
  });
});
