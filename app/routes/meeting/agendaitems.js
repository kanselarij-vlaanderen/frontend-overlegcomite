import Route from '@ember/routing/route';

export default class MeetingAgendaitemsRoute extends Route {
  model() {
    return this.modelFor('meeting')
  }
}
