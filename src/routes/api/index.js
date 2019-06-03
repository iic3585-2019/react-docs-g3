const KoaRouter = require('koa-router');
const jwt = require('koa-jwt');
const dogsRoutes = require('./dogs');
const usersRoutes = require('./users');
const authRoutes = require('./auth');

const router = new KoaRouter();

// unauthenticated endpoints
router.use('/auth', authRoutes.routes());

// JWT authentication without passthrough (error if not authenticated)
router.use(jwt({ secret: process.env.JWT_SECRET, key: 'authData' }));
router.use(async (ctx, next) => {
  if (ctx.state.authData.userId) {
    ctx.state.currentUser = await ctx.orm.users.findById(ctx.state.authData.userId);
  }

  return next();
});

// authenticated endpoints
router.use('/dogs', dogsRoutes.routes());
router.use('/users', usersRoutes.routes());

module.exports = router;
