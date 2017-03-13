angular.module('ecommerce').controller('CategoriesController', function($scope, $route, categoryResource){
	
	$scope.category = {};
	$scope.message = '';
	$scope.categories = [];
	$scope.activeCategories = [];

	//load all categories
	categoryResource.query({active: true}, function(categories){
		$scope.activeCategories = categories;
	}, function(error){
		console.log(error);
	});

	//load all categories
	categoryResource.query({active: false}, function(categories){
		$scope.categories = categories;
	}, function(error){
		console.log(error);
	});
	
	$scope.delete = function(category) {
		
		categoryResource.delete({categoryId: category.id}, function() {
			var indexCategory = $scope.categories.indexOf(category);
			$scope.categories.splice(indexCategory, 1);
		}, function(erro) {
			console.log(erro);
		});
		
	};

	$scope.inactivate = function(category) {
		
		if(category.id){

			categoryResource.inactivate({categoryId: category.id}, function(status) {
				$scope.category = {};
				$scope.message = status.message;
				$route.reload();
			}, function(erro) {
				console.log(erro);
			});

		}		
	};

});