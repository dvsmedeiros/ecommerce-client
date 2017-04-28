angular.module('ecommerce').controller('CartController', function($scope, $route, $routeParams, $location, $window, cartResource, freightResource){
	
	$scope.message = '';
	$scope.cart = {
		cartItems : []
	};
	$scope.freights = [];
	$scope.quantity = 0;
	$scope.product = {};
	$scope.freightSelected = {
		value : 0
	};

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

	/*
	if($routeParams.productId) {
		cartResource.save({productId: $routeParams.productId}, function(status) {
			$location.path('/#/cart');
			$scope.message = status.message;
		}, function(erro) {
			console.log(erro);
		});
	}
	*/

	$scope.addItemToCart = function (id) {
		cartResource.save({productId: id}, function(status) {
			$scope.reload();
			$scope.message = status.message;
		}, function(erro) {
			console.log(erro);
		});
	}

	$scope.removeItemCart = function(cartItem) {		
		cartResource.update({productId: cartItem.product.id}, function(status) {
			$scope.message = status.message;
			$scope.reload();
		}, function(erro) {
			console.log(erro);
		});
	};	
	
	$scope.removeAllItemsCart = function(cartItem) {		
		cartResource.delete({productId: cartItem.product.id}, function(status) {
			$scope.message = status.message;
			$scope.reload();
		}, function(erro) {
			console.log(erro);
		});
	};

});