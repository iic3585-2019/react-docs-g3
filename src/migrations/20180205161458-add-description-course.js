module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Courses',
      'description',
      Sequelize.TEXT,
    );
  },

  down(queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'Courses',
      'description',
      Sequelize.TEXT,
    );
  },
};
