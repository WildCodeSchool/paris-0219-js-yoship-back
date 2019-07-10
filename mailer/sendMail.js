const express = require('express');
const nodemailer = require("nodemailer");
const router = express.Router()

router.post('/', (req, res) => { 
  // Creation of the method of transport of the email 
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    service: "Gmail",
    auth: {
        user: "yoshipdev@gmail.com",
        pass: "wildcodeschool"
    }
  });

  const sender = req.body.email;
  const status = req.body.status;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phone = req.body.phone;
  const message = req.body.message;
  

  const mailOptions = {
    from: "yoshipdev@gmail.com",
    to: sender, //to: 'khasso.bera@hotmail.com',
    subject: status, // Subject line
    text: message, // plain text body
    firstname : firstname,
    lastname : lastname,
    phone : phone,
  };
  console.log(mailOptions)
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

















































































































































































































