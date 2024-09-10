import sequelize from '../config/dbConfig.js';
import Shelf from './Shelf.js';
import InventoryItem from './InventoryItem.js';

Shelf.associate({ InventoryItem });
InventoryItem.associate({ Shelf });

export { Shelf, InventoryItem };
