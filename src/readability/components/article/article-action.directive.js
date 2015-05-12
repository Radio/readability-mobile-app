angular.module('readability')
    .directive('articleAction', function($sce, $timeout) {

        function link($scope, $element, attrs) {
            $element.on('touchstart mouseenter', function() {
                $element.addClass('active');
            });
            $element.on('mouseleave touchmove click', function() {
                $element.removeClass('active');
            });
        }

        return {
            link: link
        };
    });