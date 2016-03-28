(function(){
    'use strict';

    angular
        .module('app.reports')
        .factory('ReportJson', ReportJson)
        .value('id',{})

 	ReportJson.$inject = ['$resource','$rootScope'];
    function ReportJson($resource, $rootScope){
        return $resource('http://'+$rootScope.domainUrl+'/api/reports/:id');
    	//var json="data/data.json";
    	//return $resource(json);
    };

})();