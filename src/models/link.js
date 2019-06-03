module.exports = function defineLink(sequelize, DataTypes) {
  const Link = sequelize.define('Links', {
    courseNumber: DataTypes.STRING,
    url: DataTypes.STRING,
    username: DataTypes.STRING,
  });
  Link.associate = function associate(models) {
    // associations can be defined here
    Link.belongsTo(
      models.Courses,
      { foreignKey: 'courseNumber' },
    );
  };

  return Link;
};
