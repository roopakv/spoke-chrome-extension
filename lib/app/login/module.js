import LoginDirective from './directive.js';

const Login = angular.module('chromeApp.Login', [
  'ui.router',
  'chromeApp.Services'
]);

Login.directive('login', LoginDirective);
