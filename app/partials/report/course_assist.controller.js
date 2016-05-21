(function(){
    'use strict';

    angular
        .module('app.reports')
        .controller('CourseAssistCtrl', CourseAssistCtrl)

    CourseAssistCtrl.$inject = 
    ['$scope', '$state', 'professors', '$modal', 'selectedCourse', 'authentication'];
    function CourseAssistCtrl($scope, $state, professors, $modal, selectedCourse, authentication) {
        var vm = this;
        var user = authentication.currentUser();
        var professorid = user._id;
        vm.course = null;
        vm.lectures = 0;
        vm.percentage = 0;
        vm.positive = 0;
        vm.professor = null;
        vm.negative = 0;

        professors.get({ id: professorid },
            function (successResult){
                vm.professor = successResult;
                angular.forEach (vm.professor.courses, 
                    function (value, key){
                        if (value._id == selectedCourse._id ) {
                            selectedCourse.index = key;
                            vm.course = value; 
                        }   
                    });

                angular.forEach (vm.course.sections,
                    function (value){
                        angular.forEach (value.students,
                            function (valued){
                                vm.lectures = valued.assistance;
                                angular.forEach (valued.assistanceTotal,
                                    function (valueda){
                                        if (valueda.assistance) {
                                            vm.positive++;
                                        } else {
                                            vm.negative++;
                                        }
                                });        
                        });
                }); 
                vm.total = vm.positive + vm.negative;
                vm.percentage = (vm.positive/vm.total)*100; 
            },
            function (){
                console.log("Error al obtener los datos.");
        });

        vm.back = function (index) {
            $state.go('courseReport');
        };
    };
})();