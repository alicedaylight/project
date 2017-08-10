console.log("server side app");

module.exports = function(app) {
    var mongoose = require('mongoose');
    // mongoose.connect('mongod://localhost/cs5610');
    mongoose.Promise = require('q').Promise;

    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/makeup.service.server.js")(app);
    require("./services/widget.service.server.js")(app);
    require("./services/review.service.server.js")(app);

};


