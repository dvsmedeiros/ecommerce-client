angular.module('ecommerce').controller('GenderController', function($scope, $http){
	
	$scope.genders = [{value: 'MALE', name: 'Masculino'}, {value: 'FEMALE', name: 'Feminino'}, {value: 'OTHER', name: 'Outro'}];

});