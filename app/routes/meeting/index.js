import Route from '@ember/routing/route';

export default class MeetingIndexRoute extends Route {
  model() {
    return this.modelFor('meeting');
  }
}
