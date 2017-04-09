angular.module('ecommerce').controller('AddressesController', function($scope, viaCepResource, addressResource, ModalService){
  	
  	$scope.title = 'ENDEREÇO';

    $scope.address = {}

    $scope.submit = function(){
      
      //if ($scope.editForm.$valid) {

        if($scope.address.id){

          addressResource.update($scope.address, function(status) {
            $scope.category = {};
            $scope.message = status.message;

          }, function(erro) {
            console.log(erro);
          });

        } else {
          console.log(JSON.stringify($scope.address)); 
          
          addressResource.save($scope.address, function(status) {
            $scope.category = {};
            $scope.message = status.message;
      
          }, function(erro) {
            console.log(erro);
          });
          
        }
      //}

    }

    $scope.findAddressByZipcode = function (cep) {
        
      viaCepResource.get({cep: cep}, function(endereco) {
        
        if(endereco.erro === true){

          $scope.address = {}

        } else {

          $scope.address = {

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
        $scope = {}
        console.log(erro);
      });
    }
    
  	//  This close function doesn't need to use jQuery or bootstrap, because
  	//  the button has the 'data-dismiss' attribute.
  	$scope.close = function() {
  		close({
    		name: $scope.name,
    		age: $scope.age
    	}, 500); // close, but give 500ms for bootstrap to animate
  	};

  	//  This cancel function must use the bootstrap, 'modal' function because
  	//  the doesn't have the 'data-dismiss' attribute.
  	$scope.cancel = function() {

      //  Manually hide the modal.
      $element.modal('hide');
    
      //  Now call close, returning control to the caller.
      close({
      	name: $scope.name,
      	age: $scope.age
      }, 500); // close, but give 500ms for bootstrap to animate
  	};

  	$scope.modalShow = function() {

    ModalService.showModal({
      
      templateUrl: "partials/address-modal.html",
      controller: "AddressesController"

    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        
      });
    });

  };
});