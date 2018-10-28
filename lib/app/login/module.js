import LoginController from './controller.js';

const Login = angular.module('chromeApp.Login', [
  'ui.router',
  'chromeApp.Services',
  'ngMaterial'
]);

function configure($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: './app/login/template.html',
      controller: LoginController,
      controllerAs: 'ctrl'
    });
}

Login.config(['$stateProvider', configure]);
