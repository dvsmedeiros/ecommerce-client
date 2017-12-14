angular.module('ecommerce').controller('ExchangeController', function($scope, cupomResource){

	$scope.cupons = [];

	var req = {
		"entity" : {
			"active" : true
		},
		logged : true
	}
	cupomResource.filter(req, function(cupons){
		$scope.cupons = cupons;
	}, function(error){
		console.log(error);
	});

});	