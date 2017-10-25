angular.module('ecommerce').controller('ProductDetailController', function($scope, $routeParams, $location, cartResource, bookResource){
	
	$scope.responseMessage = {
		message : '',
		hasError : true		
	};
	
	if($routeParams.productId) {
		bookResource.get({id: $routeParams.productId}, function(product) {
		$scope.product = product; 
		}, function(erro) {
			$scope.responseMessage = erro.data;
			console.log(erro);
		});
	}

	$scope.addItemToCart = function (productId) {
		cartResource.save({productId: productId}, function(status) {
			$location.path('/cart');
			$scope.message = status.message;
		}, function(error) {
			$scope.responseMessage = error.data;
			console.log(error);
		});
	}

});