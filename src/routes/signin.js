const KoaRouter = require('koa-router');
const request = require('request-promise').defaults({ jar: true });

const router = new KoaRouter();

router.get('signin', '/', async (ctx) => {
  const currentUser = await ctx.state.currentUser;

  await ctx.render('signin/index', {
    authPath: router.url('authUser'),
    currentUser,
    destroySessionPath: ctx.router.url('sessionDestroy'),
  });
});

router.put('authUser', '/', async (ctx) => {
  const { email, password } = ctx.request.body;
  const username = email.split('@')[0];
  const form = {
    login: username,
    passwd: password,
    sw: '',
    sh: '',
    cd: '',
  };

  const options = {
    resolveWithFullResponse: true,
    uri: 'https://intrawww.ing.puc.cl/siding/index.phtml',
    form,
  };

  const res = await request
    .post(options);

  const cookie = res.headers['set-cookie']; // .replace("; path=/", "");
  const isValid = cookie && cookie[0].indexOf('SIDING_SESSID') > -1;
  if (!isValid) {
    ctx.body = {
      error: 'Request not valid',
    };
  }

  const authOptions = {
    uri: 'https://intrawww.ing.puc.cl/siding',
    resolveWithFullResponse: true,
  };

  const auth = await request
    .get(authOptions);

  const isLogged = auth.body.indexOf('passwd') === -1;

  if (!isLogged) {
    ctx.body = {
      error: 'Wrong email-password combination',
    };
  } else {
    ctx.session.userId = username;
    const user = await ctx.orm.Users.createUser(username, email);
    ctx.body = {
      currentUser: user ? user.username : username,
    };
  }
});

router.delete('sessionDestroy', '/', (ctx) => {
  ctx.session = null;
  ctx.body = {
    error: null,
    success: true,
  };
});

module.exports = router;
