import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class MeetingDeleteRoute extends Route {
  @service currentSession;

  beforeModel() {
    if (!this.currentSession.canEditAgenda) {
      this.transitionTo('meetings');
    }
  }

  model() {
    return this.store.findRecord('meeting', this.modelFor('meeting').id, {
      include: 'agenda-items'
    });
  }
}
