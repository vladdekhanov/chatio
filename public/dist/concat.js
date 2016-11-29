angular.module("chatio", [
	"ui.router",
	"ngMaterial"
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
        $rootScope.ioSocket = io.connect();
		$rootScope.$defaultRouteStateName = 'index';
	}
]);;angular.module("chatio").controller("ChatController", [
    "$rootScope",
	"$scope",
	function(
        $rootScope,
		$scope
	) {
	$scope.chatPageTitle = "Welcome to chat!";
}]);;angular.module("chatio").controller("IndexController",[
	"$scope",
	"$state",
	function(
		$scope,
		$state
	){
		

		$scope.goToChat = function() {
			$state.go("chat");
		};
}]);;angular.module("chatio").directive("cPage",[
	function(
	){
    return {
        restrict: "E",
        template: "<div class='page' layout='row' ng-transclude flex></div>",
        transclude: true
    };
}]);