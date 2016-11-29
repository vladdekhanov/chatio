angular.module("chatio").controller("IndexController",[
	"$scope",
	"$state",
	function(
		$scope,
		$state
	){
	

	$scope.goToChat = function() {
		$state.go("chat");
	};
}]);