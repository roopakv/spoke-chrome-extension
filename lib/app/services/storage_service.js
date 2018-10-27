export default class StorageService {
  constructor($q) {
  	this._q = $q;
  }

  getSavedOrg() {
  	return this._q((resolve, reject) => {
  		if (this.currentOrg) {
  			resolve(this.currentOrg);
  			return;
  		}
  		chrome.storage.sync.get(
  			  [StorageService.SAVED_ORG], function(result) {
      	this.currentOrg = result[StorageService.SAVED_ORG];
      	resolve(this.currentOrg);
    	});
  	});
  }

  saveOrgAndUser(orgId, userId) {
  	const data = {
  		[StorageService.SAVED_ORG]: orgId,
  		[StorageService.SAVED_USER]: userId
  	};
  	return this._q((resolve, reject) => {
  		chrome.storage.sync.set(
  			  data, function(result) {
  			console.log('saved', data);
      	resolve(data);
    	});
  	});
  }
}

StorageService.$inject = ['$q'];

StorageService.SAVED_ORG = 'org_id';
StorageService.SAVED_USER = 'user_id';

