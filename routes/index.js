// Routes
const users = require("./Users/users")
const driver_stats = require ("./User/Driver/Driver_stats")
const driver_papers = require("./Users/Driver/driver_papers")
const enterpriseInfo = require("./Users/enterprise/informations")

// Routes export
module.exports = { users, driver_papers, driver_stats, enterpriseInfo };