angular.module('ecommerce').controller('CategoriesController', function($scope, $route, categoryResource, categoryTypeResource){
	
	$scope.category = {};
	$scope.message = '';
	$scope.categories = [];
	$scope.types = []

	categoryTypeResource.query(function(types){
		$scope.types = types;
	}, function(error){
		console.log(error);
	});

	categoryResource.query(function(categories){
		$scope.categories = categories;
	}, function(error){
		console.log(error);
	});
	
	$scope.delete = function(category) {
		
		categoryResource.delete({id: category.id}, function() {
			var indexCategory = $scope.categories.indexOf(category);
			$scope.categories.splice(indexCategory, 1);
		}, function(erro) {
			console.log(erro);
		});
		
	};

	$scope.inactivate = function(category) {
		
		if(category.id){

			categoryResource.inactivate({id: category.id}, function(status) {
				category.active = false;
			}, function(erro) {
				console.log(erro);
			});

		}		
	};

	$scope.activate = function(category) {
		
		if(category.id){

			category.active = true;
			categoryResource.update(category, function(status) {
				
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

		categoryResource.filter(req, function(categories) {
			$scope.filter.entity = {};					
			$scope.categories = categories
		}, function(error) {					
			$scope.responseMessage = error.data;
			console.log(error);
		});
	};

});