import { DataTypes } from 'sequelize';

const Shelf = (sequelize) => {
  const model = sequelize.define(
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

  return model;
};

export default Shelf;
