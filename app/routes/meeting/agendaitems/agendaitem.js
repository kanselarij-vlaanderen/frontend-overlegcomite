import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class MeetingAgendaitemsAgendaitemRoute extends Route {
  @service store;

  async model({ agendaitem_id }) {
    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    const agendaitem = await this.store.findRecord('agendaitem', agendaitem_id, {
      include: [
        'submitters',
        'case',
        'documents.type',
        'documents.document-versions.access-level',
        'documents.document-versions.file',
        'notification.type',
        'notification.document-versions.access-level',
        'notification.document-versions.file',
      ]
    });
    await agendaitem.reload();
    this.case = await agendaitem.case;
    return agendaitem;
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.caseIdentifier = this.case.identifier;
  }
 }
