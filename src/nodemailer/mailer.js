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

const enviarCorreoRecuperacion = async function enviarMail(email, token) {
  await transporter.sendMail({
    from: '"Forgot password" <amezanode@gmail.com>', // sender address
    to: email, // list of receivers
    subject: 'Forgot password ✔', // Subject line
    html: `<b>Hi,</b>
          <p>This is the token for recovering your password, please use it when put a new Password.</p>
          <br>
          <a href="${token}">${token}</a>
          <p>Atentamente, <br>  
          Trinos-API</p>`, // html body
  });
};

module.exports = {
  transporter,
  enviarCorreoRecuperacion,
};
