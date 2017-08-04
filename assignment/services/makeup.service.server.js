module.exports = function (app) {
    var makeupModel = require('../model/makeup/makeup.model.server');
    var http = require('http');

    app.post("/api/website/:websiteId/makeup", createMakeup);
    app.get("/api/website/:websiteId/makeup", findAllMakeupsForWebsite);
    app.get("/api/makeup/:makeupId", findMakeupById);
    app.put("/api/makeup/:makeupId", updateMakeup);
    app.delete("/api/website/:websiteId/makeup/:makeupId", deleteMakeupFromWebsite);
    app.delete("/api/website/:websiteId/makeup", deleteMakeupsByWebsite);

    app.get("/api/makeupSearchBrand",searchByBrand );
    // app.get("/api/makeupSearchType",searchByType );
    //
    // app.get("/api/makeupSearchTag",searchByType );



    function searchByBrand(req, res) {
        console.log("search by brand")
        var brand = req.params.brand;

        var options = {
            host: 'http://makeup-api.herokuapp.com/',
            path: '/api/v1/products.json?brand=' + brand
        };

        var query = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=" + brand;

        callback = function(response) {
            var str = "";

            response.on('data', function(chunk) {
                str += chunk;
            });

            reponse.on('end', function() {
                console.log(str);
            });

            console.log(response)

        };

        http.request(options, callback).end();

    }

    function createMakeup(req, res) {
        var websiteId = req.params.websiteId;
        var makeup = req.body;
        makeupModel
            .createMakeup(websiteId, makeup)
            .then(function (makeup) {
                res.send(makeup);
            });
    }

    function findAllMakeupsForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        makeupModel
            .findAllMakeupsForWebsite(websiteId)
            .then(function (makeups) {
                res.send(makeups);
            });
    }

    function findMakeupById(req, res) {
        var makeupId = req.params.makeupId;
        makeupModel
            .findMakeupById(makeupId)
            .then(function (makeup) {
                res.send(makeup);
            });
    }

    function updateMakeup(req, res) {
        var makeupId = req.params.makeupId;
        var makeup = req.body;
        makeupModel
            .updateMakeup(makeupId, makeup)
            .then(function (status) {
                res.send(status);
            });
    }

    function deleteMakeupFromWebsite(req, res) {
        var makeupId = req.params.makeupId;
        var websiteId = req.params.websiteId;
        makeupModel
            .deleteMakeupFromWebsite(websiteId, makeupId)
            .then(function (status) {
                res.send(status);
            });
    }

    function deleteMakeupsByWebsite(req, res) {
        var websiteId = req.params.websiteId;
        makeupModel
            .deleteMakeupsByWebsite(websiteId)
            .then(function (status) {
                res.send(status);
            });
    }


};

