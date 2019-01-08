export default class LoginService {
  constructor($q, apiService, storageService) {
  	this._q = $q;
    this._apiService = apiService;
    this._storageService = storageService;
  }

  attemptPendingLogin() {
    return this._storageService.getPendingOrg()
      .then((pendingOrg) => {
        if (pendingOrg) {
          return this.getMe(pendingOrg)
        } else {
          throw Error('No Pending org');
        }
      })
      .then((res) => {
        return this._storageService
          .saveOrgAndUser(res.currentOrg, res.user);
      });
  }

  checkLoggedIn() {
    return this._storageService.getSavedOrgAndUser()
      .then(({org}) => this._apiService.getMe(org.id));
  }
}

LoginService.$inject = ['$q', 'apiService', 'storageService'];
