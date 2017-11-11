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
	.filter('isbn', function(){
		return function(input){
			var input = input || '';
			return input.replace(/^(\d{3})(\d{2})?(\d{3})?(\d{4})?(\d{1})?/, "$1-$2-$3-$4-$5");
		};	
	})
	.filter('barCode', function(){
		return function(input){
			var input = input || '';
			return input.replace(/^(\d{1})(\d{6})?(\d{6})?/, "$1 $2 $3");
		};	
	})
;	