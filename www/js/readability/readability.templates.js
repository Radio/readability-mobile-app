angular.module('readability-templates', ['js/readability/components/article/article.tpl.html', 'js/readability/components/reading-list/reading-list.tpl.html']);

angular.module("js/readability/components/article/article.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("js/readability/components/article/article.tpl.html",
    "<div class=\"container\">\n" +
    "    <h2>{{ article.title }}</h2>\n" +
    "    <p>Lorem ipsum...</p>\n" +
    "    <p>\n" +
    "        <a href=\"#/\">&larr; back</a>\n" +
    "    </p>\n" +
    "</div>");
}]);

angular.module("js/readability/components/reading-list/reading-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("js/readability/components/reading-list/reading-list.tpl.html",
    "<ul class=\"collection\">\n" +
    "    <li class=\"collection-item\" data-ng-repeat=\"article in list\">\n" +
    "        <a href=\"#/article/{{ article.id }}\">{{ article.title }}</a>\n" +
    "    </li>\n" +
    "</ul>");
}]);
