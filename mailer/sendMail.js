const express = require('express');
//const bodyParser = require('body-parser');
//const exphbs = require('express-handlebars');
//const path = require('path');
const nodemailer = require("nodemailer");
const app = express();
const port = 3000;

// Creation of the method of transport of the email 
const smtpTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  service: "Gmail",
  auth: {
      user: "yoshipdev@gmail.com",
      pass: "wildcodeschool"
  }
});

smtpTransport.sendMail({
  from: "Deer Wild <yoshipdev@gmail.com>", // Expediteur
  to: "quintarion@gmail.com", // Destinataires
  subject: "Test nodemailer !", // Sujet
  text: "Hello world ✔", // plaintext body
  html: "<b>Hi, petit test via node mailer ! ✔</b>" // html body
}, (error, response) => {
  if(error){
    console.log("Erreur lors de l'envoie du mail!");
    console.log(error);
  }else{
    console.log("Mail envoyé avec succès!");
  }
  smtpTransport.close();
});



















































































































































































































