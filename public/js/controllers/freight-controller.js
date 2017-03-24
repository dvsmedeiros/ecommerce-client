angular.module('ecommerce').controller('FreightController', function($scope, $routeParams, freightResource){
	
	$scope.message = ''
	$scope.freights = []
	$scope.freight = {}

	$scope.calculateFreight = function() {		
		

		if($scope.product.id && $scope.freight.postalCodeSource){
			freightResource.query(
				{
					productId: $scope.product.id, 
					postalCode: $scope.freight.postalCodeSource
				}, function(freights) {
				$scope.freights = freights;			
			}, function(erro) {
				console.log(erro);
			});
		}

		if(! $scope.product.id && $scope.freight.postalCodeSource){
			freightResource.query(
				{ 
					postalCode: $scope.freight.postalCodeSource
				}, function(freights) {
				$scope.freights = freights;			
			}, function(erro) {
				console.log(erro);
			});
		}		
	};

});