import KBCreationController from './controller.js';

const KBCreation = angular.module('chromeApp.KBCreation', [
  'ui.router',
  'chromeApp.Services'
]);

function configure($stateProvider) {
  $stateProvider
    .state('kb_creation', {
      url: '/',
      templateUrl: './app/kb_creation/template.html',
      controller: KBCreationController,
      controllerAs: 'ctrl'
    });
}

KBCreation.config(['$stateProvider', configure]);
