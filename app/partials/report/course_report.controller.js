(function(){
    'use strict';

    angular
        .module('app.reports')
        .controller('CourseReportCtrl', CourseReportCtrl)

    CourseReportCtrl.$inject = 
    ['$scope', '$rootScope', '$state', 'professors', '$modal', 'profesorSeleccionado', 'selectedCourse'];
    function CourseReportCtrl($scope, $rootScope, $state, professors, $modal, profesorSeleccionado, selectedCourse) {
        var vm = this;
        var professorid = $rootScope.professorId;

        professors.get({ id: professorid }, 
            function (successResult){
                vm.professor = successResult;
                vm.course = vm.professor.courses;
            }, 
            function (){
                console.log("Error al obtener los datos.");
        });

        vm.courseReports = function (index) {
            selectedCourse._id = vm.course[index]._id;
            $state.go('courseAssist');
        };

        vm.listSections = function (index) {
            selectedCourse._id = vm.course[index]._id;
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
