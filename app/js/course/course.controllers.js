(function(){
    'use strict';

    angular
        .module('app.course')
        .controller('listarMateriaCtrl',listarMateriaCtrl)
        .controller('crearMateriaCtrl', crearMateriaCtrl)

    listarMateriaCtrl.$inject = 
    ['$scope', '$rootScope', '$location', 'courses', '$modal'];
    function listarMateriaCtrl($scope, $rootScope, $location, courses, $modal) {
        var vm = this;
        $rootScope.table = false;

        var materiaArreglo = [];
        courses.query( 
                function(data){
                    vm.materia = data;
                    angular.forEach(vm.materia, function (value){
                        materiaArreglo.push({ 
                            Codigo:value.Codigo,
                            Nombre:value.Nombre,
                            Creditos:value.Creditos,
                            Descripcion:value.Descripcion
                        });
                    });
                    $rootScope.table = true;
                    vm.listaMateria = materiaArreglo;
                }, 
                function(data){
                    console.log("Error al obtener los datos.");

                });
                
        vm.eliminarMateriaModal = function (index) {
            $rootScope.index = index;
            $rootScope.botonOk = true;
            $rootScope.otroBotonOk = false;
            $rootScope.botonCancelar = true;
            $rootScope.rsplice = false;
            $rootScope.loading = false;
            $rootScope.mensaje = "¿Seguro que desea eliminar la materia?";

            $scope.modalInstance = $modal.open({
                animation: $rootScope.animationsEnabled,
                templateUrl: '/partials/course/modal/delete_course_modal.html',
                scope: $scope,
                size: 'sm',
                resolve: {
                  items: function () {
                    return "";
                  }
                }
            });
            
        };
        
        vm.eliminarMateria = function (index) {
            $rootScope.loadingListarForm = true;
            $rootScope.botonOk = false;
            $rootScope.otroBotonOk = true;
            $rootScope.botonCancelar = false;
            $rootScope.urlLo = 'listarMateria';
            $rootScope.rsplice = true;
            
            courses.delete({ id: vm.materia[index]._id }, 
                function() {
                    $rootScope.loadingListarForm = false;
                    $rootScope.mensaje = "Materia eliminada";
                },
                function() {
                    $rootScope.loadingListarForm = false;
                    $rootScope.mensaje = "Error eliminado materia";
                });   
        };

        vm.eliminarMateriaSplice = function(index, rsplice) {
            if(rsplice){
                vm.listaMateria.splice(index, 1);
                $rootScope.rsplice = false;
            }
        };

        vm.modificarMateria = function (index) {
            $location.url('modificarMateria');  
        };

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
    
    crearMateriaCtrl.$inject = 
    ['$scope','$rootScope', '$modal', '$location', 'courses'];
    function crearMateriaCtrl($scope, $rootScope, $modal, $location, courses) {
       
        var vm = this;
        vm.submitted = false;
        vm.mayorque = false;
        $rootScope.mensaje = "";

        vm.submit = function() {

            if (vm.data_input_form.$valid){
                vm.course = {

                    "Codigo": vm.materia.Codigo,
                    "Nombre": vm.materia.Nombre,
                    "Creditos": vm.materia.Creditos,
                    "Descripcion" : vm.materia.Description,
                };

                $scope.modalInstance = $modal.open({
                    animation: $rootScope.animationsEnabled,
                    templateUrl: 
                    '/partials/course/modal/create_course_modal.html',
                    scope: $scope,
                    size: 'sm',
                    resolve: {
                        items: function () {
                            return $rootScope.items;
                        }
                    }
                });

                courses.save(vm.course,
                    function(){
                        $rootScope.botonOk = true;
                        $rootScope.urlLo = 'listarMateria';
                        $rootScope.mensaje = 
                        "Materia " + vm.materia.Nombre + " creada";
                    },
                    function(){
                        $rootScope.botonOk = true;
                        $rootScope.urlLo = 'listarMateria';
                        $rootScope.mensaje = 
                        "Error creando la materia " + vm.materia.Nombre;
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
})();