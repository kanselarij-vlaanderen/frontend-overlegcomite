import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { query } from '@warp-drive/utilities/json-api';

export default class MeetingAgendaitemsRoute extends Route {
  @service store;

  async model() {
    const model = this.modelFor('meeting')
    await this.store.request(query('agendaitem', {
      include: ['case', 'submitters'],
      'filter[meeting][:uri:]': model.uri,
    }))
    return model;
  }
}
