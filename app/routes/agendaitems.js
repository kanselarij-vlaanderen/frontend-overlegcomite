import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.findRecord('meeting', params.meeting_id, {include: 'agenda-items.submitters' });
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
