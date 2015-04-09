'use strict';

angular.module('recipeOrganizer.version', [
  'recipeOrganizer.version.interpolate-filter',
  'recipeOrganizer.version.version-directive'
])

.value('version', '0.1');
