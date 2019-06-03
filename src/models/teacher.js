module.exports = function defineTeacher(sequelize, DataTypes) {
  const Teacher = sequelize.define('teacher', {
    name: DataTypes.STRING,
    popularity: DataTypes.INTEGER,
    clarity: DataTypes.FLOAT,
    knowledge: DataTypes.FLOAT,
    demand: DataTypes.FLOAT,
    disposition: DataTypes.FLOAT,
    url: DataTypes.STRING,
  });

  Teacher.associate = function associate(models) {
    // associations can be defined here
    Teacher.hasMany(models.TeacherCourse, { foreignKey: 'teacherId', sourceKey: 'id' });
  };

  Teacher.prototype.toJSON = function toJSON() {
    const values = Object.assign({}, this.get());
    values.stats = {
      popularity: this.popularity,
      clarity: this.clarity,
      knowledge: this.knowledge,
      demand: this.demand,
      disposition: this.disposition,
    };
    return values;
  };

  //  again, my db/web teachers'd be very dissapointed :(
  Teacher.prototype.getStats = async function getStats(userId) {
    const query = `
    SELECT
      count(votes."voteType" = 0 OR NULL) AS votes_popularity,
      count(votes."voteType" = 1 OR NULL) AS votes_knowledge,
      count(votes."voteType" = 2 OR NULL) AS votes_clarity,
      count(votes."voteType" = 3 OR NULL) AS votes_demand,
      count(votes."voteType" = 4 OR NULL) AS votes_disposition,
      COALESCE(NULLIF(cast(sum ( case when votes."voteType" = 0 then votes.value else 0 end) as float) / COALESCE(NULLIF(count(votes."voteType" = 0 OR NULL),0), 1), 0), 0) as popularity,
      COALESCE(NULLIF(cast(sum ( case when votes."voteType" = 1 then votes.value else 0 end) as float) / COALESCE(NULLIF(count(votes."voteType" = 1 OR NULL),0), 1), 0), 0) as knowledge,
      COALESCE(NULLIF(cast(sum ( case when votes."voteType" = 2 then votes.value else 0 end) as float) / COALESCE(NULLIF(count(votes."voteType" = 2 OR NULL),0), 1), 0), 0) as clarity,
      COALESCE(NULLIF(cast(sum ( case when votes."voteType" = 3 then votes.value else 0 end) as float) / COALESCE(NULLIF(count(votes."voteType" = 3 OR NULL),0), 1), 0), 0) as demand,
      COALESCE(NULLIF(cast(sum ( case when votes."voteType" = 4 then votes.value else 0 end) as float) / COALESCE(NULLIF(count(votes."voteType" = 4 OR NULL),0), 1), 0), 0) as disposition,
      count((votes."userId" = :userId AND votes."voteType"= 0) OR NULL) AS voted_popularity,
      count((votes."userId" = :userId AND votes."voteType"= 1) OR NULL) AS voted_knowledge,
      count((votes."userId" = :userId AND votes."voteType"= 2) OR NULL) AS voted_clarity,
      count((votes."userId" = :userId AND votes."voteType"= 3) OR NULL) AS voted_demand,
      count((votes."userId" = :userId AND votes."voteType"= 4) OR NULL) AS voted_disposition
    FROM
      votes
    WHERE
      votes."teacherId" = :teacherId;
    `;

    return sequelize.query(query, {
      raw: true,
      replacements: {
        userId,
        teacherId: this.id,
      },
    });
  };

  return Teacher;
};
