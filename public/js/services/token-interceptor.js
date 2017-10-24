angular.module('ecommerce')
	.factory('tokenInterceptor', function($rootScope, $window, $q, $location){

		var interceptor = {};

		interceptor.response = function(res){			
			var token = res.headers('Authorization');
			if(token){
				$window.sessionStorage.token = token;				
			}
			return res;
		};

		interceptor.request = function(config){
			config.headers = config.headers || {};		
			if($window.sessionStorage.token){				
				config.headers['Authorization'] = $window.sessionStorage.token;
				$rootScope.user.login = angular.fromJson($window.sessionStorage.getItem('principal'));	
			}			
			return config;
		};

		interceptor.responseError = function(rejection){

			if(rejection != null && rejection.status == 403){
				delete $window.sessionStorage.token;
				$location.path('login');
			}
			return $q.reject(rejection); 
		}

		return interceptor;
	});