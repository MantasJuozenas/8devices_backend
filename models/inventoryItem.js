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
    shelf: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    itemCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    schema: 'INV',
    tableName: 'InventoryItem',
    timestamps: true,
  }
);

export default InventoryItem;
