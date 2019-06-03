module.exports = function defineCourse(sequelize, DataTypes) {
  const Course = sequelize.define('Courses', {
    courseNumber: DataTypes.STRING,
    name: DataTypes.STRING,
    ua: DataTypes.STRING,
    description: DataTypes.TEXT,
    englishName: DataTypes.STRING,
  });

  Course.associate = function associate(models) {
    // associations can be defined here
    Course.hasMany(
      models.Files,
      { foreignKey: 'courseNumber' },
      { onDelete: 'cascade', hooks: true },
    );

    Course.hasMany(
      models.Links,
      { foreignKey: 'courseNumber' },
      { onDelete: 'cascade', hooks: true },
    );
  };

  Course.prototype.getTeachers = async function getTeachers() {
    return sequelize.models.Teachers.findAll({
      include: [
        {
          model: sequelize.models.TeacherCourse,
          attributes: [],
          where: {
            courseNumber: this.get('courseNumber'),
          },
        },
      ],
    });
  };

  Course.prototype.getFiles = async function getFiles() {
    return sequelize.models.Files.findAll({
      where: { courseNumber: this.courseNumber },
      order: [['updatedAt', 'DESC']],
    });
  };

  Course.prototype.getLinks = async function getLinks() {
    return sequelize.models.Links.findAll({
      where: { courseNumber: this.courseNumber },
      order: [['updatedAt', 'ASC']],
    });
  };

  Course.prototype.putLink = async function putLink(data) {
    const { Links } = sequelize.models;
    const link = Links.build(data);
    return link.save();
  };

  return Course;
};
