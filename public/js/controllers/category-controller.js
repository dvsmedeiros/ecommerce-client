angular.module('ecommerce').controller('CategoryController', function($scope, $location, $routeParams, categoryResource, categoryTypeResource){
	
	$scope.category = {};
	$scope.types = [];
	$scope.responseMessage = {
		message : '',
		hasError : true		
	};

	categoryTypeResource.query(function(types){
		$scope.types = types;
	}, function(error){
		console.log(error);
	});

	if($routeParams.id) {
		categoryResource.get({id: $routeParams.id}, function(category) {
		$scope.category = category; 
		}, function(erro) {
			$scope.responseMessage = erro.data;
			console.log(erro);
		});
	}

	$scope.submit = function(){
		if ($scope.editForm.$valid) {

			if($scope.category.id){

				categoryResource.update($scope.category, function(status) {
					$scope.category = {};
					$scope.message = status.message;
					$location.path('/category');
				}, function(erro) {
					console.log(erro);
				});

			} else {

				categoryResource.save($scope.category, function(status) {
					$scope.category = {};
					$scope.message = status.message;
					$location.path('/category');
				}, function(erro) {
					$scope.responseMessage = erro.data;
					console.log(erro);
				});
			}
		}
	}
	
});