var mongoose = require('mongoose');

var makeupSchema = mongoose.Schema({
    name: {type: String, unique: true},

    // password: String,
    // firstName: String,
    // lastName: String,
    // email: String,
    // phone: String,
    category: {type: String, enum: ['SKINCARE', 'HAIR', 'LIPS', 'EYES', 'FOUNDATION', 'CHEEK']},
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
    dateCreated: {type: Date, default: Date.now()}
    // facebook: {
    //     id : String,
    //     token : String
    // }
}, {collection: "makeup"});

module.exports = makeupSchema;