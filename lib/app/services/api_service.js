export default class ApiService {
  constructor($http, $q, storageService) {
    this._http = $http;
    this._q = $q;
    this._storageService = storageService;
  }

  getMe(orgId) {
  	return this._handleHttpResponse(
  		this._http.get(ApiService.GET_URL(orgId, ApiService.ENDPOINTS.ME)));
  }

  getLinkInfo(url) {
  	return this._getOrgAndHandleGet(ApiService.ENDPOINTS.LINKINFO, {url})
  	  .then((res) => {
  	  	console.log(res);
  	  	return res;
  	  });
  }

  getTeams() {
    return this._handleHttpResponse(
      this._http.get(this._getOrgUrl(ApiService.ENDPOINTS.GET_TEAMS), {
        params: {
          org: this._storageService.currentOrg,
          status: 'ACTIVE'
        }
      }));
  }

  _getOrgAndHandleGet(endpoint, data) {
  	return this._storageService.getSavedOrgAndUser()
  	  .then(({org, user}) => {
  	  	data.org = org;
  	  	const apiUrl = ApiService.GET_URL(org, endpoint);
  	  	return this._handleHttpResponse(this._http.get(apiUrl, {params: data}))
  	  });
  }

  addToKb(data) {
  	return this._handlePost(ApiService.ENDPOINTS.ADD_RESOURCE, data);
  }

  // Since the extension will never post before being "logged in" we assume
  // storageService has been pre-loaded with org info here.
  _handlePost(endpoint, data) {
  	const url = this._getOrgUrl(endpoint);
  	return this._handleHttpResponse(this._http.post(url, data));
  }

  _handleHttpResponse(responsePromise) {
  	return responsePromise
  	  .then((res) => res.data);
  }

  // TO be called once logged in so that storage service is pre-populated with
  // org info.
  _getOrgUrl(endpoint) {
    return ApiService.GET_URL(this._storageService.currentOrg, endpoint);
  }
}

ApiService.GET_URL = (orgId, endpoint) => {
  return `https://${orgId}.askspoke.com/${endpoint}`;
}

ApiService.ENDPOINTS = {
  ME: 'me',
  LINKINFO: 'fetchlink',
  ADD_RESOURCE: 'api/v1/resources',
  GET_TEAMS: 'api/v1/teams'
}

ApiService.CSRF = {
	HEADER: 'x-xsrf-token',
	VALUE: 'JustAskSpoke!'
}

ApiService.$inject = ['$http', '$q', 'storageService'];
