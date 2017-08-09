var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    age : String,
    email: String,
    phone: String,
    roles: [{type: String,
        default: 'USER',
        enum: ['USER', 'ADMIN']}],
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
    reviews : [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}],
    likes : [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}],

    // following : [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    // followers : [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],

    amazonProductId : String, // not sure what form this product id will be displayed in
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
