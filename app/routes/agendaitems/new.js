import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'frontend-overlegcomite/mixins/authenticated-route-mixin';
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
    const queryParams = {
      'filter[meeting][:id:]': this.modelFor('agendaitems').get('id'),
      sort: '-priority,-sub-priority',
      page: { size: 1 }
    };
    return this.store.query('agendaitem', queryParams).then((agendaItems) => {
      const agendaItem = agendaItems.objectAt(0);
      const nextNumber = agendaItem ? agendaItem.get('priority') + 1 : 1;
      const previousSubmitters = agendaItem ? agendaItem.get('submitters') : A([]);
      const newItem = this.store.createRecord('agendaitem', {
        priority: nextNumber,
        submitters: previousSubmitters,
        meeting: this.modelFor('agendaitems')
      });
      return newItem;
    });
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
