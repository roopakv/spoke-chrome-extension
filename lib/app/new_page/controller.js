export default class NewPageController {
  constructor(chromeService, loginService, storageService) {
    this._chromeService = chromeService;

    loginService.checkLoggedIn()
      .then(() => {
        this.isLoggedIn = true;
        return storageService.getSavedOrgAndUser()
          .then(({org, user}) => {
            this.org = org;
            this.user = user;
          });
      })
      .catch(() => this.isLoggedIn = false);
  }

  submit() {
    this._chromeService.openSearchTab(this.org.id, this.query);
  }
}

NewPageController.$inject = ['chromeService', 'loginService', 'storageService'];
