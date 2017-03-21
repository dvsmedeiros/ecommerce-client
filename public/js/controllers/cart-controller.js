angular.module('ecommerce').controller('CartController', function($scope, $route, $routeParams, $window, cartResource, freightResource){
	
	$scope.message = '';
	$scope.cart = {};
	$scope.freights = [];
	$scope.quantity = 0;

	$scope.get = function(){
		cartResource.get(function(cart){
			$scope.cart = cart;
		}, function(erro){
			console.log(erro);
		});	
	};
	
	$scope.cart = $scope.get();	

	$scope.reload = function(){
		$scope.cart = $scope.get();
	};

	if($routeParams.productId) {
		cartResource.save({productId: $routeParams.productId}, function(status) {
			$window.location='/#/cart';
			$scope.message = status.message;
		}, function(erro) {
			console.log(erro);
		});
	}

	$scope.delete = function(cartItem) {		
		cartResource.update({productId: cartItem.product.id}, function(status) {
			$scope.message = status.message;
			$scope.reload();
		}, function(erro) {
			console.log(erro);
		});
	};	
	
	$scope.deleteAll = function(cartItem) {		
		cartResource.delete({productId: cartItem.product.id}, function(status) {
			$scope.message = status.message;
			$scope.reload();
		}, function(erro) {
			console.log(erro);
		});
	};


	$scope.calculateFreight = function() {		
		freightResource.query(function(freights) {
			$scope.freights = freights;			
		}, function(erro) {
			console.log(erro);
		});
	};

});