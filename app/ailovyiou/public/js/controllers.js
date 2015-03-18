angular.module('youlovei.controllers', [])
	.controller('MainController', ['$scope', '$location', function ($scope, $location) {
		$scope.showResults = function (searchTerm) {
		 $location.url('/results?q=' + encodeURIComponent($scope.searchTerm));
		};
 	}])
 	.controller('ResultsController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
		$scope.$watch(function () {
				return ($location.search() || {}).q;
			}, function (searchTerm) {
				searchTerm = searchTerm || "";
				$http.get('/search?query=' + searchTerm).then(function (data) {
						$scope.results = data.data.hits.hits;
				});
		});
	}]);


angular.module('analysis.controllers', [])
	.controller('AnalysisController', ['$scope', '$window', '$http', function ($scope, $window, $http) {
		
		$scope.id = "";

		$scope.name = {
			""  : "Greece",
			"1" : "Athens Metropolitan Area",
			"2" : "Peloponnese and the southern Ionian",
			"3" : "Central Greece, the Sporades and Lefkada",
			"4" : "Thessaly, Epirus and Corfu including southeastern Grevena",
			"5" : "Central, Northwestern, Western and Southern Macedonia excluding southeastern Grevena",
			"6" : "Central, Eastern, Northern, Southern Macedonia and Thrace",
			"7" : "Crete",
			"8" : "Kythira and The Aegean"
		};

		$scope.$watch(function () {
			return ($scope.id || "");
		}, function (id) {

			$http.get('/stats/' + $scope.id).then(function(data) {
				$scope.results = data.data;

				var tdata = [];

				$scope.results.aggregations.articles_over_time.buckets.forEach(function(item) {
					tdata.push({
						"date": new Date(item.key_as_string),
						"value": item.doc_count
					});
				});

				if($scope.id === "3" || $scope.id === "") {
					tdata.pop();
				}

				var min = tdata[0];
				var max = tdata[tdata.length - 1];

				$scope.min = min;
				$scope.max = max;

				MG.data_graphic({
						title: $scope.name[$scope.id],
						description: "Turism in " + $scope.name[$scope.id] + " from the year " + min.date + " to " + max.date + ".",
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
		});
	}]);