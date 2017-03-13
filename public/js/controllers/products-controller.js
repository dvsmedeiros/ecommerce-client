angular.module('ecommerce').controller('ProductsController', function($scope, $route, productResource){
	
	$scope.message = '';
	$scope.products = [];
	$scope.activeProducts = [];


	//load all products
	productResource.query({active: false},function(products){
		$scope.products = products;
	}, function(error){
		console.log(error);
	});
	
	//load all products
	productResource.query({active: true},function(products){
		$scope.activeProducts = products;
	}, function(error){
		console.log(error);
	});

	$scope.delete = function(product) {
		
		productResource.delete({productId: product.id}, function() {
			var indexProduct = $scope.products.indexOf(product);
			$scope.products.splice(indexProduct, 1);
		}, function(erro) {
			console.log(erro);
		});
		
	};

	$scope.inactivate = function(product) {
		
		if(product.id){

			productResource.inactivate({productId: product.id}, function(status) {
				$scope.product = {};
				$scope.message = status.message;
				$route.reload();
			}, function(erro) {
				console.log(erro);
			});
		}	
	};

});