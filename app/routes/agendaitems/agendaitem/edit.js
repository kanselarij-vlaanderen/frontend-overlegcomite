import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
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
