angular.module('ecommerce').controller('SingupController', function($scope, $routeParams, viaCepResource, singupResource, addressTypeResource){
	
	$scope.message = '';
  $scope.Date = new Date();
  $scope.addressTypes = [];
	$scope.user = {
		addresses : [],
    phones : [],
    bornDate : new Date()
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

	$scope.submit = function(){

    console.log(JSON.stringify($scope.user));

    if ($scope.editForm.$valid) {
      singupResource.save($scope.user, function(status) {
        $scope.user = {
          addresses : [],
          phones : []
        };
        $scope.responseMessage = {
          message : '',
          hasError : true   
        };      
      }, function(error) {
        $scope.responseMessage = error.data;
        console.log(erro);
      });
    }
  }

	$scope.findAddressByZipcode = function (cep) {
      
      viaCepResource.get({cep: cep}, function(endereco) {
        
        if(endereco.erro === true){
          $scope.user.addresses = []
        } else {

          $scope.user.addresses[0] = {
            street : endereco.logradouro,
            zipCode : endereco.cep,
            neighborhood : {
              name : endereco.bairro,
              city : {	
                description : endereco.localidade,
                state : {
                  code : endereco.uf,
                  country : {
                    code: 'BR'
                  }
                }
              }
            }
          }

        }
      }, function(erro) {
        $scope.user.addresses = []
        console.log(erro);
      });
    }
});