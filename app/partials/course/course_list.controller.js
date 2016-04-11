(function(){
    'use strict';

    angular
        .module('app.course')
        .controller('CourseListCtrl',CourseListCtrl)
        
    CourseListCtrl.$inject = 
    ['$scope', '$rootScope', '$state', 'professors', '$modal', 'profesorSeleccionado', 'selectedCourse'];
    function CourseListCtrl($scope, $rootScope, $state, professors, $modal, profesorSeleccionado, selectedCourse) {
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
        vm.listarSecciones = function (index) {
            selectedCourse._id = vm.course[index]._id;
            $state.go('SectionList');
        };
                
        vm.eliminarMateriaModal = function (index) {
            $rootScope.index = index;
            $rootScope.botonOk = true;
            $rootScope.otroBotonOk = false;
            $rootScope.botonCancelar = true;
            $rootScope.rsplice = false;
            $rootScope.mensaje = "¿Seguro que desea eliminar la materia?";
            $scope.modalInstance = $modal.open({
                animation: $rootScope.animationsEnabled,
                templateUrl: '/partials/course/modal/delete_course_modal.html',
                scope: $scope,
                size: 'sm',
                resolve: {
                  items: function () {
                    return "";
                  }
                }
            });
            
        };
        
        vm.eliminarMateria = function (index) {
            $rootScope.botonOk = false;
            $rootScope.otroBotonOk = true;
            $rootScope.botonCancelar = false;
            var name = vm.course[index].name;
            vm.professor.courses.splice(index, 1);
            
            professors.update({ id: professorid }, vm.professor,
                function () {
                    $rootScope.mensaje = "Materia " + name + " eliminada";
                },
                function () {
                    $rootScope.mensaje = "Error eliminando la materia" + name;
                });   
        };

        $scope.ok = function (urlLo) {
            $state.go('CourseList');
            $scope.modalInstance.dismiss('cancel');
        };

        $scope.cancel = function () {
            $scope.modalInstance.dismiss('cancel');
        };

        $rootScope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $rootScope.opened = true;
        };

        return vm;        
    };
})();