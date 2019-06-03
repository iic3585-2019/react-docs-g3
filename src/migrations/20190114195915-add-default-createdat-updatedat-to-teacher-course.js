/*  eslint no-unused-vars: ["error", { "args": "none" }]  */

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('TeacherCourses', 'updatedAt', {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
        allowNull: false,
      }),
      queryInterface.changeColumn('TeacherCourses', 'createdAt', {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
        allowNull: false,
      }),
    ]);
  },

  down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
