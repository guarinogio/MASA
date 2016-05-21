(function(){
    'use strict';

    angular
        .module('app.section')
        .controller('SectionListCtrl', SectionListCtrl)

    SectionListCtrl.$inject = [ '$scope', '$state', 'professors', '$modal', 'selectedCourse', 'selectedSection', 'authentication'];
    function SectionListCtrl ( $scope, $state, professors, $modal, selectedCourse, selectedSection, authentication ){
        var vm = this;
        var user = authentication.currentUser();
        var professorid = user._id;
        vm.section = [];
        vm.professor = null;

        professors.get({ id: professorid },
            function (successResult){
                vm.professor = successResult;
                angular.forEach (vm.professor.courses, 
                    function (value, key){
                        if (value._id == selectedCourse._id ) {
                            vm.index = key;
                            vm.section = value.sections;
                            vm.course = value.name;
                        }
                    }); 
            },
            function (){
                console.log("Error al obtener los datos.");

        });

        vm.createSection = function () {
            $state.go('SectionCreate');
        };

        vm.eliminarMatriculaModal = function (index) {
            $scope.index = index;   
            vm.botonOk = true;
            vm.otroBotonOk = false;
            vm.botonCancelar = true;
            vm.rsplice = false;
            var name = vm.section[index].name;
            vm.mensaje = "¿Seguro que desea eliminar la sección "+name+"?";
            
            $scope.modalInstance = $modal.open({
                templateUrl: '/partials/section/modal/delete_section_modal.html',
                scope: $scope,
                size: 'sm'
            });
        };

        vm.eliminarMatricula = function (index) {
            vm.botonOk = false;
            vm.otroBotonOk = true;
            vm.botonCancelar = false;
            var name = vm.section[index].name;
            vm.professor.courses[vm.index].sections.splice(index, 1);

            professors.update({ id: professorid }, vm.professor, 
                function () {
                    vm.rsplice = true;
                    vm.mensaje = "Sección " + name + " eliminada";
                },
                function () {
                    vm.mensaje = "Error eliminando la sección " + name;
                });
        };

        vm.modificarMatricula = function (index) {
            selectedSection._id = vm.section[index]._id;
            selectedCourse.index = vm.index;
            $state.go('SectionUpdate');
        };

        $scope.ok = function (urlLo) {
            $state.go('SectionList');
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