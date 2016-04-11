(function(){
    'use strict';

    angular
        .module('app.section')
        .controller('SectionUpdateCtrl', SectionUpdateCtrl)    

    SectionUpdateCtrl.$inject = ['$scope', '$rootScope', '$state', 'professors', '$modal', 'selectedSection', 'selectedCourse'];
    function SectionUpdateCtrl($scope, $rootScope, $state, professors, $modal, selectedSection, selectedCourse){
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

        vm.addStudent = function (index) {
            $state.go('StudentCreate');
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

        $rootScope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $rootScope.opened = true;
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

        return vm;
    };

})();