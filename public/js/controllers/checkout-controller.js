angular.module('ecommerce').controller('CheckoutController', function($scope, cartResource){
	
	$scope.message = '';
	$scope.purchaseOrder = {
		subTotal : 0,
		total : 0,
		items : [],
		payment : {
			card : {}, 
			paymentType : 0,
			purchaseValue : 0,
			quota : {
				aNumber : null,
				quotaValue : null
			}
		}
	};

	$scope.$watch('purchaseOrder.payment.paymentType', function () {
		
		$scope.purchaseOrder.payment.purchaseValue = $scope.purchaseOrder.total;


		if($scope.purchaseOrder.payment.paymentType == 0){
			$scope.purchaseOrder.payment.card = {};	
		}

    }, true);

	$scope.$watch('purchaseOrder.payment.quota.aNumber', function () {
		
		$scope.purchaseOrder.payment.quota.quotaValue = $scope.purchaseOrder.total / $scope.purchaseOrder.payment.quota.aNumber;

    }, true);

	$scope.get = function(){

		cartResource.get(function(cart){
			var items = cart.cartItems;
			var orderItems = [];

			for(var i in items){
				var item = {
					quantity: items[i].quantity,
					product: {
						id : items[i].product.id,
						name: items[i].product.name,
						price: {
							value : items[i].product.price.value
						}
					},	
					salePrice: items[i].product.price.value
				}
				orderItems.push(item);
			}

			$scope.purchaseOrder.items = orderItems;
			$scope.purchaseOrder.subTotal = cart.subTotal;
			$scope.purchaseOrder.total = cart.total;

		}, function(erro){
			console.log(erro);
		});	
	};

	$scope.purchaseOrder.items = $scope.get();

	$scope.submit = function(){
		console.log(JSON.stringify($scope.purchaseOrder));
	}


});