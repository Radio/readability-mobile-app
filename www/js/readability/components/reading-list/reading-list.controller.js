angular.module('readability')
    .controller('ReadingListController', ["$scope", function($scope) {

        $scope.list = [{
            title: 'React Is A Terrible Idea',
            id: 'a1'
        }, {
            title: 'BEKK Open',
            id: 'a2'
        }, {
            title: 'Change And Its Detection In JavaScript Frameworks',
            id: 'a3'
        }, {
            title: 'A JS framework on every table',
            id: 'a4'
        }, {
            title: 'AngularJS Performance in Large Applications',
            id: 'a5'
        }];
    }]);