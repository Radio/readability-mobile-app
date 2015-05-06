angular.module('readability')
    .factory('Api', function($q) {
        var Api = Readability;
        Api.Async.getDeferred = function() {
            return $q.defer();
        };
        Api.Async.getPromise = function(defer) {
            return defer.promise;
        };

        // Testing mode start. This will be removed in production.
        if (window.cordova === undefined) {
            Api.AbstractClient.prototype.getApiBaseUrl = function() {
                //return 'https://readability.com/api';
                return 'http://readability.me/readability-js-api-client/test/api-proxy.php';
            };
            var _parent_buildSignatureBaseString = Api.xAuthClient.prototype.buildSignatureBaseString;
            Api.xAuthClient.prototype.buildSignatureBaseString = function (url, method, params) {
                url = url.replace('http://readability.me/readability-js-api-client/test/api-proxy.php', 'https://readability.com/api');
                return _parent_buildSignatureBaseString(url, method, params);
            };
        }
        // Testing mode end


        return Api;
    });