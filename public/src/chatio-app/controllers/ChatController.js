angular.module("chatio").controller("ChatController", [
    "$rootScope",
	"$scope",
	"MessageType",
	function(
        $rootScope,
		$scope,
		MessageType
	) {
	$scope.MessageType = MessageType;
	$scope.messages = [];
	$scope.userName = "";
	$scope.displayNameForm = true;
	
	$scope.submitName = function() {
		$scope.displayNameForm = false;
		$scope.registerSocketEvents();
	};

	$scope.registerSocketEvents = function(){
		$scope.socket = io.connect();
		$scope.socket.on("user-connected", function(name) {
			$scope.messages.push({type: MessageType.USER_CONNECTED_MESSAGE, msg: name})
		});
		$scope.socket.on("user-disconnected", function(name) {
			$scope.messages.push({type: MessageType.USER_DISCONNECTED_MESSAGE, msg: name})
		});
		$scope.socket.on("new-message", function(msg) {
			$scope.messages.push({type: MessageType.NEW_CHAT_MESSAGE, msg: msg})
		});

		$scope.socket.emit("user-connected", { name: $scope.userName }, function() {
			$scope.userName = "";
		});
	};
}]);