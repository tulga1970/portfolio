mypage.factory('bearerInterceptor', ['$q', '$location', '$localStorage', function($q, $location, $localStorage){  
    var headerAugmenter = {
        request: function(config) {
            config.headers = config.headers || {};
            if ($localStorage.token) {
                config.headers.Authorization = 'Bearer ' + $localStorage.token;
            }
            return config;
        },
        responseError: function(response) {
            if(response.status === 401 || response.status === 403) {
                $location.path('/');
            }
            return $q.reject(response);
        }
    };
    return headerAugmenter;
}]);