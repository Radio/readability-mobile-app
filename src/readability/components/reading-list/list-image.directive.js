angular.module('readability')
    .directive('listImage', function($sce, $timeout) {

        function controller($scope) {}

        function link($scope, $element, attrs) {
            $timeout(function() {
            });
        }

        return {
            scope: {
                article: '='
            },
            controller: controller,
            link: link,
            template: '<img src="" alt="" class="responsive-img" data-ng-src="{{ article.lead_image_url }}"/>'
        };
    });