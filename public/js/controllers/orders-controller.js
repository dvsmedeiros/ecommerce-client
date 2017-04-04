angular.module('ecommerce').controller('MyRequestsController', function($scope){

	$scope.orders = 
	[
		{
			id : 12456789,
			quantity : 5,
			date : '25/10/2017',
			total : 176.50,
			status : 'Entregue'
		},
		{
			id : 987654321,
			quantity : 1,
			date : '25/10/2017',
			total : 25.50,
			status : 'Em Trânsito'
		}
	]

});