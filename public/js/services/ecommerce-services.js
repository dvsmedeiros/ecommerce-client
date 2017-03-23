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
	