const KoaRouter = require('koa-router');

const router = new KoaRouter();

async function loadUser(ctx, next) {
  ctx.state.user = await ctx.orm.Users.findOne({
    where: { username: ctx.params.id },
  });
  return next();
}

router.get('users', '/', async (ctx) => {
  const users = await ctx.orm.users.findAll();
  const user = ctx.state.currentUser;
  await ctx.render('user/index', {
    users,
    user,
    userPath: ctx.router.url('showUser', { id: user.username }),
  });
});

router.get('showUser', '/:id', loadUser, async (ctx) => {
  const { user } = ctx.state;
  ctx.body = user;
});

module.exports = router;
