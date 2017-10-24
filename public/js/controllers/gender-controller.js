angular.module('ecommerce').controller('GenderController', function($scope, $http){
	
	$scope.genders = [{id: 'MALE', description: 'Masculino'}, {id: 'FEMALE', description: 'Feminino'}, {id: 'OTHER', description: 'Outro'}];

});