import Route from '@ember/routing/route';
import { service } from '@ember/service';
import ENV from 'frontend-overlegcomite/config/environment';

export default class AuthLoginRedirectRoute extends Route {
  @service router;

  beforeModel() {
    const loginRoute = ENV.environment === 'development' ? 'mock-login' : 'login';
    this.router.transitionTo(loginRoute);
  }
}
