'use strict';

angular.module('myApp.recipeDetail', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/recipes/:recipeId', {
            templateUrl: 'recipe-detail/recipe-detail.html',
            controller: 'RecipeDetailCtrl'
        });
    }])

    .controller('RecipeDetailCtrl', ['$scope', 'Restangular', '$routeParams', '$location', function ($scope, Restangular, $routeParams, $location) {
        console.log('success');
        $scope.recipeId = $routeParams.recipeId;

        Restangular.one('recipes', $scope.recipeId).customGET().then(function (data) {
            $scope.recipe = data;
        });

        $scope.deleteRecipe = function () {
            var confirmation = confirm('Are you sure you want to delete this recipe? This cannot be undone');

            if (confirmation) {
                Restangular.one('recipes', $scope.recipe.id).customDELETE().then(function () {
                        alert('Your recipe was successfully deleted!');
                        $location.path('/recipes');
                    },
                    function () {
                        alert('There was a problem deleting your recipe')
                    })
            }
        };

        $scope.fixImageUrl = function (url) {
            console.log(url);
            var initial_portion = url.match(/http.*\/media/);
            console.log(initial_portion);
            return BASE_URL + '/media' + url.substr(initial_portion[0].length);
        };
    }]);