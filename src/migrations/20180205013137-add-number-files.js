module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Files',
      'courseNumber',
      Sequelize.STRING,
    );
  },

  down(queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'Files',
      'courseNumber',
      Sequelize.STRING,
    );
  },
};
