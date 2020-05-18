import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'frontend-overlegcomite/mixins/authenticated-route-mixin'; // eslint-disable-line ember/no-mixins

export default Route.extend(AuthenticatedRouteMixin, {
  beforeModel() {
    this.transitionTo('agendaitems', this.modelFor('meeting').get('id'));
  }
});
