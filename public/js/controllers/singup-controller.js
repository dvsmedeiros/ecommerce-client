angular.module('ecommerce').controller('SingupController', function($scope, $routeParams, viaCepResource, singupResource){
	
	$scope.message = '';
	$scope.user = {
		address : {},
    phones : []
	};

  //if present :supplierId on route, load the supplier by supplierId
  /*
  if($routeParams.supplierId) {
    supplierResource.get({supplierId: $routeParams.supplierId}, function(supplier) {
    $scope.supplier = supplier; 
    }, function(erro) {
      console.log(erro);
    });
  }
  */

	$scope.submit = function(){

    console.log(JSON.stringify($scope.user));

    singupResource.update($scope.user, function(status) {
      $scope.user = {
        address : {},
        phones : []
      };
      $scope.message = status.message;
    }, function(erro) {
      console.log(erro);
    });
  }

	$scope.findAddressByZipcode = function (cep) {
      
      viaCepResource.get({cep: cep}, function(endereco) {
        
        if(endereco.erro === true){
          $scope.user.address = {}
        } else {

          $scope.user.address = {
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
        $scope.user.address = {}
        console.log(erro);
      });
    }
});