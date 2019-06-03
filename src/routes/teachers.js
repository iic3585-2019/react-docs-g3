const KoaRouter = require('koa-router');

const router = new KoaRouter();

async function loadTeacher(ctx, next) {
  ctx.state.teacher = await ctx.orm.teacher.findOne({
    where: { id: ctx.params.id },
  });
  return next();
}

router.get('courseTeachers', '/', async (ctx) => {
  const { course } = ctx.state;
  const teachers = { id: 1 };
  ctx.body = teachers;
});

router.get('/:id', loadTeacher, async (ctx) => {
  const { teacher } = ctx.state;
  ctx.body = teacher.toJSON();
});

//  my web teacher would be very dissapointed about this :(
router.get('/:id/stats/:userId', loadTeacher, async (ctx) => {
  const { teacher } = ctx.state;
  const { userId } = ctx.params;
  const [res] = await teacher.getStats(userId);
  const [votes] = res;
  const response = {
    popularity: {
      votes: votes.votes_popularity,
      voted: votes.voted_popularity,
      value: votes.popularity,
    },
    knowledge: {
      votes: votes.votes_knowledge,
      voted: votes.voted_knowledge,
      value: votes.knowledge,
    },
    clarity: {
      votes: votes.votes_clarity,
      voted: votes.voted_clarity,
      value: votes.clarity,
    },
    demand: {
      votes: votes.votes_demand,
      voted: votes.voted_demand,
      value: votes.demand,
    },
    disposition: {
      votes: votes.votes_disposition,
      voted: votes.voted_disposition,
      value: votes.disposition,
    },
  };
  ctx.body = response;
});

module.exports = router;
