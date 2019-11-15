import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
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
