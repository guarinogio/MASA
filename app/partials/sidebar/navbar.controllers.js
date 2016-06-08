(function(){
    'use strict';

    angular
        .module('app')
        .controller('NavbarCtrl', NavbarCtrl)

    NavbarCtrl.$inject = ['$scope', 'authentication', '$state', 'professors', 'data'];
    function NavbarCtrl($scope, authentication, $state, professors, data) {   
        var vm = this;
        var user = authentication.currentUser();
        var professorid = user._id;

        professors.get({ id: professorid },
            function (successResult){
                vm.professor = successResult;
            },
            function (){
                console.log("Error al obtener los datos.");
        });

        vm.profile = function (){
            data.professorId = professorid;
            $state.go('ProfessorUpdate');
        };

        vm.logout = function () {
            authentication.logout();
            $state.go('login');
        };
    };
})();
