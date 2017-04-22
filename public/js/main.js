angular.module('ecommerce', ['ngRoute', 'ecommerceServices', 'ui.utils.masks', 'angularModalService', 'ngAnimate'])
	.config(function($routeProvider, $locationProvider) {

		//$locationProvider.html5Mode(true);

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

		//ORDERS
		$routeProvider.when('/home/orders', {
			templateUrl: 'partials/orders.html',
			controller: 'MyRequestsController'
		});

		$routeProvider.when('/home/order', {
		});

		$routeProvider.when('/home/order/detail', {
			templateUrl: 'partials/order-detail.html',
			controller: 'OrderDetailController'
		});

		$routeProvider.when('/home/order/detail', {
			templateUrl: 'partials/order-detail.html',
			controller: 'OrderDetailController'
		});
		
		//ACCOUNT
		$routeProvider.when('/home/account', {
			templateUrl: 'partials/account.html',
			controller: 'MyAccountController'
		});

		//ADRESS
		$routeProvider.when('/home/addresses', {
			templateUrl: 'partials/addresses.html',
			controller: 'AddressesController'
		});

		//CARDS
		$routeProvider.when('/home/cards', {
			templateUrl: 'partials/cards.html',
			controller: 'CardsController'
		});

		//EXCHANGES
		$routeProvider.when('/home/exchanges', {
			templateUrl: 'partials/exchanges.html',
			controller: 'HomeController'
		});

		//PRODUCT
		$routeProvider.when('/products', {
			templateUrl: 'partials/products.html',
			controller: 'ProductsController'
		});
		
		$routeProvider.when('/products/new', {
			templateUrl: 'partials/product.html',
			controller: 'ProductController'
		});

		$routeProvider.when('/products/edit/:productId', {
			templateUrl: 'partials/product.html',
			controller: 'ProductController'
		});

		$routeProvider.when('/products/list', {
			templateUrl: 'partials/products.html',
			controller: 'ProductsController'
		});

		$routeProvider.when('/products/detail/:productId', {
			templateUrl: 'partials/product-detail.html',
			controller: 'ProductController'
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
		
		$routeProvider.when('/category/edit/:categoryId', {
			templateUrl: 'partials/category.html',
			controller: 'CategoryController'
		});

		//STOCK
		$routeProvider.when('/stock', {
			templateUrl: 'partials/stock.html',
			controller: 'StockController'
		});

		$routeProvider.when('/stock/movement', {
			templateUrl: 'partials/stock-movement.html',
			controller: 'StockController'
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
		
	});