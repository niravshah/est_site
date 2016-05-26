var app = angular.module('estApp', ['ngRoute'])

app.config(['$interpolateProvider', function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
}]);

app.controller('BlogCtrl', function ($scope, $http) {

    $scope.posts = [];
    $http.get('blogs/posts.json').success(function (data, status, headers, config) {
        console.log('Data', data.posts);
        $scope.posts = data.posts;
    }).error(function (data, status, headers, config) {
        console.log('Ajax Error')
    });
    console.log('Blog Controller')
});