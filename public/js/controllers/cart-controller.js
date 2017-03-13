angular.module('ecommerce').controller('CartController', function($scope, $route, $routeParams, $window, cartResource){
	
	$scope.message = '';
	$scope.cart = {};
	$scope.quantity = 0;

	cartResource.get(function(cart){
		$scope.cart = cart;
	}, function(erro){
		console.log(erro);
	});

	if($routeParams.productId) {
		cartResource.save({productId: $routeParams.productId}, function(status) {
		$window.location='/#/cart';
		$scope.message = status.message;
		}, function(erro) {
			console.log(erro);
		});
	}

	$scope.delete = function(cartItem) {		
		cartResource.update({productId: cartItem.product.id}, function() {
			var indexItem = $scope.cart.cartItems.indexOf(cartItem);
			$scope.cart.cartItems.splice(indexItem, 1);
		}, function(erro) {
			console.log(erro);
		});
	};	
	

});