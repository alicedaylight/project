module.exports = function (app) {
    var widgetModel = require('../model/widget/widget.model.server');

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

    app.post('/api/createImage', createWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.get("/api/page/:pid/widget", findAllWidgetsForPage);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put('/api/widget/:wgid', updateWidget);
    app.put('/api/page/:pid/widget', sortWidgets);
    app.delete("/api/page/:pid/widget/:wgid", deleteWidgetFromPage);
    app.delete("/api/page/:pid/widget", deleteWidgetsByPage);


    function sortWidgets(req, res) {
        var pid = req.params.pid;
        var start = req.query.initial;
        var end = req.query.final;
        widgetModel
            .findAllWidgetsForPage(pid)
            .then(function(widgets) {
                widgets.splice(end, 0, widgets.splice(start, 1)[0]);
                console.log("widgets" + widgets);
                res.sendStatus(200);
            });
    }


    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var name          = req.body.name;
        var myFile        = req.file;
        var text          = req.body.text;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;


        if (widgetId === null || widgetId === undefined || widgetId === "") {
            var widget = req.body;

            var newImage = {
                name : name,
                text : text,
                widgetType: 'IMAGE',
                width: width,
                url: '../uploads/'+filename
            };

            widgetModel
                .createWidget(pageId, newImage)
                .then(function(widget) {
                    var callbackUrl   = "/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
                    res.redirect(callbackUrl);
                });

            return;
        }


        var url = "../uploads/" + filename;
        widgetModel
            .findWidgetById(widgetId)
            .then(function(widget) {
               widget.url = url;
               widget.save();
               var callbackUrl   = "/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
               res.redirect(callbackUrl);
            });
    }

    function createWidget(req, res){
        var pid = req.params.pid;
        var widget = req.body;
        widgetModel
            .createWidget(pid, widget)
            .then(function(widget) {
                res.sendStatus(200);
            });
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pid;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.send(widgets);
                },
                function(error){
                    res.send(404);
            });
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.wgid;
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.send(widget);
            });
    }


    function updateWidget(req, res){
        var wgid = req.params.wgid;
        var widget = req.body;
            widgetModel
            .updateWidget(wgid, widget)
            .then(function (status){
                    res.send(status);
                });
    }

    function deleteWidgetFromPage(req, res) {
        var wgid = req.params.wgid;
        var pageId = req.params.pid;
        widgetModel
            .deleteWidgetFromPage(pageId, wgid)
            .then(function (status) {
                res.send(status);
            });
    }

    function deleteWidgetsByPage(req, res) {
        var pageId = req.params.pid;
        widgetModel
            .deleteWidgetsByPage(pageId)
            .then(function (status) {
                res.send(status);
            });
    }
};

