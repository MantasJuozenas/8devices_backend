import { DataTypes } from 'sequelize';

const InventoryItem = (sequelize) => {
  const model = sequelize.define(
    'InventoryItem',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      manufacturer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      itemCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // If itemCode should be unique
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ShelfId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      schema: 'INV',
      tableName: 'InventoryItem',
      hooks: {
        beforeSave: (inventoryItem) => {
          if (inventoryItem.name) {
            inventoryItem.name = inventoryItem.name.toLowerCase();
          }
        },
      },
    }
  );

  model.associate = (models) => {
    model.belongsTo(models.Shelf, {
      foreignKey: 'ShelfId',
      onDelete: 'CASCADE',
    });

    model.belongsToMany(models.InventoryType, {
      through: models.InventoryItemTypes,
      foreignKey: 'InventoryItemId',
      otherKey: 'InventoryTypeId',
      as: 'InventoryTypes',
    });
  };

  return model;
};

export default InventoryItem;
