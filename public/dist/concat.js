angular.module("chatio", [
	"ui.router",
	"ngMaterial",
	"angularVideoBg"
]).config(function(
	$stateProvider,
	$urlRouterProvider,
	$mdThemingProvider
){
	$stateProvider
		.state({
			name: 'index',
			url: '/',
			views: {
				'content-view': {
					templateUrl: 'src/chatio-app/views/index.html',
					controller: 'IndexController'
				}
			}
		})
		.state({
			name: 'chat',
			url: '/chat',
			views: {
				'content-view': {
					templateUrl: 'src/chatio-app/views/chat.html',
					controller: 'ChatController'
				}
			}
		})

	$urlRouterProvider.otherwise("/");

	var myRed = $mdThemingProvider.extendPalette('red', {
    	'500': '#a50000'
	});

	// Register the new color palette map with the name <code>neonRed</code>
	$mdThemingProvider.definePalette('chatRed', myRed);

	$mdThemingProvider.theme('default')
	.primaryPalette('chatRed')
	.dark();

	$mdThemingProvider.enableBrowserColor({
		theme: "default",
      	palette: "primary",
		hue: "800"
	});
}).run([
	"$rootScope",
	function(
		$rootScope,
		$mdThemingProvider){
		$rootScope.$defaultRouteStateName = 'index';
	}
]);;angular.module("chatio").constant("MessageType",{
    USER_CONNECTED_MESSAGE: 0,
    USER_DISCONNECTED_MESSAGE: 1,
    NEW_CHAT_MESSAGE: 2
});;angular.module("chatio").controller("ChatController", [
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
}]);;angular.module("chatio").controller("IndexController",[
	"$scope",
	"$state",
	function(
		$scope,
		$state
	){

	$scope.youtubeVideos = [
		{
			// fire circles
			videoId: "PNWONhxILFA",
			start: 148,
			end: 164,
			contentZIndex: 0
		},
		{
			// keyboard is breaking
			videoId: "c5DASpdzSZU",
			start: 14,
			end: 75,
			contentZIndex: 0
		}
	];

	$scope.currentVideo = $scope.youtubeVideos[Math.floor(Math.random()*$scope.youtubeVideos.length)];

	$scope.goToChat = function() {
		$state.go("chat");
	};
}]);;angular.module("chatio").directive("cPage",[
	function(
	){
    return {
        restrict: "E",
        template: "<div class='page' layout='column' ng-transclude flex></div>",
        transclude: true,
        replace: true
    };
}]);;angular.module('chatio').factory('ShuffleHelper', function() {
  var shuffleHelper = {};

  shuffleHelper.shuffleArray = function (array) {
    return array.sort(function() {
        return (0.5 - Math.random());
    });
  };
  
  return shuffleHelper;
});