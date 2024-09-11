'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'InventoryItem',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        manufacturer: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        count: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        itemCode: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        weight: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        size: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        ShelfId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Shelf',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
      },
      {
        schema: 'INV',
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('InventoryItem', {
      schema: 'INV',
    });
  },
};
