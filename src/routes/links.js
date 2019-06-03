const KoaRouter = require('koa-router');

const router = new KoaRouter();

async function loadLink(ctx, next) {
  ctx.state.link = await ctx.orm.Links.findOne({
    where: { id: ctx.params.id },
  });
  return next();
}

router.get('courseLinks', '/', async (ctx) => {
  const { course } = ctx.state;
  const links = await course.getLinks();
  ctx.body = links;
});

router.delete('/:id', loadLink, async (ctx) => {
  const { link } = ctx.state;
  if (link) {
    await link.destroy({ returning: true });
    ctx.body = link;
  } else {
    ctx.body = { error: 'file not found' };
  }
});

router.put('courseLinkAdd', '/new', async (ctx) => {
  const { course } = ctx.state;
  let link;
  try {
    link = await course.putLink({
      url: ctx.request.body.linkData.url,
      username: ctx.request.body.user.currentUser,
      courseNumber: course.courseNumber,
    });
  } catch (error) {
    if (error instanceof ctx.orm.sequelize.ValidationError) {
      throw ctx.throw(400, error);
    }
  }

  ctx.body = { link };
});

module.exports = router;
