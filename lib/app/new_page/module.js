import NewPageController from './controller.js';

const NewPage = angular.module('chromeApp.NewPage', [
  'ui.router',
  'chromeApp.Services'
]);

function configure($stateProvider) {
  $stateProvider
    .state('new_page', {
      url: '/',
      templateUrl: './app/new_page/template.html',
      controller: NewPageController,
      controllerAs: 'ctrl'
    });
}

NewPage.config(['$stateProvider', configure]);
