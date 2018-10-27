export default class AppController {
	constructor($state, $scope, storageService) {
		$scope.state = $state;
		console.log('app controller');
		$scope.loading = true;
		storageService.getSavedOrgAndUser()
		  .then((savedInfo) => {
		  	console.log('savedOrg', savedInfo);
		  	console.log(!savedInfo.org || !savedInfo.user);
		  	$scope.loading = false;
		  	if (!savedInfo.org || !savedInfo.user) {
		  		$scope.shouldLogin = true;
		  	} else {
		  		console.log('go to creation');
		  		$state.go('kb_creation', {});
		  	}
		  });
	}
}

AppController.$inject = ['$state', '$scope', 'storageService'];
