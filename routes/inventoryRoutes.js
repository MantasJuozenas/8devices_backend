import express from 'express';
import InventoryItem from '../models/InventoryItem.js';
import Shelf from '../models/shelf.js';

const router = express.Router();

// Create a new inventory item
router.post('/items', async (req, res) => {
  try {
    const { ShelfId, ...itemData } = req.body;

    // Check if the ShelfId exists
    const shelf = await Shelf.findByPk(ShelfId);
    if (!shelf) {
      return res.status(400).json({ error: 'Invalid ShelfId: Shelf does not exist' });
    }

    // Create the new inventory item
    const item = await InventoryItem.create({ ...itemData, ShelfId });
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

export default router;
