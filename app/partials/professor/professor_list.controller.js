(function(){
    'use strict';

    angular
        .module('app.professor')
        .controller('ProfessorListCtrl', ProfessorListCtrl)

    ProfessorListCtrl.$inject = 
    [ '$scope', '$state', 'professors', '$modal', 'profesorSeleccionado','data' ];
    function ProfessorListCtrl( $scope, $state, professors, $modal, profesorSeleccionado, data ){
        
        var vm = this;
        vm.lista = true;

        var profesorArray = [];
        professors.query(
            function (successResult){
                vm.professors = successResult;
                vm.listaProfesor = vm.professors;
                
            },
            function(){
                console.log("Error al obtener los datos.");
            });

        vm.eliminarProfesorModal = function (index) { 
            $scope.index = index;
            vm.botonOK = true;
            vm.botonCancelar = true;
            vm.acceptButton = false;

            vm.rsplice = false;
            vm.mensaje = "¿Seguro que desea eliminar el Profesor?";

            $scope.modalInstance = $modal.open({
                templateUrl: 'partials/professor/modal/list_professor_modal.html',
                scope: $scope,
                size: 'sm'
            });
        };

        vm.eliminarProfesor = function (index) {
            vm.botonOK = false;
            vm.acceptButton = true;
            vm.botonCancelar = false;

            professors.delete({id: vm.professors[index]._id}, 
                function () {
                    vm.rsplice = true;
                    vm.mensaje = 
                    "Profesor " + vm.professors[index].name + " eliminado";
                },
                function () {
                    vm.mensaje = 
                    "Error eliminando al Profesor " + vm.professors[index].name;
                });
        };

        vm.removeProfesorSplice = function(index, rsplice) {
            if(vm.rsplice){
                vm.listaProfesor.splice(index, 1);
                vm.rsplice = false;
            }
        };

        vm.modificarProfesor = function (index) {
            data.professorId = vm.professors[index]._id;
            $state.go('ProfessorUpdate');
        };

        $scope.ok = function () {
            $state.reload();
            $scope.modalInstance.dismiss('cancel');
        };

        $scope.cancel = function () {
            $scope.modalInstance.dismiss('cancel');
        };
    };
})();