var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema({
        _page : {type : mongoose.Schema.Types.ObjectId, ref : 'Page'},
        // widgetType : {
        //     type : String,
        //     uppercase : true,
        //     enum : ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']
        // },
        widgetType : String,
        name : String,
        text : String,
        placeholder : String,
        description : String,
        url : String,
        width : String,
        height : String,
        rows : Number,
        size : Number,
        class : String,
        icon : String,
        deletable : {type : Boolean, default : true},
        formatted : Boolean,
        dateCreated : { type : Date, default: Date.now()}
    }, {collection : 'widget'});

module.exports = widgetSchema;