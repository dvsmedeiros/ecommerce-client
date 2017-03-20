angular.module('ecommerce').controller('PackingTypeController', function($scope){
	
	$scope.packingTypes = [{value: 1, name: 'Pacote/Caixa'}, {value: 2, name: 'Rolo/Prisma'}, {value: 3, name: 'Envelope'}];
		
});