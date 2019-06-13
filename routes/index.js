
// Routes export
module.exports = { user, car_documents };
const users = require("./Users/users")
const car_documents = require("./User/Driver/Car/car_documents")
const driver_stats = require ("./User/Driver/Driver_stats")
const driver_papers = require("./Users/Driver/driver_papers")
const enterpriseInfo = require("./Users/enterprise/informations")

// Routes export
module.exports = { users, car_documents, driver_papers, driver_stats, enterpriseInfo };
