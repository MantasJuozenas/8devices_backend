import express from 'express';
import InventoryItem from '../models/InventoryItem.js';

const router = express.Router();

// Create a new inventory item
router.post('/items', async (req, res) => {
  try {
    const item = await InventoryItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all inventory items
router.get('/items', async (req, res) => {
  try {
    const items = await InventoryItem.findAll();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single inventory item by ID
router.get('/items/:id', async (req, res) => {
  try {
    const item = await InventoryItem.findByPk(req.params.id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an inventory item by ID
router.put('/items/:id', async (req, res) => {
  try {
    const [updated] = await InventoryItem.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedItem = await InventoryItem.findByPk(req.params.id);
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an inventory item by ID
router.delete('/items/:id', async (req, res) => {
  try {
    const deleted = await InventoryItem.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all inventory items grouped by shelf number
router.post('/items/grouped-by-shelf', async (req, res) => {
  try {
    const items = await InventoryItem.findAll();

    const groupedItems = items.reduce((acc, item) => {
      const shelf = String(item.shelf) || 'Unassigned'; // Ensure shelf is a string
      if (!acc[shelf]) {
        acc[shelf] = [];
      }
      acc[shelf].push({
        id: item.id,
        name: item.name,
        manufacturer: item.manufacturer,
        count: item.count,
        itemCode: item.itemCode,
        weight: item.weight,
        size: item.size,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
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
