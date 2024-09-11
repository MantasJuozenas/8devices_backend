import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';

const Shelf = sequelize.define(
  'Shelf',
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
    tableName: 'Shelf',
  }
);

Shelf.associate = (models) => {
  Shelf.hasMany(models.InventoryItem, {
    foreignKey: 'ShelfId',
    onDelete: 'CASCADE',
  });
};

export default Shelf;
