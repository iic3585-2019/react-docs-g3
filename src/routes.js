const KoaRouter = require('koa-router');

const index = require('./routes/index');
const users = require('./routes/user');
const courses = require('./routes/courses');
const posts = require('./routes/posts');
const signin = require('./routes/signin');
const signout = require('./routes/signout');
const search = require('./routes/search');
const files = require('./routes/files');
const teachers = require('./routes/teachers');

const router = new KoaRouter();

router.use(async (ctx, next) => {
  // if ctx.session.userId is null, no user is logged in.
  Object.assign(ctx.state, {
    currentUser: ctx.session.userId,
    destroySessionPath: ctx.router.url('sessionDestroy'),
    newSessionPath: ctx.router.url('signin'),
    usersPath: ctx.router.url('users'),
  });
  await next();
});

router.use('/', index.routes());
router.use('/users', users.routes());
router.use('/signin', signin.routes());
router.use('/signout', signout.routes());
router.use('/posts', posts.routes());
router.use('/courses', courses.routes());
router.use('/search', search.routes());
router.use('/files', files.routes());
router.use('/teachers', teachers.routes());

module.exports = router;
