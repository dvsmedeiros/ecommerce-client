angular.module('ecommerce').controller('AccountController', function($scope, $routeParams, accountResource){
	
	$scope.user = {};
	$scope.message = '';

	if($routeParams.userId) {
		accountResource.get({userId: $routeParams.userId}, function(user) {
		$scope.user = user; 
		}, function(erro) {
			console.log(erro);
		});
	}

});