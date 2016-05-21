(function(){
    'use strict';

    angular
        .module('app.student')
        .controller('StudentUpdateCtrl', StudentUpdateCtrl)

    StudentUpdateCtrl.$inject = ['$scope', '$state', 'professors', '$modal', 'selectedSection', 'selectedCourse', 'data', 'authentication'];
    function StudentUpdateCtrl($scope, $state, professors, $modal, selectedSection, selectedCourse, data, authentication){
        
        var vm = this;
        var user = authentication.currentUser();
        var professorid = user._id;
        vm.professor = {};
        vm.mensaje = "";
        vm.actOk = false;
        vm.newMail = null;
        vm.student = data.Student

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

        vm.submit = function() {

            if (vm.data_input_form.$valid){
                vm.student.email = vm.newMail;
                vm.botonOk = false;
                $scope.modalInstance = $modal.open({
                    templateUrl: 'partials/students/modal/update_students_modal.html',
                    scope: $scope,
                    size: 'sm'
                });

                vm.professor.courses[selectedCourse.index].sections[selectedSection.index].students.splice(data.Index, 1);

                vm.professor.courses[selectedCourse.index].sections[selectedSection.index].students.push(vm.student);

                professors.update({ id: professorid }, vm.professor,
                    function(){
                        vm.botonOk = true;
                        vm.mensaje = "Estudiante " + vm.student.lastname + ", " + vm.student.name + " actualizado";
                    },
                    function(){
                        vm.botonOk = true;
                        vm.mensaje = "Error al actualizar al estudiante " + vm.estudiante.Apellido + ", " + vm.estudiante.Nombre;
                });
            }
        };

        $scope.ok = function (urlLo) {
            $state.go('SectionUpdate');
            $scope.modalInstance.dismiss('cancel');
        };

        $scope.cancel = function () {
            $scope.modalInstance.dismiss('cancel');
        };

        vm.back = function () {
            $state.go('SectionUpdate');
        };  
    };
})();