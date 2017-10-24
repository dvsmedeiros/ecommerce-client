angular.module('ecommerce').controller('MyRequestsController', function($scope, orderResource){

	$scope.message = '';
	$scope.orders = [];

	var req = {
		"entity" : {}
	}
	orderResource.filter(req, function(orders){
		$scope.orders = orders;
	}, function(error){
		console.log(error);
	});

});	