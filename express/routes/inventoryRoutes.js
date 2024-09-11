import express from 'express';
import { models } from '../../sequelize/models/index.js';

const router = express.Router();

// Create a new inventory item
router.post('/items', async (req, res) => {
  try {
    const { name, manufacturer, count, itemCode, weight, size, ShelfId } = req.body;

    const shelf = await models.Shelf.findByPk(ShelfId);
    if (!shelf) {
      return res.status(400).json({ error: 'Invalid ShelfId: Shelf does not exist' });
    }

    const inventoryItem = await models.InventoryItem.create({
      name: name.toLowerCase(),
      manufacturer,
      count,
      itemCode,
      weight,
      size,
      ShelfId,
    });

    res.status(201).json(inventoryItem);
  } catch (error) {
    console.error('Error creating inventory item:', error);
    res.status(500).json({ error: 'Unable to create inventory item' });
  }
});

// Get all inventory items
router.get('/items', async (req, res) => {
  try {
    const items = await models.InventoryItem.findAll({
      include: {
        model: models.InventoryType,
        as: 'InventoryTypes',
        through: { attributes: [] },
      },
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single inventory item by name
router.get('/items/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const inventoryItem = await models.InventoryItem.findOne({
      where: { name },
      include: {
        model: models.InventoryType,
        as: 'InventoryTypes',
        through: { attributes: [] },
      },
    });

    if (!inventoryItem) {
      return res.status(404).json({ error: 'InventoryItem not found' });
    }

    res.json({
      item: inventoryItem,
    });
  } catch (error) {
    console.error('Error retrieving associated types:', error);
    res.status(500).json({ error: 'Unable to retrieve associated types' });
  }
});

// Update an inventory item by ID
router.put('/items/:id', async (req, res) => {
  try {
    const [updated] = await models.InventoryItem.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedItem = await models.InventoryItem.findByPk(req.params.id);
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
    const deleted = await models.InventoryItem.destroy({
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

router.get('/items/:id/types', async (req, res) => {
  const { id } = req.params;

  try {
    const inventoryItem = await models.InventoryItem.findByPk(id, {
      include: {
        model: models.InventoryType,
        as: 'InventoryTypes',
        through: { attributes: [] },
      },
    });

    if (!inventoryItem) {
      return res.status(404).json({ error: 'InventoryItem not found' });
    }

    res.json(inventoryItem);
  } catch (error) {
    console.error('Error retrieving item and associated types:', error);
    res.status(500).json({ error: 'Unable to retrieve item and associated types' });
  }
});

export default router;
