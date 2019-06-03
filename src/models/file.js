module.exports = function defineFile(sequelize, DataTypes) {
  const File = sequelize.define('Files', {
    filename: DataTypes.STRING,
    username: DataTypes.STRING,
    size: DataTypes.STRING,
    extension: DataTypes.STRING,
    path: DataTypes.STRING,
    courseNumber: DataTypes.STRING,
  });
  File.associate = function associate(models) {
    // associations can be defined here
    File.belongsTo(
      models.Users,
      { foreignKey: 'username' },
    );
  };

  return File;
};
