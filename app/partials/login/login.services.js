(function(){
    'use strict';

    angular
        .module('app.login')
        .factory('Login', Login)
        .factory('GetRol', GetRol)
        .factory('hash', hash)
        .value('algoritmo','SHA-1')
        .value('user',{})
        .value('id',{})

    
    Login.$inject = ['$resource','$rootScope'];
    function Login($resource, $rootScope){
        return $resource('http://'+$rootScope.domainUrl+'/api/VerifyUser');  
    };

    GetRol.$inject = ['$resource','$rootScope'];
    function GetRol($resource, $rootScope){
        return $resource('http://'+$rootScope.domainUrl+'/api/User/:id');
    };
    
    hash.$inject = ['algoritmo'];
    function hash(algoritmo){

        var hashFunction;

        if (algoritmo==="MD5") {
            hashFunction=CryptoJS.MD5;
        } else  if (algoritmo==="SHA-1") {
            hashFunction=CryptoJS.SHA1;
        } else  if (algoritmo==="SHA-2-256") {
            hashFunction=CryptoJS.SHA256;
        } else  if (algoritmo==="SHA-2-512") {
            hashFunction=CryptoJS.SHA512;
        } else {
            throw Error("El tipo de algoritmo no es válido:"+algoritmo);
        }

        var hash=function(message) {
            var objHashResult=hashFunction(message);
            var strHashResult=objHashResult.toString(CryptoJS.enc.Base64);

            return strHashResult;
        }
        return hash;
    };
})();
