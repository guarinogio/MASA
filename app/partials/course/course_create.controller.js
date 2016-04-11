(function(){
    'use strict';

    angular
        .module('app.course')
        .controller('CourseCreateCtrl', CourseCreateCtrl)
    
    CourseCreateCtrl.$inject = 
    ['$scope','$rootScope', '$modal', '$location', 'professors'];
    function CourseCreateCtrl($scope, $rootScope, $modal, $location, professors) {
        var vm = this;
        vm.submitted = false;
        vm.mayorque = false;
        $rootScope.mensaje = "";
        var professorid = $rootScope.professorId;

        professors.get({ id: professorid }, 
            function (successResult){
                vm.professor = successResult;
            }, 
            function (){
                console.log("Error al obtener los datos.");

            });

        vm.submit = function() {

            if (vm.data_input_form.$valid){
                vm.course = {
                    "code": vm.course.code,
                    "name": vm.course.name,
                    "credits": vm.course.credits,
                    "description" : vm.course.description,
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

                vm.professor.courses.push(vm.course);
                professors.update({ id: professorid }, vm.professor,
                    function(){
                        $rootScope.botonOk = true;
                        $rootScope.urlLo = 'listarMateria';
                        $rootScope.mensaje = 
                        "Materia " + vm.course.name + " creada";
                    },
                    function(){
                        $rootScope.botonOk = true;
                        $rootScope.urlLo = 'listarMateria';
                        $rootScope.mensaje = 
                        "Error creando la materia " + vm.course.name;
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