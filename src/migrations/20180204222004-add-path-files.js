/* eslint no-unused-vars: "off" */

module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Files',
      'path',
      Sequelize.STRING,
    );
  },

  down(queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'Files',
      'path',
      Sequelize.STRING,
    );
  },
};
