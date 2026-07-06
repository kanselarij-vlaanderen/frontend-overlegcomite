import Route from '@ember/routing/route';
import { service } from '@ember/service';
import ENV from 'frontend-overlegcomite/config/environment';

export default class AuthLogoutRoute extends Route {
  @service router;
  @service currentSession;
  @service session;

  async beforeModel(transition) {
    if (this.session.requireAuthentication(transition, 'auth.login-redirect')) {
      try {
        const wasMockLoginSession = this.session.isMockLoginSession;
        await this.session.invalidate();
        this.currentSession.clear();
        const logoutUrl = wasMockLoginSession
          ? this.router.urlFor('mock-login')
          : ENV.acmidm.logoutUrl;

        window.location.replace(logoutUrl);
      } catch (error) {
        throw new Error(
          'Something went wrong while trying to remove the session on the server',
          {
            cause: error,
          },
        );
      }
    }
  }
}
