import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'frontend-overlegcomite/mixins/authenticated-route-mixin';
import moment from 'moment';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  currentSession: service(),

  beforeModel() {
    if (!this.currentSession.canEditAgenda) {
      this.transitionTo('meetings.index');
    }
  },

  model() {
    const nextSessionDate = moment().day(3 + 7 + 7) // Wednesday in two weeks
                                    .hours(8) // 8 AM
                                    .minutes(0)
                                    .seconds(0)
                                    .milliseconds(0)
                                    .toDate();
    return this.store.createRecord('meeting', {startedAt: nextSessionDate});
  },
});
