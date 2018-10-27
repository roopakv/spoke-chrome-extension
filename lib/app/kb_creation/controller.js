export default class KBCreationController {
  constructor(chromeService, apiService) {
    this.isLoading = true;
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
  }

}

KBCreationController.$inject = ['chromeService', 'apiService'];
