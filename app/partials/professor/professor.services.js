(function(){
    'use strict';

    angular
        .module('app.professor')
        .factory('professors', professors)
        .factory('passwordReset', passwordReset)
        .value('selectedCourse',{})
        .value('selectedSection',{})
        .value('selectedStudent',{})
        .value('profesorSeleccionado',{})
        .value('data',{});

    professors.$inject = ['$resource','$rootScope','authentication'];
    function professors($resource, $rootScope, authentication){
        return $resource('http://'+$rootScope.domainUrl+'/professors/:id', {}, {
                get: {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer '+ authentication.getToken()
                    }
                },
                update: {
                    method: 'PUT',
                    headers: {
                        Authorization: 'Bearer '+ authentication.getToken()
                    }
                },
                delete: {
                    method: 'DELETE',
                    headers: {
                        Authorization: 'Bearer '+ authentication.getToken()
                    }
                },
                query: {
                    method: 'GET',
                    isArray:true,
                    headers: {
                        Authorization: 'Bearer '+ authentication.getToken()
                    }
                }
            });
    };
    passwordReset.$inject = ['$resource','$rootScope','authentication'];
    function passwordReset($resource, $rootScope, authentication){
        return $resource('http://'+$rootScope.domainUrl+'/reset/:id', {}, {
                update: {
                    method: 'PUT',
                    headers: {
                        Authorization: 'Bearer '+ authentication.getToken()
                    }
                }
            });
    };
})();