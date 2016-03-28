(function(){
    'use strict';

    angular
        .module('app.professor')
        .controller('listarProfesorCtrl', listarProfesorCtrl)
        .controller('crearProfesorCtrl', crearProfesorCtrl)
        .controller('actualizarProfesorCtrl', actualizarProfesorCtrl)

    listarProfesorCtrl.$inject = 
    [ '$scope', '$rootScope', '$location', 'professors', '$modal', 'profesorSeleccionado' ];
    function listarProfesorCtrl( $scope, $rootScope, $location, professors, $modal, profesorSeleccionado ){
        
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
            $rootScope.urlLo = 'listarProfesor';

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
            profesorSeleccionado.Apellido= vm.profesor[index].lastname;
            profesorSeleccionado.Telefono = vm.profesor[index].number;
            profesorSeleccionado.Correo= vm.profesor[index].email;
            $location.url('actualizarProfesor');
        };

        $rootScope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $rootScope.opened = true;
        };

        $scope.ok = function (urlLo) {
            $location.url(urlLo);
            $scope.modalInstance.dismiss('cancel');
        };

        $scope.cancel = function () {
            $scope.modalInstance.dismiss('cancel');
        };

        return vm;
    };

    crearProfesorCtrl.$inject = 
    ['$scope','$rootScope', '$location', 'professors', '$modal'];
    function crearProfesorCtrl($scope, $rootScope, $location, professors, $modal){
        
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
                        $rootScope.urlLo = 'listarProfesor';
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
            $location.url(urlLo);
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

    actualizarProfesorCtrl.$inject = 
    ['$scope','$rootScope', '$location', 'professors', '$modal', 'profesorSeleccionado' ];
    function actualizarProfesorCtrl ( $scope, $rootScope, $location, professors, $modal, profesorSeleccionado ){
        
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
                    $rootScope.urlLo = 'listarProfesor';
                    $rootScope.mensaje = 
                    "Profesor " + vm.profesor.Apellido + ", " + vm.profesor.Nombre + " actualizado";
                },
                function(){
                    $rootScope.botonOk = true;
                    $rootScope.botonCancelar = false;
                    $rootScope.urlLo = 'listarProfesor';
                    $rootScope.mensaje = 
                    "Error al modificar al profesor " + vm.profesor.Apellido + ", " + vm.profesor.Nombre;
                });
        }

        $scope.ok = function (urlLo) {
            $location.url(urlLo);
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