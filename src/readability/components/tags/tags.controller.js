angular.module('readability')
    .controller('TagsController', function($scope, $location, Storage, Page, Api, State) {

        var client = Api.getReader();

        Page.id = 'tags';
        Page.showHeader = true;
        Page.title = 'Tags';
        Page.actions = [{
            title: 'Reading List',
            icon: 'mdi-action-list',
            handler: function() {
                $location.path('/reading-list');
            }
        }, {
            title: 'Archive',
            icon: 'mdi-content-archive',
            handler: function() {
                $location.path('/archive');
            }
        }, {
            title: 'Refresh',
            icon: 'mdi-navigation-refresh',
            handler: function() {
                reloadTags();
            }
        }];
        State.lastList = Page.id;

        $scope.list = [];
        $scope.viewTagged = function(tag) {
            $location.path('/tagged/' + tag.text);
        };

        if (Storage.tags.get()) {
            $scope.list = Storage.tags.get() || [];
        }
        if (!$scope.list.length) {
            reloadTags();
        }

        function reloadTags() {
            loadTags().then(function(response) {
                Storage.tags.put(response.tags);
            });
        }

        function loadTags() {
            $scope.loading = true;
            return client.getTags().then(function(response) {
                $scope.list = response.tags;
                $scope.loading = false;
                return response;
            }, function(response) {
                $scope.loading = false;
                console.log(response);
            });
        }
    });