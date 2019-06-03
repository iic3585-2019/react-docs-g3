const KoaRouter = require('koa-router');

const router = new KoaRouter();
const postsRouter = require('./posts');
const bcrypt = require('bcrypt');

async function loadUser(ctx, next) {
  ctx.state.user = await ctx.orm.users.findById(ctx.params.userId);
  return next();
}

router.use(
  '/:userId/posts', loadUser,
  async (ctx, next) => {
    await next();
  },

  postsRouter.routes(),
);

router.get('users', '/', async (ctx) => {
  const users = await ctx.orm.users.findAll();

  // if we have a current user it will be here
  // console.log('Current user: ', ctx.state.currentUser);
  ctx.body = ctx.jsonSerializer('users', {
    attributes: ['username'],
    topLevelLinks: {
      self: `${ctx.origin}${ctx.router.url('users')}`,
    },
    dataLinks: {
      self: (dataset, user) => `${ctx.origin}/api/users/${user.id}`,
    },
  }).serialize(users);
});

router.get('getUser', '/:userId', loadUser, async (ctx) => {
  const { user } = ctx.state;

  ctx.body = ctx.jsonSerializer('user', {
    attributes: ['username', 'email', 'firstName', 'lastName', 'id'],
    topLevelLinks: {
      self: `${ctx.origin}${ctx.router.url('users')}`,
    },
    dataLinks: {
      self: () => `${ctx.origin}/api/users/${user.id}`,
    },
  }).serialize(user);
});

router.patch('editUser', '/:userId', loadUser, async (ctx) => {
  const { user } = ctx.state;
  try {
    await user.update(ctx.request.body, { fields: ['username', 'password', 'firstName', 'lastName', 'email'] });
    ctx.response.status = 202;
  } catch (e) {
    ctx.response.status = 400;
  }
});

router.delete('deleteUser', '/:userId', loadUser, async (ctx) => {
  const { user, currentUser } = ctx.state;
  if (!user) {
    ctx.response.status = 204;
  } else if (user.id === currentUser.id) {
    try {
      await user.destroy();
      ctx.response.status = 200;
    } catch (e) {
      ctx.response.status = 503;
    }
  } else {
    ctx.response.status = 401;
  }
});

router.post('createUser', '/', async (ctx) => {
  try {
    ctx.request.body.password = await bcrypt.hash(ctx.request.body.password, 10);
    await ctx.orm.users.create(ctx.request.body, {
      fields: ['postId', 'text', 'orgId', 'userId'],
    });
    ctx.response.status = 201;
  } catch (e) {
    ctx.response.status = 400;
  }
});

module.exports = router;
