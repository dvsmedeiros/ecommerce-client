angular.module('ecommerce').controller('OrderDetailController', function($scope, $routeParams, $location, orderResource){

    $scope.order = {};

    if($routeParams.orderId) {
        orderResource.get({orderId: $routeParams.orderId}, function(order) {
        $scope.order = order; 
        }, function(erro) {
            console.log(erro);
        });
    }

    $scope.changeStatusOrder = function(order){

    	$scope.order.statusOrder.code = 'EXCHANGE';
		orderResource.changeStatus(order, function(order) {
			$scope.order = order;
			$scope.order.items = order.items;
			$scope.responseMessage = {
				message : 'Emitido solicitação de troca para o pedido: ' + order.code,
				hasError: false					
			}			
		}, function(error) {					
			$scope.responseMessage = error.data;
			console.log(error);
		});	
	};

});