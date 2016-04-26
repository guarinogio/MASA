(function(){
    'use strict';

    angular
        .module('app.reports')
        .controller('SectionAssistCtrl', SectionAssistCtrl)

    SectionAssistCtrl.$inject = 
    ['$scope', '$rootScope','$state', 'professors', '$modal', 'selectedCourse', 'selectedSection', 'selectedStudent'];
    function SectionAssistCtrl($scope, $rootScope, $state, professors, $modal, selectedCourse, selectedSection, selectedStudent) {
        var vm = this;
        var professorid = $rootScope.professorId;
        vm.section = [];
        vm.lectures = 0;
        vm.percentage = 0;
        vm.positive = 0;
        vm.professor = null;
        vm.negative = 0;

        professors.get({ id: professorid },
            function (successResult){
                vm.professor = successResult;
                angular.forEach (vm.professor.courses[selectedCourse.index].sections, 
                    function (value, key){
                        if (value._id == selectedSection._id ) {
                            selectedSection.index = key;
                            vm.section = value; 
                        }   
                    });

                angular.forEach (vm.section.students,
                    function (value){
                        vm.lectures = value.assistance;
                        angular.forEach (value.assistanceTotal,
                            function (valued){

                                if (valued.assistance) {
                                    vm.positive++;
                                } else {
                                    vm.negative++;
                                }
                        });        
                });
                vm.total = vm.positive + vm.negative;
                vm.percentage = (vm.positive/vm.total)*100; 
            },
            function (){
                console.log("Error al obtener los datos.");
        });

        vm.back = function (index) {
            $state.go('sectionReport');
        };
    };
})();