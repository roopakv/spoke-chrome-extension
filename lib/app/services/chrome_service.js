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
}

ChromeService.$inject = ['$q'];
