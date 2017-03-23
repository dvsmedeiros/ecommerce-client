angular.module('ecommerce').controller('PackingTypeController', function($scope){
	
	$scope.packingTypes = [{value: 'BOX', name: 'Pacote/Caixa'}, {value: 'ROLL', name: 'Rolo/Prisma'}, {value: 'ENVELOPE', name: 'Envelope'}];
		
});