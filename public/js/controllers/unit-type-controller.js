angular.module('ecommerce').controller('UnitTypeController', function($scope){
	
	$scope.units = [
		
		{value: 'PC', name: 'Peça'},
		{value: 'KG', name: 'Kilo'},
		{value: 'MT', name: 'Metro'},
		{value: 'CJ', name: 'Conjunto'},
		{value: 'UN', name: 'Unidade'},
		{value: 'HR', name: 'Hora'},
		{value: 'CX', name: 'Caixa'},
		{value: 'JG', name: 'Jogo'},
		{value: 'PR', name: 'Par'},
		{value: 'PT', name: 'Pacote'},
		{value: 'LT', name: 'Litro'}

	];

});