(function(){
    'use strict';

    angular
        .module('app')
        .controller('NavbarCtrl', NavbarCtrl)

    NavbarCtrl.$inject = ['$scope', 'authentication', '$state'];
    function NavbarCtrl($scope, authentication, $state) {   
        var vm = this;

        vm.logout = function () {
            authentication.logout();
            $state.go('login');
        };
    };
})();
