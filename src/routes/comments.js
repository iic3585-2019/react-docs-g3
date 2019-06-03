const KoaRouter = require('koa-router');

const router = new KoaRouter();

async function loadComment(ctx, next) {
  ctx.state.comment = await ctx.orm.comments.findById(ctx.params.id);
  return next();
}

router.get('/', async (ctx) => {
  ctx.body = await ctx.orm.comments.findAll();
});

router.put('/:id/like', loadComment, async (ctx) => {
  const { comment } = ctx.state;
  const data = {
    userId: ctx.state.currentUser.id,
    likedId: comment.id,
    likeType: 'comment',
  };

  ctx.body = await comment.likeComment(data);
});

router.delete('/:id/likes/:likeId/unlike', async (ctx) => {
  try {
    ctx.body = await ctx.orm.likes.destroy({ where: { id: ctx.params.likeId } });
  } catch (e) {
    ctx.body = e;
  }
});

module.exports = router;
