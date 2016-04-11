(function(){
    'use strict';

    angular
        .module('app.professor')
        .controller('ProfessorCreateCtrl', ProfessorCreateCtrl)

    ProfessorCreateCtrl.$inject = 
    ['$scope','$rootScope', '$state', 'professors', '$modal'];
    function ProfessorCreateCtrl($scope, $rootScope, $state, professors, $modal){
        
        var vm = this;
        $rootScope.mensaje = "";
        vm.submit = function() {

            if (vm.data_input_form.$valid){
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
                    templateUrl: 'partials/professor/modal/create_professor_modal.html',
                    scope: $scope,
                    size: 'sm',
                    resolve: {
                        items: function () {
                            return $rootScope.items;
                        }
                    }
                });

                professors.save(professor,
                    function(){
                        $rootScope.botonOk = true;
                        $rootScope.mensaje = 
                        "Profesor " + vm.profesor.Apellido + ", " + vm.profesor.Nombre + " agregado";
                    },

                    function(){
                        $rootScope.botonOk = true;
                        $rootScope.urlLo = 'listarProfesor';
                        $rootScope.mensaje = 
                        "Error al agregar al profesor " + vm.profesor.Apellido + ", " + vm.profesor.Nombre;
                    });
            }else{

                vm.submitted = true;
            }
        }

        $scope.ok = function (urlLo) {
            $state.go('ProfessorList');
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