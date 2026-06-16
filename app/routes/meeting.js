import Route from '@ember/routing/route';
import { service } from '@ember/service';
import Distribution from '../utils/distribution';

export default class MeetingRoute extends Route {
  @service store;

  model({ meeting_id }) {
    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    return this.store.findRecord('meeting', meeting_id, {
      include: [
        'agenda-items.submitters',
        'documents.document-versions.file',
        'documents.document-versions.access-level',
      ],
    });
  }

  setupController(controller, model) {
    controller.agendaDistribution = new Distribution(model, 'agenda');
    controller.notificationsDistribution = new Distribution(model, 'notifications');
  }
}
