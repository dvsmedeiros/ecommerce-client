angular.module('ecommerce').controller('PasswordController', function($scope, $routeParams, clientResource){
	
	$scope.change = {};	
	$scope.responseMessage = {
		message : '',
		hasError : true		
	};

	$scope.submit = function(){
		if ($scope.editForm.$valid) {
			clientResource.changePassword($scope.change, function() {
				$scope.responseMessage = {
					message : 'Atualizado com sucesso!',
					hasError: false					
				}
			}, function(erro) {
				$scope.change = {};
				$scope.responseMessage = erro.data;
				console.log(erro);
			});
		}
	}
	
});