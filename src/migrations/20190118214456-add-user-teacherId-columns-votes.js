/* eslint no-unused-vars: "off" */

module.exports = {
  up(queryInterface, Sequelize) {
    return [
      queryInterface.addColumn(
        'Votes',
        'userId', {
          type: Sequelize.STRING,
          allowNull: false,
        },
      ),
      queryInterface.addColumn(
        'Votes',
        'teacherId', {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      ),
    ];
  },

  down(queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('Votes', 'userId'),
      queryInterface.removeColumn('Votes', 'teacherId'),
    ];
  },
};
