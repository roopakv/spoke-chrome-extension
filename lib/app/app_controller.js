export default class AppController {
	constructor($state, $scope, storageService) {
		$scope.state = $state;
		console.log('app controller');
		$scope.loading = true;
		storageService.getSavedOrg()
		  .then((savedOrg) => {
		  	console.log('savedOrg', savedOrg);
		  	$scope.loading = false;
		  	if (!savedOrg) {
		  		$scope.shouldLogin = true;
		  	} else {
		  		console.log('go to creation');
		  		$state.go('kb_creation', {});
		  	}
		  });
	}
}

AppController.$inject = ['$state', '$scope', 'storageService'];
