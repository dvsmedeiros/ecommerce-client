angular.module('ecommerce').controller('AllOrdersController', function($scope, orderResource, statusOrderResource){

	$scope.responseMessage = {
		message : '',
		hasError : true		
	};
	$scope.orders = [];
	$scope.statusOrder = [];


	var req = {
		"entity" : {}
	}
	orderResource.filter(req, function(orders){
		$scope.orders = orders;
	}, function(error){
		console.log(error);
	});
	
	statusOrderResource.query(function(statusOrder){
		$scope.statusOrder = statusOrder;
	}, function(error){
		console.log(error);
	});
	
	$scope.findByFilter = function() {
		var req = {
			entity : $scope.filter.entity,
			logged : false
		}

		orderResource.filter(req, function(orders) {
			$scope.filter.entity = {};					
			$scope.orders = orders
		}, function(error) {					
			$scope.responseMessage = error.data;
			console.log(error);
		});
	};

	$scope.changeStatusOrder = function(order){

		console.log(JSON.stringify(order));
		orderResource.changeStatus(order, function(order) {
			for(var i = 0; i < $scope.orders.length; i++){
				if(order.id === $scope.orders[i].id){
					$scope.orders[i] = order;
				}
			}
			$scope.responseMessage = {
				message : 'Status do pedido: ' + order.code + ' foi atualizado para ' + order.statusOrder.description,
				hasError: false					
			}							
		}, function(error) {					
			$scope.responseMessage = error.data;
			console.log(error);
		});	
	};

});	