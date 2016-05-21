(function(){
    'use strict';

    angular
        .module('app.section')
        .controller('SectionCreateCtrl', SectionCreateCtrl)

    SectionCreateCtrl.$inject = 
    ['$scope', '$state', 'professors', '$modal', 'selectedCourse','authentication'];
    function SectionCreateCtrl($scope, $state, professors, $modal, selectedCourse, authentication){
        var user = authentication.currentUser();
        var professorid = user._id;
        var vm = this;
        vm.course = {};
        vm.itExists = false;
        vm.selectedCourse = selectedCourse;
        vm.submitted = false;
        vm.semester, vm.section, vm.materias;
        vm.mensaje = "";
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
                    templateUrl: 'partials/section/modal/create_section_modal.html',
                    scope: $scope,
                    size: 'sm'
                });


                angular.forEach (vm.professor.courses[vm.index].sections, 
                    function (value, key){
                        if (value.name == vm.name) {
                            if(value.semester == vm.semester){
                                vm.itExists = true;
                            }
                        }   
                    }); 

                if(!vm.itExists){
                    vm.professor.courses[vm.index].sections.push(vm.package);
                    professors.update({ id: professorid }, vm.professor,
                        function(){
                            vm.botonOk = true;
                            vm.mensaje = "Sección " + vm.name + " creada";
                        },
                        function(){
                            vm.botonOk = true;
                            vm.mensaje = "Error creando la seccion " + vm.name;
                    });
                }else{
                    vm.botonOk = true;
                    vm.mensaje = "Sección Duplicada, " + vm.name + " existe en el semestre "+ vm.semester + ".";
                }
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

                    // Find desired cell containing semester and section
                    vm.semester = worksheet['B5'].v;
                    vm.name = worksheet['B9'].v;

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

        vm.back = function () {
            $state.go('SectionList');
        };      
    };
})();