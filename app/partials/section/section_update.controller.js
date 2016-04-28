(function(){
    'use strict';

    angular
        .module('app.section')
        .controller('SectionUpdateCtrl', SectionUpdateCtrl)    

    SectionUpdateCtrl.$inject = ['$scope', '$rootScope', '$state', 'professors', '$modal', 'selectedSection', 'selectedCourse','data'];
    function SectionUpdateCtrl($scope, $rootScope, $state, professors, $modal, selectedSection, selectedCourse, data){
        var professorid = $rootScope.professorId;
        var vm = this;
        vm.section = {};
        vm.students = [];

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

        vm.addStudent = function () {
            $state.go('StudentCreate');
        };

        vm.mailUpdate = function (index) {
            data.Student = vm.students[index];
            data.Index = index;
            $state.go('StudentUpdate');
        };

        vm.freeBTAddressModal = function (index) {
            $rootScope.index = index;
            $rootScope.botonOk = true;
            $rootScope.otroBotonOk = false;
            $rootScope.botonCancelar = true;
            $rootScope.eliminarLoading = false;
            $rootScope.mensaje = "¿Desea liberar la dirección de BT del estudiante "+ vm.students[index].lastname +", "+ vm.students[index].name + "?";
            $scope.modalInstance = $modal.open({
                animation: $rootScope.animationsEnabled,
                templateUrl: 'partials/section/modal/student_bt_removal_modal.html',
                scope: $scope,
                size: 'sm',
                resolve: {
                    items: function () {
                        return "";
                    }
                }
            });
        };

        vm.freeBTAddress = function (index) {
            vm.student = vm.students[index];
            vm.student.btaddress = null;

            vm.professor.courses[selectedCourse.index].sections[selectedSection.index].students.push(vm.student);

                professors.update({ id: professorid }, vm.professor,
                    function(){
                        $rootScope.botonOk = false;
                        $rootScope.otroBotonOk = true;
                        $rootScope.botonCancelar = false;
                        $rootScope.mensaje = "Dirección BT de " + vm.student.lastname + ", " + vm.student.name + " fue liberada";
                    },
                    function(){
                        $rootScope.botonOk = false;
                        $rootScope.otroBotonOk = true;
                        $rootScope.botonCancelar = false;
                        $rootScope.mensaje = "Error al liberar dirección de BT del estudiante " + vm.estudiante.Apellido + ", " + vm.estudiante.Nombre;
                });
        };

        vm.retirarEstudianteModal = function (index) {
            $rootScope.index = index;
            $rootScope.botonOk = true;
            $rootScope.otroBotonOk = false;
            $rootScope.botonCancelar = true;
            $rootScope.eliminarLoading = false;
            $rootScope.mensaje = "¿Desea retirar al estudiante "+ vm.students[index].lastname +", "+ vm.students[index].name + "?";
            $scope.modalInstance = $modal.open({
                animation: $rootScope.animationsEnabled,
                templateUrl: 'partials/section/modal/update_section_modal.html',
                scope: $scope,
                size: 'sm',
                resolve: {
                    items: function () {
                        return "";
                    }
                }
            });
        };

        vm.retirarEstudiante = function (index) {
            vm.professor.courses[selectedCourse.index].sections[selectedSection.index].students.splice(index, 1);

            professors.update({ id: professorid }, vm.professor,
            function (){
                $rootScope.botonOk = false;
                $rootScope.otroBotonOk = true;
                $rootScope.botonCancelar = false;
                $rootScope.mensaje = "Sección "+ vm.section.name +" actualizada";
            },
            function (){
                $rootScope.botonOk = false;
                $rootScope.otroBotonOk = true;
                $rootScope.botonCancelar = false;
                $rootScope.mensaje = "Error al actualizar la Sección "+ vm.section.name;
            });
        };

        $scope.ok = function () {
            $scope.modalInstance.dismiss('cancel');
        };
       
        $scope.cancel = function () {
             $scope.modalInstance.dismiss('cancel');
        };      

        vm.back = function () {
            $state.go('SectionList');
        };  
    };

})();