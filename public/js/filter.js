angular.module('ecommerce')
	.filter('cnpj', function(){
		return function(input){
			var input = input || '';
			return input.replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, "$1.$2.$3/$4-$5");
		};
	})
	.filter('card', function(){
		return function(input){
			var input = input || '';
			return input.replace(/^(\d{4})(\d{4})?(\d{4})?(\d{4})?/, "$1 $2 $3 $4");
		};
	})
;	