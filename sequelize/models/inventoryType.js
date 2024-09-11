import { DataTypes } from 'sequelize';

const InventoryType = (sequelize) => {
  const model = sequelize.define(
    'inventoryType',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: true,
      schema: 'INV',
      tableName: 'inventoryType',
    }
  );

  model.associate = (models) => {
    model.belongsToMany(models.InventoryItem, {
      through: models.InventoryItemTypes,
      as: 'InventoryItems',
      foreignKey: 'InventoryTypeId',
      otherKey: 'InventoryItemId',
    });
  };

  return model;
};

export default InventoryType;
