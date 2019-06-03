const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('home', '/', async (ctx) => {
  const user = ctx.state.currentUser;

  switch (ctx.accepts('html', 'json')) {
    case 'html':
      await ctx.render('home/index', {
        user,
        userPath: ctx.state.usersPath,
      });
      break;
    case 'json':
      ctx.body = user;
      break;
    default:
      break;
  }
});

module.exports = router;
