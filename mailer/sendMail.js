const express = require('express');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const router = express.Router()
const exphbs = require('express-handlebars'); // template
const app = express();

require('dotenv').config();

//View engine setup
app.engine('handlebars', exphbs()); // use template
app.set('view engine', 'handlebars'); // name view engine value handlebars

// Body parser Middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

router.post('/', (req, res) => { 
  const output = `
    <div style="color:#C9A959">
    <h1 style="font-size:1rem">Vous avez un message de Yoship<h1/>
    <h2 style="font-size:1rem">Informations expéditeur :</h2>
    <ul style="color:#808080">
      <li>Objet: ${req.body.status}</li>
      <li>Prénom: ${req.body.firstname}</li>
      <li>Nom: ${req.body.lastname}</li>
      <li>Courriel: ${req.body.email}</li>
      <li>Téléphone: ${req.body.phone}</li>
    </ul>
    <h2 style="font-size:1rem">Message :</h2>
    <p style="font-size:0.9rem; color:#808080">${req.body.message}</p>
    </div>`;
  // Creation of the method of transport of the email 
  let transporter = nodemailer.createTransport({
    //host: "smtp.gmail.com",
    host: "smtp-relay.gmail.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    service: "Gmail",
    auth: {
         user: process.env.MAIL_USER,
         pass: process.env.MAIL_PASSWORD
    }
  });

  const sender = req.body.email;
  const status = req.body.status;
  const message = req.body.message;

  const mailOptions = {
    // The e-mail address of the sender
    from: sender, 
    // An e-mail address that will appear on the Sender: field
    sender: sender,
    // Comma separated list or an array of recipients e-mail addresses that will appear on the To: field
    to: "yoshipdev@gmail.com",
    subject: status, // Subject line
    text: message, // plain text body
    html: output
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error);
    } else {
      console.log('Message %s envoyer: %s', info.messageId, info.response);
      transporter.close()
    }
  });
   
  res.sendStatus(200);
});

module.exports = router;



















































































































































































































