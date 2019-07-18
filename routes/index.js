//Routes

const users = require("./Users/users")
const cars = require("./Users/Drivers/Cars/cars")
const car_documents = require("./Users/Drivers/Cars/car_documents")
const driver_papers = require("./Users/Drivers/driver_papers")
const driver_stats = require ("./Users/Drivers/driver_stats")
const enterpriseInfo = require("./Users/enterprise/informations")
const auth = require("./auth/authController")
const upload = require("../public/uploads/upload")
const contact = require("../mailer/sendMail")



// Routes export
module.exports = { users, cars, car_documents, driver_papers, driver_stats, enterpriseInfo, auth, contact, upload};
