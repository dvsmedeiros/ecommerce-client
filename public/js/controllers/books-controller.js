angular.module('ecommerce').controller('BooksController', function($rootScope, $scope, $route, bookResource, categoryResource, authorResource, publisherResource, priceGroupResource ){
	
	$scope.responseMessage = {
		message : '',
		hasError : true		
	};
	$scope.products = [];
	$scope.categories = [];
	$scope.priceGroups = [];
	$scope.authors = [];
	$scope.publishers = [];
	$scope.filter = {
		entity : {
			code : ''
		}
	};
	
	var req = {
		"entity" : {
			"type" : {
				"code" : "PROD"
			}
		}
	}
	
	bookResource.query(function(products){
		$scope.products = products;
	}, function(error){
		$scope.responseMessage = error.data;
		console.log(error);
	});
	
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
	
	$scope.delete = function(product) {
		
		bookResource.delete({id: product.id}, function() {
			var indexProduct = $scope.products.indexOf(product);
			$scope.products.splice(indexProduct, 1);
		}, function(error) {
			$scope.responseMessage = error.data;
			console.log(error);			
		});
		
	};

	$scope.inactivate = function(product) {
		
		if(product.id){

			var req = {
				description : 'Inativado manualmente',
				category : {
					code : 'CAT0007'
				}
			}

			bookResource.inactivate({id: product.id}, req, function(status) {
				product.active = false;								
			}, function(error) {
				$scope.responseMessage = error.data;
				console.log(error);
			});
		}	
	};

	$scope.activate = function(product) {
		
		if(product.id){

			var req = {
				description : 'Ativado manualmente',
				category : {
					code : 'CAT0007'
				}
			}

			bookResource.activate({id: product.id}, req, function(status) {
				product.active = true;
			}, function(error) {
				$scope.responseMessage = error.data;
				console.log(error);
			});
		}	
	};

	$scope.findByFilter = function() {
		var req = {
			entity : $scope.filter.entity
		}

		bookResource.filter(req, function(products) {
			$scope.filter.entity = {};					
			$scope.products = products
		}, function(error) {					
			$scope.responseMessage = error.data;
			console.log(error);
		});
	};

});