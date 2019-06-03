/* eslint no-unused-vars: off, no-await-in-loop: off */
module.exports = function defineuser(sequelize, DataTypes) {
  const User = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      unique: 'uniqueUsername',
      validate: {
        len: {
          args: 5,
          msg: 'Username needs to be 5 or more characters long.',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: 'uniqueEmail',
      validate: {
        isEmail: {
          args: true,
          notEmpty: true,
          msg: 'Enter a valid Email.',
        },
      },
    },
  });
  User.associate = function associate(models) {
    // associations can be defined here
    User.hasMany(
      models.Files,
      { foreignKey: 'username' },
    );
  };

  User.createUser = async function createUser(username, email) {
    const user = await sequelize.models.Users.findOne({
      where: { username },
    });

    if (!user) {
      return sequelize.models.Users.build({ username, email }).save();
    }

    return user;
  };

  User.prototype.getFiles = async function getFiles() {
    const files = await sequelize.models.files.findAll({
      where: { userId: this.id },
      order: [['updatedAt', 'DESC']],
    });
    return files;
  };

  return User;
};
