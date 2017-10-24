angular.module('ecommerce').controller('ConfigurationsController', function($scope, $route, configurationResource){
	
	$scope.configuration = {
		id : 0
	};
	$scope.message = '';
	$scope.configurations = [];

	configurationResource.query(function(configurations){
		$scope.configurations = configurations;
	}, function(error){
		console.log(error);
	});
	
	$scope.delete = function(configuration) {
		
		configurationResource.delete({id: configuration.id}, function() {
			var indexconfiguration = $scope.categories.indexOf(configuration);
			$scope.categories.splice(indexconfiguration, 1);
		}, function(erro) {
			console.log(erro);
		});
		
	};

	$scope.inactivate = function(configuration) {
		
		if(configuration.id){

			configurationResource.inactivate({id: configuration.id}, function(status) {
				configuration.active = false;
			}, function(erro) {
				console.log(erro);
			});

		}		
	};

	$scope.activate = function(configuration) {
		
		if(configuration.id){

			configuration.active = true;
			configurationResource.update(configuration, function(status) {
				
			}, function(error) {
				$scope.responseMessage = error.data;
				console.log(error);
			});
		}	
	};
	
	$scope.findByFilter = function() {
		var req = {
			entity : $scope.filter.entity
		}

		configurationResource.filter(req, function(configurations) {
			$scope.filter.entity = {};					
			$scope.configurations = configurations
		}, function(error) {					
			$scope.responseMessage = error.data;
			console.log(error);
		});
	};

});