(function () {
    angular
        .module("wbdvDirectives", [])
        .directive("wbdvSortable", makeSortable);

    function makeSortable($routeParams) {

        function linker(scope, element, attributes) {
            var pid = $routeParams.pid;
            var start = -1;
            var end = -1;
            $(element).sortable({
                start: function (event, ui) {
                    start = ($(ui.item).index());
                },
                stop: function (event, ui) {
                    end = ($(ui.item).index());
                    scope.makeSortableController.sortWidgets(start, end, pid);
                }
            });
        }

        return {
            scope: {},
            link: linker,
            controller: makeSortableController,
            controllerAs: 'makeSortableController'
        }

    }

    function makeSortableController(WidgetService) {
        var vm = this;
        vm.sortWidgets = sortWidgets;

        function sortWidgets(start, end, pageId) {
            WidgetService.sortWidgets(start, end, pageId);
        }
    }

})();