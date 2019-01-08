export default class ChromeService {
  constructor($q) {
  	this._q = $q;
  }

  getCurrentTabInfo() {
  	return this._q((resolve, reject) => {
  		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  			// Only one active tab on current window possible;
  			const tab = tabs[0]
  			resolve({
  				url: tab.url,
  				title: tab.title,
  				faviconUrl: tab.favIconUrl
  			});
  		});
  	})
  }

  openTabToLogin(orgId) {
  	return this._q((resolve, reject) => {
  		chrome.tabs.create({
  		 url: `https://${orgId}.askspoke.com`,
  		 active: true
  		});
  	});
  }

  openSearchTab(orgId, query) {
    return this._q((resolve, reject) => {
      chrome.tabs.update({
       url: `https://${orgId}.askspoke.com/new?q=${query}`,
       active: true
      });
    });
  }

}

ChromeService.$inject = ['$q'];
