module.exports = function definePost(sequelize, DataTypes) {
  const Post = sequelize.define('Posts', {
    userId: DataTypes.INTEGER,
  });
  Post.associate = function associate(models) {
    // associations can be defined here
  };

  return Post;
};
