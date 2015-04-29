angular.module('readability')
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'js/readability/components/reading-list/reading-list.tpl.html',
                controller: 'ReadingListController'
            })
            .when('/article/:articleId', {
                templateUrl: 'js/readability/components/article/article.tpl.html',
                controller: 'ArticleController'
            })
            .otherwise({
                redirectTo: '/'
            });
    });