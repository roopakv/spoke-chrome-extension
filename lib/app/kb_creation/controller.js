export default class KBCreationController {
  constructor(chromeService, apiService, storageService) {
    this._storageService = storageService;
    this._apiService = apiService;
    this.isLoading = true;
    this.resourceSaved = false;

    this.teamsLoaded = false;
    this.loadTeams();

    chromeService.getCurrentTabInfo()
    .then((info) => {
      this.link = info.url;
      return apiService.getLinkInfo(info.url)
    })
    .then((linkInfo) => {
      this.isLoading = false;
      this.linkInfo = linkInfo;
      this.title = linkInfo.title || linkInfo.text;
    })
    .catch(() => {
      this.isLoading = false;
      this.linkInfo = {
        url: this.link
      };
    });
  }

  loadTeams() {
    if (this.teamsLoaded) {
      return;
    }
    return this._apiService.getTeams()
      .then((response) => {
        this.teamsLoaded = true;
        this.teams = response.results;
      });
  }

  addToKb() {
    this.isLoading = true;
    const postBody = {
      type: "link",
      title: this.title,
      link: this.linkInfo,
      // TODO(add keywords & team support)
      keywords: [],
      team: null,
      shouldAddToKb: true,
      author: this._storageService.currentUser.id,
      org: this._storageService.currentOrg.id,
      origin: "KB_PAGE",
    };
    if (this.team) {
      postBody.team = this.team
    }
    if (this.description) {
      postBody.quillChangeDelta = {
        ops: [{
            insert: this.description
        }]
      };
    }
    this._apiService.addToKb(postBody)
      .then((res) => {
        this.resourceSaved = true;
        this.isLoading = false;
        this.resource = res;
      })
      .catch((res) => console.log(res));
  }
}

KBCreationController.$inject = ['chromeService', 'apiService', 'storageService'];
