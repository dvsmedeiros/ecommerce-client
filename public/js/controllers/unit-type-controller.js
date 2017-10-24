angular.module('ecommerce').controller('UnitTypeController', function($scope){
	
	$scope.units = [
		
		{key: 'PC', value: 'Peça'},
		{key: 'KG', value: 'Kilo'},
		{key: 'MT', value: 'Metro'},
		{key: 'CJ', value: 'Conjunto'},
		{key: 'UN', value: 'Unidade'},
		{key: 'HR', value: 'Hora'},
		{key: 'CX', value: 'Caixa'},
		{key: 'JG', value: 'Jogo'},
		{key: 'PR', value: 'Par'},
		{key: 'PT', value: 'Pacote'},
		{key: 'LT', value: 'Litro'}

	];

});