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
            console.log(url);
            var initial_portion = url.match(/http.*\/media/);
            console.log(initial_portion);
            return BASE_URL + '/media' + url.substr(initial_portion[0].length);
        };
    }]);
