/*  eslint no-unused-vars: ["error", { "args": "none" }]  */

module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.renameColumn('TeacherCourses', 'courseName', 'courseNumber');
  },

  down(queryInterface, Sequelize) {
    queryInterface.renameColumn('TeacherCourses', 'courseNumber', 'courseName');
  },
};
