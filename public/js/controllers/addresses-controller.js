angular.module('ecommerce').controller('AddressesController', function($scope, clientResource){
  	  	
    $scope.addresses = [];
    $scope.user = {}; 
    $scope.responseMessage = {
      message : '',
      hasError : true   
    };

    clientResource.logged(function(user) {
      $scope.addresses = user.addresses; 
    }, function(erro) {
      $scope.responseMessage = erro.data;
      console.log(erro);
    });

});