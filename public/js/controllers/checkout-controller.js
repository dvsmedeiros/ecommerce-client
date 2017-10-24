angular.module('ecommerce').controller('CheckoutController', function($scope, cartResource, orderResource, freightResource, addressResource){
	
	$scope.message = '';
	$scope.billingAddress = {};	
	$scope.deliveryEqBilling = true;
	$scope.delivery = [];
	$scope.deliveries = [];
	$scope.purchaseOrder = {
		subTotal : 0,
		total : 0,
		items : [],
		freight: {},
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

	addressResource.delivery(function(deliveries){
		$scope.deliveries = deliveries;
		$scope.delivery = deliveries[0];
	}, function(error){
		console.log(error);
	});

	addressResource.billing(function(billingAddress){
		$scope.billingAddress = billingAddress;
	}, function(error){
		console.log(error);
	});

	$scope.$watch('deliveryEqBilling', function () {	
		$scope.deliveryEqBilling = !deliveryEqBilling;
    }, true);

	$scope.$watch('purchaseOrder.payment.paymentType', function () {
		
		$scope.purchaseOrder.payment.purchaseValue = $scope.purchaseOrder.total;
		$scope.purchaseOrder.payment.quota = {};
		$scope.purchaseOrder.payment.card = null;

    }, true);

	$scope.$watch('purchaseOrder.payment.quota.aNumber', function () {
		
		$scope.purchaseOrder.payment.quota.quotaValue = $scope.purchaseOrder.total / $scope.purchaseOrder.payment.quota.aNumber;

    }, true);

	var attTotal = function(){
		var newValue = parseFloat($scope.purchaseOrder.freight.value) + parseFloat($scope.purchaseOrder.subTotal);
		$scope.purchaseOrder.total = newValue;
	};

	$scope.$watch('purchaseOrder.freight.value', function () {
		attTotal();
    }, true);

	$scope.$watch('purchaseOrder.subTotal', function () {
		$scope.purchaseOrder.freight = {
			value : 0
		};
    }, true);

	$scope.submit = function(){
		console.log(JSON.stringify($scope.purchaseOrder));

		if ($scope.editForm.$valid || $scope.purchaseOrder.payment.paymentType == 0) {

			orderResource.checkout($scope.purchaseOrder, function(status) {
				$scope.purchaseOrder = clearOrder();
				$scope.message = status.message;
				//$route.reload();
			}, function(erro) {
				console.log(erro);
			});
		}
	}

	/*
	freightResource.query(
		{ 
			postalCode: '08696100'
		}, function(freights) {
			$scope.freights = freights;			
		}, function(erro) {
			console.log(erro);
	});
	*/
	$scope.get = function(){

		cartResource.get(function(cart){
			var items = cart.cartItems;
			var orderItems = [];

			for(var i in items){
				var item = {
					quantity: items[i].quantity,
					product: {
						id : items[i].product.id,
						name: items[i].product.title,
						salePrice: {
							value : items[i].product.salePrice.value
						},
						calculatedSalePrice: {
							value : items[i].product.calculatedSalePrice.value
						}
					},	
					salePrice: items[i].product.salePrice.value
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

	var clearOrder = function(){

		$scope.purchaseOrder = {

			subTotal : 0,
			total : 0,
			items : [],
			freight:{},
			payment : {
				card : {}, 
				paymentType : 0,
				purchaseValue : 0,
				quota : {
					aNumber : null,
					quotaValue : null
				}
			}
		}
	};

});