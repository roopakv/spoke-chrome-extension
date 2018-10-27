export default class ApiService {
  constructor($http, $q, storageService) {
    this._http = $http;
    this._q = $q;
    this._storageService = storageService;
  }

  getMe(orgId) {
  	return this._handleHttpResponse(
  		this._http.get(ApiService.GET_URL(orgId, ApiService.ENDPOINTS.ME)))
  	  .then((res) => {
  	  	console.log(res);
  	  	return res;
  	  });
  }

  getLinkInfo(url) {
  	return this._getOrgAndHandleGet(ApiService.ENDPOINTS.LINKINFO, {url})
  	  .then((res) => {
  	  	console.log(res);
  	  	return res;
  	  });
  }

  _getOrgAndHandleGet(endpoint, data) {
  	return this._storageService.getSavedOrgAndUser()
  	  .then(({org, user}) => {
  	  	data.org = org;
  	  	const apiUrl = ApiService.GET_URL(org, endpoint);
  	  	return this._handleHttpResponse(this._http.get(apiUrl, {params: data}))
  	  });
  }

  _handleHttpResponse(responsePromise) {
  	return responsePromise
  	  .then((res) => res.data)
  	  .catch((res) => {
  	  	return {
  	  		status: res.status,
  	  		body: res.data
  	  	}
  	  });
  }
}

ApiService.GET_URL = (orgId, endpoint) => {
  return `https://${orgId}.askspoke.com/${endpoint}`;
}

ApiService.ENDPOINTS = {
  ME: 'me',
  LINKINFO: 'fetchlink'
}

ApiService.$inject = ['$http', '$q', 'storageService'];

