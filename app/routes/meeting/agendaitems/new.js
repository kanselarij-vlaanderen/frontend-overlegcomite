import Route from '@ember/routing/route';
import { service } from "@ember/service";
import { query } from '@warp-drive/utilities/json-api';
import createRecord from '../../../utils/warp-drive/create-record';

export default class MeetingAgendaitemsNewRoute extends Route {
  @service store;

  async model() {
    const meeting = this.modelFor('meeting');
    const latestAgendaitem = (await this.store.request(query('agendaitem', {
      'filter[meeting][:uri:]': meeting.uri,
      sort: '-priority',
      'page[size]': 1
    }))).content.data[0];
    const case_ = await createRecord(this.store, 'case', {});
    const agendaitem = await createRecord(this.store, 'agendaitem', {
      meeting,
      priority: (latestAgendaitem?.priority || 0) + 1,
      case: case_,
    })
    return agendaitem;
  }
}
