angular.module('ecommerce').controller('SupplierController', function($scope, $routeParams, viaCepResource, supplierResource){
	
	$scope.message = '';
	$scope.supplier = {
		address : {},
    phones : []
	};

  //if present :supplierId on route, load the supplier by supplierId
  if($routeParams.supplierId) {
    supplierResource.get({supplierId: $routeParams.supplierId}, function(supplier) {
    $scope.supplier = supplier; 
    }, function(erro) {
      console.log(erro);
    });
  }

	$scope.submit = function(){
    
    console.log(JSON.stringify($scope.supplier));

    if ($scope.editForm.$valid) {

      if($scope.supplier.id){

        supplierResource.update($scope.supplier, function(status) {
          $scope.supplier = {
            address : {},
            phones : []
          };
          $scope.message = status.message;
          //$route.reload();
        }, function(erro) {
          console.log(erro);
        });

      } else {

        supplierResource.save($scope.supplier, function(status) {
          $scope.supplier = {};
          $scope.message = status.message;
          //$route.reload();
        }, function(erro) {
          console.log(erro);
        });
      }
    }
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