angular.module("chatio").controller("IndexController",[
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
}]);