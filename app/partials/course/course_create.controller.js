(function(){
    'use strict';

    angular
        .module('app.course')
        .controller('CourseCreateCtrl', CourseCreateCtrl)
    
    CourseCreateCtrl.$inject = 
    ['$scope', '$modal', '$state', 'professors', 'authentication'];
    function CourseCreateCtrl($scope, $modal, $state, professors, authentication) {
        var vm = this;
        $scope.mensaje = "";
        var user = authentication.currentUser();
        var professorid = user._id;

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
                    templateUrl: 
                    '/partials/course/modal/create_course_modal.html',
                    scope: $scope,
                    size: 'sm',
                    resolve: {
                        items: function () {
                        }
                    }
                });

                vm.professor.courses.push(vm.course);
                professors.update({ id: professorid }, vm.professor,
                    function(){
                        $scope.botonOk = true;
                        $scope.mensaje = 
                        "Materia " + vm.course.name + " creada";
                    },
                    function(){
                        $scope.botonOk = true;
                        $scope.mensaje = 
                        "Error creando la materia " + vm.course.name;
                    });
            }else{

                vm.submitted = true;
            }
        }

        $scope.ok = function (urlLo) {
            $state.go('CourseList');
            $scope.modalInstance.dismiss('cancel');
        };

        $scope.cancel = function () {
            $scope.modalInstance.dismiss('cancel');
        };      

        vm.back = function () {
            $state.go('CourseList');
        };  
    };   
})();