import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class SettingsRoute extends Route {
  @service session;
  @service currentSession;
  @service router;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'auth.login-redirect');

    if (!this.currentSession.may('manage-settings')) {
      this.router.transitionTo('index');
    }
  }
}
