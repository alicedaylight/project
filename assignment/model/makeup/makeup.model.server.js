var mongoose = require("mongoose");
var makeupSchema = require('./makeup.schema.server');
var makeupModel = mongoose.model('Makeup', makeupSchema);
var websiteModel = require('../website/website.model.server');

module.exports = makeupModel;

makeupModel.createMakeup = createMakeup;
makeupModel.findAllMakeupsForWebsite = findAllMakeupsForWebsite;
makeupModel.findMakeupById = findMakeupById;
makeupModel.updateMakeup = updateMakeup;
makeupModel.deleteMakeupFromWebsite = deleteMakeupFromWebsite;
makeupModel.deleteMakeupsByWebsite = deleteMakeupsByWebsite;
makeupModel.addWidget = addWidget;
makeupModel.deleteWidget = deleteWidget;
makeupModel.createReviewForMakeup = createReviewForMakeup;
makeupModel.addReview = addReview;
makeupModel.findMakeupByProductId = findMakeupByProductId;

function findMakeupByProductId(productId) {
    // need to add logic here that if the review already exists in the liked array
    // do not add it again (so to avoid duplicates)
    return makeupModel
        .findOne({productId : productId})
        .populate('reviews')
        .exec();
}

function findOrCreateMakeupFromReview(review) {
    return makeupModel
        .findOne({productId: review.productId})
        .exec()
        .then(function (makeup) {
            if (!makeup) {
                return makeupModel.create({productId: review.productId})
            }
            return makeup;
        })
        .catch(function (err) {
            console.log('findOrCreate err', err);
        })
}

function addReview(review) {
    return findOrCreateMakeupFromReview(review)
        .then(function (makeup) {
            makeup.reviews.push(review._id);
            return makeup.save();
        })
        .catch(function (err) {
            console.log('addReview err', err);
        })
}

function createReviewForMakeup(userId, review) {
    review._user = userId;
    return makeupModel.create(review)
        .then(function(review) {
            return makeupModel
                .addReview(userId, review._id)
    });
}

function createMakeup(websiteId, makeup) {
    makeup._website = websiteId;
    return makeupModel
        .create(makeup)
        .then(function (makeup) {
            return websiteModel
                .addMakeupToWebsite(websiteId, makeup._id);
        });
}

function findAllMakeupsForWebsite(websiteId) {
    return makeupModel
        .find({_website: websiteId})
        .populate('_website')
        .exec();
}

function findMakeupById(makeupId) {
    return makeupModel
        .findById(makeupId);
}

function updateMakeup(makeupId, makeup) {
    delete  makeup._website;
    return makeupModel
        .update({_id: makeupId}, {$set: makeup});
}

function deleteWidget(makeupId, widgetId) {
    return makeupModel
        .findById(makeupId)
        .then(function (makeup) {
            var index = makeup.widgets.indexOf(widgetId);
            makeup.widgets.splice(index, 1);
            return makeup.save();
        });
}

function addWidget(makeupId, widgetId) {
    return makeupModel
        .findById(makeupId)
        .then(function (makeup) {
            makeup.widgets.push(widgetId);
            return makeup.save();
        });
}


function deleteMakeupFromWebsite(websiteId, makeupId) {
    return makeupModel
        .remove({_id: makeupId})
        .then(function (status) {
            return websiteModel
                .deleteMakeup(websiteId, makeupId);
        });
}

function deleteMakeupsByWebsite(websiteId) {
    return makeupModel
        .remove({_website: websiteId});

}

