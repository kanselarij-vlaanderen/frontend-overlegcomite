import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  currentSession: service(),

  beforeModel() {
    if (!this.currentSession.canEditAgenda) {
      this.transitionTo('agendaitems');
    }
  },

  model() {
    const agendaItems = this.modelFor('agendaitems').get('agendaItems');
    const nextNumber = agendaItems.sortBy('priority').get('lastObject.priority') + 1 || 1;
    const newItem = this.store.createRecord('agendaitem', {priority: nextNumber});
    agendaItems.pushObject(newItem);
    return newItem;
  },

  renderTemplate(controller, model) {
    this.render('agendaitems.new', {
      controller: 'agendaitems.new',
      outlet: 'modal',
      into: 'agendaitems',
      model: model
    });
  },

  setupController(controller, model) {
    const governmentBodies = this.store.query('government-body', { sort: '-name'});
    controller.set('governmentBodies', governmentBodies);
    controller.set('model', model);
    controller.set('meeting', model.get('meeting'));
  }
});
