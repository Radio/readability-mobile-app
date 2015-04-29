angular.module('readability')
    .controller('ArticleController', function($scope, $routeParams) {

        $scope.article = {
            title: 'React Is A Terrible Idea'
        };
    });