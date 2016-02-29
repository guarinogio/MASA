(function(){
    'use strict';

    angular
        .module('app.student')
        .controller('listarEstudianteCtrl', listarEstudianteCtrl)
        .controller('crearEstudianteCtrl', crearEstudianteCtrl)
        .controller('actualizarEstudianteCtrl', actualizarEstudianteCtrl)

    listarEstudianteCtrl.$inject = [ '$scope', '$rootScope', '$location', 'students', '$modal', 'estudianteSeleccionado' ];
    function listarEstudianteCtrl( $scope, $rootScope, $location, students, $modal, estudianteSeleccionado ){
        
        var vm = this;
        vm.lista = true;
        $rootScope.actOk = false;
        $rootScope.loading = true;
        $rootScope.table = false;

        var estudiantesArray = [];
        students.query(
            function(data){
               vm.estudiantes = data;
                angular.forEach(vm.estudiantes, function (value){
                    estudiantesArray.push({
                        Cedula:value.id,
                        Nombre:value.name,
                        Apellido:value.lastname,
                        Telefono:value.number,
                        Correo: value.email
                    });
                });
                $rootScope.loading = false;
                $rootScope.table = true;
                vm.listaEstudiantes = estudiantesArray;
                
            },
            function(){
                console.log("Error al obtener los datos.");
            });

        vm.eliminarEstudianteModal = function (index) { 
            $rootScope.index = index;
            $rootScope.botonOK = true;
            $rootScope.botonCancelar = true;
            $rootScope.acceptButton = false;

            $rootScope.rsplice = false;
            $rootScope.listarEstudiantesLoading = true;
            $rootScope.mensaje = "¿Seguro que desea eliminar el Estudiante?";

            $scope.modalInstance = $modal.open({
                animation: $rootScope.animationsEnabled,
                templateUrl: 'partials/students/modal/list_students_modal.html',
                scope: $scope,
                size: 'sm',
                resolve: {
                    items: function () {
                        return "";
                    }
                }
            });
        };

        vm.eliminarEstudiante = function (index) {

            $rootScope.botonOK = false;
            $rootScope.acceptButton = true;
            $rootScope.botonCancelar = false;
            $rootScope.urlLo = 'listarEstudiante';
            $rootScope.listarEstudiantesLoading = true;

            students.delete({id: vm.estudiantes[index]._id}, 
                function (successResult) {
                    $rootScope.listarEstudiantesLoading = false;
                    $rootScope.rsplice = true;
                    $rootScope.mensaje = "Usuario " + vm.estudiantes[index].name + " eliminado";
                },
                function (errorResult) {
                    $rootScope.listarEstudiantesLoading = false;
                    $rootScope.mensaje = "Error eliminando al Usuario " + vm.estudiantes[index].name;
                });
        };

        vm.removeEstudianteSplice = function(index, rsplice) {
            if(rsplice){
                vm.listaEstudiantes.splice(index, 1);
                $rootScope.rsplice = false;
            }
        };

        vm.modificarEstudiante = function (index) {
            estudianteSeleccionado._id = vm.estudiantes[index]._id;
            estudianteSeleccionado.Cedula = vm.estudiantes[index].id;
            estudianteSeleccionado.Nombre = vm.estudiantes[index].name;
            estudianteSeleccionado.Apellido= vm.estudiantes[index].lastname;
            estudianteSeleccionado.Telefono = vm.estudiantes[index].number;
            estudianteSeleccionado.Correo= vm.estudiantes[index].email;
            $location.url('actualizarEstudiante');
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

    crearEstudianteCtrl.$inject = ['$scope','$rootScope', '$location', 'students', '$modal'];
    function crearEstudianteCtrl($scope, $rootScope, $location, students, $modal){
        
        var vm = this;
        $rootScope.mensaje = "";
        $rootScope.actOk = false;

        vm.submit = function() {

            if (vm.data_input_form.$valid){
                var person = {
                    "id": vm.estudiante.Cedula,
                    "name": vm.estudiante.Nombre,
                    "lastname": vm.estudiante.Apellido,
                    "email": vm.estudiante.Correo,
                    "number": vm.estudiante.Telefono,
                };

                $rootScope.crearEstudianteLoading = true;
                $rootScope.botonOk = false;
                $scope.modalInstance = $modal.open({
                    animation: $rootScope.animationsEnabled,
                    templateUrl: 'partials/students/modal/create_students_modal.html',
                    scope: $scope,
                    size: 'sm',
                    resolve: {
                        items: function () {
                            return $rootScope.items;
                        }
                    }
                });

                students.save(person,
                    function(){
                        $rootScope.botonOk = true;
                        $rootScope.urlLo = 'listarEstudiante';
                        $rootScope.mensaje = "Estudiante " + vm.estudiante.Apellido + ", " + vm.estudiante.Nombre + " agregado";
                        $rootScope.crearEstudianteLoading = false;
                    },

                    function(){
                        $rootScope.botonOk = true;
                        $rootScope.urlLo = 'listarEstudiante';
                        $rootScope.mensaje = "Error al agregar al estudiante " + vm.estudiante.Apellido + ", " + vm.estudiante.Nombre;
                        $rootScope.crearEstudianteLoading = false;
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

    actualizarEstudianteCtrl.$inject = [ '$scope','$rootScope', '$location', 'students', '$modal', 'estudianteSeleccionado' ];
    function actualizarEstudianteCtrl ( $scope, $rootScope, $location, students, $modal, estudianteSeleccionado ){
        
        var vm = this;
        vm.estudiante = estudianteSeleccionado;
        $rootScope.mensaje = "";
        $rootScope.actOk = false;

        vm.submit = function() {

            var student = {
                "_id": vm.estudiante._id,
                "id": vm.estudiante.Cedula,
                "name": vm.estudiante.Nombre,
                "lastname": vm.estudiante.Apellido,
                "email": vm.estudiante.Correo,
                "number": vm.estudiante.Telefono,
            };

            $rootScope.botonOk = false;
            $rootScope.modificarEstudianteLoading = true;

            $scope.modalInstance = $modal.open({
                animation: $rootScope.animationsEnabled,
                templateUrl: 'partials/students/modal/update_students_modal.html',
                scope: $scope,
                size: 'sm',
                resolve: {
                    items: function () {
                        return $rootScope.items;
                    }
                }
            });

            students.update(student,
                function(){
                    $rootScope.botonOk = true;
                    $rootScope.botonCancelar = false;
                    $rootScope.urlLo = 'listarEstudiante';
                    $rootScope.mensaje = "Estudiante " + vm.estudiante.Apellido + ", " + vm.estudiante.Nombre + " actualizado";
                },
                function(){
                    $rootScope.botonOk = true;
                    $rootScope.botonCancelar = false;
                    $rootScope.urlLo = 'listarEstudiante';
                    $rootScope.mensaje = "Error al modificar al estudiante " + vm.estudiante.Apellido + ", " + vm.estudiante.Nombre;
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