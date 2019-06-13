// Routes
const users = require("./Users/users")
const cars = require("./Users/Drivers/Cars/cars")
const driver_stats = require ("./Users/Drivers/driver_stats")
const driver_papers = require("./Users/Drivers/driver_papers")
const enterpriseInfo = require("./Users/enterprise/informations")

// Routes export
module.exports = { users, driver_papers, driver_stats, enterpriseInfo, cars };
