(function(){
    'use strict';

    angular
        .module('app.professor')
        .factory('professors', professors)
        .value('profesorSeleccionado',{});

    professors.$inject = ['$resource','$rootScope'];
    function professors($resource, $rootScope){
        return $resource('http://'+$rootScope.domainUrl+'/professors/:id', null, 
            {
                'update': {method:'PUT'}
            });
    };
})();