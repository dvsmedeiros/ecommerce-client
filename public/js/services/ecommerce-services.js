angular.module('ecommerceServices', ['ngResource'])
	.factory('categoryResource', function($resource) {

		return $resource('http://localhost:8888/ecommercews/products/category/:categoryId', null, {
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

		return $resource('http://localhost:8888/ecommercews/products/:productId', null, {
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
	.factory('cartResource', function($resource) {

		return $resource('http://localhost:8888/ecommercews/cart/product/:productId', null, {
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

		return $resource('http://localhost:8888/ecommercews/address/:addressId', null, {
			'update' : { 
				method: 'PUT',
				params: {
					productId: '@addressId'
				}
			}
		});
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

		return $resource('http://localhost:8888/ecommercews/freight/:productId/:postalCode', null, {
			method: 'GET',
				params: {
					productId: '@productId',
					postalCode: '@postalCode'
				}			
			});
	})
	;
	