(function(){
    'use strict';

    angular
        .module('app.reports')
        .controller('StudentReportCtrl', StudentReportCtrl)

    StudentReportCtrl.$inject = 
    ['$scope', '$rootScope', '$state', 'professors', '$modal', 'selectedCourse', 'selectedSection', 'selectedStudent'];
    function StudentReportCtrl($scope, $rootScope, $state, professors, $modal, selectedCourse, selectedSection, selectedStudent) {
        var vm = this;
        var professorid = $rootScope.professorId;
        vm.section = [];
        vm.professor = null;

        professors.get({ id: professorid },
            function (successResult){
                vm.professor = successResult;
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
