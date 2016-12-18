angular.module("chatio").controller("ChatController", [
    "$rootScope",
	"$scope",
	"$timeout",
	"MessageType",
	function(
        $rootScope,
		$scope,
		$timeout,
		MessageType
	) {
	$scope.MessageType = MessageType;
	$scope.messages = [];
	$scope.user = {
		name: ""
	};
	$scope.currentMessage = {
		text: ""
	};
	$scope.displayNameForm = true;
	
	$scope.submitName = function() {
		$scope.displayNameForm = false;
		$scope.registerSocketEvents($scope.user);
	};

	$scope.registerSocketEvents = function(user){
		$scope.socket = io.connect();
		$scope.socket.on("user-connected", function(name) {
			$timeout($scope.messages.push({type: MessageType.USER_CONNECTED_MESSAGE, msg: name}));
		});
		$scope.socket.on("user-disconnected", function(name) {
			$timeout($scope.messages.push({type: MessageType.USER_DISCONNECTED_MESSAGE, msg: name}));
		});
		$scope.socket.on("new-message", function(data) {
			data.timestamp = new Date(data.timestamp);
			$timeout($scope.messages.push({type: MessageType.NEW_CHAT_MESSAGE, msg: data.msg, name: data.name, timestamp: data.timestamp}));
		});

		$scope.socket.emit("user-connected", { name: user.name });
	};

	$scope.sendCurrentMessage = function() {
		if (!$scope.currentMessage.text) return;
		$scope.socket.emit("new-message", { 
			name: $scope.user.name, 
			msg: $scope.currentMessage.text,
			timestamp: new Date()
			}, 
			function(){
				$scope.currentMessage.text = "";
			}
		);
	};
}]);