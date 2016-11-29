angular.module("chatio").directive("cPage",[
	function(
	){
    return {
        restrict: "E",
        template: "<div class='page' layout='column' ng-transclude flex></div>",
        transclude: true,
        replace: true
    };
}]);