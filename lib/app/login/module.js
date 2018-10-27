import LoginController from './controller.js';

const Login = angular.module('chromeApp.Login', [
  'ui.router'
]);

function configure($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'lib/app/login/template.html',
      controller: LoginController,
      controllerAs: 'ctrl'
    });
}

LoginController.config(['$stateProvider', configure]);
