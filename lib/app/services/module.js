import ApiService from './api_service.js';
import StorageService from './storage_service.js';
import ChromeService from './chrome_service.js';
import LoginService from './login_service.js';

const Services = angular.module('chromeApp.Services', [
  'ui.router'
]);

Services.service('storageService', StorageService);
Services.service('apiService', ApiService);
Services.service('chromeService', ChromeService);
Services.service('loginService', LoginService);

Services
  .config(['$httpProvider', function ($httpProvider){
    $httpProvider.defaults.headers.post['X-XSRF-TOKEN'] = 'JustAskSpoke!';
}]);
