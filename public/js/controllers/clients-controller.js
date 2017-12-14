angular.module('ecommerce').controller('ClientsController', function($scope, $location, $routeParams, clientResource){
	
	$scope.client = {};
	$scope.types = [];
	$scope.filter = {
		entity : {}
	}
	$scope.responseMessage = {
		message : '',
		hasError : true		
	};

	clientResource.logged(function(user) {
      $scope.user = user; 
    }, function(erro) {
      $scope.responseMessage = erro.data;
      console.log(erro);
    });

	clientResource.query(function(clients){
		$scope.clients = clients;
	}, function(error){
		console.log(error);
	});
	
	$scope.delete = function(client) {
		
		clientResource.delete({id: client.id}, function() {
			var indexCategory = $scope.clients.indexOf(client);
			$scope.clients.splice(indexCategory, 1);
		}, function(erro) {
			console.log(erro);
		});
		
	};

	$scope.inactivate = function(client) {
		
		var req = {
			description : 'Inativado manualmente',
			category : {
				code : 'CAT0017'
			}
		}

		if(client.user.id){

			clientResource.inactivate({id: client.user.id}, req, function(status) {
				client.user.active = false;
			}, function(erro) {
				console.log(erro);
			});

		}		
	};

	$scope.activate = function(client) {
	
		var req = {
			description : 'Ativado manualmente',
			category : {
				code : 'CAT0017'
			}
		}

		if(client.user.id){

			client.user.active = true;
			clientResource.activate({id: client.user.id}, function(status) {
				client.user.active = true;
			}, function(error) {
				$scope.responseMessage = error.data;
				console.log(error);
			});
		}	
	};

	$scope.findByFilter = function() {
		var req = {
			entity : $scope.filter.entity
		}
		clientResource.filter(req, function(clients) {
			$scope.filter.entity = {};					
			$scope.clients = clients
		}, function(error) {					
			$scope.responseMessage = error.data;
			console.log(error);
		});
	};
	
});