angular.module('readability')
    .factory('Storage', function(BookmarkStorage, ArticleStorage, ReadingListStorage, ArchiveStorage, TagsStorage, TaggedStorage) {
        return {
            bookmark: BookmarkStorage,
            article: ArticleStorage,
            readingList: ReadingListStorage,
            archive: ArchiveStorage,
            tags: TagsStorage,
            tagged: TaggedStorage
        };
    })
    .factory('BookmarkStorage', function($localStorage) {
        var cachePrefix = 'bookmark-';
        return {
            get: function(id) {
                return $localStorage[cachePrefix + id];
            },
            put: function(bookmark) {
                $localStorage[cachePrefix + bookmark.id] = bookmark;
            },
            clear: function(id) {
                delete $localStorage[cachePrefix + id];
            }
        };
    })
    .factory('ArticleStorage', function($localStorage) {
        var cachePrefix = 'article-';
        return {
            get: function(id) {
                return $localStorage[cachePrefix + id];
            },
            put: function(article) {
                $localStorage[cachePrefix + article.id] = article;
            },
            clear: function(id) {
                delete $localStorage[cachePrefix + id];
            }
        };
    })
    .factory('ReadingListStorage', function($localStorage) {
        var cachePrefix = 'reading-list';
        return {
            get: function() {
                return $localStorage[cachePrefix];
            },
            put: function(list) {
                $localStorage[cachePrefix] = list;
            },
            clear: function() {
                delete $localStorage[cachePrefix];
            }
        };
    })
    .factory('ArchiveStorage', function($localStorage) {
        var cachePrefix = 'archive';
        return {
            get: function() {
                return $localStorage[cachePrefix];
            },
            put: function(list) {
                $localStorage[cachePrefix] = list;
            },
            clear: function() {
                delete $localStorage[cachePrefix];
            }
        };
    })
    .factory('TaggedStorage', function($localStorage) {
        var cachePrefix = 'tagged-';
        return {
            get: function(id) {
                return $localStorage[cachePrefix + id];
            },
            put: function(id, list) {
                $localStorage[cachePrefix + id] = list;
            },
            clear: function(id) {
                delete $localStorage[cachePrefix + id];
            }
        };
    })
    .factory('TagsStorage', function($localStorage) {
        var cachePrefix = 'tags';
        return {
            get: function() {
                return $localStorage[cachePrefix];
            },
            put: function(article) {
                $localStorage[cachePrefix] = article;
            },
            clear: function() {
                delete $localStorage[cachePrefix];
            }
        };
    })
;