import LoginController from './controller.js';

export default function() {
  return {
    restrict: 'E',
    templateUrl: './app/login/template.html',
    controller: LoginController,
    controllerAs: 'ctrl',
    bindToController: true,
    scope: {
      currentOrg: '='
    }
  };
}
