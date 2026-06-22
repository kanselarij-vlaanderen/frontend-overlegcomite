import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class MeetingAgendaitemsAgendaitemRoute extends Route {
  @service store;

  async model({ agendaitem_id }) {
    // Force a reload of the agendaitem. The one in cache does not have its
    // relations included. Since the relation between agendaitem and documents
    // is currently defined in only one way, it's the only way to get the documents.
    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    const agendaitem = await this.store.findRecord(
      'agendaitem',
      agendaitem_id,
      {
        include: [
          'submitters',
          'case',
          'documents.type',
          'documents.document-versions.access-level',
          'documents.document-versions.file',
          'notification.type',
          'notification.document-versions.access-level',
          'notification.document-versions.file',
        ],
        reload: true,
      },
    );
    this.case = await agendaitem.case;
    return agendaitem;
  }

  setupController(controller) {
    super.setupController(...arguments);
    controller.caseIdentifier = this.case?.identifier;
  }
}
