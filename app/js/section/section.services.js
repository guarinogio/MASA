(function(){
    'use strict';

    angular
        .module('app.section')
        .factory('sections', sections)
        .value('matriculaSeleccionada',{});

    sections.$inject = ['$resource','$rootScope'];
    function sections($resource, $rootScope){
        return $resource('http://'+$rootScope.domainUrl+'/sections/:id', null, 
            {
                'update': {method:'PUT'}
            });
    };
})();