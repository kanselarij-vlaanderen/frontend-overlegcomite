import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { query } from '@warp-drive/utilities/json-api';

export default class MeetingAgendaitemsRoute extends Route {
  @service store;

  async model() {
    const model = this.modelFor('meeting')
    const response = await this.store.request(query('agendaitem', {
      include: ['case', 'submitters'],
      'filter[meeting][:uri:]': model.uri,
    }))

    const agendaitems = response.content.data;
    const map = { '': [] };

    for (const agendaitem of agendaitems) {
      const submitters = await agendaitem.submitters;
      if (submitters.length) {
        for (const submitter of submitters) {
          if (Object.hasOwn(map, submitter.name)) {
            map[submitter.name].push(agendaitem);
          } else {
            map[submitter.name] = [agendaitem];
          }
        }
      } else {
        map[''].push(agendaitem)
      }
    }

    return map;
  }
}
