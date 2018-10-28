export default class AppController {
	constructor($state, $scope, storageService, apiService) {

		$scope.state = $state;
		$scope.loading = true;
		this._scope = $scope;
		this._state = $state;
		storageService.getSavedOrgAndUser()
		  .then((savedInfo) => {		  	
		  	if (!savedInfo.org || !savedInfo.user) {
		  		apiService.attemptPendingLogin()
		  		  .then(() => this._goToCreation())
		  		  .catch(() => {
		  		  	$scope.loading = false;
		  		  	$scope.shouldLogin = true
		  		  });
		  	} else {
		  		this._goToCreation();
		  	}
		  });
	}

	_goToCreation() {
		this._scope.loading = false;
		this._state.go('kb_creation', {});
	}
}

AppController.$inject = ['$state', '$scope', 'storageService', 'apiService'];
