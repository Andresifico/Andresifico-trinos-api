const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'amezanode@gmail.com', // generated ethereal user
    pass: 'hdjptesspmregfhb', // generated ethereal password
  },
});

module.exports = {
  transporter,
};
