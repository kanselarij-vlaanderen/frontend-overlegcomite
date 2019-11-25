import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Route.extend(AuthenticatedRouteMixin, {
  currentSession: service(),

  beforeModel() {
    if (!this.currentSession.canEditAgenda) {
      this.transitionTo('agendaitems');
    }
  },

  model() {
    const lastAgendaItem = this.modelFor('agendaitems').get('sortedAgendaItems.lastObject');
    const nextNumber = lastAgendaItem ? lastAgendaItem.get('priority') + 1 : 1;
    const previousSubmitters = lastAgendaItem ? lastAgendaItem.get('submitters') : A([]);
    const newItem = this.store.createRecord('agendaitem', {
      priority: nextNumber,
      submitters: previousSubmitters
    });
    this.modelFor('agendaitems').get('agendaItems').pushObject(newItem);
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
});
