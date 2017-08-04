var mongoose = require('mongoose');

var makeupSchema = mongoose.Schema({
    name: {type: String, unique: true},
    category: {type: String, enum: ['SKINCARE', 'HAIR', 'LIPS', 'EYES', 'FOUNDATION', 'CHEEK']},
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}],
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "makeup"});

module.exports = makeupSchema;