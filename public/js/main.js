angular.module('ecommerce', ['ngRoute', 'ecommerceServices', 'ui.utils.masks', 'angularModalService', 'btorfs.multiselect'])
	.config(function($routeProvider, $locationProvider, $httpProvider) {

		$httpProvider.interceptors.push('tokenInterceptor');

		//HOME
		$routeProvider.when('/test', {
			templateUrl: 'partials/test.html',
			controller: 'TestController'
		});

		//LOGIN
		$routeProvider.when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'LoginController'
		});

		//PRINCIPAL
		$routeProvider.when('/', {
			templateUrl: 'partials/principal.html',
			controller: 'PrincipalController'
		});

		//HOME
		$routeProvider.when('/home', {
			templateUrl: 'partials/home.html',
			controller: 'HomeController'
		});

		//SINGUP
		$routeProvider.when('/singup', {
			templateUrl: 'partials/singup.html',
			controller: 'SingupController'
		});

		//ORDERS
		$routeProvider.when('/home/orders', {
			templateUrl: 'partials/orders.html',
			controller: 'MyRequestsController'
		});

		$routeProvider.when('/home/orders/detail/:orderId', {
			templateUrl: 'partials/order-detail.html',
			controller: 'OrderDetailController'
		});
		
		//ACCOUNT
		$routeProvider.when('/home/account', {
		});

		$routeProvider.when('/home/account', {
			templateUrl: 'partials/account.html',
			controller: 'AccountController'
		});

		//ADRESS
		$routeProvider.when('/home/addresses', {
			templateUrl: 'partials/addresses.html',
			controller: 'AddressesController'
		});

		$routeProvider.when('/home/addresses/list', {
			templateUrl: 'partials/addresses.html',
			controller: 'AddressesController'
		});

		$routeProvider.when('/home/addresses/new', {
			templateUrl: 'partials/address.html',
			controller: 'AddressController'
		});

		$routeProvider.when('/home/addresses/edit/:addressId', {
			templateUrl: 'partials/address.html',
			controller: 'AddressController'
		});

		//CARDS
		$routeProvider.when('/home/cards', {
			templateUrl: 'partials/cards.html',
			controller: 'CardsController'
		});

		$routeProvider.when('/home/cards/list', {
			templateUrl: 'partials/cards.html',
			controller: 'CardsController'
		});

		$routeProvider.when('/home/cards/new', {
			templateUrl: 'partials/card.html',
			controller: 'CardController'
		});

		$routeProvider.when('/home/cards/edit/:cardId', {
			templateUrl: 'partials/card.html',
			controller: 'CardController'
		});

		//EXCHANGES
		$routeProvider.when('/home/exchanges', {
			templateUrl: 'partials/exchanges.html',
			controller: 'HomeController'
		});

		//PRODUCT
		$routeProvider.when('/products', {
			templateUrl: 'partials/books.html',
			controller: 'BooksController'
		});
		
		$routeProvider.when('/products/new', {
			templateUrl: 'partials/book.html',
			controller: 'BookController'
		});

		$routeProvider.when('/products/edit/:productId', {
			templateUrl: 'partials/book.html',
			controller: 'BookController'
		});

		$routeProvider.when('/products/list', {
			templateUrl: 'partials/products.html',
			controller: 'ProductsController'
		});

		$routeProvider.when('/products/detail/:productId', {
			templateUrl: 'partials/product-detail.html',
			controller: 'ProductDetailController'
		});

		//CONFIGURATION
		$routeProvider.when('/configuration', {
			templateUrl: 'partials/configurations.html',
			controller: 'ConfigurationsController'
		});

		$routeProvider.when('/configuration/new', {
			templateUrl: 'partials/configuration.html',
			controller: 'ConfigurationController'
		});

		$routeProvider.when('/configuration/list', {
			templateUrl: 'partials/configurations.html',
			controller: 'ConfigurationsController'
		});
		
		$routeProvider.when('/configuration/edit/:id', {
			templateUrl: 'partials/configuration.html',
			controller: 'ConfigurationController'
		});

		//CLIENT
		$routeProvider.when('/client', {
			templateUrl: 'partials/clients.html',
			controller: 'ClientsController'
		});		

		$routeProvider.when('/client/list', {
			templateUrl: 'partials/clients.html',
			controller: 'ClientsController'
		});

		//CATEGORY
		$routeProvider.when('/category', {
			templateUrl: 'partials/categories.html',
			controller: 'CategoriesController'
		});

		$routeProvider.when('/category/new', {
			templateUrl: 'partials/category.html',
			controller: 'CategoryController'
		});

		$routeProvider.when('/category/list', {
			templateUrl: 'partials/categories.html',
			controller: 'CategoriesController'
		});
		
		$routeProvider.when('/category/edit/:id', {
			templateUrl: 'partials/category.html',
			controller: 'CategoryController'
		});

		//STOCK
		$routeProvider.when('/stock', {
			templateUrl: 'partials/stock.html',
			controller: 'StockController'
		});

		$routeProvider.when('/stock/detail/:productId', {
			templateUrl: 'partials/stock-detail.html',
			controller: 'StockDetailController'
		});

		//SUPPLIER
		$routeProvider.when('/supplier', {
			templateUrl: 'partials/suppliers.html',
			controller: 'SuppliersController'
		});

		$routeProvider.when('/supplier/new', {
			templateUrl: 'partials/supplier.html',
			controller: 'SupplierController'
		});

		$routeProvider.when('/supplier/list', {
			templateUrl: 'partials/suppliers.html',
			controller: 'SuppliersController'
		});
		
		$routeProvider.when('/supplier/edit/:supplierId', {
			templateUrl: 'partials/supplier.html',
			controller: 'SupplierController'
		});

		//SHOPCART	
		$routeProvider.when('/cart', {
			templateUrl: 'partials/cart.html',
			controller: 'CartController'
		});

		$routeProvider.when('/cart/list', {
			templateUrl: 'partials/cart.html',
			controller: 'CartController'
		});

		$routeProvider.when('/cart/:productId', {
			templateUrl: 'partials/cart.html',
			controller: 'CartController'
		});
		
		//CHECKOUT
		$routeProvider.when('/checkout', {
			templateUrl: 'partials/checkout.html',
			controller: 'CheckoutController'
		});

		$routeProvider.otherwise({redirectTo: '/'});		

	})
;