import express from 'express';
import { models } from '../../sequelize/models/index.js';

const router = express.Router();

// Create a new shelf
router.post('/shelves', async (req, res) => {
  try {
    const { name } = req.body;

    // Validate input
    if (!name) {
      return res.status(400).json({ error: 'Shelf name is required' });
    }

    // Create the shelf
    const shelf = await models.Shelf.create({ name });

    res.status(201).json(shelf);
  } catch (error) {
    console.error('Error creating shelf:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route to get all shelves
router.get('/shelves', async (req, res) => {
  try {
    const shelves = await models.Shelf.findAll();
    res.status(200).json(shelves);
  } catch (error) {
    console.error('Error fetching shelves:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route to get all items grouped by shelf name
router.get('/shelves/grouped-by-shelf', async (req, res) => {
  try {
    const items = await models.InventoryItem.findAll({
      include: [
        {
          model: models.Shelf,
          attributes: ['name'],
        },
      ],
    });

    const groupedItems = items.reduce((acc, item) => {
      const { id, name, manufacturer, count, itemCode, weight, size, createdAt, updatedAt } = item;
      const shelfName = item.Shelf ? item.Shelf.name : 'Unassigned';

      if (!acc[shelfName]) {
        acc[shelfName] = [];
      }

      acc[shelfName].push({
        id,
        name,
        manufacturer,
        count,
        itemCode,
        weight,
        size,
        createdAt,
        updatedAt,
      });

      return acc;
    }, {});

    const result = Object.entries(groupedItems).map(([shelf, items]) => ({
      shelf,
      items,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching grouped items:', error);
    res.status(500).json({ error: error.message });
  }
});
export default router;
