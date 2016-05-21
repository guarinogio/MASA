(function(){
    'use strict';

    angular
        .module('app.course')
        .factory('courses', courses);

    courses.$inject = ['$resource','$rootScope'];
    function courses($resource, $rootScope){
        return $resource('http://'+$rootScope.domainUrl+'/professors/:id/courses', {}, {
        		get: {
        			method: 'GET',
        			headers: {
				    	Authorization: 'Bearer '+ authentication.getToken()
				    }
    			}
			});
    };
})();