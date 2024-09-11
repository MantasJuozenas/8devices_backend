//@ts-ignore
import Shelf from './Shelf.js';
import InventoryItem from './InventoryItem.js';

Shelf.associate({ InventoryItem });
InventoryItem.associate({ Shelf });

export { Shelf, InventoryItem };
