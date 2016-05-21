(function(){
    'use strict';

    angular
        .module('app.reports')
        .controller('StudentReportCtrl', StudentReportCtrl)

    StudentReportCtrl.$inject = 
    ['$scope', '$state', 'professors', '$modal', 'selectedCourse', 'selectedSection', 'selectedStudent', 'authentication'];
    function StudentReportCtrl($scope, $state, professors, $modal, selectedCourse, selectedSection, selectedStudent, authentication) {
        var vm = this;
        var user = authentication.currentUser();
        var professorid = user._id;
        vm.section = [];
        vm.professor = null;

        professors.get({ id: professorid },
            function (successResult){
                vm.professor = successResult;
                vm.course = vm.professor.courses[selectedCourse.index].name;
                angular.forEach (vm.professor.courses[selectedCourse.index].sections, 
                    function (value, key){
                        if (value._id == selectedSection._id ) {
                            selectedSection.index = key;
                            vm.students = value.students;
                            vm.section = value; 
                        }   
                    }); 
            },
            function (){
                console.log("Error al obtener los datos.");
        });

        vm.studentReports = function (index) {
            selectedStudent._id = vm.students[index]._id;
            $state.go('studentAssist');
        };

        vm.back = function (index) {
            $state.go('sectionReport');
        };

        $scope.ok = function () {
            $scope.modalInstance.dismiss('cancel');
        };

        $scope.cancel = function () {
            $scope.modalInstance.dismiss('cancel');
        };
    };
})();
