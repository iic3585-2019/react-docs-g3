/* eslint no-unused-vars: "off" */

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      courseNumber: {
        type: Sequelize.STRING,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      ua: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: new Date(),
      },
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Courses');
  },
};
