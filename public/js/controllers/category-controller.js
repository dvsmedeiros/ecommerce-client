angular.module('ecommerce').controller('CategoryController', function($scope, $route, $routeParams, categoryResource){
	
	$scope.category = {};
	$scope.categories = [];
	$scope.message = '';
	
	//if present :categoryId on route, load the category by categoryId
	if($routeParams.categoryId) {
		categoryResource.get({categoryId: $routeParams.categoryId}, function(category) {
		$scope.category = category; 
		}, function(erro) {
			console.log(erro);
		});
	}

	$scope.submit = function(){
		if ($scope.editForm.$valid) {

			if($scope.category.id){

				categoryResource.update($scope.category, function(status) {
					$scope.category = {};
					$scope.message = status.message;
					//$route.reload();
				}, function(erro) {
					console.log(erro);
				});

			} else {

				categoryResource.save($scope.category, function(status) {
					$scope.category = {};
					$scope.message = status.message;
					//$route.reload();
				}, function(erro) {
					console.log(erro);
				});
			}
		}
	}
	
});