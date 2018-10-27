import './services/module.js';
import './kb_creation/module.js';
import './login/module.js';

import AppController from './app_controller.js';

const chromeExtension = angular.module('chromeApp', [
	'chromeApp.KBCreation',
	'chromeApp.Services',
	'chromeApp.Login',
	'ngMaterial',
	'ui.router'
]);

chromeExtension.controller('AppController', AppController);

chromeExtension.config(['$urlRouterProvider', function($urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
}])
