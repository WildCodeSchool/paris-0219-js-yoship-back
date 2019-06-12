// Imports 
const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser')

// Getting all routes
const routes = require("./routes/index")

// Instantiate server
const app = express();

// Middlewares
app.use(morgan("dev"));

// Body Parser configuration
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// Sending to the right routes
// User
app.use("/users", routes.users)
// Enterprise
// app.use("/users/:id/enterprise_info", routes.enterpriseInfo)
app.use('/users/:id/enterprise_info', function(req, res, next) {
    req.id = req.params.id;
    next()
}, routes.enterpriseInfo);
  

app.get("/", (req, res) => {
    res.send("Hi, I'm on the root '/'")
})

module.exports = app;