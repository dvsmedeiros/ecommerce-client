angular.module('ecommerce').controller('CartController', function($scope, $rootScope, $route, $routeParams, $location, $window, cartResource, freightResource, cupomResource){
	
	$scope.responseMessage = {
		message : '',
		hasError : true		
	};
	$scope.cart = {
		cartItems : [],
		cupons : [],
		subTotal : 0
	};
	$scope.freightSelected = {
		value : 0
	};
	$scope.filter = {
		entity : {}
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
		var sum = 0;
		for(var i = 0; i < $scope.cart.cupons.length; i++){
			sum += $scope.cart.cupons[i].value;
		}
		var newValue = parseFloat($scope.freightSelected.value) + parseFloat($scope.cart.subTotal) - sum;
		$scope.cart.total = newValue;
		if(newValue < 0) $scope.cart.total = 0;
	};

	$scope.$watch('freightSelected.value', function () {
		attTotal();
    }, true);

	$scope.$watchCollection('cart.cupons', function () {
		attTotal();
    }, true);

	$scope.$watchCollection('cart.cartItems', function () {
		$scope.freightSelected = {
			value : 0
		};
		if($scope.cart.cartItems){
			var sum = 0;
			for(var i = 0; i < $scope.cart.cartItems.length; i++){
				sum += $scope.cart.cartItems[i].quantity;
			}
			$rootScope.cartSize = sum;
		}
    }, true);

	$scope.addItemToCart = function (id) {
		cartResource.save({productId: id}, function(cart) {
			$scope.cart = cart;
			$scope.responseMessage = {
				message : '',
				hasError : true
			}			
		}, function(erro) {
			$scope.responseMessage = erro.data;
			console.log(erro);
		});
	}

	$scope.removeItemCart = function(cartItem) {		
		cartResource.update({productId: cartItem.product.id}, function(cart) {
			$scope.cart = cart;
			$scope.responseMessage = {
				message : '',
				hasError : true
			}
		}, function(erro) {
			console.log(erro);
		});
	};	
	
	$scope.removeAllItemsCart = function(cartItem) {		
		cartResource.delete({productId: cartItem.product.id}, function(cart) {
			$scope.cart = cart;
			$rootScope.cartItems = 0;			
			$scope.responseMessage = {
				message : '',
				hasError : true
			}
		}, function(erro) {
			console.log(erro);
		});
	};

	$scope.addCupom = function(){

		if ($scope.filter.entity.code) {
			cupomResource.save({cupomCode: $scope.filter.entity.code}, function(cart) {
				$scope.cart = cart;
				$scope.responseMessage = {
					message : '',
					hasError : true
				}
			}, function(erro) {
				$scope.responseMessage = erro.data;
				console.log(erro);
			});
		}
	}

	$scope.removeCupom = function(cupom){
		
		if (cupom.code.length) {
			cupomResource.delete({cupomCode: cupom.code}, function(cart) {
				$scope.cart = cart;
				$scope.responseMessage = {
					message : '',
					hasError : true
				}
			}, function(erro) {
				$scope.responseMessage = erro.data;
				console.log(erro);
			});
		}
	}
});