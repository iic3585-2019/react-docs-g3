exports.checkValidation = async function checkValidation(ctx, next) {
  const user = ctx.state.currentUser;
  if (user) {
    const re = '^/?validate.*$';
    if (!user.isActive && !ctx.request.path.match(re) && !ctx.request.path.includes('/signout')) {
      return ctx.redirect(ctx.router.url('validate'));
    }
    return next();
  }
  return ctx.redirect(ctx.router.url('home'));
};
