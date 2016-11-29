angular.module("chatio").controller("ChatController", [
    "$rootScope",
	"$scope",
	function(
        $rootScope,
		$scope
	) {
	$scope.chatPageTitle = "Welcome to chat!";
	$scope.userName = "";
	$scope.displayNameForm = true;
	
	$scope.submitName = function() {
		$scope.displayNameForm = false;
	};
}]);