import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.findRecord('meeting', params.meeting_id, {include: 'agenda-items.submitters' }).then((meeting) => {
      meeting.get('sortedAgendaItems'); // Prime computed property cache before returning
      return meeting;
    });
  }
});
