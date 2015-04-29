angular.module('readability')
    .controller('ArticleController', ["$scope", "$routeParams", function($scope, $routeParams) {

        $scope.article = {
            title: 'React Is A Terrible Idea'
        };
    }]);