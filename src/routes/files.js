const KoaRouter = require('koa-router');

const router = new KoaRouter();

async function loadFile(ctx, next) {
  const file = await ctx.orm.Files.findOne({
    where: { id: ctx.params.id },
  });

  ctx.state.file = file;
  return next();
}

router.delete('/:id', loadFile, async (ctx) => {
  const { file } = ctx.state;
  if (file) {
    await file.destroy({ returning: true });
    ctx.body = file;
  } else {
    ctx.body = { error: 'file not found' };
  }
});

module.exports = router;
