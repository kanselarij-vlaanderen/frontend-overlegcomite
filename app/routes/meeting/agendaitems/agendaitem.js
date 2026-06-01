import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class MeetingAgendaitemsAgendaitemRoute extends Route {
  @service store;

  model({ agendaitem_id }) {
    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    return this.store.findRecord('agendaitem', agendaitem_id, {
      include: ['submitters', 'case']
    });
  }
}
