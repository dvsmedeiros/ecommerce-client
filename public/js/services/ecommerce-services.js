angular.module('ecommerceServices', ['ngResource'])	
	
	.factory('categoryResource', function($resource) {

		return $resource('http://localhost:8888/ecommerce-api/category/:id', null, {
			'update' : { 
				method: 'PUT'
			},
			'inactivate' : {
				method: 'PUT',
				params: {
					id: '@id'
				}
			},
			'filter' : {
				url : 'http://localhost:8888/ecommerce-api/category/filter',
				method: 'POST',
				isArray : true
			}
		});
	})
	.factory('clientResource', function($resource) {

		return $resource('http://localhost:8888/ecommerce-api/client/:id', null, {
			'update' : { 
				method: 'PUT'
			},
			'filter' : {
				url : 'http://localhost:8888/ecommerce-api/client/filter',
				method: 'POST',
				isArray : true
			},
			'logged' : {
				url : 'http://localhost:8888/ecommerce-api/client/active',
				method: 'GET',
				isArray : false
			},
			'inactivate' : {
				url : 'http://localhost:8888/ecommerce-api/user/inactivate/:id',
				method: 'PUT',
				params: {
					id: '@id'
				}
			},
			'activate' : {
				url : 'http://localhost:8888/ecommerce-api/user/activate/:id',
				method: 'PUT',
				params: {
					id: '@id'
				}
			},
			'changePassword' : {
				url : 'http://localhost:8888/ecommerce-api/user/change/password',
				method: 'POST',
				isArray : false
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
	.factory('bookResource', function($resource) {

		return $resource('http://localhost:8888/ecommerce-api/book/:id', null, {
			'update' : { 
				method: 'PUT'
			},
			'inactivate' : {
				url : 'http://localhost:8888/ecommerce-api/book/inactivate/:id',
				method: 'PUT',
				params: {
					id: '@id'
				}
			},
			'activate' : {
				url : 'http://localhost:8888/ecommerce-api/book/activate/:id',
				method: 'PUT',
				params: {
					id: '@id'
				}
			},
			'filter' : {
				url : 'http://localhost:8888/ecommerce-api/book/filter',
				method: 'POST',
				isArray : true
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

		return $resource('http://localhost:8888/ecommerce-api/cart/:productId', null, {
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

		return $resource('http://localhost:8888/ecommerce-api/address/:id', null, {
			'update' : { 
				method: 'PUT'
			},
			'billing' : {
				url : 'http://localhost:8888/ecommerce-api/address/billing',
				method : 'GET'				
			},
			'delivery' : {
				url : 'http://localhost:8888/ecommerce-api/address/delivery',
				method : 'GET',
				isArray : true
			}

		});
	})
	.factory('cardResource', function($resource) {

		return $resource('http://localhost:8888/ecommerce-api/card/:id', null, {
			'update' : { 
				method: 'PUT'
			},
			'filter' : {
				url : 'http://localhost:8888/ecommerce-api/card/filter',
				method: 'POST',
				isArray : true
			}
		});
	})
	.factory('orderResource', function($resource) {

		return $resource('http://localhost:8888/ecommerce-api/order/:orderId', null, {
			'update' : { 
				method: 'PUT',
				params: {
					orderId: '@orderId'
				}
			},
			'filter' : {
				url : 'http://localhost:8888/ecommerce-api/order/filter',
				method: 'POST',
				params: {
					logged: '@logged'
				},
				isArray : true
			},
			'checkout' : {
				url : 'http://localhost:8888/ecommerce-api/order/checkout',
				method: 'POST'
			},
			'changeStatus' : {				
				url : 'http://localhost:8888/ecommerce-api/order/status',
				method: 'PUT'
			}
		});
	})
	.factory('configurationResource', function($resource) {

		return $resource('http://localhost:8888/configuration/:id', null, {
			'update' : { 
				method: 'PUT'
			},
			'inactivate' : {
				method: 'PUT',
				params: {
					id: '@id'
				}
			},
			'filter' : {
				url : 'http://localhost:8888/configuration/filter',
				method: 'POST',
				isArray : true
			}
		});
	})
	.factory('stockResource', function($resource) {
		return $resource('http://localhost:8888/ecommerce-api/stock/:productId', null, {
			'update' : { 
				method: 'PUT',
				params: {
					productId: '@productId'
				}
			},
			'filter' : {
				url : 'http://localhost:8888/ecommerce-api/stock/filter',
				method: 'POST',
				isArray : true
			}	
		});
	})
	.factory('cupomResource', function($resource) {
		return $resource('http://localhost:8888/ecommerce-api/cart/cupom/:cupomCode', null, {
			'update' : {
				method : 'PUT',
				params : {
					cupomCode : '@cupomCode'
				}
			},
			'save' : {
				method : 'POST',
				params : {
					cupomCode : '@cupomCode'
				}
			},
			'delete' : {
				method : 'DELETE',
				params : {
					cupomCode : '@cupomCode'
				}
			},
			'filter' : {
				url : 'http://localhost:8888/ecommerce-api/cupom/filter',
				method: 'POST',
				params: {
					logged: '@logged'
				},
				isArray : true
			}	
		});
	})
	.factory('analyzeResource', function($resource) {
		return $resource('http://localhost:8888/ecommerce-api/analyze/:id', null, {			
			'filter' : {
				url : 'http://localhost:8888/ecommerce-api/analyze/filter',
				method: 'POST',
				isArray : true
			}
		});
	})
	.factory('notificationResource', function($resource) {
		return $resource('http://localhost:8888/ecommerce-api/notification/:id', null, {			
			'filter' : {
				url : 'http://localhost:8888/ecommerce-api/notification/filter',
				method: 'POST',
				params: {
					logged: '@logged'
				},
				isArray : true
			}
		});
	})
	.factory('reasonResource', function($resource) {
		return $resource('http://localhost:8888/ecommerce-api/reason/:id', null, {			
			'filter' : {
				url : 'http://localhost:8888/ecommerce-api/reason/filter',
				method: 'POST',
				isArray : true
			}
		});
	})
	.factory('auditResource', function($resource) {
		return $resource('http://localhost:8888/ecommerce-api/audit/:id', null, null);
	})
	.factory('categoryTypeResource', function($resource) {
		return $resource('http://localhost:8888/ecommerce-api/category/type/:id', null, null);
	})
	.factory('authorResource', function($resource) {
		return $resource('http://localhost:8888/ecommerce-api/author/:id', null, null);
	})
	.factory('publisherResource', function($resource) {
		return $resource('http://localhost:8888/ecommerce-api/publisher/:id', null, null);
	})
	.factory('priceGroupResource', function($resource) {
		return $resource('http://localhost:8888/ecommerce-api/price-group/:id', null, null);
	})
	.factory('stockRecordResource', function($resource) {
		return $resource('http://localhost:8888/ecommerce-api/stock/record/:stockId', null, null);
	})
	.factory('loginResource', function($resource) {
		return $resource('http://localhost:8888/login', null, null);
	})
	.factory('recordTypeResource', function($resource) {
		return $resource('http://localhost:8888/ecommerce-api/recordType', null, null);
	})
	.factory('addressTypeResource', function($resource) {
		return $resource('http://localhost:8888/ecommerce-api/addressType', null, null);
	})
	.factory('flagResource', function($resource) {
		return $resource('http://localhost:8888/ecommerce-api/flag', null, null);
	})
	.factory('statusOrderResource', function($resource) {
		return $resource('http://localhost:8888/ecommerce-api/statusOrder', null, null);
	})
	.factory('singupResource', function($resource) {
		return $resource('http://localhost:8888/ecommerce-api/client', null, null);
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
	