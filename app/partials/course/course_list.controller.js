(function(){
    'use strict';

    angular
        .module('app.course')
        .controller('CourseListCtrl',CourseListCtrl)
        
    CourseListCtrl.$inject = 
    ['$scope', '$state', 'professors', '$modal', 'profesorSeleccionado', 'selectedCourse', 'authentication'];
    function CourseListCtrl($scope, $state, professors, $modal, profesorSeleccionado, selectedCourse, authentication) {
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
        vm.listarSecciones = function (index) {
            selectedCourse._id = vm.course[index]._id;
            $state.go('SectionList');
        };
                
        vm.eliminarMateriaModal = function (index) {
            $scope.index = index;
            $scope.botonOk = true;
            $scope.otroBotonOk = false;
            $scope.botonCancelar = true;
            var name = vm.course[index].name;
            $scope.mensaje = "¿Seguro que desea eliminar la Materia "+name+"?";
            $scope.modalInstance = $modal.open({
                templateUrl: '/partials/course/modal/delete_course_modal.html',
                scope: $scope,
                size: 'sm',
                resolve: {
                  items: function () {
                  }
                }
            });
            
        };
        
        vm.eliminarMateria = function (index) {
            $scope.botonOk = false;
            $scope.otroBotonOk = true;
            $scope.botonCancelar = false;
            var name = vm.course[index].name;
            vm.professor.courses.splice(index, 1);
            
            professors.update({ id: professorid }, vm.professor,
                function () {
                    $scope.mensaje = "Materia " + name + " eliminada";
                },
                function () {
                    $scope.mensaje = "Error eliminando la materia" + name;
                });   
        };

        $scope.ok = function (urlLo) {
            $state.go('CourseList');
            $scope.modalInstance.dismiss('cancel');
        };

        $scope.cancel = function () {
            $scope.modalInstance.dismiss('cancel');
        };       
    };
})();