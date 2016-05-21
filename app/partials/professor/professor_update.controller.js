(function(){
    'use strict';

    angular
        .module('app.professor')
        .controller('ProfessorUpdateCtrl', ProfessorUpdateCtrl)

   ProfessorUpdateCtrl.$inject = 
    ['$scope', '$state', 'professors', '$modal', 'profesorSeleccionado' ];
    function ProfessorUpdateCtrl ( $scope, $state, professors, $modal, profesorSeleccionado ){
        
        var vm = this;
        vm.botonOk = false;
        vm.mensaje = "";
        vm.profesor = profesorSeleccionado;


        vm.submit = function() {

            var professor = {
                "id": vm.profesor.Cedula,
                "name": vm.profesor.Nombre,
                "lastname": vm.profesor.Apellido,
                "email": vm.profesor.Correo,
                "number": vm.profesor.Telefono,
                "role": "professor",
                "password": vm.profesor.Password
            };

            $scope.modalInstance = $modal.open({
                templateUrl: 'partials/professor/modal/update_professor_modal.html',
                scope: $scope,
                size: 'sm',
            });

            professors.update({ id: vm.profesor._id}, professor, 
                function(){
                    vm.botonOk = true;
                    vm.botonCancelar = false;
                    vm.mensaje = 
                    "Profesor " + vm.profesor.Apellido + ", " + vm.profesor.Nombre + " actualizado";
                },
                function(){
                    vm.botonOk = true;
                    vm.botonCancelar = false;
                    vm.mensaje = 
                    "Error al modificar al profesor " + vm.profesor.Apellido + ", " + vm.profesor.Nombre;
                });
        }

        $scope.ok = function () {
            $state.go('ProfessorList');
            $scope.modalInstance.dismiss('cancel');
        };

        $scope.cancel = function () {
            $scope.modalInstance.dismiss('cancel');
        };

        vm.back = function () {
            $state.go('ProfessorList');
        };  
    };
})();