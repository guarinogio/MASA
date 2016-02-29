(function(){
    'use strict';

    angular
        .module('app.login')
        .controller('loginCtrl', loginCtrl)
        .controller('ModalInstanceLoginCtrl', ModalInstanceLoginCtrl)
        .constant('datepickerPopupConfig', {
            datepickerPopup: 'yyyy-MM-dd',
            html5Types: {
                date: 'yyyy-MM-dd',
                'datetime-local': 'yyyy-MM-ddTHH:mm:ss.sss',
                'month': 'yyyy-MM'
            },
            currentText: 'Hoy',
            clearText: 'Limpiar',
            closeText: 'Cerrar',
            closeOnDateSelection: true,
            appendToBody: false,
            showButtonBar: true
        });


    ModalInstanceLoginCtrl.$inject = ['$scope', '$modalInstance', 'items', '$location'];
    function ModalInstanceLoginCtrl($scope, $modalInstance, items, $location){
        
        $scope.items = items;
        
        $scope.okLogin = function (actOk, urlLo) {
          //$modalInstance.close($scope.selected.item);
          if(actOk){
                $location.url(urlLo);
                $modalInstance.dismiss('cancel');
            }
        };
       
        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };

               
    };
    
    loginCtrl.$inject = ['$rootScope', '$location', 'Login', 'Rol','GetRol', 'hash', '$http', 'user', '$modal'];
    function loginCtrl($rootScope, $location, Login, Rol, GetRol, hash, $http, user, $modal){
        var vm = this;


        //$http.get("http://cesar:12316/api/Rol")
    //.success(function(response) {$rootScope.namesw = response.Data;});
        
        vm.user = user;
        vm.submitted = false;
        vm.mayorque = false;
        $rootScope.items = "";
        $rootScope.mensaje = "";
        vm.submit = function() {
            //var verificar = false;
            if (vm.data_input_form.$valid){
                // se implementa todo lo necesario antes de pasar a la siguiente página.
                vm.pkg = {         

                                       "Nickname": vm.user.Nickname,
                                       "Password": $rootScope.password                                     

                                    }; 
                                    //$rootScope.mostrar = false;
                                    $rootScope.loadingLogin = true;
                                    $rootScope.mensaje = "";
                                    $rootScope.bcancel = false;
                                    $modal.open({
                                                animation: $rootScope.animationsEnabled,
                                                templateUrl: 'myModalContentLogin.html',
                                                controller: 'ModalInstanceLoginCtrl',
                                                size: 'sm',
                                                resolve: {
                                                  items: function () {
                                                    return $rootScope.items;
                                                  }
                                                }
                                            });
                                    Login.save(vm.pkg, 
                                                    function(data){ 
                                                        //$rootScope.mostrar = true;
                                                        $rootScope.loadingLogin = false;
                                                      //verificar =  data.Data._value; 
                                                      if(data.Data._value != null){
                                                            //$rootScope.bok = true;
                                                            $rootScope.actOk = true;
                                                            $rootScope.urlLo = 'mapasReportes';
                                                            $rootScope.bcancel = false;
                                                            
                                                        }else{
                                                            $rootScope.bcancel = true;
                                                            $rootScope.mensaje = data.Data._error;
                                                        }
                                                     },
                                                     function(data){
                                                         verificar =  data.Data; 
                                                            if(verificar){
                                                                  alert("no existe el usuario");
                                                              }
                                                          
                                                     })
                                                            GetRol.get({id:vm.user.Nickname}, function(data){
                                                                        $rootScope.role = data.Data;
                                                            }

                                                     );
                    
                //$location.url('/preview/');
            }else{
                
                vm.submitted = true;
            }
        }
        
        vm.onSelectChange = function () {
                 if(vm.genero == "Masculino"){
                     $rootScope.Gender = "M"; 
                     //alert("hola " + vm.valorRol.Name);
                 }
                 if(vm.genero == "Femenino"){
                     $rootScope.Gender = "F";  
                 }
            };
            
        //$rootScope.password="s3cret";
        $rootScope.getHash = function(message) {
            var hashResult = hash(message);
            $rootScope.password = hashResult;
            return hashResult;
        };

        vm.generos = ['', 'Masculino', 'Femenino'];
        vm.genero = vm.generos[0];

        Rol.get(
                function(data){
                    $rootScope.rol = data.Data;
                }
            );

        
        vm.toggleMin = function() {
            vm.maxDate = vm.maxDate ? null : new Date();
        };
        vm.toggleMin();

        $rootScope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $rootScope.opened = true;
        };

        $rootScope.open2 = function($eventt) {
            $eventt.preventDefault();
            $eventt.stopPropagation();

            $rootScope.openedd = true;
        };

        $rootScope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        return vm;        
    };
    
    
    
    
})();
