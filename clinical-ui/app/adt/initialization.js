'use strict';

angular.module('opd.adt').factory('initialization',
    ['$rootScope', '$q', 'appService', 'configurationService', 'authenticator', 'spinner',
        function ($rootScope, $q, appService, configurationService, authenticator, spinner) {
            var getConfigs = function () {
                var configNames = ['encounterConfig', 'patientConfig'];
                return configurationService.getConfigurations(configNames).then(function (configurations) {
                    $rootScope.encounterConfig = angular.extend(new EncounterConfig(), configurations.encounterConfig);
                    $rootScope.patientConfig = configurations.patientConfig;
                });
            };

            var initApp = function() {
                return appService.initApp('adt');
            };

            return spinner.forPromise(authenticator.authenticateUser().then(initApp).then(getConfigs()));
        }]
);
