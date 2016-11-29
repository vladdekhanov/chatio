angular.module("chatio").directive("cPage",[
	function(
	){
    return {
        restrict: "E",
        template: "<div class='page' layout='row' ng-transclude flex></div>",
        transclude: true
    };
}]);