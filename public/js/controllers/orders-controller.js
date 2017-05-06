angular.module('ecommerce').controller('MyRequestsController', function($scope, orderResource){

	$scope.message = '';
	$scope.orders = [];

	orderResource.query( function(orders){
		$scope.orders = orders;
	}, function(error){
		console.log(error);
	});

});	