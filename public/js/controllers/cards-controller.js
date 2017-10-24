angular.module('ecommerce').controller('CardsController', function($scope, clientResource){  	
  	
  	$scope.cards = [];
    $scope.user = {}; 
    $scope.responseMessage = {
      message : '',
      hasError : true   
    };

    clientResource.logged(function(user) {
      $scope.cards = user.cards; 
    }, function(erro) {
      $scope.responseMessage = erro.data;
      console.log(erro);
    });  

});