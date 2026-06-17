import Route from '@ember/routing/route';
import { service } from '@ember/service';
import ENV from 'frontend-overlegcomite/config/environment';

export default class ApplicationRoute extends Route {
  @service plausible;

  beforeModel() {
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
  }
}

