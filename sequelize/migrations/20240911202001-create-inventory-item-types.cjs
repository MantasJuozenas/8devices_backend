'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'InventoryItemTypes',
      {
        InventoryItemId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'InventoryItem',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          allowNull: false,
        },
        InventoryTypeId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'inventoryType',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        schema: 'INV',
      }
    );
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('InventoryItemTypes', {
      schema: 'INV',
    });
  },
};
