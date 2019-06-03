/* eslint no-unused-vars: "off" */

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Files', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      filename: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
      size: {
        type: Sequelize.STRING,
      },
      extension: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Files');
  },
};
