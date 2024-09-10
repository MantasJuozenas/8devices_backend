import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';

const InventoryItem = sequelize.define(
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
  }
);

InventoryItem.associate = (models) => {
  InventoryItem.belongsTo(models.Shelf, {
    foreignKey: 'ShelfId',
    onDelete: 'CASCADE',
  });
};

export default InventoryItem;
