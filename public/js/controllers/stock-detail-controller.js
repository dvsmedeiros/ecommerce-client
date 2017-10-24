angular.module('ecommerce').controller('StockDetailController', function($scope, $routeParams, $location, recordTypeResource, stockResource, stockRecordResource){
	
	$scope.responseMessage = {
		message: '',
		hasError: true
	};
	$scope.stock = {
		product : {
			salePrice : {
				value : 0
			}
		}
	};
	$scope.Date = new Date();
	$scope.sum = 0.0;
	$scope.record = {
		stock : {
			id : undefined 
		},
		salePrice: {
			value :  0.0
		},
		purchasePrice: {
			value :  0.0
		},
		recordType : {
			id : 0,		
		},
		volume : 1,		
		fabricationDate: $scope.Date,
		expiryDate: $scope.Date
	};

	recordTypeResource.query(function(types){
		$scope.types = types;
		$scope.record.recordType.id = $scope.types[0].id;
		console.log(JSON.stringify($scope.types));
	}, function(error){
		console.log(error);
	});


	$scope.$watch('record.recordType', function () {
		
		if($scope.stock ){	

			var typeIn = $scope.types[0];
			
			if($scope.record.recordType.id == typeIn.id){				
				$scope.record.salePrice.value = 0.0;
			}
			else {				
				$scope.record.salePrice.value = $scope.stock.product.calculatedSalePrice.value;
			}
		}
    }, true);

	if($routeParams.productId){

		var req = {
			"entity" : {
				"product" : {
					"id" : $routeParams.productId
				}
			}
		}
		stockResource.filter(req, function(stock) {
			$scope.stock = stock[0]; 
			sumStock($scope.stock.records);			
		}, function(erro) {
			$scope.responseMessage = erro.data;
			console.log(erro);
		});
	}

	$scope.submit = function(){
		
		$scope.record.stock.id = $scope.stock.id;
		stockRecordResource.save($scope.record, function(data) {
			
			$scope.stock.records.push(data);
			sumStock($scope.stock.records);
			clearRecord();

		}, function(erro) {					
			$scope.responseMessage = erro.data;
			console.log(erro);
		});

	}

	function sumStock(records){
		$scope.sum = 0.0;
		records.forEach(function(current){
			if(current.recordType.code == 'IN'){					
				$scope.sum += current.volume;
			} else if (current.recordType.code == 'OUT'){
				$scope.sum -= current.volume;
			}
		});
	};

	function clearRecord(){
		$scope.record = {
			stock : {
				id : 0 
			},
			recordType: {
				id : $scope.types[0].id
			},
			salePrice: {
				value :  0.0
			},
			purchasePrice: {
				value :  0.0
			},
			volume : 1,		
			fabricationDate: $scope.Date,
			expiryDate: $scope.Date
		};
	};

});