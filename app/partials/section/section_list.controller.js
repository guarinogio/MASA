(function(){
    'use strict';

    angular
        .module('app.section')
        .controller('SectionListCtrl', SectionListCtrl)

    SectionListCtrl.$inject = [ '$scope', '$rootScope', '$state', 'professors', '$modal', 'selectedCourse', 'selectedSection'];
    function SectionListCtrl ( $scope, $rootScope, $state, professors, $modal, selectedCourse, selectedSection ){
        var vm = this;
        var professorid = $rootScope.professorId;
        vm.section = [];
        vm.professor = null;

        professors.get({ id: professorid },
            function (successResult){
                vm.professor = successResult;
                angular.forEach (vm.professor.courses, 
                    function (value, key){
                        if (value._id == selectedCourse._id ) {
                            vm.index = key;
                            vm.section = value.sections;
                        }
                    }); 
            },
            function (){
                console.log("Error al obtener los datos.");

            });

        /**************************Eliminar Matricula**************************/
        /* En este proceso, primero se llama a un Modal el cual se cerciora que
        el usuario se asegure de eliminar la matricula escogida, el usuario al 
        confirmar su decision llama automaticamente a la funcion que hara la 
        llamada a servicio que borrara la matricula de la base de datos.
        */

        vm.createSection = function () {
            $state.go('SectionCreate');
        };

        vm.eliminarMatriculaModal = function (index) {
            $rootScope.index = index;   
            $rootScope.botonOk = true;
            $rootScope.otroBotonOk = false;
            $rootScope.botonCancelar = true;
            $rootScope.rsplice = false;
            $rootScope.mensaje = "¿Seguro que desea eliminar la sección?";
            
            $scope.modalInstance = $modal.open({
                animation: $rootScope.animationsEnabled,
                templateUrl: '/partials/section/modal/delete_section_modal.html',
                scope: $scope,
                size: 'sm',
                resolve: {
                    items: function () {
                        return "";
                    }
                }
            });
        };

        vm.eliminarMatricula = function (index) {
            $rootScope.botonOk = false;
            $rootScope.otroBotonOk = true;
            $rootScope.botonCancelar = false;
            var name = vm.section[index].name;

            vm.professor.courses[vm.index].sections.splice(index, 1);
            professors.update({ id: professorid }, vm.professor, 
                function () {
                    $rootScope.rsplice = true;
                    $rootScope.mensaje = "Sección " + name + " eliminada";
                },
                function () {
                    $rootScope.mensaje = "Error eliminando la sección " + name;
                });
        };

        /*************************Fin de Eliminar Matricula*******************/

        vm.modificarMatricula = function (index) {
            selectedSection._id = vm.section[index]._id;
            selectedCourse.index = vm.index;
            $state.go('SectionUpdate');
        };

        $scope.ok = function (urlLo) {
            $state.go('SectionList');
            $scope.modalInstance.dismiss('cancel');
        };
       
        $scope.cancel = function () {
            $scope.modalInstance.dismiss('cancel');
        };

        vm.back = function () {
            $state.go('CourseList');
        };      
    };
})();