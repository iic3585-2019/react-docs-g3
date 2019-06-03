module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Votes',
      'value', {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    );
  },

  down(queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'Votes',
      'value', {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    );
  },
};
