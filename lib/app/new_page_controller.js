export default class NewPageController {
	constructor($state, $scope) {

		$scope.state = $state;
		$scope.loading = false;
		this._scope = $scope;
		this._state = $state;
		this._state.go('new_page', {});
	}
}

NewPageController.$inject = ['$state', '$scope'];
