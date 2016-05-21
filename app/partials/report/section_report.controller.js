(function(){
    'use strict';

    angular
        .module('app.reports')
        .controller('SectionReportCtrl', SectionReportCtrl)

    SectionReportCtrl.$inject = 
    ['$scope', '$state', 'professors', '$modal', 'profesorSeleccionado', 'selectedCourse', 'selectedSection', 'authentication'];
    function SectionReportCtrl($scope, $state, professors, $modal, profesorSeleccionado, selectedCourse, selectedSection, authentication) {
        var vm = this;
        var user = authentication.currentUser();
        var professorid = user._id;
        vm.section = [];
        vm.professor = null;

        professors.get({ id: professorid },
            function (successResult){
                vm.professor = successResult;
                angular.forEach (vm.professor.courses, 
                    function (value, key){
                        if (value._id == selectedCourse._id ) {
                            vm.course = value.name;
                            vm.index = key;
                            vm.section = value.sections;
                        }
                    }); 
            },
            function (){
                console.log("Error al obtener los datos.");
        });

        vm.back = function (index) {
            $state.go('courseReport');
        };

        vm.sectionReport = function (index) {
            selectedSection._id = vm.section[index]._id;
            selectedCourse.index = vm.index;
            $state.go('sectionAssist');
        };

        vm.listStudents = function (index) {
            selectedSection._id = vm.section[index]._id;
            selectedCourse.index = vm.index;
            $state.go('studentReport');
        };

        $scope.ok = function () {
            $scope.modalInstance.dismiss('cancel');
        };

        $scope.cancel = function () {
            $scope.modalInstance.dismiss('cancel');
        };
    };

})();
