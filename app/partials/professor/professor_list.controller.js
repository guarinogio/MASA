(function(){
    'use strict';

    angular
        .module('app.professor')
        .controller('ProfessorListCtrl', ProfessorListCtrl)

    ProfessorListCtrl.$inject = 
    [ '$scope', '$rootScope', '$state', 'professors', '$modal', 'profesorSeleccionado' ];
    function ProfessorListCtrl( $scope, $rootScope, $state, professors, $modal, profesorSeleccionado ){
        
        var vm = this;
        vm.lista = true;
        $rootScope.actOk = false;
        $rootScope.loading = true;
        $rootScope.table = false;

        var profesorArray = [];
        professors.query(
            function (successResult){
               vm.profesor = successResult;
                angular.forEach(vm.profesor, function (value){
                    profesorArray.push({
                        Cedula:value.id,
                        Nombre:value.name,
                        Apellido:value.lastname,
                        Telefono:value.number,
                        Correo: value.email
                    });
                });
                $rootScope.loading = false;
                $rootScope.table = true;
                vm.listaProfesor = profesorArray;
                
            },
            function(){
                console.log("Error al obtener los datos.");
            });

        vm.eliminarProfesorModal = function (index) { 
            $rootScope.index = index;
            $rootScope.botonOK = true;
            $rootScope.botonCancelar = true;
            $rootScope.acceptButton = false;

            $rootScope.rsplice = false;
            $rootScope.mensaje = "¿Seguro que desea eliminar el Profesor?";

            $scope.modalInstance = $modal.open({
                animation: $rootScope.animationsEnabled,
                templateUrl: 'partials/professor/modal/list_professor_modal.html',
                scope: $scope,
                size: 'sm',
                resolve: {
                    items: function () {
                        return "";
                    }
                }
            });
        };

        vm.eliminarProfesor = function (index) {

            $rootScope.botonOK = false;
            $rootScope.acceptButton = true;
            $rootScope.botonCancelar = false;

            professors.delete({id: vm.profesor[index]._id}, 
                function () {
                    $rootScope.rsplice = true;
                    $rootScope.mensaje = 
                    "Profesor " + vm.profesor[index].name + " eliminado";
                },
                function () {
                    $rootScope.listarProfesorsLoading = false;
                    $rootScope.mensaje = 
                    "Error eliminando al Profesor " + vm.profesor[index].name;
                });
        };

        vm.removeProfesorSplice = function(index, rsplice) {
            if(rsplice){
                vm.listaProfesor.splice(index, 1);
                $rootScope.rsplice = false;
            }
        };

        vm.modificarProfesor = function (index) {
            profesorSeleccionado._id = vm.profesor[index]._id;
            profesorSeleccionado.Cedula = vm.profesor[index].id;
            profesorSeleccionado.Nombre = vm.profesor[index].name;
            profesorSeleccionado.Apellido = vm.profesor[index].lastname;
            profesorSeleccionado.Telefono = vm.profesor[index].number;
            profesorSeleccionado.Correo = vm.profesor[index].email;
            $state.go('ProfessorUpdate');
        };

        $rootScope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $rootScope.opened = true;
        };

        $scope.ok = function (urlLo) {
            $state.reload();
            $scope.modalInstance.dismiss('cancel');
        };

        $scope.cancel = function () {
            $scope.modalInstance.dismiss('cancel');
        };

        return vm;
    };
})();