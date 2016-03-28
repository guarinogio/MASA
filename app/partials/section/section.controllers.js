(function(){
    'use strict';

    angular
        .module('app.section')
        .controller('listarMatriculaCtrl', listarMatriculaCtrl)
        .controller('crearMatriculaCtrl', crearMatriculaCtrl)
        .controller('actualizarMatriculaCtrl', actualizarMatriculaCtrl)

    listarMatriculaCtrl.$inject = [ '$scope', '$rootScope', '$location', 'professors', '$modal', 'selectedCourse', 'selectedSection'];
    function listarMatriculaCtrl ( $scope, $rootScope, $location, professors, $modal, selectedCourse, selectedSection ){
        var vm = this;
        var professorid = '56f5fd3a20047f3c15b05f0e';
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
                        }
                    }); 
            },
            function (){
                console.log("Error al obtener los datos.");

            });

        /**************************Eliminar Matricula**************************/
        /* En este proceso, primero se llama a un Modal el cual se cerciora que
        el usuario se asegure de eliminar la matricula escogida, el usuario al 
        confirmar su decision llama automaticamente a la funcion que hara la 
        llamada a servicio que borrara la matricula de la base de datos.
        */

        vm.createSection = function () {
            $location.url('crearMatricula');
        };


        vm.eliminarMatriculaModal = function (index) {
            $rootScope.index = index;   
            $rootScope.botonOk = true;
            $rootScope.otroBotonOk = false;
            $rootScope.botonCancelar = true;
            $rootScope.rsplice = false;
            $rootScope.mensaje = "¿Seguro que desea eliminar la sección?";
            
            $scope.modalInstance = $modal.open({
                animation: $rootScope.animationsEnabled,
                templateUrl: '/partials/section/modal/delete_section_modal.html',
                scope: $scope,
                size: 'sm',
                resolve: {
                    items: function () {
                        return "";
                    }
                }
            });
        };

        vm.eliminarMatricula = function (index) {
            $rootScope.botonOk = false;
            $rootScope.otroBotonOk = true;
            $rootScope.botonCancelar = false;
            $rootScope.urlLo = 'listarMatricula';
            var name = vm.section[index].name;

            vm.professor.courses[vm.index].sections.splice(index, 1);
            professors.update({ id: professorid }, vm.professor, 
                function () {
                    $rootScope.rsplice = true;
                    $rootScope.mensaje = "Sección " + name + " eliminada";
                },
                function () {
                    $rootScope.mensaje = "Error eliminando la sección " + name;
                });
        };

        vm.eliminarMatriculaSplice = function (index, rsplice) {
            if(rsplice){
                
            }
        };

        /*************************Fin de Eliminar Matricula*******************/

        vm.modificarMatricula = function (index) {
            selectedSection._id = vm.section[index]._id;
            selectedCourse.index = vm.index;
            $location.url('actualizarMatricula');
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

    crearMatriculaCtrl.$inject = 
    ['$scope','$rootScope', '$location', 'professors', '$modal', 'selectedCourse'];
    function crearMatriculaCtrl($scope, $rootScope, $location, professors, $modal, selectedCourse){
        var professorid = '56f5fd3a20047f3c15b05f0e';
        var vm = this;
        vm.course = {};
        vm.selectedCourse = selectedCourse;
        vm.submitted = false;
        vm.semester, vm.section, vm.materias;
        $rootScope.mensaje = "";
        vm.students = [];

        professors.get({ id: professorid },
            function (successResult){
                vm.professor = successResult;
                angular.forEach (vm.professor.courses, 
                    function (value, key){
                        if (value._id == vm.selectedCourse._id ) {
                            vm.index = key;
                            vm.section = value.sections;
                            vm.course.code = value.code;
                            vm.course.name = value.name;
                        }   
                    }); 
            },
            function (){
                console.log("Error al obtener los datos.");

            });


        vm.submit = function () {

            if (vm.data_input_form.$valid){
                vm.package = {
                    "name": vm.name,
                    "code": vm.course.code,
                    "course": vm.course.name,
                    "semester": vm.semester,
                    "students": vm.students
                };

                $scope.modalInstance = $modal.open({
                    animation: $rootScope.animationsEnabled,
                    templateUrl: 'partials/section/modal/create_section_modal.html',
                    scope: $scope,
                    size: 'sm',
                    resolve: {
                        items: function () {
                            return $rootScope.items;
                        }
                    }
                });

                vm.professor.courses[vm.index].sections.push(vm.package);
                 professors.update({ id: professorid }, vm.professor,
                    function(){
                        $rootScope.botonOk = true;
                        $rootScope.urlLo = 'listarMatricula';
                        $rootScope.mensaje = "Sección " + vm.name + " creada";
                    },
                    function(){
                        $rootScope.botonOk = true;
                        $rootScope.urlLo = 'listarMatricula';
                        $rootScope.mensaje = "Error creando la seccion " + vm.name;
                    });
            }else{
                vm.submitted = true;
            }
        };

        var xlf = document.getElementById('xlf');
        function handleFile(e) {
            var files = e.target.files;
            var i,f,z;
            var student = {};
            for (i = 0, f = files[i]; i != files.length; ++i) {
                var reader = new FileReader();
                var name = f.name;
                reader.onload = function(e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, {type: 'binary'});
                    var sheet = workbook.SheetNames[0];
                    var worksheet = workbook.Sheets[sheet];

                    /* Find desired cell containing semester and section */
                    vm.semester = worksheet['B5'].v;
                    vm.name = worksheet['B9'].v;
                    //$scope.$apply();

                    for (z in worksheet) {
                        /* all keys that do not begin with "!" correspond to cell addresses */
                        if (z[0] === '!') continue;
                        if ((z[0] >'B') && (z[1] > 0) && (z[2] > 1)) {
                            /* Cells that start in the C column represent the sttudent id in the worksheet, the same applies to name and lastname being in D and E columns*/
                            if (z[0] =='C') student.id = worksheet[z].v;
                            if (z[0] =='D') student.name = worksheet[z].v;
                            if (z[0] =='E') student.lastname = worksheet[z].v;
                            if (z[0] =='F') {
                                student.email = worksheet[z].v;    
                                /*Since we are only going to use these 3 attributes from the students then we push only this data to the students array*/
                                vm.students.push(student);
                                student = {};
                            }
                             
                        } 
                    };
                    $scope.$apply();
                };
                reader.readAsBinaryString(f);
            }
        }
        if(xlf.addEventListener) xlf.addEventListener('change', handleFile, false);

        $scope.ok = function (urlLo) {
            $location.url(urlLo);
            $scope.modalInstance.dismiss('cancel');
        };

        $rootScope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $rootScope.opened = true;
        };

        return vm;
    };

    actualizarMatriculaCtrl.$inject = ['$scope', '$rootScope', '$location', 'professors', '$modal', 'selectedSection', 'selectedCourse'];
    function actualizarMatriculaCtrl($scope, $rootScope, $location, professors, $modal, selectedSection, selectedCourse){
        var professorid = '56f5fd3a20047f3c15b05f0e';
        var vm = this;
        vm.section = {};
        vm.students = [];

        professors.get({ id: professorid },
            function (successResult){
                vm.professor = successResult;
                angular.forEach (vm.professor.courses[selectedCourse.index].sections, 
                    function (value, key){
                        if (value._id == selectedSection._id ) {
                            selectedSection.index = key;
                            vm.students = value.students;
                            vm.section = value; 
                        }   
                    }); 
            },
            function (){
                console.log("Error al obtener los datos.");
            });

        vm.addStudent = function (index) {
            $location.url('crearEstudiante');
        };

        vm.retirarEstudianteModal = function (index) {
            $rootScope.index = index;
            $rootScope.botonOk = true;
            $rootScope.otroBotonOk = false;
            $rootScope.botonCancelar = true;
            $rootScope.eliminarLoading = false;
            $rootScope.mensaje = "¿Desea retirar al estudiante "+ vm.students[index].lastname +", "+ vm.students[index].name + "?";

            $scope.modalInstance = $modal.open({
                animation: $rootScope.animationsEnabled,
                templateUrl: 'partials/section/modal/update_section_modal.html',
                scope: $scope,
                size: 'sm',
                resolve: {
                    items: function () {
                        return "";
                    }
                }
            });
        };

        vm.retirarEstudiante = function (index) {
            vm.professor.courses[selectedCourse.index].sections[selectedSection.index].students.splice(index, 1);

            professors.update({ id: professorid }, vm.professor,
            function (){
                $rootScope.botonOk = false;
                $rootScope.otroBotonOk = true;
                $rootScope.botonCancelar = false;
                $rootScope.mensaje = "Sección "+ vm.section.name +" actualizada";
            },
            function (){
                $rootScope.botonOk = false;
                $rootScope.otroBotonOk = true;
                $rootScope.botonCancelar = false;
                $rootScope.mensaje = "Error al actualizar la Sección "+ vm.section.name;
            });
        };

        $rootScope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $rootScope.opened = true;
        };

        $scope.ok = function () {
            $scope.modalInstance.dismiss('cancel');
        };
       
        $scope.cancel = function () {
             $scope.modalInstance.dismiss('cancel');
        };      

        return vm;
    };

})();