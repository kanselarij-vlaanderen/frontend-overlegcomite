import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class MeetingAgendaitemsAgendaitemRoute extends Route {
  @service store;

  async model({ agendaitem_id }) {
    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    return (await this.store.findRecord('agendaitem', agendaitem_id, {
      include: [
        'submitters',
        'case',
        'documents.type',
        'documents.document-versions.access-level',
        'notification.type',
        'notification.document-versions.access-level',
      ]
    })).reload();
  }
 }
