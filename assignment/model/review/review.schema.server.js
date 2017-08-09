var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    _user : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
    desc : String,
    brand : String,
    score : Number,
    type : String,
    name : String,
    _makeup : {type : mongoose.Schema.Types.ObjectId, ref : 'Makeup'},
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "review"});

module.exports = reviewSchema;