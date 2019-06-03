const KoaRouter = require('koa-router');

const router = new KoaRouter();

async function loadComment(ctx, next) {
  ctx.state.comment = await ctx.orm.commnets.findById(ctx.params.commentId);
  return next();
}

router.get('comments', '/', async (ctx) => {
  const { post } = ctx.state;
  const comments = await ctx.orm.comments.findAll({
    where: { postId: post.id },
  });

  ctx.body = ctx.jsonSerializer('comments', {
    attributes: ['id', 'postId', 'userId', 'text'],
    topLevelLinks: {
      self: `${ctx.origin}${ctx.router.url('users', post.id, 'comments')}`,
    },
    dataLinks: {
      self: (dataset, comment) => `${ctx.origin}/api/comments/${comment.id}`,
    },
  }).serialize(comments);
});

router.patch('editComment', '/:commentId', loadComment, async (ctx) => {
  const { comment } = ctx.state;
  try {
    await comment.update(ctx.request.body, { fields: ['text'] });
    ctx.response.status = 202;
  } catch (e) {
    ctx.response.status = 400;
  }
});

router.delete('deleteComment', '/:commentId', loadComment, async (ctx) => {
  const { comment } = ctx.state;
  if (!comment) {
    ctx.response.status = 204;
  } else if (comment.userId === ctx.state.currentUser.id) {
    try {
      await comment.destroy();
      ctx.response.status = 200;
    } catch (e) {
      ctx.response.status = 503;
    }
  } else {
    ctx.response.status = 401;
  }
});

router.post('createComment', '/', async (ctx) => {
  try {
    await ctx.orm.comments.create(ctx.request.body, {
      fields: ['username', 'email', 'password', 'firstName', 'lastName'],
    });
    ctx.response.status = 201;
  } catch (e) {
    ctx.response.status = 400;
  }
});

module.exports = router;
