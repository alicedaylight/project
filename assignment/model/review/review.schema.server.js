var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    _user : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
    productId : Number,
    desc : String,
    brand : String,
    score : Number,
    type : String,
    name : String,
    productId : Number,
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "review"});

module.exports = reviewSchema;