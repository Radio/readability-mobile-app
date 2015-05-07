angular.module('readability')
    .directive('navAction', function() {

        function link($scope, $element) {
            $element.on('touchstart mouseenter', function() {
                $element.addClass('active');
            });
            $element.on('mouseleave touchmove click', function() {
                $element.removeClass('active');
            });
        }

        return {
            scope: {
                action: '=navAction'
            },
            controller: function($scope, Page) {
            },
            link: link,
            template: '<a href="" data-ng-click="action.handler()"><i class="{{ action.icon }}"></i></a>'
        };
    })
;