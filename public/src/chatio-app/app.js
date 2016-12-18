angular.module("chatio", [
	"ui.router",
	"ngMaterial",
	"angularVideoBg",
	"duScroll",
	"720kb.socialshare"
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
]);