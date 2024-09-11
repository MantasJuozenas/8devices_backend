import { DataTypes } from 'sequelize';

const InventoryItemTypes = (sequelize) => {
  const model = sequelize.define(
    'InventoryItemTypes',
    {
      InventoryItemId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'inventoryItem',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      InventoryTypeId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'inventoryType',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    },
    {
      timestamps: true,
      schema: 'INV',
      tableName: 'InventoryItemTypes',
    }
  );

  return model;
};

export default InventoryItemTypes;
