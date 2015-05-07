angular.module('readability')
    .controller('ReadingListController', function($scope, $location, Storage, Page, Api, State) {

        var client = Api.getReader();

        Page.id = 'reading-list';
        Page.showHeader = true;
        Page.title = 'Reading list';
        Page.actions = [{
            title: 'Archive',
            icon: 'mdi-content-archive',
            handler: function() {
                $location.path('#/archive');
            }
        }, {
            title: 'Refresh',
            icon: 'mdi-navigation-refresh',
            handler: function() {
                reloadBookmarks();
            }
        }];

        $scope.list = [];
        $scope.archiveFilter = { archive: false };
        $scope.readArticle = function(bookmark) {
            $location.path('/article/' + bookmark.id);
        };

        if (Storage.readingList.get()) {
            $scope.list = Storage.readingList.get();
        }
        if (!$scope.list || State.readingListRefreshRequired) {
            reloadBookmarks();
            State.readingListRefreshRequired = false;
        }

        function reloadBookmarks() {
            loadBookmarks().then(function(response) {
                Storage.readingList.put(response.bookmarks);
            });
        }

        function loadBookmarks() {
            $scope.loading = true;
            var parameters = {
                archive: 0
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