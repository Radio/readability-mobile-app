angular.module('readability')
    .value('Consumer', (function() {
        var credentials =  {
            key: 'maxgopey',
            secret: 'kJFVrQrNXna9TYzeHDCcrMhxa3F3nwdC',
            token: 'cb9a77f7c62f36cd0aec845489e9f24d602eaafd'
        };

        return new Readability.Consumer(credentials.key, credentials.secret, credentials.token);
    })())
    .value('Token', (function() {
        return new Readability.Token();
    })())
    .factory('Api', function($q, Consumer, Token) {
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

        return {
            getReader: function() {
                return new Api.Reader(Consumer, Token);
            },
            getParser: function(){
                return new Api.Parser(Consumer);
            },
            getShortener: function() {
                return new Api.Shortener();
            }
        };
    })

;