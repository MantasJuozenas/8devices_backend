import express from 'express';
import { models } from '../../sequelize/models/index.js';
const router = express.Router();

router.get('/by-type/:typeName?', async (req, res) => {
  const { typeName } = req.params;

  if (!typeName) {
    return res.status(404).json({ message: 'Invalid type query' });
  }

  try {
    const inventoryItems = await models.InventoryItem.findAll({
      include: {
        model: models.InventoryType,
        as: 'InventoryTypes',
        where: { name: typeName.toLowerCase() },
        through: { attributes: [] },
      },
    });

    res.status(inventoryItems.length > 0 ? 200 : 404).json(inventoryItems);
  } catch (error) {
    console.error('Error retrieving InventoryItems by type:', error);
    res.status(500).json({ error: 'Unable to retrieve InventoryItems' });
  }
});

export default router;
