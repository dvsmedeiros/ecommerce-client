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

		$routeProvider.when('/home/orders', {
			templateUrl: 'partials/orders.html',
			controller: 'MyRequestsController'
		});

		$routeProvider.when('/home/account', {
			templateUrl: 'partials/account.html',
			controller: 'MyAccountController'
		});

		$routeProvider.when('/home/adresses', {
			templateUrl: 'partials/adresses.html',
			controller: 'AdressesController'
		});

		$routeProvider.when('/home/cards', {
			templateUrl: 'partials/cards.html',
			controller: 'HomeController'
		});

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