export default class AppController {
	constructor($state, $scope, loginService) {

		$scope.state = $state;
		$scope.loading = true;
		this._scope = $scope;
		this._state = $state;
		// TODO: figure out a way to skip checking logging on each open.
		loginService.checkLoggedIn()
		  .then((response) =>	this._goToCreation())
		  .catch(() => loginService.attemptPendingLogin())
			.then(() => this._goToCreation())
		  .catch(() => {
		  	$scope.loading = false;
		  	this._state.go('login', {});
		  });
	}

	_goToCreation() {
		this._scope.loading = false;
		this._state.go('kb_creation', {});
	}
}

AppController.$inject = ['$state', '$scope', 'loginService'];
