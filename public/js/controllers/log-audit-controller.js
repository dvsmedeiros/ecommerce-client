angular.module('ecommerce').controller('LogAuditController', function($scope, categoryResource, auditResource){

	$scope.responseMessage = {
		message : '',
		hasError : true		
	};
	$scope.trails = [];
	
	auditResource.query(function(trails) {				
		$scope.trails = trails;
	}, function(error) {					
		$scope.responseMessage = error.data;
		console.log(error);
	});;

});	