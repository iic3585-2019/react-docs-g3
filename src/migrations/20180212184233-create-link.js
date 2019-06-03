/* eslint no-unused-vars: "off" */

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Links', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      courseNumber: {
        type: Sequelize.STRING,
        references: {
          model: 'Courses',
          key: 'courseNumber',
        },
        allowNull: true,
      },
      url: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'username',
        },
        allowNull: true,
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
    return queryInterface.dropTable('Links');
  },
};
