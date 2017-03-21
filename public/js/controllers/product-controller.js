angular.module('ecommerce').controller('ProductController', function($scope, $routeParams, productResource, freightResource){
	
	$scope.message = ''
	$scope.categories = []
	$scope.stock = {}
	$scope.freights = []
	$scope.product = {
		packing: {},
		price: {},
		category: {}
	}


	//if present :productId on route, load the product by productId
	if($routeParams.productId) {
		productResource.get({productId: $routeParams.productId}, function(product) {
		$scope.product = product; 
		}, function(erro) {
			console.log(erro);
		});
	}

	$scope.calculateFreight = function() {		
		freightResource.query({productId: $scope.product.id}, function(freights) {
			$scope.freights = freights;			
		}, function(erro) {
			console.log(erro);
		});
	};

	$scope.submit = function(){
		
		if ($scope.editForm.$valid) {

			if($scope.product.id){

				productResource.update($scope.product, function(status) {
					$scope.product = {};
					$scope.message = status.message;
					//$route.reload();
				}, function(erro) {
					console.log(erro);
				});

			} else {

				productResource.save($scope.product, function(status) {
					$scope.product = {};
					$scope.message = status.message;
					//$route.reload();
				}, function(erro) {
					console.log(erro);
				});
			}
		}	
	};
	
});