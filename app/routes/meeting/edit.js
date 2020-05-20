import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class MeetingEditRoute extends Route {
  @service currentSession;

  beforeModel() {
    if (!this.currentSession.canEditAgenda) {
      this.transitionTo('meetings.index');
    }
  }

  model() {
    return this.modelFor('meeting');
  }
}
