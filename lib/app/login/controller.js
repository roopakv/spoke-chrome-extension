export default class LoginController {
  constructor($state, $mdToast, apiService, storageService, chromeService) {
  	this._apiService = apiService;
  	this._storageService = storageService;
  	this._chromeService = chromeService;
  	this._state = $state;
  	this._toastService = $mdToast;
  }

  attemptLogin() {
  	this._apiService.getMe(this.orgId)
  	  .then((res) => {
  	  	return this._storageService
  	  	  .saveOrgAndUser(res.currentOrg._id, res.user._id);
  	  })
  	  .then(() => {
  	  	this._state.go('kb_creation', {})
  	  })
  	  .catch((res) => {
  	  	this._storageService.savePendingOrg(this.orgId);
		 		this._chromeService.openTabToLogin(this.orgId);
  	  	this._toastService.show(
  	  	  this._toastService.simple().textContent('Not logged in to spoke'));	
  	  });
  }
}

LoginController.$inject = ['$state', '$mdToast', 'apiService', 'storageService', 
  'chromeService'];
