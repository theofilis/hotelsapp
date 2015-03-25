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
	.controller('ClassController', ['$scope', '$window', '$http', function ($scope, $window, $http) {
		var myChart = echarts.init(document.getElementById('campings'));
        option = {
		    title : {
		        text: 'Campings Class in Greece',
		        subtext: ''
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['Campings']
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            magicType : {
		            	show: true, 
						title: {
			        		line: 'Line', 
			        		bar: 'Bar'
			        	},
		            	type: ['line', 'bar']
		            },
		            saveAsImage : {show: true, title : 'Save', lang : ['English']}
		        }
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            data : ['0Δ','0Γ','0Β','0Α','5Α']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'Campings',
		            type:'bar',
		            data: [7, 227, 37, 26, 1],
		            markPoint : {
		                data : [
		                    {type : 'max', name: 'Max'},
		                    {type : 'min', name: 'Min'}
		                ]
		            }
		        },
		    ]
		};
                    
        myChart.setOption(option);
        myChart.setTheme('infographic');

        var LodgingsChart = echarts.init(document.getElementById('lodgings'));
        option.title.text = 'Lodgings Class in Greece';
        option.legend.data = ['Lodgings'];
        option.xAxis[0].data = ['0Ε','0Δ','0Γ','0Β','0Α','1Α','2Α','3Α','4Α','5Α'];
        option.series = [{
        	name:'Lodgings',
            type:'bar',
            data: [59, 62, 244, 343, 364, 1448, 4075, 1958, 887, 37],
            markPoint : {
                data : [
                    {type : 'max', name: 'Max'},
                    {type : 'min', name: 'Min'}
	            ]
	        }
        }];
        LodgingsChart.setOption(option);
        LodgingsChart.setTheme('infographic');

        var ΝοLodgingsChart = echarts.init(document.getElementById('nolodgings'));
        option.title.text = 'No Lodgings Class in Greece';
        option.legend.data = ['No Lodgings'];
        option.xAxis[0].data = ['0Γ','0Β','0Α','00','1Κ','2Κ','3Κ','4Κ','ΑΑ'];
        option.series = [{
        	name:'No Lodgings',
            type:'bar',
            data: [165, 223, 764, 10, 5551, 10420, 5796, 696, 1],
            markPoint : {
                data : [
                    {type : 'max', name: 'Max'},
                    {type : 'min', name: 'Min'}
	            ]
	        }
        }];
        ΝοLodgingsChart.setOption(option);
        ΝοLodgingsChart.setTheme('infographic');
	}]);

angular.module('analysis.controllers')
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
			var fileid = $scope.id;

			if ($scope.id === "") {
				fileid = "all";
			}

			$http.get('data/' + fileid + '.json').then(function(data) {
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