angular.module('ecommerce').controller('CartController', function($scope, $route, $routeParams, $location, $window, cartResource, freightResource){
	
	$scope.message = '';
	$scope.cart = {
		cartItems : [],
		subTotal : 0
	};
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

	var attTotal = function(){
		var newValue = parseFloat($scope.freightSelected.value) + parseFloat($scope.cart.subTotal);
		$scope.cart.total = newValue;
	};

	$scope.$watch('freightSelected.value', function () {
		attTotal();
    }, true);

	$scope.$watch('cart.subTotal', function () {
		$scope.freightSelected = {
			value : 0
		};
    }, true);

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