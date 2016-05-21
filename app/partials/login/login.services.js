(function(){
    'use strict';

    angular
        .module('app.login')
        .factory('login', login)
        .value('user',{})
        .value('id',{})

    login.$inject = ['$resource','$rootScope'];
    function login($resource, $rootScope){
        return $resource('http://'+$rootScope.domainUrl+'/login');  
    };
})();