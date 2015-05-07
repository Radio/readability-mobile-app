angular.module('readability')
    .config(function($routeProvider) {


        function getUserInfo($location, $localStorage, Api, Token) {

            var reCheckPeriod = 1; // minutes.

            if ($localStorage.token) {
                Token.setValue($localStorage.token.value);
                Token.setSecret($localStorage.token.secret);
            }

            if ($localStorage.userInfo && $localStorage.checkDate > Date.now()) {
                return $localStorage.userInfo;
            } else if (Token.getValue()) {
                var client = new Api.getReader();
                return client.getUserInfo().then(function(userInfo) {
                    $localStorage.userInfo = userInfo;
                    $localStorage.checkDate = Date.now() + (reCheckPeriod * 60 * 1000);
                    return userInfo;
                }, function() {
                    delete $localStorage.userInfo;
                    delete $localStorage.checkDate;
                    delete $localStorage.token;
                    $location.path('/login');
                });
            }
            $location.path('/login');
            return null;
        }

        $routeProvider
            .when('/check-auth', {
                templateUrl: 'js/readability/components/check-auth/check-auth.tpl.html',
                controller: 'CheckAuthController'
            })
            .when('/login', {
                templateUrl: 'js/readability/components/login/login.tpl.html',
                controller: 'LoginController'
            })
            .when('/archive', {
                templateUrl: 'js/readability/components/reading-list/reading-list.tpl.html',
                controller: 'ArchiveController',
                resolve: {
                    'UserInfo': getUserInfo
                }
            })
            .when('/reading-list', {
                templateUrl: 'js/readability/components/reading-list/reading-list.tpl.html',
                controller: 'ReadingListController',
                resolve: {
                    'UserInfo': getUserInfo
                }
            })
            .when('/article/:articleId', {
                templateUrl: 'js/readability/components/article/article.tpl.html',
                controller: 'ArticleController',
                resolve: {
                    'UserInfo': getUserInfo
                }
            })
            .otherwise({
                redirectTo: '/check-auth'
            });

    });