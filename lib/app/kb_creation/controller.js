export default class KBCreationController {
  constructor(chromeService, apiService, storageService) {
    this._storageService = storageService;
    this._apiService = apiService;
    this.isLoading = true;
    this.resourceSaved = false;

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
      author: this._storageService.currentUser,
      org: this._storageService.currentOrg,
      origin: "KB_PAGE",
    };
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
