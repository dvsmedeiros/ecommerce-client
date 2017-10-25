angular.module('ecommerce').controller('LoginController', function($rootScope, $scope, $http, $location, $window, loginResource){

	$rootScope.user = {};
	$scope.message = '';

	$scope.authenticate = function(){	
		
		var req = {
			email : $rootScope.user.login,
			password : $rootScope.user.password
		}

		$http.post('http://localhost:8888/login', req)
		.then(function(data){
			$window.sessionStorage.setItem('principal', JSON.stringify($rootScope.user.login));
			$location.path('/');			
		}, function(error){
			console.log(error);
   			$scope.message = 'Login ou senha inválidos';   			
		});
	};

	$scope.logout = function(){	
	
		delete $window.sessionStorage.token;
		delete $window.sessionStorage.principal;
		$location.path('login');

	};

	$rootScope.isAuthenticated = function(){		
		if($window.sessionStorage.token){
			return true;
		} else {
			return false;
		}
	}



});