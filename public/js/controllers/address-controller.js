angular.module('ecommerce').controller('AddressController', function($scope, $routeParams, $location, viaCepResource, addressResource, clientResource, addressTypeResource){
  	
    $scope.address = {
      neighborhood : {
        name : '',
        city : {
          description : '',
          state : {
            code : '',
            country : {
              code : ''
            }

          }
        }
      }
    }; 
    
    $scope.user = {
      addresses : []
    }; 
    $scope.responseMessage = {
      message : '',
      hasError : true   
    };

    addressTypeResource.query(function(addressTypes){
      $scope.addressTypes = addressTypes;
    }, function(error){
      console.log(error);
    });

    if($routeParams.addressId) {
      addressResource.get({id: $routeParams.addressId}, function(address) {
        $scope.address = address; 
      }, function(erro) {
        $scope.responseMessage = erro.data;
        console.log(erro);
      });
    }

    $scope.submit = function(){
      
      if ($scope.editForm.$valid) {

        if($scope.address.id){
          
          addressResource.update($scope.address, function(address) {
            $scope.address = address;
            $location.path('/home/addresses');          
          }, function(erro) {
            $scope.responseMessage = erro.data;
            console.log(erro);
          });

        } else {
                    
          addressResource.save($scope.address, function(address) { 
            $scope.address = address;                                 
            $location.path('/home/addresses');          
          }, function(erro) {
            $scope.responseMessage = erro.data;
            console.log(erro);
          });
        }
      }
    }

    $scope.findAddressByZipcode = function (cep) {
      
      viaCepResource.get({cep: cep}, function(endereco) {
        
        if(endereco.erro === true){
          $scope.user.addresses = []
        } else {

          $scope.address.aNumber = '';
          $scope.address.street = endereco.logradouro;
          $scope.address.zipCode = endereco.cep;
          $scope.address.neighborhood.name = endereco.bairro;              
          $scope.address.neighborhood.city.description = endereco.localidade;   
          $scope.address.neighborhood.city.state.code = endereco.uf;
          $scope.address.neighborhood.city.state.country.code = 'BR';       
                  
        }
      }, function(erro) {
        $scope.user.addresses = []
        console.log(erro);
      });
    }
});