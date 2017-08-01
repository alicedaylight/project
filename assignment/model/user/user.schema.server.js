var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    age : String,
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
    makeups : [{type: mongoose.Schema.Types.ObjectId, ref: "MakeupModel"}],
    dateCreated: {type: Date, default: Date.now()},
    facebook: {
        id : String,
        token : String
    },
    google: {
        id : String,
        token : String
    }
}, {collection: "user"});

module.exports = userSchema;

// var mongoose = require('mongoose');
//
// var userSchema = mongoose.Schema({
//     username: {type: String, unique: true},
//     password: String,
//     firstName: String,
//     lastName: String,
//     email: String,
//     phone: String,
//     websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
//     makeups : [{type: mongoose.Schema.Types.ObjectId, ref: "MakeupModel"}],
//     dateCreated: {type: Date, default: Date.now()},
//     facebook: {
//         id : String,
//         token : String
//     },
//     google: {
//         id : String,
//         token : String
//     }
// }, {collection: "user"});
//
// module.exports = userSchema;