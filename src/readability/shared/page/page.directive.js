angular.module('readability')
    .directive('page', function() {
        return {
            controller: function($scope, Page) {
                $scope.page = Page;
            }
        };
    })
;