'use strict';

angular.module('myApp.recipes', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/recipes', {
            templateUrl: 'recipes/recipes.html',
            controller: 'RecipesCtrl'
        });
    }])

    .controller('RecipesCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {

        Restangular.all('recipes').getList().then(function (recipes) {
            $scope.recipes = recipes;
        });

        $scope.deleteRecipe = function (recipeID) {
            Restangular.one('recipes', recipeID).customDELETE().then(function () {
                $location.path('/recipes');
            });
        };

        $scope.fixImageUrl = function (url) {
            var initial_portion = url.match(/http.*\/media/);
            var new_url =  BASE_URL + '/media' + url.substr(initial_portion[0].length);
            if (new_url[new_url.length - 1] !== '/') new_url += '/'; // add trailing slash
            return new_url;
        };
    }]);
