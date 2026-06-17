import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class MeetingAgendaitemsAgendaitemRoute extends Route {
  @service store;

  async model({ agendaitem_id }) {
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
      },
    );
    // Force a reload of the agendaitem. The one in cache does not have its
    // relations included. We use a separate reload call, because the reload
    // parameter on findRecord does not work in legacy compat mode.
    await agendaitem.reload();
    this.case = await agendaitem.case;
    return agendaitem;
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.caseIdentifier = this.case?.identifier;
  }
}
