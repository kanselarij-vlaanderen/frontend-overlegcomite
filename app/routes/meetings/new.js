import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import moment from 'moment';

export default Route.extend(AuthenticatedRouteMixin, {
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
