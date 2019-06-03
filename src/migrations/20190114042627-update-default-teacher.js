module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('Teachers', 'popularity', {
        type: Sequelize.INTEGER,
        defaultValue: 0.0,
      }),
      queryInterface.changeColumn('Teachers', 'clarity', {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
      }),
      queryInterface.changeColumn('Teachers', 'knowledge', {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
      }),
      queryInterface.changeColumn('Teachers', 'demand', {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
      }),
      queryInterface.changeColumn('Teachers', 'disposition', {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
      }),
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('Teachers', 'popularity', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn('Teachers', 'clarity', {
        type: Sequelize.FLOAT,
      }),
      queryInterface.changeColumn('Teachers', 'knowledge', {
        type: Sequelize.FLOAT,
      }),
      queryInterface.changeColumn('Teachers', 'demand', {
        type: Sequelize.FLOAT,
      }),
      queryInterface.changeColumn('Teachers', 'disposition', {
        type: Sequelize.FLOAT,
      }),
    ]);
  },
};
