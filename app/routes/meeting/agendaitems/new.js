import Route from '@ember/routing/route';
import { service } from "@ember/service";

export default class MeetingAgendaitemsNewRoute extends Route {
  @service store;

  async model() {
    const meeting = await this.modelFor('meeting');
    const agendaitemsSorted = meeting.agendaItems.map((i) => [i.priority, i.subPriority, i.submitters]).sort();
    const [priority, _subPriority, submitters] = agendaitemsSorted.at(-1) || [0, 0, []]
    const case_ = this.store.createRecord('case', {});
    const agendaitem = this.store.createRecord('agendaitem', {
      meeting,
      priority: priority + 1,
      subPriority: '',
      subject: '',
      submitters: submitters.slice(),
      case: case_,
    })
    return agendaitem;
  }
}
