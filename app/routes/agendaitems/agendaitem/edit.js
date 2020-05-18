import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'frontend-overlegcomite/mixins/authenticated-route-mixin'; // eslint-disable-line ember/no-mixins
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  currentSession: service(),

  beforeModel() {
    if (!this.currentSession.canEditAgenda) {
      this.transitionTo('agendaitems.agendaitem.index');
    }
  },

  model() {
    return this.modelFor('agendaitems.agendaitem');
  },

  renderTemplate(controller, model) {
    this.render('agendaitems.agendaitem.edit', {
      controller: 'agendaitems.agendaitem.edit',
      outlet: 'modal',
      into: 'agendaitems',
      model: model
    });
  },

  setupController(controller, model) {
    const governmentBodies = this.store.query('government-body', { sort: '-name'});
    controller.set('governmentBodies', governmentBodies);
    controller.set('model', model);
  }
});
