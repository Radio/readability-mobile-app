angular.module('readability')
    .factory('State', function() {
        return {
            readingListRefreshRequired: true,
            archiveRefreshRequired: true,
            lastList: null
        };
    });