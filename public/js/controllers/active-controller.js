angular.module('ecommerce').controller('ActiveController', function($scope, $http){
	
	$scope.activies = [{value: true, name: 'Ativo'}, {value: false,	name: 'Inativo'}];

});