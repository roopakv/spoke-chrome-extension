import './kb_creation/module.js';
import './services/module.js';

const chromeExtension = angular.module('chromeApp', [
	'chromeApp.KBCreation',
	'chromeApp.Services',
	'ngMaterial'
]);

import AppController from './app_controller.js';

chromeExtension.controller('AppController', AppController);

chromeExtension.config(['$urlRouterProvider', function($urlRouterProvider) {
	$urlRouterProvider.when('/', '/kb_creation');
}])
