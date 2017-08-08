(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        var services = {
            'createWidget': createWidget,
            'findAllWidgetsForPage': findAllWidgetsForPage,
            'findWidgetById': findWidgetById,
            'updateWidget': updateWidget,
            'deleteWidget': deleteWidget,
            'deleteWidgetsByPage': deleteWidgetsByPage,
            'sortWidgets' : sortWidgets,
            'deleteWidgetFromPage' : deleteWidgetFromPage
        };
        return services;


        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function sortWidgets(start, end, pageId) {
            var url = "/api/page/" + pageId + "/widget?initial=index1&final=index2";
            url = url.replace("index1", start)
                .replace("index2", end);
            $http.put(url);
        }

        function createHTMLWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'HTML',
                pageId: pageId,
                name: widget.name,
                text: widget.text
            };
        }

        function createImageWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'IMAGE',
                pageId: pageId,
                width: widget.width,
                url: widget.url,
                name: widget.name,
                text: widget.text
            };
        }

        function createYouTubeWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'YOUTUBE',
                pageId: pageId,
                name: widget.name,
                text: widget.text,
                width: widget.width,
                url: widget.url
            };

        }

        function createHeaderWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'HEADING',
                pageId: pageId,
                size: widget.size,
                name: widget.name,
                text: widget.text
            };
        }

        function createWidget(pageId, widget) {
            var url = '/api/createImage';

            return $http.post(url, widget)
                .then(function(response) {
                    return response.data;
                });
        }



        function findAllWidgetsForPage(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function updateWidget(widgetId, widget) {
            var url = '/api/widget/' +widgetId;
            return $http.put(url, widget)
                .then(function(response) {
                    return response.data;
                });
        }


        function deleteWidget(widgetId) {
            var url ='/api/widget/' +widgetId;
            return $http.delete(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function deleteWidgetFromPage(pageId, widgetId) {
            var url = "/api/page/" + pageId + "/widget/" + widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function deleteWidgetsByPage(pageId){
            var url = "/api/page/" + pageId + "/widget";
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }


    }
})();