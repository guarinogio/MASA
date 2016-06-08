(function(){
    'use strict';

    angular
        .module('app.login')
        .controller('loginCtrl', loginCtrl)

    loginCtrl.$inject = ['$scope', '$state', 'login', 'authentication', '$modal'];
    function loginCtrl($scope, $state, login, authentication, $modal){
        var vm = this;
        vm.credentials = {};
        
        vm.submit = function() {
            if (vm.data_input_form.$valid){
                var professor = {         
                    "id": vm.user.nickname,
                    "password": vm.user.password                         
                }; 

                login.save(professor,
                    function(data){
                        authentication.saveToken(data.token);
                        var permission = authentication.currentUser();
                        if(permission.role=='admin'){
                            $state.go('ProfessorList');
                        };
                        if(permission.role=='professor'){
                            $state.go('CourseList');
                        };
                        
                    },
                    function(data){
                        vm.message = 'Usuario/Clave incorrecto. Por favor intente de nuevo.'
                        vm.botonOk = true;
                        $scope.modalInstance = $modal.open({
                            templateUrl: 
                            '/partials/login/modal/login_modal.html',
                            scope: $scope,
                            size: 'sm',
                            resolve: {
                                items: function () {
                                }
                            }
                        });
                    });
            }else{

                vm.submitted = true;
            }
        };

        $scope.ok = function () {
            $state.reload();
            $scope.modalInstance.dismiss('cancel');
        };
       
        $scope.cancel = function () {
            $scope.modalInstance.dismiss('cancel');
        };  
    };
})();
