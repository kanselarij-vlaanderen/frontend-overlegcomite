import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class MeetingIndexRoute extends Route {
  @service router;

  beforeModel() {
    this.router.replaceWith('meeting.agendaitems');
  }
  model() {
    return this.modelFor('meeting');
  }
}
