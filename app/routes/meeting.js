import Route from '@ember/routing/route';
import { service } from '@ember/service';
import Distribution from '../utils/distribution';

export default class MeetingRoute extends Route {
  @service session;
  @service store;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'auth.login-redirect');
  }

  model({ meeting_id }) {
    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    return this.store.findRecord('meeting', meeting_id);
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.agendaDistribution = new Distribution(model, 'agenda');
    controller.notificationsDistribution = new Distribution(model, 'notifications');
  }
}
