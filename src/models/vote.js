/* eslint no-unused-vars: off, no-await-in-loop: off */

module.exports = function defineVote(sequelize, DataTypes) {
  const Vote = sequelize.define('vote', {
    voteType: DataTypes.INTEGER,
  });
  Vote.associate = function associate(models) {
    // associations can be defined here
  };

  return Vote;
};
