angular.module('ecommerce').controller('AccountController', function($scope, $routeParams, clientResource){
	
	$scope.user = {};	
	$scope.responseMessage = {
		message : '',
		hasError : true		
	};

	clientResource.logged(function(user) {
		var date = new Date(user.bornDate);
		user.bornDate = date;
		$scope.user = user; 
	}, function(erro) {
		$scope.responseMessage = erro.data;
		console.log(erro);
	});

	$scope.submit = function(){
		if ($scope.editForm.$valid) {

			if($scope.user.id){
				clientResource.update($scope.user, function(user) {
					var date = new Date(user.bornDate);
					user.bornDate = date;
					$scope.user = user;
					$scope.responseMessage = {
						message : 'Atualizado com sucesso!',
						hasError: false					
					}						
				}, function(erro) {
					$scope.responseMessage = erro.data;
					console.log(erro);
				});
			} 
		}
	}
	
});