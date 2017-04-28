angular.module('ecommerce').controller('ProductController', function($scope, $routeParams, $location, productResource, freightResource, cartResource){
	
	$scope.message = ''
	$scope.categories = []
	$scope.stock = {}
	$scope.product = {
		packing: {},
		price: {},
		category: {}
	}
	$scope.width = {}
	$scope.height = {}
	$scope.weight = {}
	$scope.length = {}
	$scope.diameter = {}

	//if present :productId on route, load the product by productId
	if($routeParams.productId) {
		productResource.get({productId: $routeParams.productId}, function(product) {
		$scope.product = product; 
		}, function(erro) {
			console.log(erro);
		});
	}

	$scope.$watch('product.packing.type', function () {

        if ($scope.product.packing && $scope.product.packing.type) {
            
            var type = $scope.product.packing.type;
            if(type === 'ENVELOPE'){

            	$scope.width = {min : 0, max : 60}
				$scope.height = {min : 0, max : 0}
				$scope.weight = {min : 0, max : 1}
				$scope.length = {min : 0, max : 60}
				$scope.diameter = {min : 0, max : 0}

            } else if (type === 'BOX') {

            	$scope.width = {min : 0, max : 105}
				$scope.height = {min : 0, max : 105}
				$scope.weight = {min : 0, max : 30}
				$scope.length = {min : 0, max : 105}
				$scope.diameter = {min : 0, max : 0}

            } else if (type === 'ROLL') {
            	
            	$scope.width = {min : 0, max : 0}
				$scope.height = {min : 0, max : 0}
				$scope.weight = {min : 0, max : 30}
				$scope.length = {min : 0, max : 60}
				$scope.diameter = {min : 0, max : 91}

            }
        }
    }, true);


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
					console.log(JSON.stringify($scope.product));
					$scope.product = {};
					$scope.message = status.message;
					//$route.reload();
				}, function(erro) {
					console.log(erro);
				});
			}
		}	
	};
	
	$scope.addItemToCart = function (productId) {
		cartResource.save({productId: productId}, function(status) {
			$location.path('/cart');
			$scope.message = status.message;
		}, function(erro) {
			console.log(erro);
		});
	}
});