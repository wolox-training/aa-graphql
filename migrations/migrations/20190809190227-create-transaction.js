'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      albumId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE
    }),

  down: queryInterface => queryInterface.dropTable('transactions')
};
