(function() {
    "use strict";
    angular.module('analysis').controller('AnalysisController', ['analysisService', '$timeout', '$location', '$scope', '$http', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
        AnalysisController
    ]);
    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function AnalysisController(analysisService, $timeout, $location, $scope, $http, $mdSidenav, $mdBottomSheet, $log, $q) {
        var self = this;
        self.toggleList = toggleAnalysisList;
        self.share = share;
        self.pages = [{
            name: 'Historical Trends',
            url: '/'
        }, {
            name: 'Class',
            url: '/class'
        }];
        self.selectPage = selectPage;
        self.selected = self.pages[0];
        self.id = "";
        self.name = {
            "": "Greece",
            "1": "Athens Metropolitan Area",
            "2": "Peloponnese and the southern Ionian",
            "3": "Central Greece, the Sporades and Lefkada",
            "4": "Thessaly, Epirus and Corfu including southeastern Grevena",
            "5": "Central, Northwestern, Western and Southern Macedonia excluding southeastern Grevena",
            "6": "Central, Eastern, Northern, Southern Macedonia and Thrace",
            "7": "Crete",
            "8": "Kythira and The Aegean"
        };


        var updateGraph = function(id) {
          return function() {
            var fileid =  id;
            if (id === "") {
                fileid = "all";
            }
            $http.get('data/' + fileid + '.json').then(function(data) {
                var results = data.data;
                var tdata = [];
                results.aggregations.articles_over_time.buckets.forEach(function(item) {
                    tdata.push({
                        "date": new Date(item.key_as_string),
                        "value": item.doc_count
                    });
                });
                if (id === "3" || id === "") {
                    tdata.pop();
                }

                MG.data_graphic({
                    description: "",
                    data: tdata,
                    width: document.getElementById("mydiv").offsetWidth,
                    height: document.getElementById("mydiv").offsetWidth / 3,
                    target: '#trend',
                    x_accessor: 'date',
                    y_accessor: 'value',
                    xax_count: 10,
                    show_secondary_x_label: false,
                    xax_format: d3.time.format('%Y')
                });
            });
          }
        };

        $scope.$watch(function () {
          return (self.id || "");
        }, function(id) {
          $timeout(updateGraph(id), 500);
        });

        /**
         * Select the current avatars
         * @param menuId
         */
        function selectPage(page) {
            self.selected = angular.isNumber(page) ? $scope.pages[page] : page;
            self.toggleList();
            $location.path(page.url);
            updateGraph(self.id)();
        }
        // *********************************
        // Internal methods
        // *********************************
        /**
         * First hide the bottomsheet IF visible, then
         * hide or Show the 'left' sideNav area
         */
        function toggleAnalysisList() {
            var pending = $mdBottomSheet.hide() || $q.when(true);
            pending.then(function() {
                $mdSidenav('left').toggle();
            });
        }
        /**
         * Show the bottom sheet
         */
        function share($event) {}
    }
})();