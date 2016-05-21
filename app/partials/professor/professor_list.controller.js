(function(){
    'use strict';

    angular
        .module('app.professor')
        .controller('ProfessorListCtrl', ProfessorListCtrl)

    ProfessorListCtrl.$inject = 
    [ '$scope', '$state', 'professors', '$modal', 'profesorSeleccionado' ];
    function ProfessorListCtrl( $scope, $state, professors, $modal, profesorSeleccionado ){
        
        var vm = this;
        vm.lista = true;

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
                vm.listaProfesor = profesorArray;
                
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

            professors.delete({id: vm.profesor[index]._id}, 
                function () {
                    vm.rsplice = true;
                    vm.mensaje = 
                    "Profesor " + vm.profesor[index].name + " eliminado";
                },
                function () {
                    vm.mensaje = 
                    "Error eliminando al Profesor " + vm.profesor[index].name;
                });
        };

        vm.removeProfesorSplice = function(index, rsplice) {
            if(vm.rsplice){
                vm.listaProfesor.splice(index, 1);
                vm.rsplice = false;
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

        $scope.ok = function () {
            $state.reload();
            $scope.modalInstance.dismiss('cancel');
        };

        $scope.cancel = function () {
            $scope.modalInstance.dismiss('cancel');
        };
    };
})();