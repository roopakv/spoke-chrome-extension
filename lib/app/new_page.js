import './services/module.js';
import './new_page/module.js';
import './login/module.js';

import NewPageController from './new_page_controller';

const chromeExtension = angular.module('chromeApp', [
	'chromeApp.Services',
	'chromeApp.Login',
	'chromeApp.NewPage',
	'ngMaterial',
	'ui.router'
]);

chromeExtension.controller('NewPageController', NewPageController);

chromeExtension.config(['$urlRouterProvider', function($urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
}])
