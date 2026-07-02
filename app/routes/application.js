import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { warn } from '@ember/debug';
import ENV from 'frontend-overlegcomite/config/environment';

export default class ApplicationRoute extends Route {
  @service session;
  @service currentSession;
  @service router;
  @service plausible;

  async beforeModel() {
    await this.session.setup();

    // TODO move to instance-initializer
    const { domain, apiHost } = ENV.plausible;

    if (
      domain !== '{{ANALYTICS_APP_DOMAIN}}' &&
      apiHost !== '{{ANALYTICS_API_HOST}}'
    ) {
      this.plausible.enable({
        domain,
        apiHost,
      });
    }

    try {
      await this.currentSession.load();
    } catch (error) {
      warn(error, { id: 'current-session-load-failure' });
      this.router.transitionTo('auth.logout');
    }
  }
}
