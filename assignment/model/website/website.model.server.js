var mongoose = require("mongoose");
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('Website', websiteSchema);
var userModel = require('../user/user.model.server');

module.exports = websiteModel;

websiteModel.addPageToWebsite = addPageToWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;

websiteModel.deleteWebsiteFromUser = deleteWebsiteFromUser;
websiteModel.deleteWebsitesByUser = deleteWebsitesByUser;
websiteModel.deletePage = deletePage;



function deletePage(websiteId, pageId) {
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        });
}

function deleteWebsiteFromUser(userId, websiteId) {
    return websiteModel
        .remove({_id: websiteId})
        .then(function (status) {
            return userModel
                .deleteWebsite(userId, websiteId);
        });
}

function deleteWebsitesByUser(userId) {
    return websiteModel
        .remove({_user: userId});
}


     function addPageToWebsite(websiteId, pageId) {
         return websiteModel.findOne({_id : websiteId})
             .then(function(website) {
                 website.pages.push(pageId);
                 return website.save();
             });

     }

    function createWebsiteForUser(userId, website) {
        // reference back to parent is the username you gave me
        // stored in the scehma as a userId which is objectId
        website._user = userId;
        return websiteModel.create(website)
            .then(function(website) {
                return userModel // return as a promise
                    .addWebsite(userId, website._id)
            });
    }

    function findAllWebsitesForUser(userId) {
        return websiteModel
            .find({_user: userId})
            .populate('_user')
            .exec();
        // I have a field that is a reference _user
        // I want you to convert that id into it's actual instance
        // that is referenced in another collection by that id
        // implemented by mongoose(abstraction layer)
        // exect string together transformation aka "go ahead"
    }

    function findWebsiteById(websiteId) {
        return websiteModel.findOne({_id : websiteId})
    }

    function updateWebsite(websiteId, website) {
        return websiteModel.update({
            _id : websiteId
        }, {
            name : website.name,
            desc : website.desc
        });

    }

    function deleteWebsite(websiteId) {
        return websiteModel.remove({
            _id : websiteId
        });
    }



