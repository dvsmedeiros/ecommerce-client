angular.module('ecommerce').controller('GenderController', function($scope, $http){
	
	$scope.genders = [{value: 'M', name: 'Masculino'}, {value: 'F', name: 'Feminino'}, {value: 'O', name: 'Outro'}];

});