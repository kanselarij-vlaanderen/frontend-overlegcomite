import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { isNotFoundResponse } from 'ember-fetch/errors';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.findRecord('meeting', params.meeting_id, {include: 'agenda-items.submitters' }).then((meeting) => {
      meeting.get('sortedAgendaItems'); // Prime computed property cache before returning
      return meeting;
    });
  },

  afterModel(model) {
    const controller = this.controllerFor('agendaitems');
    controller.set('agendaDistributionEndpoint', `/meetings/${model.id}/agenda/distribute`);
    controller.set('notificationsDistributionEndpoint', `/meetings/${model.id}/notifications/distribute`);
    fetch(controller.get('agendaDistributionEndpoint')).then((res) => {
      controller.set('startedAgendaDistribution', [200, 406].includes(res.status));
    });
    fetch(controller.get('notificationsDistributionEndpoint')).then((res) => {
      controller.set('startedNotificationsDistribution', [200, 406].includes(res.status));
    });
  },

  renderTemplate(controller, model) {
    // Default
    this.render('agendaitems');
    // Header
    this.render('agenda-header', {
      controller: 'agendaitems',
      outlet: 'header',
      into: 'agendaitems',
      model: model
    });
  }
});
