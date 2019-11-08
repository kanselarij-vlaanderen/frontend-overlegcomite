import Route from '@ember/routing/route';
import ENV from 'frontend-overlegcomite/config/environment';

export default Route.extend({

  beforeModel() {
    if (this.routeName !== ENV.APP.defaultLoginRouteName) {
      this.transitionTo(ENV.APP.defaultLoginRouteName);
    }
  }
});
