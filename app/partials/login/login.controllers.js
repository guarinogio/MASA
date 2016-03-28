(function(){
    'use strict';

    angular
        .module('app.login')
        .controller('loginCtrl', loginCtrl)

    loginCtrl.$inject = ['$rootScope', '$scope', '$location'];
    function loginCtrl($rootScope, $scope, $location){
        /*var vm = this;
        vm.user = user;
        vm.submitted = false;
        vm.mayorque = false;
        $rootScope.items = "";
        $rootScope.mensaje = "";
        vm.submit = function() {
            if (vm.data_input_form.$valid){
                vm.pkg = {         
                    "Nickname": vm.user.Nickname,
                    "Password": $rootScope.password                         
                }; 

                $rootScope.mensaje = "";
                $rootScope.bcancel = false;
                $scope.modalInstance = $modal.open({
                    animation: $rootScope.animationsEnabled,
                    templateUrl: 'LoginModal.html',
                    scope: $scope,
                    size: 'sm',
                    resolve: {
                      items: function () {
                        return $rootScope.items;
                      }
                    }
                });

                Login.save(vm.pkg, 
                    function(data){ 
                      if(data.Data._value != null){
                            $rootScope.actOk = true;
                            $rootScope.urlLo = 'listarProfesor';
                            $rootScope.bcancel = false;
                            
                        }else{
                            $rootScope.bcancel = true;
                            $rootScope.mensaje = data.Data._error;
                        }
                     },
                     function(data){
                         verificar = data.Data; 
                            if(verificar){
                                alert("no existe el usuario");
                            }
                })
                GetRol.get({id:vm.user.Nickname}, 
                    function(data){
                        $rootScope.role = data.Data;
                    },
                    function(){
                        
                });
                    
            }else{
                vm.submitted = true;
            }
        }

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

        return vm;  */      
    };
    
})();
