angular.module('readability')
    .directive('bookmarkListItem', function() {

        function controller($scope, $location) {
            $scope.readArticle = function(bookmark) {
                $location.path('/article/' + bookmark.id);
            };
        }

        return {
            controller: controller,
            templateUrl: 'js/readability/components/reading-list/bookmark-list-item.tpl.html'
        };
    })
;