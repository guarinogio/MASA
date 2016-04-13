(function(){
    'use strict';

    angular
        .module('app.professor')
        .controller('ProfessorUpdateCtrl', ProfessorUpdateCtrl)

   ProfessorUpdateCtrl.$inject = 
    ['$scope','$rootScope', '$state', 'professors', '$modal', 'profesorSeleccionado' ];
    function ProfessorUpdateCtrl ( $scope, $rootScope, $state, professors, $modal, profesorSeleccionado ){
        
        var vm = this;
        vm.profesor = profesorSeleccionado;
        $rootScope.mensaje = "";
        $rootScope.actOk = false;

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

            $rootScope.botonOk = false;
            $scope.modalInstance = $modal.open({
                animation: $rootScope.animationsEnabled,
                templateUrl: 'partials/professor/modal/update_professor_modal.html',
                scope: $scope,
                size: 'sm',
                resolve: {
                    items: function () {
                        return $rootScope.items;
                    }
                }
            });

            professors.update({ id: vm.profesor._id}, professor, 
                function(){
                    $rootScope.botonOk = true;
                    $rootScope.botonCancelar = false;
                    $rootScope.mensaje = 
                    "Profesor " + vm.profesor.Apellido + ", " + vm.profesor.Nombre + " actualizado";
                },
                function(){
                    $rootScope.botonOk = true;
                    $rootScope.botonCancelar = false;
                    $rootScope.mensaje = 
                    "Error al modificar al profesor " + vm.profesor.Apellido + ", " + vm.profesor.Nombre;
                });
        }

        $scope.ok = function (urlLo) {
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