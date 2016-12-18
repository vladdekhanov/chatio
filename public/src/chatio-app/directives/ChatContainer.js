angular.module("chatio").directive("cChatContainer",[
	function(
	){
    return {
        restrict: "A",
        link: function($scope, $element) {
            $scope.$watch(function(){
                return angular.element($element)[0].scrollHeight;
            }, function() {
                $element.scrollTop(angular.element($element)[0].scrollHeight)
            }, true);
        }
    };
}]);