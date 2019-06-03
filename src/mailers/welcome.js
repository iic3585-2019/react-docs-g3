module.exports = function sendWelcomeEmail(ctx, user, hash) {
  return ctx.sendMail(
    'welcome', {
      from: 'no-reply@webmuffins.com',
      to: user.email,
      subject: 'Welcome to DogFinder 🐶!',
    }, {
      user, hash,
    });
};
