var mongoose = require('mongoose');

var makeupSchema = mongoose.Schema({
    // name: {type: String, unique: true},
    category: {type: String, enum: ['BRONZER', 'EYEBROW', 'EYELINER', 'EYESHADOW', 'FOUNDATION', 'LIPLINER', 'LIPSTICK', 'MASCARA', 'NAIL POLISH']},
    productId: Number,
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}],
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "makeup"});

module.exports = makeupSchema;