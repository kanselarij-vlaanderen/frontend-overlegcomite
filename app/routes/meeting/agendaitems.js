import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class MeetingAgendaitemsRoute extends Route {
  @service store;

  async model() {
    const meeting = this.modelFor('meeting');
    const agendaitems = await this.store.queryAll('agendaitem', {
      'filter[meeting][:uri:]': meeting.uri,
      include: 'case,submitters',
      sort: 'priority'
    })

    const map = {};

    // TODO Agendaitems must be arranged per group of submitters
    // TODO Model doesn't update on creation/deletion of an agendaitem
    for (const agendaitem of agendaitems.toArray()) {
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
        if (Object.hasOwn(map, '')) {
          map[''].push(agendaitem);
        } else {
          map[''] = [agendaitem];
        }
      }
    }

    return map;
  }
}
