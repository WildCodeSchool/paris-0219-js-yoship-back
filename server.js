// Import express app
const app = require('./app');
require('dotenv').config();

// Server port

const PORT = process.env.PORT || 3002;

// Launch Server
let server = app.listen(PORT, () => {
    console.log("Listening port n°", server.address().port);
});
