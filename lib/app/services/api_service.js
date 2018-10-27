export default class ApiService {
  constructor($http, $q) {
    this._http = $http;
    this._q = $q;
  }

  getMe(orgId) {
  	return this._handleHttpResponse(
  		this._http.get(ApiService.GET_URL(orgId, ApiService.ENDPOINTS.ME)))
  	  .then((res) => {
  	  	console.log(res);
  	  	return res;
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
  ME: 'me'
}

ApiService.$inject = ['$http', '$q'];

