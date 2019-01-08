export default class NewPageController {
  constructor(chromeService, loginService, storageService, apiService) {
    this._chromeService = chromeService;
    this.resources = [];

    loginService.checkLoggedIn()
      .then(() => {
        this.isLoggedIn = true;
        return storageService.getSavedOrgAndUser();
      })
      .then(({org, user}) => {
        this.org = org;
        this.user = user;
        return apiService.getResources();
      })
      .then((response) => this.resources = response.results)
      .catch(() => this.isLoggedIn = false);
  }

  submit() {
    this._chromeService.openSearchTab(this.org.id, this.query);
  }
}

NewPageController.$inject = ['chromeService', 'loginService', 'storageService',
  'apiService'];
