angular.module('ecommerce').controller('OrderDetailController', function($scope, $routeParams, orderResource){

    $scope.order = {};

    if($routeParams.orderId) {
        orderResource.get({orderId: $routeParams.orderId}, function(order) {
        $scope.order = order; 
        }, function(erro) {
            console.log(erro);
        });
    }

});