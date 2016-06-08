(function(){
    'use strict';

    angular
        .module('app.professor')
        .controller('ProfessorUpdateCtrl', ProfessorUpdateCtrl)

   ProfessorUpdateCtrl.$inject = 
    ['$scope', '$state', 'professors', '$modal', 'profesorSeleccionado', 'data', 'passwordReset' ];
    function ProfessorUpdateCtrl ( $scope, $state, professors, $modal, profesorSeleccionado, data, passwordReset){
        
        var vm = this;
        vm.botonOk = false;
        vm.id = data.professorId;
        vm.mensaje = "";
        vm.profesor = null;

        professors.get({id:vm.id},
            function(success){
                vm.profesor = success;
                //vm.profesor.Password 
            },
            function(){
                console.log("Error obteniendo profesor");
            })


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
                size: 'sm'
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
        vm.newPassword = function (){
            vm.mensaje = "Inserte el nuevo Password del profesor "+ vm.profesor.lastname;
            vm.invalid = false;
            vm.showFields = true;
            vm.showButton = false;
            $scope.modalInstance = $modal.open({
                templateUrl: 'partials/professor/modal/new_password_modal.html',
                scope: $scope,
                size: 'md'
            });
        }

        vm.checkPassword = function (){
            if(vm.Password1!=vm.Password2){
                vm.invalid = true;
            }else{
                vm.invalid = false;
                vm.showFields = false;
                vm.showButton = true;
                var updatedProfessor = {
                    "id": vm.profesor.id,
                    "name": vm.profesor.name,
                    "lastname": vm.profesor.lastname,
                    "email": vm.profesor.email,
                    "number": vm.profesor.number,
                    "role": "professor",
                    "password": vm.Password1
                };

                passwordReset.update({ id: vm.profesor._id}, updatedProfessor, 
                    function(){
                        vm.botonOk = true;
                        vm.mensaje = 
                        "Contraseña actualizada";
                    },
                    function(){
                        vm.botonOk = true;
                        vm.mensaje = 
                        "Error al modificar contraseña";
                    });
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