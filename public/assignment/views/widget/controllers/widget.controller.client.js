/**
 * Created by xoxoumop3pisdn on 6/6/17.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("CreateWidgetController", CreateWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, WidgetService, $sce, currentUser) {
        var vm = this;
        vm.uid = currentUser._id;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        WidgetService
            .findAllWidgetsForPage(vm.pid)
            .then(renderWidgets);

        function renderWidgets(widgets) {
            vm.widgets = widgets;
        }

        vm.clean = clean;

        function clean(url) {
            console.log($sce.trustAsResourceUrl);
            return $sce.trustAsResourceUrl(url);
        }

    }


    // something might be wrong with this controller
    function NewWidgetController($routeParams, WidgetService, currentUser) {
        var vm = this;
        vm.uid = currentUser._id;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        vm.createWidget = createWidget;

        function createWidget(widget) {
            if (widget.name === undefined || widget.name === null || widget.name === "") {
                vm.error = "Name cannot be empty.";
                return;
            }

            WidgetService
                .createWidget(widget);
        }
    }

    function CreateWidgetController($routeParams, $location, WidgetService, currentUser) {
        var vm = this;
        vm.uid = currentUser._id;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.widgetType = $routeParams.wtype;
        vm.createWidget = createWidget;
        vm.createError = null;


        function createWidget() {
            if (widget.name === undefined || widget.name === null || widget.name === "") {
                vm.error = "Name cannot be empty.";
                return;
            }

            if (vm.widgetType === 'IMAGE' || vm.widgetType === 'YOUTUBE') {
                if (vm.widgetUrl === null || vm.widgetUrl === undefined) {
                    vm.createError = "Url is required for Image/Youtube";
                    return;
                }
            }
            if (vm.widgetType === 'HEADING' || vm.widgetType === 'HTML') {
                if (vm.widgetText === null || vm.widgetText === undefined) {
                    vm.createError = "Text is required for Header/HTML";
                    return;
                }
            }

            // inside heading view model.widgetName
            var newWidget = {
                name: vm.widgetName,
                text: vm.widgetText,
                widgetType: vm.widgetType,
                size: vm.widgetSize,
                width: vm.widgetWidth,
                url: vm.widgetUrl,

                rows : vm.widgetRows,
                placeholder : vm.widgetPlaceholder,
                formatted : vm.widgetFormatted
            };

            console.log(newWidget);
            WidgetService
                .createWidget(vm.pid, newWidget)
                .then(
                    function(widget) {
                        vm.message = "Sucessfully created new widget!";
                        $location.url("/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                    }, function (error) {
                        console.log(error);
                    });
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService, $timeout, currentUser) {
        console.log("Edit Widget Controller");
        var vm = this;
        vm.uid = currentUser._id;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        init();

        function init() {
            WidgetService
                .findWidgetById(vm.wgid)
                .then(function (widget) {
                    vm.widget = widget;
                    if (vm.widget.widgetType === "HEADING") {
                        vm.widgetName = vm.widget.name;
                        vm.widgetText = vm.widget.text;
                        vm.widgetSize = vm.widget.size;
                    } else if (vm.widget.widgetType === "IMAGE") {
                        vm.widgetName = vm.widget.name;
                        vm.widgetText = vm.widget.text;
                        vm.widgetUrl = vm.widget.url;
                        vm.widgetWidth = vm.widget.width;
                    } else if (vm.widget.widgetType === "YOUTUBE") {
                        vm.widgetName = vm.widget.name;
                        vm.widgetText = vm.widget.text;
                        vm.widgetUrl = vm.widget.url;
                        vm.widgetWidth = vm.widget.width;
                    } else if (vm.widget.widgetType === "HTML") {
                        vm.widgetName = vm.widget.name;
                        vm.widgetText = vm.widget.text;
                    } else if (vm.widget.widgetType === "TEXT") {
                        vm.widgetText = vm.widget.text;
                        vm.widgetRows = vm.widget.rows;
                        vm.widgetPlaceholder = vm.widget.placeholder;
                        vm.widgetFormatted = vm.widget.formatted;
                    }
                });

        }


        function updateWidget() {
            if (widget.name === undefined || widget.name === null || widget.name === "") {
                vm.error = "Name cannot be empty.";
                return;
            }
                var updatedWidget = {
                    // inside heading edit is model.widget.name
                    name: vm.widget.name,
                    text: vm.widget.text,
                    size: vm.widget.size,

                    widgetType: vm.widgetType,
                    width: vm.widget.width,
                    rows : vm.widget.rows,
                    placeholder : vm.widget.placeholder,
                    formatted : vm.widget.formatted,
                    url: vm.widget.url
                };


            WidgetService
                .updateWidget(vm.wgid, updatedWidget)
                .then(function() {
                    $location.url("/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                }, function() {
                    vm.error = "Unable to update widget!"
                });
        }


        function deleteWidget() {
            WidgetService
                .deleteWidgetFromPage(vm.pid, vm.wgid)
                .then(function() {
                    $location.url("/website/" + vm.wid + "/page/" + vm.pid + "/widget");

                }, function() {
                    vm.error = "Unable to delete widget!"
                });
        }

    }

})();