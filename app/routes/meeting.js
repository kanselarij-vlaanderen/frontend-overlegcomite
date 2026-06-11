import Route from '@ember/routing/route';
import { service } from '@ember/service';
import Distribution from '../models/distribution';

export default class MeetingRoute extends Route {
  @service store;

  model({ meeting_id }) {
    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    return this.store.findRecord('meeting', meeting_id, {
      include: ['agenda-items.submitters']
    });
  }

  setupController(controller, model) {
    controller.agendaDistribution = new Distribution(model, 'agenda');
    controller.notificationsDistribution = new Distribution(model, 'notifications');
  }
}
