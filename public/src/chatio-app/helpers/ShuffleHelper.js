angular.module('chatio').factory('ShuffleHelper', function() {
  var shuffleHelper = {};

  shuffleHelper.shuffleArray = function (array) {
    return array.sort(function() {
        return (0.5 - Math.random());
    });
  };
  
  return shuffleHelper;
});