angular.module('ecommerce').controller('LoginController', function($rootScope, $interval, $scope, $http, $location, $window, loginResource, cartResource, notificationResource){

	$rootScope.user = {};
	$rootScope.cartSize = 0;
	$scope.message = '';
	$rootScope.notifications = [];
	
	/*
	$scope.interval = 5000;
	$interval(function(){
		$scope.fetchNotification();	
	}, $scope.interval);	
	
	$scope.fetchNotification = function(){	
		let filter = {
			entity : {},
			logged : true
		}
		notificationResource.filter(filter, function(notifications){
			$rootScope.notifications = notifications;			
		}, function(error){
			console.log(error);
		});
	}
	*/
	$scope.authenticate = function(){	
		
		var req = {
			email : $rootScope.user.login,
			password : $rootScope.user.password
		}
		$http.post('http://localhost:8888/login', req)
		.then(function(response){
			$window.sessionStorage.setItem('principal', JSON.stringify(response.data));
			$location.path('/');			
		}, function(error){
			console.log(error);
   			$scope.message = 'Login ou senha inválidos';   			
		});
	};

	$scope.logout = function(){	
	
		delete $window.sessionStorage.token;
		delete $window.sessionStorage.principal;
		cartResource.delete(function(cart){
			$scope.cart = cart;
			$location.path('login');
		}, function(erro){
			console.log(erro);
		});

	};

	$rootScope.isAuthenticated = function(){		
		if($window.sessionStorage.token){
			return true;
		} else {
			return false;
		}
	}

	$rootScope.hasRole = function(role){		
		if($window.sessionStorage.principal){
			return angular.fromJson($window.sessionStorage.principal).authorities.find(e => e.authority === role) ? true : false;
		} else {
			return false;
		}
	}	



});