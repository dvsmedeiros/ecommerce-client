angular.module('ecommerce').controller('CheckoutController', function($scope){
	
	$scope.message = '';
	$scope.cart = {
		cartItems : []
	};
	$scope.freights = [];
	$scope.quantity = 0;
	$scope.product = {};

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
});