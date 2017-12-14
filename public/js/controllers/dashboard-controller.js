angular.module('ecommerce').controller('DashboardController', function($scope, categoryResource, analyzeResource){

	$scope.responseMessage = {
		message : '',
		hasError : true		
	};
	$scope.isShow = false;
	$scope.Date = new Date();
	$scope.filter = {
		entity : {
			categories : [],
			period : {
				start : $scope.Date,
				end : $scope.Date
			}
		}
	}
	$scope.categories = [];$scope.audit = [];
	
	var categoriesFilter = {
		entity : {
			type : {
				code : 'PROD'
			}
		}
	}
	categoryResource.filter(categoriesFilter, function(categories){
		$scope.categories = categories;
	}, function(error){
		console.log(error);
	});
	
	$scope.findByFilter = function() {
		
		$scope.filter.entity.code = 'GRAPH_0001';
		var graph_0001 = {
			entity : $scope.filter.entity,
			logged : false,			
		}
		
		analyzeResource.filter(graph_0001, function(data) {
			$scope.isShow = false;
			$scope.data = data;
			var graphData = {
				data : $scope.data,
				period : {
					start : $scope.filter.entity.period.start,
					end : $scope.filter.entity.period.end
				}
			}
			$scope.isShow = true;
			$scope.drawGraph_0001(graphData);					
		}, function(error) {
			$scope.isShow = false;					
			$scope.responseMessage = error.data;
			console.log(error);
		});
	};

	$scope.drawGraph_0001 = function (graphData) {


		console.log(JSON.stringify(graphData));
        var dados = new google.visualization.DataTable();

        dados.addColumn('string', 'Categorias');
        dados.addColumn('number', '% Masc.');
        dados.addColumn('number', '% Femi.');
        dados.addColumn('number', '% Outro');
        dados.addColumn('number', 'Idade');
        
        
        dados.addRows(graphData.data.length);

        for(var i = 0; i < graphData.data.length; i++){

			var element = graphData.data[i];
			dados.setValue(i, 0, element.category);
        	dados.setValue(i, 1, element.percentMale);
        	dados.setValue(i, 2, element.percentFemale);
        	dados.setValue(i, 3, element.percentOther);
        	dados.setValue(i, 4, element.averageAge);			        	
        }
        
        var options = {        		
        	chart: {
          		title: 'Percentual de Vendas',
          		legend: { position: 'bottom' },
          		curveType: 'function',          		
          		subtitle: 'Categoria x Gênero x Idade - Periodo De: ' 
          			+ graphData.period.start.toLocaleDateString() 
          			+ ' até: ' 
          			+ graphData.period.end.toLocaleDateString()
        	},          	        	
        	height: 400
      	};

      var chart = new google.charts.Line(document.getElementById('percert_sale_category_gender_age'));
      chart.draw(dados, google.charts.Line.convertOptions(options));  
	};

	$scope.findByFilter();

});	