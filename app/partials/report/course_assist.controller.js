(function(){
    'use strict';

    angular
        .module('app.reports')
        .controller('CourseAssistCtrl', CourseAssistCtrl)

    CourseAssistCtrl.$inject = 
    ['$scope', '$state', 'professors', '$modal', 'selectedCourse', 'authentication'];
    function CourseAssistCtrl($scope, $state, professors, $modal, selectedCourse, authentication) {
        var vm = this;
        var user = authentication.currentUser();
        var professorid = user._id;
        vm.asistance = 0;
        vm.course = null;
        vm.currentDay = 0;
        vm.data = [];
        vm.labels = [];
        vm.lectures = 0;
        vm.negative = 0;
        vm.percentage = 0;
        vm.positive = 0;
        vm.professor = null;
        vm.series = [];
        vm.semidata = [];

        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A', 'Series B','Series C', 'Series D','Series E', 'Series F'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90],
            [10, 59, 11, 71, 78, 44, 34],
            [17, 28, 5, 19, 75, 75, 54],
            [72, 14, 10, 61, 65, 36, 8],
            [24, 3, 5, 19, 9, 5, 7]
          ];

        professors.get({ id: professorid },
            function (successResult){
                vm.professor = successResult;
                angular.forEach (vm.professor.courses, 
                    function (value, key){
                        if (value._id == selectedCourse._id ) {
                            selectedCourse.index = key;
                            vm.course = value; 
                        }   
                    });

                angular.forEach (vm.course.sections,
                    function (value){
                        vm.semester = value.semester;
                        angular.forEach (value.students[0].assistanceTotal,
                            function (valued){
                                if(valued.day){
                                    vm.currentDay++;
                                    vm.labels.push('Día ' + vm.currentDay);
                                };
                            });
                            vm.currentDay = 0;
                            vm.lectures = value.students[0].assistance;
                        angular.forEach (value.students,
                            function (valued){ 
                                angular.forEach (valued.assistanceTotal,
                                    function (valueda){   
                                        if (valueda.assistance) {
                                            vm.positive++;
                                            
                                        } else {
                                            vm.negative++;
                                        }
                                });   
                        });
                        var st = value.students.length;
                        var ast = value.students[0].assistanceTotal.length;
                        for (var i = 0; i <= ast - 1;  i++) {
                            for (var j = 0; j <= st - 1; j++) {
                                if (typeof value.students[j].assistanceTotal[i] != 'undefined'){
                                    if (value.students[j].assistanceTotal[i].assistance) vm.asistance++;
                                };
                            };
                            vm.semidata.push(vm.asistance);
                            vm.asistance = 0; 
                        };
                        vm.data.push(vm.semidata);
                        vm.semidata = [];
                        vm.series.push(vm.semester);
                }); 
                vm.total = vm.positive + vm.negative;
                vm.percentage = (vm.positive/vm.total)*100; 
            },
            function (){
                console.log("Error al obtener los datos.");
        });

        vm.back = function (index) {
            $state.go('courseReport');
        };
    };
})();