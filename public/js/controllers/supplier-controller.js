angular.module('ecommerce').controller('SupplierController', function($scope, viaCepResource){
	
	$scope.message = '';
	$scope.supplier = {
		address : {}
	};

	$scope.submit = function(){
		alert("BLA");
	}

	$scope.findAddressByZipcode = function (cep) {
      
      viaCepResource.get({cep: cep}, function(endereco) {
        
        if(endereco.erro === true){

          $scope.supplier.address = {}

        } else {

          $scope.supplier.address = {

            street : endereco.logradouro,
            zipCode : endereco.cep,
            neighborhood : {
              name : endereco.bairro,
              city : {	
                description : endereco.localidade,
                state : {
                  code : endereco.uf
                }
              }
            }
          }

        }
      }, function(erro) {
        $scope.supplier.address = {}
        console.log(erro);
      });
    }

});