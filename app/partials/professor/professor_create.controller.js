(function(){
    'use strict';

    angular
        .module('app.professor')
        .controller('ProfessorCreateCtrl', ProfessorCreateCtrl)

    ProfessorCreateCtrl.$inject = 
    ['$scope', '$state', 'professors', '$modal','authentication'];
    function ProfessorCreateCtrl($scope, $state, professors, $modal, authentication){
        
        var vm = this;
        vm.botonOk = false;
        vm.mensaje = "";
        vm.submit = function() {

            if (vm.data_input_form.$valid){
                var professor = {
                    "id": vm.profesor.Cedula,
                    "name": vm.profesor.Nombre,
                    "lastname": vm.profesor.Apellido,
                    "email": vm.profesor.Correo,
                    "number": vm.profesor.Telefono,
                    "role": "admin",
                    "password": vm.profesor.Password
                };

                $scope.modalInstance = $modal.open({
                    templateUrl: 'partials/professor/modal/create_professor_modal.html',
                    scope: $scope,
                    size: 'sm',
                    resolve: {
                        items: function () {
                        }
                    }
                });

                professors.save(professor,
                    function(data){
                        authentication.saveToken(data.token);
                        vm.botonOk = true;
                        vm.mensaje = 
                        "Profesor " + vm.profesor.Apellido + ", " + vm.profesor.Nombre + " agregado";
                    },
                    function(){
                        vm.botonOk = true;
                        vm.mensaje = 
                        "Error al agregar al profesor " + vm.profesor.Apellido + ", " + vm.profesor.Nombre;
                    });
            }else{
                vm.submitted = true;
            }
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
