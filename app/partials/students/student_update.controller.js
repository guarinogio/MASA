(function(){
    'use strict';

    angular
        .module('app.student')
        .controller('StudentUpdateCtrl', StudentUpdateCtrl)

    StudentUpdateCtrl.$inject = ['$scope', '$rootScope', '$state', 'professors', '$modal', 'selectedSection', 'selectedCourse', 'data'];
    function StudentUpdateCtrl($scope, $rootScope, $state, professors, $modal, selectedSection, selectedCourse, data){
        
        var vm = this;
        var professorid = $rootScope.professorId;
        vm.professor = {};
        $rootScope.mensaje = "";
        $rootScope.actOk = false;
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
                $rootScope.crearEstudianteLoading = true;
                $rootScope.botonOk = false;
                $scope.modalInstance = $modal.open({
                    animation: $rootScope.animationsEnabled,
                    templateUrl: 'partials/students/modal/update_students_modal.html',
                    scope: $scope,
                    size: 'sm',
                    resolve: {
                        items: function () {
                            return $rootScope.items;
                        }
                    }
                });

                vm.professor.courses[selectedCourse.index].sections[selectedSection.index].students.splice(data.Index, 1);

                vm.professor.courses[selectedCourse.index].sections[selectedSection.index].students.push(vm.student);

                professors.update({ id: professorid }, vm.professor,
                    function(){
                        $rootScope.botonOk = true;
                        $rootScope.mensaje = "Estudiante " + vm.student.lastname + ", " + vm.student.name + " actualizado";
                    },
                    function(){
                        $rootScope.botonOk = true;
                        $rootScope.mensaje = "Error al actualizar al estudiante " + vm.estudiante.Apellido + ", " + vm.estudiante.Nombre;
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