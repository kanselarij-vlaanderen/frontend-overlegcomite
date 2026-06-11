import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class MeetingAgendaitemsRoute extends Route {
  @service store;

  async model() {
    const meeting = this.modelFor('meeting');
    const agendaitems = await this.store.queryAll('agendaitem', {
      'filter[meeting][:uri:]': meeting.uri,
      include: 'case,submitters',
      sort: 'priority,sub-priority',
    });

    const agendaitemGroups = [];
    let currentGroup;
    for (const agendaitem of agendaitems.toArray()) {
      const submitters = await agendaitem.submitters;
      const groupId = submitters
        .map((submitter) => submitter.id)
        .sort()
        .join('');

      if (currentGroup && currentGroup.id == groupId) {
        // agendaitem has same submitters as the previous item. Add to the group.
        currentGroup.agendaitems.push(agendaitem);
      } else {
        // agendaitem has different submitters. Start a new group.
        currentGroup = { id: groupId, submitters, agendaitems: [agendaitem] };
        agendaitemGroups.push(currentGroup);
      }
    }

    return agendaitemGroups;
  }
}
