angular.module('ecommerce').controller('PrincipalController', function($scope, productResource, categoryResource){

	$scope.activeProducts = [];
	$scope.activeCategories = [];

	categoryResource.query({active: true}, function(categories){
		$scope.activeCategories = categories;
	}, function(error){
		console.log(error);
	});

	productResource.query({active: true},function(products){
		$scope.activeProducts = products;
	}, function(error){
		console.log(error);
	});

	$scope.findProductsByCategory = function(categoryId){
		productResource.query({active: true, categoryId: categoryId}, function(products){
			$scope.activeProducts = products;
		}, function(error){
			console.log(error);
		});
	}
	
});