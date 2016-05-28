(function(){
    'use strict';

    angular
        .module('app')
        .controller('NavbarCtrl', NavbarCtrl)

    NavbarCtrl.$inject = ['$scope', 'authentication', '$state', 'professors'];
    function NavbarCtrl($scope, authentication, $state, professors) {   
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

        vm.logout = function () {
            authentication.logout();
            $state.go('login');
        };


    };
})();
