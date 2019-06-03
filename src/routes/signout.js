const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('getLogoutUser', '/', async (ctx) => {
  const user = await ctx.state.currentUser;
  if (user) {
    await ctx.render('signout/index', {
      signoutPath: router.url('logoutUser'),
      user,
    });
  } else {
    ctx.redirect('/signin');
  }
});

router.delete('logoutUser', '/', async (ctx) => {
  const user = await ctx.state.currentUser;
  if (user) {
    ctx.session.userId = null;
  }
  ctx.redirect('/');
});

module.exports = router;
