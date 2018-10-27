export default class LoginController {
  constructor($state, apiService, storageService) {
  	this._apiService = apiService;
  	this._storageService = storageService;
  	this._state = $state;
  }

  attemptLogin() {
  	console.log('logging in to' + this.orgId);
  	this._apiService.getMe(this.orgId)
  	  .then((res) => {
  	  	return this._storageService
  	  	  .saveOrgAndUser(res.currentOrg._id, res.user._id);
  	  })
  	  .then(() => this._state.go('kb_creation'));
  }
}

LoginController.$inject = ['$state', 'apiService', 'storageService'];
