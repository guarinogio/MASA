(function(){
    'use strict';

    angular
        .module('app.student')
        .factory('students', students)
        .value('estudianteSeleccionado',{});

    students.$inject = ['$resource','$rootScope'];
    function students($resource, $rootScope){
        return $resource('http://'+$rootScope.domainUrl+'/students/:id', null, 
            {
                'update': {method:'PUT'}
            });
    };
})();