import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { findRecord } from '@warp-drive/utilities/json-api';

export default class MeetingAgendaitemRoute extends Route {
  @service store;

  async model({ agendaitem_id }) {
    const query = findRecord('agendaitem', agendaitem_id, {
      include: ["submitters", "case"]
    });
    const res = await this.store.request(query);
    return res.content.data;
  }
}
