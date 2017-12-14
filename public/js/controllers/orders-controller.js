angular.module('ecommerce').controller('MyRequestsController', function($scope, $rootScope, orderResource, notificationResource){

	$scope.message = '';
	$scope.orders = [];

	var req = {
		"entity" : {},
		logged : true
	}
	orderResource.filter(req, function(orders){
		$scope.orders = orders;
	}, function(error){
		console.log(error);
	});

	let filter = {
		entity : {},
		logged : true
	}
	notificationResource.filter(filter, function(notifications){
		$rootScope.notifications = notifications;
	}, function(error){
		console.log(error);
	});

});	