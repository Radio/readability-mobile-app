angular.module('readability')
    .controller('ArchiveController', function($scope, $location, Storage, Page, Api, State) {

        var client = Api.getReader();

        Page.id = 'archive';
        Page.showHeader = true;
        Page.title = 'Archive';
        Page.actions = [{
            title: 'Reading List',
            icon: 'mdi-action-list',
            handler: function() {
                $location.path('#/reading-list');
            }
        }, {
            title: 'Refresh',
            icon: 'mdi-navigation-refresh',
            handler: function() {
                reloadArchive();
            }
        }];

        $scope.list = [];
        $scope.archiveFilter = { archive: true };
        $scope.readArticle = function(bookmark) {
            $location.path('/article/' + bookmark.id);
        };

        if (Storage.archive.get()) {
            $scope.list = Storage.archive.get();
        }
        if (!$scope.list || State.archiveRefreshRequired) {
            reloadArchive();
            State.archiveRefreshRequired = false;
        }

        function reloadArchive() {
            loadArchive().then(function(response) {
                Storage.archive.put(response.bookmarks);
            });
        }

        function loadArchive() {
            $scope.loading = true;
            var parameters = {
                archive: 1
            };
            return client.getBookmarks(parameters).then(function(response) {
                $scope.list = response.bookmarks;
                $scope.loading = false;
                return response;
            }, function(response) {
                $scope.loading = false;
                console.log(response);
            });
        }
    });