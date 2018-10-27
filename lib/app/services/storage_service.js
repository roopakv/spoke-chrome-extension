export default class StorageService {
  constructor($q) {
  	this._q = $q;
  }

  getSavedOrgAndUser() {
  	return this._q((resolve, reject) => {
  		if (this.currentOrg && this.currentUser) {
  			resolve({
  				org: this.currentOrg,
  				user: this.currentUser
  			});
  			return;
  		}
  		chrome.storage.sync.get(
  			[StorageService.SAVED_ORG, StorageService.SAVED_USER], 
  			function(result) {
      	  this.currentOrg = result[StorageService.SAVED_ORG];
      	  this.currentUser = result[StorageService.SAVED_USER];
      	  resolve({
      	  	org: this.currentOrg,
      	  	user: this.currentUser
      	  });
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

