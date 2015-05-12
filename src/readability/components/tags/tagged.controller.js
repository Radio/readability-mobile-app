angular.module('readability')
    .controller('TaggedController', function($scope, $location, $routeParams, Storage, Page, Api, State) {

        var client = Api.getReader();
        var tag = $routeParams.tag;

        State.lastList = 'tagged/' + tag;
        Page.id = 'tagged';
        Page.showHeader = true;
        Page.title = tag;
        Page.actions = [{
            title: 'Tags',
            icon: 'mdi-navigation-arrow-back',
            handler: function() {
                $location.path('/tags');
            }
        }, {
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
                reloadBookmarks();
            }
        }];

        $scope.tag = tag;
        $scope.list = [];
        $scope.loadArchived = loadArchived;

        if (Storage.tagged.get(tag)) {
            $scope.list = Storage.tagged.get(tag) || [];
        }
        if (!$scope.list.length) {
            reloadBookmarks();
        }

        function reloadBookmarks() {
            loadTagged().then(function(response) {
                Storage.tagged.put(tag, response.bookmarks);
            });
        }


        function loadArchived()
        {
            var parameters = {
                archive: 1,
                tags: tag
            };
            return loadBookmarks(parameters).then(function(response) {
                $scope.archive = response.bookmarks;
                $scope.archive.isEmpty = !$scope.archive.length;
                return response;
            });
        }

        function loadTagged()
        {
            var parameters = {
                archive: 0,
                tags: tag
            };
            return loadBookmarks(parameters).then(function(response) {
                $scope.list = response.bookmarks;
                $scope.list.isEmpty = !$scope.list.length;
                return response;
            });
        }

        function loadBookmarks(parameters) {
            $scope.loading = true;
            return client.getBookmarks(parameters).then(function(response) {
                $scope.loading = false;
                return response;
            }, function(response) {
                $scope.loading = false;
                console.log(response);
            });
        }
    });