	angular.module('ecommerceServices', ['ngResource'])
	.factory('categoryResource', function($resource) {

		return $resource('http://localhost:8888/ecommerce-api/products/category/:categoryId', null, {
			'update' : { 
				method: 'PUT'
			},
			'inactivate' : {
				method: 'PUT',
				params: {
					categoryId: '@categoryId'
				}
			}
		});
	})
	.factory('productResource', function($resource) {

		return $resource('http://localhost:8888/ecommerce-api/products/:productId', null, {
			'update' : { 
				method: 'PUT'
			},
			'inactivate' : {
				method: 'PUT',
				params: {
					productId: '@productId'
				}
			}
		});
	})
	.factory('supplierResource', function($resource) {

		return $resource('http://localhost:8888/ecommerce-api/supplier/:supplierId', null, {
			'update' : { 
				method: 'PUT'
			},
			'inactivate' : {
				method: 'PUT',
				params: {
					supplierId: '@supplierId'
				}
			}
		});
	})
	.factory('cartResource', function($resource) {

		return $resource('http://localhost:8888/ecommerce-api/cart/product/:productId', null, {
			'update' : { 
				method: 'PUT',
				params: {
					productId: '@productId'
				}
			},
			'save' : {
				method: 'POST',
				params: {
					productId: '@productId'
				}
			}
		});
	})
	.factory('addressResource', function($resource) {

		return $resource('http://localhost:8888/ecommerce-api/address/:addressId', null, {
			'update' : { 
				method: 'PUT',
				params: {
					addressId: '@addressId'
				}
			}
		});
	})
	.factory('orderResource', function($resource) {

		return $resource('http://localhost:8888/ecommerce-api/orders/:orderId', null, {
			'update' : { 
				method: 'PUT',
				params: {
					orderId: '@orderId'
				}
			}
		});
	})
	.factory('checkoutResource', function($resource) {
		return $resource('http://localhost:8888/ecommerce-api/checkout', null, null);
	})
	.factory('viaCepResource', function($resource) {

		return $resource('https://viacep.com.br/ws/:cep/json', null, {
			method: 'GET',
				params: {
					cep: '@cep'
				}			
			});
	})
	.factory('freightResource', function($resource) {

		return $resource('http://localhost:8888/ecommerce-api/freight/:productId/:postalCode', null, {
			method: 'GET',
				params: {
					productId: '@productId',
					postalCode: '@postalCode'
				}			
			});
	})
	;
	