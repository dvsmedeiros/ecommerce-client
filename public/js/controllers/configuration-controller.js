angular.module('ecommerce').controller('ConfigurationController', function($scope, $location, $routeParams, configurationResource){
	
	$scope.configuration = {};	
	$scope.responseMessage = {
		message : '',
		hasError : true		
	};
	
	if($routeParams.id) {
		configurationResource.get({id: $routeParams.id}, function(configuration) {
		$scope.configuration = configuration; 
		}, function(erro) {
			$scope.responseMessage = erro.data;
			console.log(erro);
		});
	}

	$scope.submit = function(){
		if ($scope.editForm.$valid) {
			
			if($scope.configuration.id){

				configurationResource.update($scope.configuration, function(status) {
					$scope.configuration = {};
					$scope.message = status.message;
					$location.path('/configuration');
				}, function(erro) {
					console.log(erro);
				});

			} else {

				configurationResource.save($scope.configuration, function(status) {
					$scope.configuration = {};
					$scope.message = status.message;
					$location.path('/configuration');
				}, function(erro) {
					$scope.responseMessage = erro.data;
					console.log(erro);
				});
			}
		}
	}
	
});