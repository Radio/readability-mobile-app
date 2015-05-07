angular.module('readability')
    .controller('ArticleController', function($scope, $routeParams, $location, Storage, Api, Page, State) {

        Page.id = 'article';
        Page.showHeader = false;
        Page.title = '';

        var client = Api.getReader();
        var bookmarkId = $routeParams.articleId;
        $scope.article = {};
        $scope.goBack = function() {
            window.history.back();
        };
        $scope.archiveBookmark = function(bookmark) {
            archiveBookmark(bookmark).then(function(updatedBookmark) {
                Storage.bookmark.put(updatedBookmark);
                State.readingListRefreshRequired = true;
                State.archiveRefreshRequired = true;
                if (updatedBookmark.archive) {
                    $location.path('/reading-list');
                }
            });
        };
        $scope.faveBookmark = function(bookmark) {
            faveBookmark(bookmark).then(function(updatedBookmark) {
                Storage.bookmark.put(updatedBookmark);
            });
        };
        $scope.deleteBookmark = function(bookmark) {
            deleteBookmark(bookmark).then(function() {
                $location.path('/reading-list');
                State.readingListRefreshRequired = true;
                State.archiveRefreshRequired = true;
            });
        };

        $scope.$watch('article', function(article) {
            if (article.date_published) {
                article.date_published = article.date_published.replace(' ', 'T');
            }
        });

        if (Storage.bookmark.get(bookmarkId)) {
            $scope.bookmark = Storage.bookmark.get(bookmarkId);
            if (Storage.article.get($scope.bookmark.article.id)) {
                $scope.article = Storage.article.get($scope.bookmark.article.id);
            } else {
                loadArticle($scope.bookmark.article.id).then(function(article) {
                    Storage.article.put(article);
                });
            }
        } else {
            loadBookmark().then(function(bookmark) {
                Storage.bookmark.put(bookmark);
                loadArticle(bookmark.article.id).then(function(article) {
                    Storage.article.put(article);
                });
            });
        }

        function loadBookmark() {
            return client.getBookmark(bookmarkId).then(function(bookmark) {
                $scope.bookmark = bookmark;
                $scope.article = bookmark.article;
                return bookmark;
            }, function(response) {
                console.log(response);
            });
        }

        function loadArticle(articleId) {
            return client.getArticle(articleId).then(function(article) {
                $scope.article = article;
                return article;
            }, function(response) {
                console.log(response);
            });
        }

        function archiveBookmark(bookmark) {
            var parameters = {
                archive: !bookmark.archive,
                favorite: bookmark.favorite,
                read_percent: bookmark.read_percent
            };
            bookmark.archive = !bookmark.archive;
            return updateBookmark(bookmark.id, parameters);
        }

        function faveBookmark(bookmark) {
            var parameters = {
                archive: bookmark.archive,
                favorite: !bookmark.favorite,
                read_percent: bookmark.read_percent
            };
            bookmark.favorite = !bookmark.favorite;
            return updateBookmark(bookmark.id, parameters);
        }

        function updateBookmark(id, parameters)
        {
            return client.updateBookmark(id, parameters).then(function(updatedBookmark) {
                $scope.bookmark = updatedBookmark;
                return updatedBookmark;
            }, function(response) {
                console.log(response);
            });
        }

        function deleteBookmark(bookmark) {
            return client.deleteBookmark(bookmark.id).then(function() {
                // todo: update bookmarks list.
            }, function(response) {
                //console.log(response);
            });
        }
    });