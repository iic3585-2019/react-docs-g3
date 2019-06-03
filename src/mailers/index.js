const nodemailer = require('nodemailer');
const emailConfig = require('../config/email');

module.exports = function mailers(app) {
  const transport = nodemailer.createTransport(emailConfig.provider);

  app.context.sendMail = async function sendMail(emailName, options, templateContext) {
    try {
      const html = await this.render(`emails/${emailName}`, {
        user: templateContext.user,
        hash: templateContext.hash,
        layout: false,
        writeResp: false,
      });

      options.html = html;

      transport.sendMail(options, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`Email sent: ${info.response}`);
        }
      });
    } catch (err) {
      console.error(err);
    }
  };
};
