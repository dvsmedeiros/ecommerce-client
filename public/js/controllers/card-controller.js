angular.module('ecommerce').controller('CardController', function($scope, $routeParams, $location, cardResource, clientResource, flagResource){
  	
  	$scope.card = {}; 
    $scope.user = {
      cards : []
    }; 

    $scope.responseMessage = {
      message : '',
      hasError : true   
    };

    flagResource.query(function(flags){
      $scope.flags = flags;
    }, function(error){
      console.log(error);
    });

    if($routeParams.cardId) {
      cardResource.get({id: $routeParams.cardId}, function(card) {
        $scope.card = card; 
      }, function(erro) {
        $scope.responseMessage = erro.data;
        console.log(erro);
      });
    }

    $scope.submit = function(){
      
      if ($scope.editForm.$valid) {

        if($scope.card.id){
          
          cardResource.update($scope.card, function(card) {
            $scope.card = card;
            $location.path('/home/cards');          
          }, function(erro) {
            $scope.responseMessage = erro.data;
            console.log(erro);
          });

        } else {
                    
          cardResource.save($scope.card, function(card) { 
            $scope.card = card;                                 
            $location.path('/home/cards');          
          }, function(erro) {
            $scope.responseMessage = erro.data;
            console.log(erro);
          });
        }
      }
    }

});