angular.module('ecommerce').controller('CardsController', function($scope, ModalService){
  	
    $scope.name = null;
  	$scope.age = null;
  	$scope.title = 'ENDEREÇO';

    $scope.cards = 
    [
      {
        flag : 'VISA',
        name : 'DAVISSON MEDEIROS',
        number : '****.****.****.6889',
      }
    ]

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
      
      templateUrl: "partials/adress-modal.html",
      controller: "AdressesController"

    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        $scope.complexResult  = "Name: " + result.name + ", age: " + result.age;
      });
    });

  };
});