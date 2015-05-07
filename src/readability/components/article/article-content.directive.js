angular.module('readability')
    .directive('articleContent', function($sce, $timeout) {

        function controller($scope) {
            $scope.$watch('article', function(article) {
                var content = (article ? article.content : '') || '';
                $scope.trustedContent = $sce.trustAsHtml(content);
            });
        }

        function link($scope, $element, attrs) {
            $scope.$watch('article', function(article) {
                $timeout(function() {
                    $element.find('img').addClass('responsive-img');
                    $element.find('iframe').attr('height', null).attr('width', '100%');
                });
            });
        }

        return {
            scope: {
                article: '='
            },
            controller: controller,
            link: link,
            template: '<div data-ng-bind-html="trustedContent"></div>'
        };
    });