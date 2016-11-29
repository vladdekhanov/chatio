angular.module("chatio", [
	"ui.router",
	"ngMaterial"
]).config(function(
	$stateProvider,
	$urlRouterProvider
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
}).run([
	"$rootScope",
	function($rootScope){
        $rootScope.ioSocket = io.connect();
		$rootScope.$defaultRouteStateName = 'index';
	}
]);