angular.module('ecommerce').controller('CheckoutController', function($scope, $location, cartResource, orderResource, freightResource, addressResource, cardResource, flagResource, cupomResource){
	
	$scope.responseMessage = {
		message : '',
		hasError : true		
	};
	$scope.saveCard = false;
	$scope.billingAddress = {};	
	$scope.deliveryEqBilling = true;	
	$scope.delivery = [];
	$scope.deliveries = [];
	$scope.cards = [];
	$scope.flags = [];
	$scope.filter = {
		entity : {}
	}
	$scope.purchaseOrder = {
		subTotal : 0,
		total : 0,
		items : [],
		freight: {},
		deliveryAddress : {},
		cupons: [],
		payment : {
			paymentType : 0
		}

	};

	flagResource.query(function(flags){
      $scope.flags = flags;
    }, function(error){
      console.log(error);
    });

	cardResource.query(function(cards){	
		$scope.cards = cards;		
	}, function(error){
		console.log(error);
	});

	addressResource.delivery(function(deliveries){
		$scope.deliveries = deliveries;
		$scope.purchaseOrder.deliveryAddress = deliveries[0];		
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
		$scope.purchaseOrder.payment.card = $scope.cards[0];

    }, true);
	

	$scope.$watch('purchaseOrder.payment.quota.aNumber', function () {
		
		$scope.purchaseOrder.payment.quota.quotaValue = $scope.purchaseOrder.total / $scope.purchaseOrder.payment.quota.aNumber;

    }, true);

	var attTotal = function(){
		
		var sum = 0;
		for(var i = 0; i < $scope.purchaseOrder.cupons.length; i++){
			sum += $scope.purchaseOrder.cupons[i].value;
		}

		var newValue = parseFloat($scope.purchaseOrder.freight.value) 
		+ parseFloat($scope.purchaseOrder.subTotal)
		- parseFloat(sum)
		;
		$scope.purchaseOrder.total = newValue;
		if(newValue < 0) $scope.purchaseOrder.total = 0;
	};

	$scope.$watch('purchaseOrder.freight.value', function () {
		attTotal();
    }, true);

	$scope.$watchCollection('purchaseOrder.cupons', function () {
		attTotal();
    }, true);

	$scope.$watch('purchaseOrder.subTotal', function () {
		$scope.purchaseOrder.freight = {
			value : 0
		};
    }, true);

	$scope.submit = function(){
		
		if ($scope.editForm.$valid || $scope.purchaseOrder.payment.paymentType == 0) {

			if($scope.deliveryEqBilling) {
				$scope.purchaseOrder.deliveryAddress = $scope.billingAddress;
			}
			orderResource.checkout($scope.purchaseOrder, function(status) {
				$scope.purchaseOrder = clearOrder();
				$scope.message = status.message;
				$location.path('/home/orders');
				attTotal();
			}, function(erro) {
				$scope.responseMessage = erro.data;
				console.log(erro);
			});

			if($scope.saveCard && !$scope.purchaseOrder.payment.card.id){
				cardResource.save($scope.purchaseOrder.payment.card, function(card) {
		        }, function(erro) {		            
		            console.log(erro);
		        });
			}
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

			$scope.purchaseOrder.cupons = cart.cupons;
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