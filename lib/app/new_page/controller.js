export default class NewPageController {
  constructor(chromeService, loginService, storageService) {
    this._chromeService = chromeService;

    loginService.checkLoggedIn()
      .then(() => {
        this.isLoggedIn = true;
        return storageService.getSavedOrgAndUser()
          .then(({org}) => this.orgId = org);
      })
      .catch(() => this.isLoggedIn = false);
  }

  submit() {
    this._chromeService.openSearchTab(this.orgId, this.query);
  }
}

NewPageController.$inject = ['chromeService', 'loginService', 'storageService'];
