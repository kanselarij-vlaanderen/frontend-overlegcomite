import Route from '@ember/routing/route';
import ENV from 'frontend-overlegcomite/config/environment';

export default Route.extend({

  beforeModel() {
    if (ENV.environment === 'development') {
      this.transitionTo('mock-login');
    }
  }
});
