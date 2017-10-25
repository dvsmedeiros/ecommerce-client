angular.module('ecommerce').controller('ProductController', function($scope, $routeParams, $location, productResource, cartResource, categoryResource, supplierResource, recordTypeResource, bookResource){
	
	$scope.Date = new Date();
	$scope.isAlcoholic = false;
	$scope.responseMessage = {
		message : '',
		hasError : true		
	};
	$scope.categories = [];
	$scope.suppliers = [];
	$scope.recordTypes = [];
	
	$scope.stock = {
		records: [{
				fabricationDate: $scope.Date,
				expiryDate: $scope.Date,				
			}
		]
	};

	$scope.product = {
		alchoholContent : 0.0,
		igredients: []

	};

	var req = {
		"entity" : {
			"type" : {
				"code" : "PROD"
			}
		}
	}
	categoryResource.filter(req, function(categories){
		$scope.categories = categories;
	}, function(error){
		console.log(error);
	});

	supplierResource.query(function(suppliers){
		$scope.suppliers = suppliers;
	}, function(error){
		console.log(error);
	});

	recordTypeResource.query(function(recordTypes){
		$scope.recordTypes = recordTypes;
	}, function(error){
		console.log(error);
	});

	$scope.width = {};
	$scope.height = {};
	$scope.weight = {};
	$scope.length = {};
	$scope.diameter = {};


	if($routeParams.productId) {
		bookResource.get({id: $routeParams.productId}, function(product) {
		$scope.product = product; 
		}, function(erro) {
			$scope.responseMessage = erro.data;
			console.log(erro);
		});
	}

	$scope.$watch('product.packing.type', function () {
        if ($scope.product.packing && $scope.product.packing.type) {
            
            var type = $scope.product.packing.type;
            if(type === 'ENVELOPE'){            	
            	$scope.width = {min : 0, max : 60}
				$scope.height = {min : 0, max : 0}
				$scope.weight = {min : 0, max : 1}
				$scope.length = {min : 0, max : 60}
				$scope.diameter = {min : 0, max : 0}

            } else if (type === 'BOX') {            	
            	$scope.width = {min : 0, max : 105}
				$scope.height = {min : 0, max : 105}
				$scope.weight = {min : 0, max : 30}
				$scope.length = {min : 0, max : 105}
				$scope.diameter = {min : 0, max : 0}

            } else if (type === 'ROLL') {
            	$scope.width = {min : 0, max : 0}
				$scope.height = {min : 0, max : 0}
				$scope.weight = {min : 0, max : 30}
				$scope.length = {min : 0, max : 60}
				$scope.diameter = {min : 0, max : 91}

            }
        }
    }, true);


	$scope.submit = function(){
		
		console.log(JSON.stringify($scope.product));
		console.log(JSON.stringify($scope.stock));
		
		if ($scope.editForm.$valid) {

			if($scope.product.id){

				productResource.update($scope.product, function(status) {
					$scope.product = {};
					$scope.message = status.message;
					$location.path('/products');
				}, function(error) {					
					$scope.responseMessage = error.data;
					console.log(error);
				});

			} else {

				var req = {
					product : $scope.product,
					stock : $scope.stock
				}

				productResource.save(req, function(status) {
					$scope.product = {};					
					$location.path('/products');
				}, function(error) {					
					$scope.responseMessage = error.data;
					console.log(error);
				});
			}
		}
	};
	
});