angular.module('readability')
    .controller('CheckAuthController', function($scope, $localStorage, $location, Api, Token, Page) {

        Page.id = 'auth-check';
        Page.showHeader = true;
        Page.title = 'Readability';

        if (initToken()) {
            $location.path('/reading-list');
        } else {
            $location.path('/login');
        }

        function initToken()
        {
            if ($localStorage.token) {
                Token.setValue($localStorage.token.value);
                Token.setSecret($localStorage.token.secret);
                return true;
            }
            return false;
        }
    });