angular.module('ecommerce').controller('BookController', function($scope, $routeParams, $location, bookResource, categoryResource, authorResource, publisherResource, priceGroupResource, stockResource, reasonResource, $http){
	
	$scope.Date = new Date();
	$scope.responseMessage = {
		message : '',
		hasError : true		
	};
	$scope.categories = [];
	$scope.priceGroups = [];
	$scope.authors = [];
	$scope.publishers = [];
	$scope.reasons = [];
	$scope.filter = {
		entity : {
			code : ''
		}
	}
	$scope.stock = {
		product : {
			id : 0
		},
		records: [{
				fabricationDate: $scope.Date,
				expiryDate: $scope.Date,				
			}
		]
	};
	
	$scope.product = {
		salePrice : {
			value : 0
		},
		authors : [],
		categories : [],
		publishers : []
	}
	
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

	authorResource.query(function(authors){
		$scope.authors = authors;
	}, function(error){
		console.log(error);
	});

	publisherResource.query(function(publishers){
		$scope.publishers = publishers;
	}, function(error){
		console.log(error);
	});

	priceGroupResource.query(function(priceGroups){
		$scope.priceGroups = priceGroups;
	}, function(error){
		console.log(error);
	});

	if($routeParams.productId) {
		bookResource.get({id: $routeParams.productId}, function(product) {
			
			$scope.product = product; 
			var reqFilter = {
				"entity" : 	{
					"code" : product.code
				}
			}

			reasonResource.filter(reqFilter, function(reasons) {
				$scope.filter.entity = {};					
				$scope.reasons = reasons
			}, function(error) {					
				$scope.responseMessage = error.data;
				console.log(error);
			});
			
		}, function(error) {
			$scope.responseMessage = error.data;
			console.log(error);
		});
	}

	$scope.submit = function(){
		
		console.log(JSON.stringify($scope.product));
		console.log(JSON.stringify($scope.stock));
		
		if ($scope.editForm.$valid) {

			if($scope.product.id){

				bookResource.update($scope.product, function(status) {
					$scope.product = {};
					$scope.message = status.message;				
					$location.path('/products');
				}, function(erro) {					
					$scope.responseMessage = erro.data;
					console.log(erro);
				});

			} else {

				$scope.product.salePrice.value = $scope.stock.records[0].purchasePrice.value;
				bookResource.save($scope.product, function(data) {
					$scope.stock.product.id = data.id;
					stockResource.save($scope.stock, function(status) {
						$scope.stock = {};										
					}, function(erro) {					
						$scope.responseMessage = erro.data;
						console.log(erro);
					});
					$scope.product = {};
					$location.path('/products');
				}, function(erro) {					
					$scope.responseMessage = erro.data;
					console.log(erro);
				});
			}
		}
	};
});