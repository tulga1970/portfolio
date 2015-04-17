mypage.controller('home', ['$scope', function(){

}]);

mypage.controller('header', ['$scope', function(){
	
}]);

mypage.controller('about', ['$scope', function($scope){
	
}]);

mypage.controller('resume', ['$scope', function($scope){
	
}]);

mypage.controller('portfolio', ['$scope', function($scope){
}]);

mypage.controller('blog', ['$scope', function($scope){
	
}]);

mypage.controller('contact', ['$scope', function($scope){
	
}]);

mypage.controller('footer', ['$scope', 'util', function($scope, util){
	util.setUp();
}]);

mypage.controller('login', ['$rootScope', '$scope', '$location', '$localStorage', 'Authentication', function($rootScope, $scope, $location, $localStorage, Authentication) {
 
        $scope.signin = function(user) {
            var formData = {
                email: $scope.user.email,
                password: $scope.user.password
            };
 
            Authentication.signin(formData, function(res) {
                if (res.type == false) {
                    $scope.response = res.data;    
                } else {
                    $localStorage.token = res.data.token;
                    $scope.response = $localStorage.token;
                    // /window.location = "/";    
                }
            }, function() {
                $rootScope.error = 'Failed to signin';
            });
        };
 
        $scope.signup = function(user) {
            var formData = {
                email: $scope.user.email,
                password: $scope.user.password
            }
 
            Authentication.signup(formData, function(res) {
                if (res.type == false) {
                    $scope.response = res.data;
                } else {
                    $localStorage.token = res.data.token;
                    $scope.response = $localStorage.token;
                }
            }, function() {
                $rootScope.error = 'Failed to signup';
            })
        };
 
        $scope.test = function() {
            Authentication.test(function(res) {
                $scope.response = res;
                console.log(res);
            }, function() {
                $location.path('/');
            })
        };
 
        $scope.logout = function() {
        	console.log("logout");

            Authentication.logout(function() {
                //window.location = "/"
            }, function() {
                console.log("Failed to logout!");
            });
        };
        $scope.token = $localStorage.token;
    }])