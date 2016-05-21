(function(){
    'use strict';

    angular
        .module('app.reports')
        .controller('CourseReportCtrl', CourseReportCtrl)

    CourseReportCtrl.$inject = 
    ['$scope', '$state', 'professors', '$modal', 'profesorSeleccionado', 'selectedCourse', 'authentication'];
    function CourseReportCtrl($scope, $state, professors, $modal, profesorSeleccionado, selectedCourse, authentication) {
        var vm = this;
        var user = authentication.currentUser();
        var professorid = user._id;

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
