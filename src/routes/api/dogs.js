const KoaRouter = require('koa-router');

const router = new KoaRouter();

async function loadDog(ctx, next) {
  ctx.state.dog = await ctx.orm.dogs.findById(ctx.params.dogId);
  return next();
}

router.get('dogs', '/', async (ctx) => {
  const dogs = await ctx.orm.dogs.findAll();

  // if we have a current user it will be here
  // console.log('Current user: ', ctx.state.currentUser);
  ctx.body = ctx.jsonSerializer('dogs', {
    attributes: ['nickname', 'age', 'size', 'lat', 'lon', 'description', 'orgId', 'userId'],
    topLevelLinks: {
      self: `${ctx.origin}${ctx.router.url('dogs')}`,
    },
    dataLinks: {
      self: (dataset, dog) => `${ctx.origin}/api/dog/${dog.id}`,
    },
  }).serialize(dogs);
});

router.get('getDog', '/:dogId', loadDog, async (ctx) => {
  const { dog } = ctx.state;

  ctx.body = ctx.jsonSerializer('dog', {
    attributes: ['nickname', 'age', 'size', 'lat', 'lon', 'description', 'orgId', 'userId'],
    topLevelLinks: {
      self: `${ctx.origin}${ctx.router.url('dogs')}`,
    },
    dataLinks: {
      self: () => `${ctx.origin}/api/dog/${dog.id}`,
    },
  }).serialize(dog);
});

router.get('nearDogs', '/near/:lat/:lon/:radius', async (ctx) => {
  const { lat, lon, radius } = ctx.params;
  const nearDogs = await ctx.orm.dogs.findAllNear(lat, lon, radius);

  ctx.body = ctx.jsonSerializer('dogs', {
    attributes: ['nickname', 'age', 'size', 'lat', 'lon', 'description', 'orgId', 'userId'],
    topLevelLinks: {
      self: `${ctx.origin}${ctx.router.url('dogs')}`,
    },
    dataLinks: {
      self: (dataset, dog) => `${ctx.origin}/api/dog/${dog.id}`,
    },
  }).serialize(nearDogs);
});

module.exports = router;
