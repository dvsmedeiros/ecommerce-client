angular.module('ecommerce').controller('OrderDetailController', function($scope){

	$scope.order = {

		id : 12456789,
		quantity : 5,
		date : '25/10/2017',
		total : 176.50,
		status : 'Entregue',
		payment : 'Cartão de Crédito'
	}

	$scope.adress = {
		
        firstName : 'Davisson',
        lastName : 'Medeiros',
        street : 'Avenida Presbítero Eliezer Martins Costa',
        number : '179',
        zipcode : '08696-100',
        neighborhood : 'Jardim Varan',
        city : 'Suzano',
        state : 'SP',
        phoneNumber : {
          ddd :  '11',
          number : '4749-7851' 
        }
    }

});