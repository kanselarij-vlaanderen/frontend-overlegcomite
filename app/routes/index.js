import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'frontend-overlegcomite/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  beforeModel() {
    this._super(...arguments);
    this.transitionTo('meetings');
  },
});
