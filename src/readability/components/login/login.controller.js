angular.module('readability')
    .controller('LoginController', function($scope, Consumer, Api) {

        $scope.authorize = authorize;

        $scope.state = 'Not Authorized';

        function authorize(username, password)
        {
            try {
                var client = new Api.Reader(
                    new Api.Consumer(Consumer.key, Consumer.secret)
                );
                client.apiUrl = 'http://readability.me/readability-js-api-client/test/api-proxy.php';
                client.authorize(username, password)
                    .then(function(token) {
                        console.info('Authorized');
                        console.log('Token' + token.getValue());
                        console.log('Secret' + token.getSecret());

                        $scope.state = 'Authorized with token: ' + token.getValue();
                    }, function(response) {
                        console.error('AUTH ERROR');
                        console.log(response);

                        $scope.state = 'Authorization failed';
                    });
            } catch (e) {
                console.error('EXCEPTION');
                console.log(e);
            }
        }
    });