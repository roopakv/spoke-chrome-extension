import ApiService from './api_service.js';

const Services = angular.module('chromeApp.Services', [
  'ui.router'
]);

Services.service('apiService', ApiService);
