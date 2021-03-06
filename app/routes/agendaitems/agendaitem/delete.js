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

  afterModel(model) {
    model.deleteRecord();
  },

  renderTemplate(controller, model) {
    this.render('agendaitems.agendaitem.delete', {
      controller: 'agendaitems.agendaitem.delete',
      outlet: 'modal',
      into: 'agendaitems',
      model: model
    });
  }

});
