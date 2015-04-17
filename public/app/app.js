var mypage = angular.module('mypage', ['ngStorage'])
	.config(['$httpProvider', function($httpProvider) {  
	    $httpProvider.interceptors.push('bearerInterceptor');
	}]);