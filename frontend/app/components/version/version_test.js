'use strict';

describe('recipeOrganizer.version module', function() {
  beforeEach(module('recipeOrganizer.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
