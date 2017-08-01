var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    _user : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
    _makeup : {type : mongoose.Schema.Types.ObjectId, ref : 'Makeup'},
    name : {type : String, required : true}, // not sure if necessary, can get name from makeup
    desc : String,
    rating : String,
    pages : [{type : mongoose.Schema.Types.ObjectId, ref : 'Page'}],
    dateCreated : {type : Date, default: Date.now
    }
}, {collection: "review"});

module.exports = reviewSchema;