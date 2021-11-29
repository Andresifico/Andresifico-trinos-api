const nodemailer = require('nodemailer');
const { MAILER_PASSWORD } = require('../config');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'amezanode@gmail.com', // generated ethereal user
    pass: MAILER_PASSWORD, // generated ethereal password
  },
});

transporter.verify().then(() => {
  console.log('Ready for send emails.');
});
module.exports = {
  transporter,
};
