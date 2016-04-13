(function(){
    'use strict';

    angular
        .module('app.section')
        .controller('SectionCreateCtrl', SectionCreateCtrl)

    SectionCreateCtrl.$inject = 
    ['$scope','$rootScope', '$state', 'professors', '$modal', 'selectedCourse'];
    function SectionCreateCtrl($scope, $rootScope, $state, professors, $modal, selectedCourse){
        var professorid = $rootScope.professorId;
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
                        $rootScope.mensaje = "Sección " + vm.name + " creada";
                    },
                    function(){
                        $rootScope.botonOk = true;
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
            $state.go('SectionList');
            $scope.modalInstance.dismiss('cancel');
        };

        $rootScope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $rootScope.opened = true;
        };

        vm.back = function () {
            $state.go('SectionList');
        };      
    };
})();