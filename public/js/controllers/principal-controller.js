angular.module('ecommerce').controller('PrincipalController', function($scope, bookResource, categoryResource, clientResource){

	$scope.activeProducts = [];
	$scope.activeCategories = [];

	var filterCategory = {
		entity : {
			type : {
				code : 'PROD'
			},
			active : true
		}
	}

	clientResource.logged(function(user) {
		$scope.user = user; 
	}, function(erro) {
		$scope.responseMessage = erro.data;
		console.log(erro);
	});	

	categoryResource.filter(filterCategory, function(categories){
		$scope.activeCategories = categories;
	}, function(error){
		console.log(error);
	});

	var filterProduct = {
		entity : {			
			active : true				
		}
	}
	bookResource.filter(filterProduct,function(products){
		$scope.activeProducts = products;
	}, function(error){
		console.log(error);
	});

	$scope.findProductsByCategory = function(id){

		var filter = {
			entity : {
				id : id,
				active : true				
			}
		}
		bookResource.query(filter, function(products){
			$scope.activeProducts = products;
		}, function(error){
			console.log(error);
		});
	}
	
});