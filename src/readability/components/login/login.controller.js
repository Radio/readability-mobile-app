angular.module('readability')
    .controller('LoginController', function($scope, $localStorage, $location, Api, Token, Page) {

        Page.id = 'login';
        Page.showHeader = true;
        Page.title = 'Login';

        $scope.authorize = authorize;

        var client = Api.getReader();

        function authorize(username, password)
        {
            $scope.loading = true;
            try {
                Token.setValue('');
                Token.setSecret('');
                client.authorize(username, password)
                    .then(function(token) {
                        $localStorage.token = {
                            value: token.getValue(),
                            secret: token.getSecret()
                        };
                        $scope.loading = false;
                        redirectAfterLogin();
                    }, function(response) {
                        $scope.loading = false;
                        delete $localStorage.token;
                    });
            } catch (e) {
                $scope.loading = false;
                console.log(e);
                delete $localStorage.token;
            }
        }

        function redirectAfterLogin()
        {
            $location.path('/reading-list');
        }
    });