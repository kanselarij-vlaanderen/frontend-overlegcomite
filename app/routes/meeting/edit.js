import Route from '@ember/routing/route';

export default class MeetingEditRoute extends Route {
  model() {
    return this.modelFor('meeting')
  }
}
