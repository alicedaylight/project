module.exports = function(app) {
    var websiteModel = require('../model/website/website.model.server');

    app.post('/api/user/:uid/website', createWebsite);
    app.get('/api/user/:uid/website', findAllWebsitesForUser);
    app.get('/api/website/:wid', findWebsiteById);
    app.put('/api/website/:wid', updateWebsite);
    app.delete("/api/user/:uid/website", deleteWebsitesByUser);
    app.delete("/api/user/:uid/website/:wid", deleteWebsiteFromUser);

    function createWebsite(req, res){
        var uid = req.params.uid;
        var website = req.body;
            websiteModel
            .createWebsiteForUser(uid, website)
            .then(
                function(website){
                    res.json(website);
                },
                function(error){
                    console.log(error);

                    res.sendStatus(400).send(error);
                }
            );
    }

    function findAllWebsitesForUser(req, res){
        var uid = req.params.uid;
            websiteModel
            .findAllWebsitesForUser(uid)
            .then(
                function(websites){
                    res.json(websites);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findWebsiteById(req, res){
        var wid = req.params.wid;
            websiteModel
            .findWebsiteById(wid)
            .then(
                function(website){
                    res.json(website);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateWebsite(req, res){
        var wid = req.params.wid;
        var website = req.body;
            websiteModel
            .updateWebsite(wid, website)
            .then(
                function (website){
                    res.json(website);
                },
                function (error){
                    res.sendStatus(400).send(error);
                }
            );
    }


    function deleteWebsiteFromUser(req, res) {
        var websiteId = req.params.wid;
        var userId = req.params.uid;
        websiteModel
            .deleteWebsiteFromUser(userId, websiteId)
            .then(function (status) {
                res.send(status);
            });
    }

    function deleteWebsitesByUser(req, res) {
        var userId = req.params.uid;
        websiteModel
            .deleteWebsitesByUser(userId)
            .then(function (status) {
                res.send(status);
            });
    }
};

