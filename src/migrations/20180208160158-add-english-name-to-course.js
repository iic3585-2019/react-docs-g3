module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Courses',
      'englishName',
      Sequelize.STRING,
    );
  },

  down(queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'Courses',
      'englishName',
      Sequelize.STRING,
    );
  },
};
