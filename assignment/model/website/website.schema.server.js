var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({
        _user : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
        name : {type : String, required : true},
        desc : String,
        pages : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Page'
        }],
        dateCreated : {
            type : Date,
            default: Date.now
        }
    }, {collection : 'website'});

module.exports = websiteSchema;