angular.module('ecommerce').controller('SuppliersController', function($scope, $route, supplierResource){
	
	$scope.message = '';
	$scope.suppliers = [];
	$scope.activeSuppliers = [];

	//load all suppliers
	supplierResource.query({active: true}, function(suppliers){
		$scope.activeSuppliers = suppliers;
	}, function(error){
		console.log(error);
	});

	//load all suppliers
	supplierResource.query({active: false}, function(suppliers){
		$scope.suppliers = suppliers;
	}, function(error){
		console.log(error);
	});

	$scope.delete = function(supplier) {
    
    supplierResource.delete({supplierId: supplier.id}, function() {
      var indexSupplier = $scope.suppliers.indexOf(supplier);
      $scope.categories.splice(indexSupplier, 1);
    }, function(erro) {
      console.log(erro);
    });
    
  };

  $scope.inactivate = function(supplier) {
    
    if(supplier.id){

      supplierResource.inactivate({supplierId: supplier.id}, function(status) {
        $scope.supplier = {};
        $scope.message = status.message;
        $route.reload();
      }, function(erro) {
        console.log(erro);
      });

    }   
  };
});