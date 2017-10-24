angular.module('ecommerce').controller('StockController', function($scope, $routeParams, stockResource){
	
	$scope.responseMessage = {
		message: '',
		hasError: true
	};
	$scope.stock = {};

	stockResource.get({productId: $routeParams.productId}, function(stock) {
	$scope.stock = stock; 
	}, function(erro) {
		$scope.responseMessage = erro.data;
		console.log(erro);
	});
	

});