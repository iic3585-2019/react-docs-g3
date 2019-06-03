module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Teachers',
      'url', {
        type: Sequelize.STRING,
        allowNull: false,
      },
    );
  },

  down(queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'Teachers',
      'url', {
        type: Sequelize.STRING,
        allowNull: false,
      },
    );
  },
};
