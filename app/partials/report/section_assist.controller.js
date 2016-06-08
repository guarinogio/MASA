(function(){
    'use strict';

    angular
        .module('app.reports')
        .controller('SectionAssistCtrl', SectionAssistCtrl)

    SectionAssistCtrl.$inject = 
    ['$scope', '$state', 'professors', '$modal', 'selectedCourse', 'selectedSection', 'selectedStudent', 'authentication'];
    function SectionAssistCtrl($scope, $state, professors, $modal, selectedCourse, selectedSection, selectedStudent, authentication) {
        var vm = this;
        var user = authentication.currentUser();
        var professorid = user._id;
        vm.section = [];
        vm.lectures = 0;
        vm.percentage = 0;
        vm.positive = 0;
        vm.professor = null;
        vm.students = [];
        vm.studentsPassed = [];
        vm.negative = 0;
        vm.flag = false;
        vm.positiveTotal = 0; 
        vm.negativeTotal = 0;

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
                vm.lectures = vm.section.students[0].assistance;
                angular.forEach (vm.section.students,
                    function (value){
                        
                        vm.subTotal = 0;
                        angular.forEach (value.assistanceTotal,
                            function (valued){

                                if (valued.assistance) {
                                    vm.positive++;
                                } else {
                                    vm.negative++;
                                }
                                vm.subTotal = vm.positive + vm.negative;
                        });
                        if(((vm.positive/vm.subTotal)*100)>75){
                            vm.studentsPassed.push(value);
                        }else{
                            vm.students.push(value);
                            vm.flag = true;
                            
                        } 
                        vm.positiveTotal = vm.positiveTotal + vm.positive; 
                        vm.negativeTotal = vm.negativeTotal + vm.negative;
                        vm.positive = 0;
                        vm.negative = 0;
                        vm.subTotal = 0;
                });
                vm.total = vm.positiveTotal + vm.negativeTotal;
                vm.percentage = (vm.positiveTotal/vm.total)*100; 
            },
            function (){
                console.log("Error al obtener los datos.");
        });

        vm.back = function (index) {
            $state.go('sectionReport');
        };
    };
})();