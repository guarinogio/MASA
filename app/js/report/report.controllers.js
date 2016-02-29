(function(){
    'use strict';

    angular
        .module('app.reports')
        .controller('poblacionNacimientoCtrl', poblacionNacimientoCtrl)
        .controller('poblacionActivaCtrl', poblacionActivaCtrl)
        .controller('hombresEdadCtrl', hombresEdadCtrl)
        .controller('mujeresEdadCtrl', mujeresEdadCtrl)
        .controller('comidasDiaCtrl', comidasDiaCtrl)
        .controller('nivelEducacionCtrl', nivelEducacionCtrl)
        .controller('serviciosHogaresCtrl', serviciosHogaresCtrl)
        .controller('ingresosAnualesCtrl', ingresosAnualesCtrl)

    poblacionNacimientoCtrl.$inject = ['$rootScope', 'ReportJson'];
    function poblacionNacimientoCtrl($rootScope, ReportJson){

        $rootScope.labelPoblacionNacimiento = ['Extranjeros', 'Residentes'];
        ReportJson.get({id:$rootScope.elementId}, function(data) {
            
            $rootScope.dataPoblacionNacimiento = data.Data[0].dataPoblacionNacimiento;

        });
    };

    poblacionActivaCtrl.$inject = ['$rootScope', 'ReportJson'];
    function poblacionActivaCtrl($rootScope, ReportJson){ 

        $rootScope.labelsPoblacionActiva = ['Hombres', 'Mujeres'];
        $rootScope.seriesPoblacionActiva = ['Economicamente Pasivos', 'Economicamente Activos'];
        $rootScope.dataPoblacionActiva = [];

        ReportJson.get({id:$rootScope.elementId},function(data) {

            $rootScope.dataPoblacionActiva = data.Data[0].dataPoblacionActiva;
        });
    };
    
    hombresEdadCtrl.$inject = ['$rootScope', 'ReportJson'];
        function hombresEdadCtrl($rootScope, ReportJson){  
        $rootScope.labelsHombresEdad = ['0-6', '7-12','13-18', '19-25','26-44', '45-60','61-99', '80-84', '90+'];
        $rootScope.seriesHombresEdad = ['Hombres por Generacion'];
        $rootScope.dataHombresEdad   = [];

         ReportJson.get({id:$rootScope.elementId},function(data) {

             $rootScope.dataHombresEdad = data.Data[0].dataHombresEdad;
        });
    };

    mujeresEdadCtrl.$inject = ['$rootScope', 'ReportJson'];
    function mujeresEdadCtrl($rootScope, ReportJson){  
        $rootScope.labelsMujeresEdad = ['0-6', '7-12','13-18', '19-25','26-44', '45-60','61-99', '80-84', '90+'];
        $rootScope.seriesMujeresEdad = ['Mujeres por Generacion'];
        $rootScope.dataMujeresEdad   = [];

        ReportJson.get({id:$rootScope.elementId},function(data) {
            
             $rootScope.dataMujeresEdad = data.Data[0].dataMujeresEdad;
        });
    };

    comidasDiaCtrl.$inject = ['$rootScope', 'ReportJson'];
    function comidasDiaCtrl($rootScope, ReportJson){  
        $rootScope.labelsComidasDia = ['Desayuno', 'Almuerzo', 'Cena'];
        $rootScope.dataComidasDia   = [];

        ReportJson.get({id:$rootScope.elementId},function(data) {

             $rootScope.dataComidasDia = [data.Data[0].dataComidasDia];
        });
    };

    nivelEducacionCtrl.$inject = ['$rootScope', 'ReportJson'];
    function nivelEducacionCtrl($rootScope, ReportJson){  
        $rootScope.labelsNivelEducacion = ['Nivel de Educacion Superior', 'Nivel de Educacion Media'];

        ReportJson.get({id:$rootScope.elementId},function(data) {

             $rootScope.dataNivelEducacion = data.Data[0].dataNivelEducacion;
        });
    };
    
    serviciosHogaresCtrl.$inject = ['$rootScope', 'ReportJson'];
    function serviciosHogaresCtrl($rootScope, ReportJson){  
        $rootScope.labelsServiciosHogares = ['Agua', 'Gas', 'Electricidad' , 'Linea Telefonica'];
        $rootScope.dataServiciosHogares   = [];

        ReportJson.get({id:$rootScope.elementId},function(data) {

             $rootScope.dataServiciosHogares = [data.Data[0].dataServiciosHogares];
        });
    };

    ingresosAnualesCtrl.$inject = ['$rootScope', 'ReportJson'];
    function ingresosAnualesCtrl($rootScope, ReportJson){  
        $rootScope.labelsIngresosAnuales = ['Menos de 10.000', 'De 11.000 a 20.000', 'De 21.000 a 35.000' , 'De 35.000 a 50.000'];

        ReportJson.get({id:$rootScope.elementId},function(data) {
            
             $rootScope.dataIngresosAnuales = data.Data[0].dataIngresosAnuales;
        });
    };

})();
