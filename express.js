const express = require('express');
const app = express();
// it creates instance of express (same thing as server)
app.express = express;
// binds instance of the library to the app
module.exports = app;
// and then exports it as a variable which can be used anywhere
// be requiring the module.. and we will receive the instance of express


// instead loading own express
// at root
