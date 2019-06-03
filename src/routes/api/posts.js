const KoaRouter = require('koa-router');

const router = new KoaRouter();
const commentsRouter = require('./comments');

async function loadPost(ctx, next) {
  ctx.state.post = await ctx.orm.posts.findById(ctx.params.postId);
  return next();
}

router.get('/', async (ctx) => {
  const { user } = ctx.state;
  const posts = await ctx.orm.posts.findAll({
    where: { userId: user.id },
  });

  ctx.body = ctx.jsonSerializer('posts', {
    attributes: ['id', 'userId', 'postType', 'dogId', 'text', 'createdAt', 'updatedAt'],
    topLevelLinks: {
      self: `${ctx.origin}${ctx.router.url('users')}`,
    },
    dataLinks: {
      self: (dataset, post) => `${ctx.origin}/api/users/${user.id}/posts/${post.id}`,
    },
  }).serialize(posts);
});

router.get('/:postId', async (ctx) => {
  const { user } = ctx.state;
  const posts = await ctx.orm.posts.findAll({
    where: { id: ctx.params.postId, userId: user.id },
  });

  ctx.body = ctx.jsonSerializer('posts', {
    attributes: ['id', 'userId', 'postType', 'dogId', 'text', 'createdAt', 'updatedAt'],
    topLevelLinks: {
      self: `${ctx.origin}${ctx.router.url('users')}`,
    },
    dataLinks: {
      self: (dataset, post) => `${ctx.origin}/api/users/${user.id}/posts/${post.id}`,
    },
  }).serialize(posts);
});

router.use(
  '/:postId/comments',
  loadPost,
  async (ctx, next) => {
    await next();
  },

  commentsRouter.routes(),
);

module.exports = router;
